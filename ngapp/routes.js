export default ['$locationProvider', '$routeProvider',
  function routing ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!')

    $routeProvider
    .when('/', {
      templateUrl: 'layout/home.html'
    })
    .when('/admin', {
      templateUrl: 'layout/admin.html'
    })
    .otherwise('/')
  }
]
