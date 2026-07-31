/* global instantsearch */
const searchClient = algoliasearch('875NSIKC2I', 'aa40a713cbb523155d356e815496c34c');

const search = instantsearch({
  indexName: 'iChochy',
  searchClient,
});

var hitTemplate =
  '<article class="post">' +
  '<h2 class="post-title"><a href="{{url}}">{{{_highlightResult.title.value}}}</a></h2>' +
  '{{{_highlightResult.summary.value}}}' +
  '</article>';

var noResultsTemplate =
  '<div class="text-center">没有找到 <strong>{{query}}</strong> 相关的结果</div>';

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: '请输入搜索内容……',
    autofocus: true,
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
]);

search.start();
