export class SocialModule {
  // Static property for configuration - shared by all instances
  static CONFIG = {
    github: {
      id: "icon-github",
      color: "text-neutral-600 dark:text-neutral-400",
    },
    linkedin: {
      id: "icon-linkedin",
      color: "text-blue-600 dark:text-blue-400",
    },
    default: { id: "icon-default", color: "text-neutral-600" },
  };

  constructor(containerId = "socialLinks") {
    this.container = document.getElementById(containerId);
  }

  //  Internal helper to find the right icon and color
  _getIconData(name) {
    const key = (name || "").toLowerCase().trim();
    return SocialModule.CONFIG[key] || SocialModule.CONFIG.default;
  }

  //  Generates the HTML string for a single social link
  _renderLink({ name, url }) {
    const { id, color } = this._getIconData(name);

    return `
      <a href="${url || "#"}" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm hover:underline group">
        <svg class="w-4 h-4 ${color} transition-transform group-hover:scale-110">
          <use href="#${id}"/>
        </svg>
        <span>${name}</span>
      </a>`;
  }

  // Public method to populate the UI with an array of social objects
  update(socialData = []) {
    if (!this.container) return;

    this.container.innerHTML = socialData
      .map((item) => this._renderLink(item))
      .join("");
  }
}
