const toggleButton = document.getElementById("themeToggle");
const html = document.documentElement;

// Load saved theme
if (localStorage.theme === "dark") {
  html.classList.add("dark");
  toggleButton.textContent = "☀️";
}

toggleButton.addEventListener("click", () => {
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  toggleButton.textContent = isDark ? "☀️" : "🌙";
  localStorage.theme = isDark ? "dark" : "light";
});
