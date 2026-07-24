(() => {
  const themes = {
    dark: {
      editor: "#000000",
      sidebar: "#202226",
      fg: "#ffffff",
      fileFg: "#a8a8b0",
      tokKw: "#439fd7",
      tokStr: "#58ffd6",
      tokVar: "#ffffff",
      tokFn: "#e24285",
      tokType: "#f4a82b",
      tokKey: "#f4a82b",
      tokCmt: "#e8e6e380",
      diffAdded: "#22c55e40",
      diffRemoved: "#ef444440",
      markerAdded: "#22c55e",
      markerRemoved: "#ef4444",
    },
    grey: {
      editor: "#363636",
      sidebar: "#363636",
      fg: "#ffffff",
      fileFg: "#a8a8b0",
      tokKw: "#439fd7",
      tokStr: "#58ffd6",
      tokVar: "#ffffff",
      tokFn: "#e24285",
      tokType: "#f4a82b",
      tokKey: "#f4a82b",
      tokCmt: "#e8e6e380",
      diffAdded: "#22c55e40",
      diffRemoved: "#ef444440",
      markerAdded: "#22c55e",
      markerRemoved: "#ef4444",
    },
    slate: {
      editor: "#2b2f3e",
      sidebar: "#2b2f3e",
      fg: "#ffffff",
      fileFg: "#a8a8b0",
      tokKw: "#439fd7",
      tokStr: "#58ffd6",
      tokVar: "#ffffff",
      tokFn: "#e24285",
      tokType: "#f4a82b",
      tokKey: "#f4a82b",
      tokCmt: "#e8e6e380",
      diffAdded: "#22c55e40",
      diffRemoved: "#ef444440",
      markerAdded: "#22c55e",
      markerRemoved: "#ef4444",
    },
    white: {
      editor: "#ffffff",
      sidebar: "#f5f5f7",
      fg: "#1a1a1c",
      fileFg: "#5a5a62",
      tokKw: "#2a7eb8",
      tokStr: "#0d8f7a",
      tokVar: "#1a1a1c",
      tokFn: "#c9346f",
      tokType: "#b87a12",
      tokKey: "#b87a12",
      tokCmt: "#8a8880",
      diffAdded: "#16a34a22",
      diffRemoved: "#dc262622",
      markerAdded: "#16a34a",
      markerRemoved: "#dc2626",
    },
  };

  const root = document.documentElement;
  const editor = document.getElementById("editor-preview");
  const buttons = document.querySelectorAll(".theme-tabs__btn");

  if (!editor || !buttons.length) return;

  function applyTheme(name) {
    const theme = themes[name];
    if (!theme) return;

    root.style.setProperty("--editor-bg", theme.editor);
    root.style.setProperty("--sidebar-bg", theme.sidebar);
    root.style.setProperty("--code-fg", theme.fg);
    root.style.setProperty("--code-file-fg", theme.fileFg);
    root.style.setProperty("--tok-kw", theme.tokKw);
    root.style.setProperty("--tok-str", theme.tokStr);
    root.style.setProperty("--tok-var", theme.tokVar);
    root.style.setProperty("--tok-fn", theme.tokFn);
    root.style.setProperty("--tok-type", theme.tokType);
    root.style.setProperty("--tok-key", theme.tokKey);
    root.style.setProperty("--tok-cmt", theme.tokCmt);
    root.style.setProperty("--diff-added-bg", theme.diffAdded);
    root.style.setProperty("--diff-removed-bg", theme.diffRemoved);
    root.style.setProperty("--diff-marker-added", theme.markerAdded);
    root.style.setProperty("--diff-marker-removed", theme.markerRemoved);
    editor.dataset.active = name;

    editor.classList.remove("is-switching");
    // restart fade
    void editor.offsetWidth;
    editor.classList.add("is-switching");

    buttons.forEach((btn) => {
      const active = btn.dataset.theme === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTheme(btn.dataset.theme);
    });
  });

  // keyboard: left/right on focused tab
  document.querySelector(".theme-tabs")?.addEventListener("keydown", (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const list = [...buttons];
    const current = list.findIndex((b) => b.classList.contains("is-active"));
    if (current < 0) return;

    let next = current;
    if (event.key === "ArrowLeft") next = (current - 1 + list.length) % list.length;
    if (event.key === "ArrowRight") next = (current + 1) % list.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = list.length - 1;

    event.preventDefault();
    list[next].focus();
    applyTheme(list[next].dataset.theme);
  });

  applyTheme("dark");
})();
