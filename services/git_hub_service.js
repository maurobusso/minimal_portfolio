export class GitHubService {
  constructor(username) {
    this.username = username;
    this.baseUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`;
    this.cacheKey = "portfolioRepos";
    this.cacheTTL = 5 * 60 * 1000;
  }

  async getPortfolioRepos() {
    const cached = this._getCachedData();
    if (cached) return cached;

    try {
      const res = await fetch(this.baseUrl);
      if (!res.ok) throw new Error("GitHub API unreachable");

      const repos = await res.json();
      const filtered = repos
        .filter((repo) => repo.topics?.includes("portfolio"))
        .slice(0, 6);

      this._setCachedData(filtered);
      return filtered;
    } catch (e) {
      console.error("GitHub Service Error:", e);
      return [];
    }
  }

  _getCachedData() {
    const cached = JSON.parse(localStorage.getItem(this.cacheKey));
    const now = Date.now();
    if (cached && now - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }
    return null;
  }

  _setCachedData(data) {
    localStorage.setItem(
      this.cacheKey,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  }
}
