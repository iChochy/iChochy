// API 基础地址
const API_BASE_URL = "https://api.ichochy.com/data/";

// 页面加载时执行
window.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    const query = window.location.search;
    const url = `${API_BASE_URL}${query}`;
    await fetchData(url);
}

/**
 * 从 API 获取数据
 * @param {string} url 请求的完整 URL
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`网络响应失败: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.meta || !data.data) {
            throw new Error('返回数据格式错误');
        }

        renderTable(data);
    } catch (error) {
        console.error('获取数据失败:', error);
        renderError('数据加载失败');
    }
}

/**
 * 渲染表格
 * @param {Object} data API 返回的数据
 */
function renderTable(data) {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');

    // 清空表格内容
    tableHead.textContent = '';
    tableBody.textContent = '';

    const hasDatetime = data.meta.some(m => m.name === 'datetime');

    // === 生成表头 ===
    const headerRow = document.createElement('tr');
    for (const { name } of data.meta) {
        const th = document.createElement('th');
        th.textContent = name.toUpperCase();
        headerRow.appendChild(th);
    }

    // 操作列
    const actionTh = document.createElement('th');
    actionTh.textContent = "操作";
    headerRow.appendChild(actionTh);
    tableHead.appendChild(headerRow);

    // === 生成表体 ===
    for (const item of data.data) {
        const row = document.createElement('tr');

        // 数据列
        for (const { name } of data.meta) {
            const td = document.createElement('td');
            td.textContent = decodeURIComponent(item[name] ?? '');
            row.appendChild(td);
        }

        // 操作列
        const actionTd = document.createElement('td');
        const queryString = new URLSearchParams(item).toString();
        const pageUrl = `https://${item.host}${item.path ?? ''}`;
        const actions = hasDatetime
            ? `<a href="${pageUrl}" target="_blank">页面</a>`
            : `<a href="?${queryString}">详情</a> | <a href="${pageUrl}" target="_blank">页面</a>`;

        actionTd.innerHTML = actions;
        row.appendChild(actionTd);

        tableBody.appendChild(row);
    }
}

/**
 * 渲染错误信息
 * @param {string} message 错误提示
 */
function renderError(message) {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');

    // 计算当前表头列数（包括“操作”列）
    const columnCount = tableHead.querySelectorAll('th').length || 1;

    tableBody.innerHTML = `
        <tr>
            <td colspan="${columnCount}" style="text-align:center;">${message}</td>
        </tr>
    `;
}
