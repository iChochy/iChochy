// 使用 fetch 获取数据
const apiURL = "https://api.ichochy.com/data/"

async function fetchData(apiURL) {
    try {
        // 替换为实际的 API 地址
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('获取数据失败:', error);
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="3">数据加载失败</td></tr>';
    }
}

// 显示数据
function displayData(data) {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');
    tableHead.innerHTML = ''; // 清空表头
    tableBody.innerHTML = ''; // 清空表格内容

    // 动态生成表头
    const headerRow = document.createElement('tr');
    data.meta.forEach(metaItem => {
        const th = document.createElement('th');
        th.textContent = metaItem.name; // 使用 meta.name 作为表头
        headerRow.appendChild(th);
    });
    const th = document.createElement('th');
    th.textContent = "详情"; // 使用 meta.name 作为表头
    headerRow.appendChild(th);
    tableHead.appendChild(headerRow);

    // 动态生成表格数据
    data.data.forEach(item => {
        const bodyRow = document.createElement('tr');
        data.meta.forEach(metaItem => {
            const td = document.createElement('td');
            td.textContent = decodeURIComponent(item[metaItem.name]); // 使用 meta.name 作为键访问数据
            bodyRow.appendChild(td);
        });
        const detail = document.createElement('td');
        const queryString = new URLSearchParams(item).toString();
        detail.innerHTML  = `<a href=?${queryString}>查看详情</a>`
        bodyRow.appendChild(detail);
        tableBody.appendChild(bodyRow);
    });
}



function loadData() {
    const queryString = window.location.search
    const url = `${apiURL}${queryString}`;
    fetchData(url)
}


// 页面加载时调用
window.onload = loadData


