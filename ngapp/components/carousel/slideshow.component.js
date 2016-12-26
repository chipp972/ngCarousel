import angular from 'angular'

export default function (module) {
  module.component('carouselslideshow', {
    transclude: true,
    bindings: {
      index: '@'
    },
    template:`
      <h1 class="w3-center">{{$ctrl.carousel.name}}</h1>
      <br />
      <div class="w3-panel w3-display-container">
        <div
          ng-repeat="item in $ctrl.carousel.items"
          ng-hide="!$ctrl.isCurrentSlidePosition(item.position)">
          <div class="w3-card w3-padding-large w3-margin-large w3-display-bottommiddle" ng-click="$ctrl.showModal(item)">
            <span>{{item._id.title}}</span>
          </div>
        </div>
        <a class="w3-btn w3-display-left" ng-click="$ctrl.carouselLeft()"><i class="material-icons">keyboard_arrow_left</i></a>
        <a class="w3-btn w3-display-right" ng-click="$ctrl.carouselRight()"><i class="material-icons">keyboard_arrow_right</i></a>
        <ul class="w3-display-topmiddle w3-pagination">
          <li ng-repeat="item in $ctrl.carousel.items">
            <a
              href=""
              ng-click="$ctrl.setPosition(item.position)"
              ng-class="$ctrl.setPaginationStyle(item.position)">
              {{ item.position + 1 }}
            </a>
          </li>
        </ul>
      </div>
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
          return (position === this.currentPosition)
        }

        this.setPosition = function (position) {
          this.currentPosition = position
        }

        this.setPaginationStyle = function (position) {
          return { 'w3-black': position === this.currentPosition }
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
