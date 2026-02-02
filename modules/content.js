// Content module - handles content sections (about, experience, education, projects)
const ContentModule = {
  populateAbout(bio) {
    const aboutSection = Array.from(document.querySelectorAll("section")).find(
      (s) => s.querySelector("h2")?.textContent.includes("About"),
    );
    if (aboutSection) {
      const p = aboutSection.querySelector("p");
      if (p) p.textContent = bio;
    }
  },

  populateExperience(experience) {
    const expSection = Array.from(document.querySelectorAll("section")).find(
      (s) => s.querySelector("h2")?.textContent.includes("Experience"),
    );

    if (expSection) {
      const container = expSection.querySelector(".space-y-6");
      if (container) {
        container.innerHTML = experience
          .map(
            (job) => `
            <div>
              <h3 class="font-medium">${job.title}</h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                ${job.company} · ${job.period}
              </p>
              <p class="mt-2 text-neutral-700 dark:text-neutral-300">
                ${job.description}
              </p>
            </div>
          `,
          )
          .join("");
      }
    }
  },

  populateEducation(education) {
    const eduSection = Array.from(document.querySelectorAll("section")).find(
      (s) => s.querySelector("h2")?.textContent.includes("Education"),
    );

    if (eduSection) {
      const container = eduSection.querySelector("div:not(.space-y-6)");
      if (container && !container.querySelector(".space-y-6")) {
        container.innerHTML = education
          .map(
            (edu) => `
            <div>
              <h3 class="font-medium">${edu.degree}</h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                ${edu.school} · ${edu.period}
              </p>
            </div>
          `,
          )
          .join("");
      }
    }
  },

  populateProjects(projects) {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    grid.innerHTML = projects
      .map((project) => {
        const techList = (project.tech || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

        const techTags = techList
          .map(
            (t) =>
              `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-200">${t}</span>`,
          )
          .join("");

        const firstTech = techList[0] || "";
        const category = project.category || firstTech || "Project";
        const live = project.live
          ? `<div class="flex items-center gap-1 text-green-600"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm3.707 5.293a1 1 0 1 1 1.414 1.414L8 11.828l-3.121-3.121a1 1 0 0 1 1.414-1.414L8 9l2.707-2.707z"></path></svg><span class="text-xs">Live</span></div>`
          : "";

        return `
          <div class="border border-neutral-200 dark:border-neutral-800 rounded-md p-4 hover:shadow-sm hover:border-neutral-300 transition-all bg-white dark:bg-neutral-950 flex flex-col justify-between h-36 relative">
            <span class="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">${category}</span>
            <div>
              <div class="pr-16 flex items-center gap-2">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor" class="text-gray-600 dark:text-gray-300"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-semibold hover:underline"><span class="font-light">${project.author || ""}</span>${project.author ? "/" : ""}${project.name}</a>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400 pr-16 line-clamp-2 overflow-hidden text-justify">${project.description}</p>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-500 mt-3">
              <div class="flex items-center gap-1"><span class="inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>${firstTech}</div>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1"><svg aria-label="stars" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.919 6.362a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>${project.stars || 0}</div>
                <div class="flex items-center gap-1"><svg aria-label="forks" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>${project.forks || 0}</div>
              </div>
            </div>
            ${live}
          </div>
        `;
      })
      .join("");
  },
};
