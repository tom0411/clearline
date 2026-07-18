(() => {
  const themes = {
    dark: {
      editor: "#000000",
      sidebar: "#202226",
    },
    grey: {
      editor: "#363636",
      sidebar: "#363636",
    },
    slate: {
      editor: "#2b2f3e",
      sidebar: "#2b2f3e",
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
