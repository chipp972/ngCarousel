import angular from 'angular'

export default function (module) {
  module.component('carouselslideshow', {
    transclude: true,
    bindings: {
      index: '@'
    },
    template:`
      <h1 class="w3-center">{{$ctrl.carousel.name}}</h1>
      <div
        ng-repeat="item in $ctrl.carousel.items"
        ng-hide="!$ctrl.isCurrentSlidePosition(item.position)"
        class="slide w3-card w3-content">
        <button ng-click="$ctrl.showModal(item)" class="w3-container">
          <span>{{item._id.title}}</span>
        </button>
      </div>
      <a class="w3-btn-floating w3-display-left" ng-click="$ctrl.carouselLeft()"><i class="material-icons">keyboard_arrow_left</i></a>
      <a class="w3-btn-floating w3-display-right" ng-click="$ctrl.carouselRight()"><i class="material-icons">keyboard_arrow_right</i></a>

      <carouselmodal></carouselmodal>
      `
    ,
    controller: ['$http', '$scope',
      function CarouselSlideshowController ($http, $scope) {
        this.currentPosition = 0
        this.size = 0

        this.$onInit = function () {
          $http.get(`/api/carousel`)
          .then((response) => {
            this.carousel = response.data[this.index]
            this.size = this.carousel.items.length
          }, (errResponse) => {
            this.carousel = {}
          })
        }

        this.isCurrentSlidePosition = function (position) {
          if (position === this.currentPosition)
            return true
          return false
        }

        this.carouselLeft = function () {
          this.currentPosition--
          if (this.currentPosition < 0) {
            this.currentPosition = this.size - 1
          }
        }

        this.carouselRight = function () {
          this.currentPosition++
          if (this.currentPosition >= this.size) {
            this.currentPosition = 0
          }
        }

        this.showModal = function (content) {
          $scope.$broadcast('showModal', content)
        }
      }
    ]
  })
}
