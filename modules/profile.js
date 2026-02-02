// Profile module - handles profile section updates
const ProfileModule = {
  updateSocial(social) {
    const socialContainer = document.querySelector(".flex.gap-4");
    if (socialContainer) {
      socialContainer.innerHTML = social
        .map(
          (link) =>
            `<a href="${link.url}" target="_blank" class="hover:underline">${link.name}</a>`,
        )
        .join("");
    }
  },
};
