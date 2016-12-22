import angular from 'angular'

const moduleName = 'carousel'

angular.module(moduleName, [])

export default angular
.module(moduleName)
.component(moduleName, {
  template: `
  <h1>hoho</h1>
  <h1>{{$ctrl.carousel.name}}</h1>
  <ul>
    <li ng-repeat="item in $ctrl.carousel.items">
      <span>{{item.title}}</span>
      <p>{{item.content}}</p>
      <span>{{item.reference}}</span>
    </li>
  </ul>`,
  controller: ['$http',
    function CarouselController ($http) {
      const self = this
      this.carousel = {}
      $http.get('/api/carousel')
      .then((response) => {
        self.carousel = response.data
        console.log(response.data)
      })
    }
  ]
})
