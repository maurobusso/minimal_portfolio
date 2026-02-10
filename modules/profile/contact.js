export class ContactModule {
  constructor() {
    // We cache the elements once during initialization
    // to avoid searching the DOM every time a method is called.
    this.emailLink = document.getElementById("emailLink");
    this.locationSpan = document.getElementById("locationSpan");
    this.cvLink = document.getElementById("cvLink");
  }

  updateEmail(email) {
    if (this.emailLink) {
      this.emailLink.href = `mailto:${email}`;
      this.emailLink.textContent = email;
    }
  }

  updateLocation(location) {
    if (this.locationSpan) {
      this.locationSpan.textContent = location;
    }
  }

  updateCV(cvUrl) {
    if (this.cvLink) {
      this.cvLink.href = cvUrl;
      this.cvLink.target = "_blank";
    }
  }

  // Main entry point to update all contact info at once
  update(email, location, cvUrl) {
    this.updateEmail(email);
    this.updateLocation(location);
    this.updateCV(cvUrl);
  }
}
