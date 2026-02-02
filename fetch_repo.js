const username = "maurobusso";
const tableBody = document.getElementById("projectsTable");
const cacheKey = "portfolioRepos";
const cacheTTL = 5 * 60 * 1000; // 5 minutes

const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
const now = Date.now();

if (cached && now - cached.timestamp < cacheTTL) {
  renderTable(cached.data);
} else {
  fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`,
    {
      headers: { Accept: "application/vnd.github.mercy-preview+json" },
    },
  )
    .then((res) => res.json())
    .then((repos) => {
      const filtered = repos
        .filter((repo) => repo.topics?.includes("portfolio"))
        .slice(0, 6);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: filtered, timestamp: now }),
      );
      renderTable(filtered);
    })
    .catch(() => {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="px-4 py-6 text-center text-neutral-500">
            Failed to load projects
          </td>
        </tr>
      `;
    });
}

function renderTable(repos) {
  tableBody.innerHTML = repos
    .map(
      (repo) =>
        `
        <tr class="hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
          <td class="px-4 py-3 font-mono">
            <a href="${
              repo.html_url
            }" target="_blank" class="hover:underline">${repo.name}</a>
          </td>
          <td class="px-4 py-3 text-neutral-600 dark:text-neutral-400">${
            repo.description ?? ""
          }</td>
          <td class="px-4 py-3 text-xs text-neutral-500">${
            repo.language ?? "—"
          }</td>
          <td class="px-4 py-3 text-right font-mono">${
            repo.stargazers_count
          }</td>
        </tr>
        `,
    )
    .join("");
}
