"use strict";

// DOM加载完成后执行
document.addEventListener("DOMContentLoaded", () => {
  initPage();
}, { once: true });

async function initPage() {
  setupTocVisibility();
  initToc();
  await loadView();
}

// 加载浏览量
async function loadView() {
  const viewEl = document.getElementById("view-count");
  if (!viewEl) return;

  try {
    const res = await fetch(`https://api.ichochy.com${location.pathname}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { views } = await res.json();
    viewEl.textContent = views ?? "0";
  } catch (err) {
    console.error("加载视图失败:", err);
  }
}

// 滚动时切换侧栏与目录显示
function setupTocVisibility() {
  const toc = document.getElementById("toc");
  const sidebar = document.querySelector(".sidebar");
  if (!toc || !sidebar) return;

  const desktopQuery = window.matchMedia("(min-width: 48em)");
  const threshold = 240;
  const tocCard = toc.querySelector(".toc-card");
  let tocVisible = false;

  const update = () => {
    if (!desktopQuery.matches) {
      sidebar.classList.remove("toc-visible");
      tocVisible = false;
      return;
    }
    const nextVisible = window.scrollY > threshold;
    if (nextVisible !== tocVisible) {
      sidebar.classList.toggle("toc-visible", nextVisible);
      if (nextVisible) {
        sidebar.scrollTo({ top: 0, behavior: "auto" });
        if (tocCard) tocCard.scrollTo({ top: 0, behavior: "auto" });
      }
      tocVisible = nextVisible;
      return;
    }
    sidebar.classList.toggle("toc-visible", nextVisible);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", update);
  }
}

// 初始化目录高亮和交互
function initToc() {
  const toc = document.getElementById("toc");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll("a[href^='#']"));
  if (!links.length) {
    toc.classList.add("is-empty");
    return;
  }

  const linkMap = new Map();
  links.forEach((link) => {
    const hash = link.getAttribute("href");
    if (!hash) return;
    try {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;
      linkMap.set(el, link);
    } catch (err) {
      console.error("目录锚点解析失败:", err);
    }
  });

  if (!linkMap.size) return;

  const setActive = (activeLink) => {
    links.forEach((link) => link.classList.remove("is-active"));
    if (activeLink) activeLink.classList.add("is-active");
  };

  const firstLink = links[0];
  setActive(firstLink);

  links.forEach((link) => {
    link.addEventListener("click", () => setActive(link), { passive: true });
  });

  let activeHeading = null;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activeHeading = entry.target;
      });
      const activeLink = activeHeading ? linkMap.get(activeHeading) : firstLink;
      setActive(activeLink);
    },
    {
      root: null,
      rootMargin: "-16% 0px -72% 0px",
      threshold: [0, 1],
    }
  );

  linkMap.forEach((_, heading) => observer.observe(heading));
}
