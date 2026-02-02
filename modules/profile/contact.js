const ContactModule = {
  updateEmail(email) {
    const emailLink = document.getElementById("emailLink");
    if (emailLink) {
      emailLink.href = `mailto:${email}`;
      emailLink.textContent = email;
    }
  },

  updateLocation(location) {
    const locationSpan = document.getElementById("locationSpan");
    if (locationSpan) {
      locationSpan.textContent = location;
    }
  },

  updateCV(cvUrl) {
    const cvLink = document.getElementById("cvLink");
    if (cvLink) {
      cvLink.href = cvUrl;
      cvLink.target = "_blank";
    }
  },

  updateContact(email, location, cvUrl) {
    this.updateEmail(email);
    this.updateLocation(location);
    this.updateCV(cvUrl);
  },
};
