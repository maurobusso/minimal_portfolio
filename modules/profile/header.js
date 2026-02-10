export class HeaderModule {
  constructor() {
    this.imageLink = document.getElementById("imageId");
    this.nameHeader = document.getElementById("nameId");
    this.bioParag = document.getElementById("bioId");
  }

  updateImage(image) {
    if (this.imageLink) {
      this.imageLink.src = image;
    }
  }

  updateName(name) {
    if (this.nameHeader) {
      this.nameHeader.textContent = name;
    }
  }

  updateBio(bio) {
    if (this.bioParag) {
      this.bioParag.textContent = bio;
    }
  }

  update(image, name, bio) {
    this.updateImage(image);
    this.updateName(name);
    this.updateBio(bio);
  }
}
