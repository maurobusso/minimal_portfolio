const HeaderModule = {
  updateImage(image) {
    const imageLink = document.getElementById("imageId");
    if (imageLink) {
      imageLink.src = image;
    }
  },
  updateName(name) {
    const nameHeader = document.getElementById("nameId");
    if (nameHeader) {
      nameHeader.textContent = name;
    }
  },
  updateBio(bio) {
    const bioParag = document.getElementById("bioId");
    if (bioParag) {
      nameHbioParageader.textContent = bio;
    }
  },

  update(image, name, bio) {
    this.updateImage(image);
    this.updateName(name);
    this.updateBio(bio);
  },
};
