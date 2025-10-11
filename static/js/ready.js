"use strict";

// DOM加载完成后执行
document.addEventListener("DOMContentLoaded", () => {
  initPage();
}, { once: true });

async function initPage() {
  loadToc();
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

// 目录滚动动画
function loadToc() {
  const toc = document.getElementById("toc");
  const sidebar = document.querySelector(".sidebar");
  if (!toc || !sidebar) return;

  let atTop = true;
  window.addEventListener("scroll", () => {
    const y = scrollY;
    const shouldScrollBottom = y > 200;

    if (shouldScrollBottom !== !atTop) {
      sidebar.scrollTo({ top: shouldScrollBottom ? sidebar.scrollHeight : 0, behavior: "smooth" });
      atTop = !shouldScrollBottom;
    }
  }, { passive: true });
}
