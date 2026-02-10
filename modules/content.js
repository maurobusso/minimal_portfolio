export class ContentModule {
  constructor() {
    // Biography Element
    this.bioContainer = document.getElementById("bioId");

    // Experience Elements
    this.expContainer = document.getElementById("experienceGrid");
    this.expTemplate = document.getElementById("experience-template");

    // Education Elements
    this.eduContainer = document.getElementById("educationGrid");
    this.eduTemplate = document.getElementById("education-template");
  }

  /**
   * Updates the About/Bio section
   */
  updateAbout(bio) {
    if (this.bioContainer) {
      this.bioContainer.textContent = bio;
    }
  }

  /**
   * Renders the experience list using the HTML template
   */
  updateExperience(experience = []) {
    if (!this.expContainer || !this.expTemplate) return;

    this.expContainer.innerHTML = "";
    experience.forEach((item) => {
      const clone = this.expTemplate.content.cloneNode(true);

      clone.querySelector(".exp-title").textContent = item.title;
      clone.querySelector(".exp-company").textContent = item.company;
      clone.querySelector(".exp-period").textContent = item.period;
      clone.querySelector(".exp-desc").textContent = item.description;

      this.expContainer.appendChild(clone);
    });
  }

  /**
   * Renders the education list using the HTML template
   */
  updateEducation(education = []) {
    if (!this.eduContainer || !this.eduTemplate) return;

    this.eduContainer.innerHTML = "";
    education.forEach((item) => {
      const clone = this.eduTemplate.content.cloneNode(true);

      clone.querySelector(".edu-degree").textContent = item.degree;
      clone.querySelector(".edu-school").textContent = item.school;
      clone.querySelector(".edu-period").textContent = item.period;

      this.eduContainer.appendChild(clone);
    });
  }

  /**
   * Helper to update everything in this module at once
   */
  updateAll(bio, experience, education) {
    this.updateAbout(bio);
    this.updateExperience(experience);
    this.updateEducation(education);
  }
}
