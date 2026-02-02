const SocialModule = {
  // Mapping names to the ID i defined in the HTML symbols
  CONFIG: {
    github: { id: "icon-github", color: "text-gray-600" },
    linkedin: { id: "icon-linkedin", color: "text-blue-600" },
    default: { id: "icon-default", color: "text-gray-600" },
  },

  getIconData(name) {
    const key = (name || "").toLowerCase().trim();
    return this.CONFIG[key] || this.CONFIG.default;
  },

  renderLink({ name, url }) {
    const { id, color } = this.getIconData(name);

    return `
      <a href="${url || "#"}" target="_blank" rel="noopener" class="flex items-center gap-2 text-sm hover:underline">
        <svg class="w-4 h-4 ${color}"><use href="#${id}"/></svg>
        <span>${name}</span>
      </a>`;
  },

  update(social = []) {
    const container = document.getElementById("socialLinks");
    if (container) {
      container.innerHTML = social.map((s) => this.renderLink(s)).join("");
    }
  },
};
