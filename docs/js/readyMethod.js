"use strict";

//文档加载后执行 fn
function ready(fn) {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
}

ready(function(){
    loadToc()
    loadView()
})


async function loadView() {
  try {
    const response = await fetch(`https://api.ichochy.com${window.location.pathname}`);
    const data = await response.json();
    document.getElementById("view-count").textContent = data.views;
  } catch (error) {
    console.error("加载视图失败:", error);
  }
}

function loadToc() {
  const title = document.getElementById("title");
  const toc = document.getElementById("toc");
  const sidebar = document.querySelector(".sidebar");
  if (!toc || !sidebar) return;

  let mark = true;
  window.addEventListener(
    "scroll",
    () => {
      const scrollHeight = window.scrollY;
      if (scrollHeight > 200 && mark) {
        mark = false;
        sidebar.scrollTo({ top: sidebar.offsetHeight, behavior: "smooth" });
      } else if (scrollHeight <= 200 && !mark) {
        mark = true;
        sidebar.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    { passive: true }
  );
}
