/*
doc_search_zh_CN
*/

const translations  = {
  button: {
    buttonText: 'Search',
    buttonAriaLabel: 'Search',
  },
  modal: {
    searchBox: {
      resetButtonTitle: '清除查询',
      resetButtonAriaLabel: '清除查询',
      cancelButtonText: '取消',
      cancelButtonAriaLabel: '取消',
      searchInputLabel: 'Search',
    },
    startScreen: {
      recentSearchesTitle: '最近搜索',
      noRecentSearchesText: '最近没有搜索',
      saveRecentSearchButtonTitle: '保存这个搜索',
      removeRecentSearchButtonTitle: '从历史中删除这个搜索',
      favoriteSearchesTitle: '喜欢',
      removeFavoriteSearchButtonTitle: '从喜欢中删除这个搜索',
    },
    errorScreen: {
      titleText: '无法获取结果',
      helpText: '你可能需要检查你的网络',
    },
    footer: {
      selectText: '搜索',
      selectKeyAriaLabel: '输入关键字',
      navigateText: '导航',
      navigateUpKeyAriaLabel: '向上',
      navigateDownKeyAriaLabel: '向下',
      closeText: '关闭',
      closeKeyAriaLabel: '转义关键字',
      searchByText: 'Search by',
    },
    noResultsScreen: {
      noResultsText: '没有结果',
      suggestedQueryText: '尝试搜索',
      reportMissingResultsText: '相信这个查询应该返回结果?',
      reportMissingResultsLinkText: '让我们知道',
    },
  },
};

docsearch({
	appId: "NKR7XWIWN9",
	apiKey: "68adad999505e7dcb442fa41f391810c",
	indexName: "ichochy",
	placeholder: "Search",
	translations: translations,
	container: '#doc_search',
	debug: false
});