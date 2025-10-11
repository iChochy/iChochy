"use strict";

const API_BASE_URL = "https://api.ichochy.com/data/";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const query = window.location.search;
    const data = await fetchJSON(`${API_BASE_URL}${query}`);
    if (!data?.meta || !data?.data) throw new Error("数据格式错误");
    renderTable(data);
  } catch (err) {
    console.error("加载失败:", err);
    renderError("数据加载失败");
  }
});

/**
 * 通用 JSON 请求
 */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * 渲染表格
 */
function renderTable({ meta, data }) {
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");
  head.textContent = body.textContent = "";

  const hasDatetime = meta.some(m => m.name === "datetime");

  // 表头
  const headerHTML =
    meta.map(m => `<th>${m.name.toUpperCase()}</th>`).join("") + "<th>操作</th>";
  head.innerHTML = `<tr>${headerHTML}</tr>`;

  // 表体
  body.innerHTML = data
    .map(item => {
      const cells = meta
        .map(m => `<td>${decodeURIComponent(item[m.name] ?? "")}</td>`)
        .join("");
      const pageUrl = `https://${item.host}${item.path ?? ""}`;
      const query = new URLSearchParams(item).toString();
      const actions = hasDatetime
        ? `<a href="${pageUrl}" target="_blank">页面</a>`
        : `<a href="?${query}">详情</a> | <a href="${pageUrl}" target="_blank">页面</a>`;
      return `<tr>${cells}<td>${actions}</td></tr>`;
    })
    .join("");
}

/**
 * 错误提示
 */
function renderError(msg) {
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");
  const cols = head.querySelectorAll("th").length || 1;
  body.innerHTML = `<tr><td colspan="${cols}" style="text-align:center;">${msg}</td></tr>`;
}
