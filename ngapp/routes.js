
export default ['$locationProvider', '$routeProvider',
  function routing ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!')

    $routeProvider
    .when('/', {
      template: `
        <sidebarblue title="Home"></sidebarblue>
        <div class="w3-container">
          <carouselslideshow index="0"></carouselslideshow>
        </div>
      `
    })
    .when('/admin', {
      template: `
        <sidebarblue title="Admin"></sidebarblue>
        <div class="w3-container">
          <carouseladmin></carouseladmin>
        </div>
      `
    })
    .otherwise('/')
  }
]
