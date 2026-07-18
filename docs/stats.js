(() => {
  const starsEl = document.querySelector('[data-stat="stars"]');
  const downloadsEl = document.querySelector('[data-stat="downloads"]');
  if (!starsEl && !downloadsEl) return;

  function formatCount(n) {
    if (!Number.isFinite(n)) return "—";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
    return String(Math.round(n));
  }

  async function fetchJson(url, init) {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
  }

  async function loadStars() {
    if (!starsEl) return;
    const data = await fetchJson(
      "https://api.github.com/repos/tom0411/clearline"
    );
    starsEl.textContent = formatCount(data.stargazers_count);
  }

  async function loadDownloads() {
    if (!downloadsEl) return;

    // Open VSX is CORS-friendly; Marketplace gallery API is not in browsers.
    const ovsx = await fetchJson("https://open-vsx.org/api/tomp4/clearline");
    let total = Number(ovsx.downloadCount) || 0;

    try {
      const marketplace = await fetchJson(
        "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery?api-version=7.1-preview.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json;api-version=7.1-preview.1",
          },
          body: JSON.stringify({
            filters: [
              {
                criteria: [{ filterType: 7, value: "tomp4.clearline" }],
                pageNumber: 1,
                pageSize: 1,
              },
            ],
            flags: 914,
          }),
        }
      );
      const stats =
        marketplace?.results?.[0]?.extensions?.[0]?.statistics ?? [];
      const download = stats.find((s) => s.statisticName === "downloadCount");
      if (download) total += Number(download.value) || 0;
    } catch {
      // Marketplace often blocks browser CORS — Open VSX count still shows.
    }

    downloadsEl.textContent = formatCount(total);
  }

  Promise.allSettled([loadStars(), loadDownloads()]);
})();
