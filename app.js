// Main application orchestrator
// Loads modules, data, and coordinates all page updates

class Portfolio {
  constructor() {
    this.data = null;
  }

  async init() {
    try {
      await this.loadModules();
      this.data = await this.loadData();
      this.render();
    } catch (err) {
      console.error("Failed to initialize portfolio:", err);
    }
  }

  async loadModules() {
    // Dynamically load module scripts
    await Promise.all([
      this.loadScript("modules/profile.js"),
      this.loadScript("modules/profile/contact.js"),
      this.loadScript("modules/profile/social.js"),
      this.loadScript("modules/profile/header.js"),
      this.loadScript("modules/content.js"),
    ]);
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadData() {
    const response = await fetch("portfolio.json");
    if (!response.ok) throw new Error("Failed to fetch portfolio.json");
    return response.json();
  }

  render() {
    const { profile, social, experience, education, projects } = this.data;

    // Profile updates
    // ProfileModule.updateImage(profile.image);
    // ProfileModule.updateName(profile.name);
    // ProfileModule.updateTitle(profile.title);
    // ProfileModule.updateSocial(social);
    // ProfileModule.updateContact(profile.email, profile.location);
    // ProfileModule.updateCV(profile.cvUrl);
    // ProfileModule.updateFooter(profile.name);

    // Content updates
    ContentModule.populateAbout(profile.bio);
    ContentModule.populateExperience(experience);
    ContentModule.populateEducation(education);
    ContentModule.populateProjects(projects);
    // In render() method
    ContactModule.updateContact(profile.email, profile.location, profile.cvUrl);
    SocialModule.update(social);
    HeaderModule.update(profile.image, profile.name);
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new Portfolio();
  app.init();
});
