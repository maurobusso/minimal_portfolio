import { ContentModule } from "./modules/content.js";
import { ContactModule } from "./modules/profile/contact.js";
import { HeaderModule } from "./modules/profile/header.js";
import { SocialModule } from "./modules/profile/social.js";
import { GitHubService } from "./services/git_hub_service.js";

class Portfolio {
  constructor() {
    // Initialize Services
    this.githubService = new GitHubService("maurobusso");

    // Initialize UI Modules
    this.contact = new ContactModule();
    this.header = new HeaderModule();
    this.social = new SocialModule();
    this.content = new ContentModule(); // Fixed: was overwriting this.social
  }

  async init() {
    try {
      const [localData, githubRepos] = await Promise.all([
        this.fetchLocalData(),
        this.githubService.getPortfolioRepos(),
      ]);

      this.renderStaticContent(localData);
      this.renderDynamicProjects(githubRepos);
    } catch (err) {
      console.error("Portfolio Init Error:", err);
    }
  }

  async fetchLocalData() {
    const res = await fetch("portfolio.json");
    if (!res.ok) throw new Error("Could not load portfolio.json");
    return res.json();
  }

  renderStaticContent(data) {
    const { profile, social, experience, education } = data;

    // Use 'this' to access the instances created in the constructor
    this.contact.update(profile.email, profile.location, profile.cvUrl);
    this.header.update(profile.image, profile.name, profile.bio);
    this.social.update(social);

    // Using the updateAll helper or individual methods from ContentModule instance
    this.content.updateAll(profile.bio, experience, education);
  }

  renderDynamicProjects(repos) {
    const grid = document.getElementById("projectsGrid");
    const template = document.getElementById("project-template");

    if (!grid || !template) return;
    grid.innerHTML = "";

    if (repos.length === 0) {
      grid.innerHTML =
        "<p class='text-neutral-500 text-center py-10'>No projects found with the 'portfolio' tag.</p>";
      return;
    }

    repos.forEach((repo) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".project-name").textContent = repo.name;
      clone.querySelector(".project-link").href = repo.html_url;
      clone.querySelector(".project-desc").textContent =
        repo.description || "View on GitHub";
      clone.querySelector(".project-lang").textContent =
        repo.language || "Code";
      clone.querySelector(".project-stars").textContent = repo.stargazers_count;
      grid.appendChild(clone);
    });
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const myPortfolio = new Portfolio();
  myPortfolio.init();
});
