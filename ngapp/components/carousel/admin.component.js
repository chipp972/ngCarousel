export default function (module) {
  module.component('carouseladmin', {
    bindings: {
      carousel: '<'
    },
    template: `
      <carouselselect on-select="$ctrl.onSelect(carousel)"></carouselselect>
      <div
        ng-repeat="item in $ctrl.selectedCarousel.items"
        class="w3-card">
        <div class="w3-row">
          <div class="w3-col m3 w3-center">
            <button
              class="w3-btn w3-khaki"
              ng-click="$ctrl.upItem(item)">
              <i class="material-icons">arrow_upward</i>
            </button>
            <button
              class="w3-btn w3-khaki"
              ng-click="$ctrl.downItem(item)">
              <i class="material-icons">arrow_downward</i>
            </button>
          </div>
          <div class="w3-col m2 w3-center">{{ item.position }}</div>
          <div class="w3-col m4 w3-center">{{ item._id.reference }}</div>
          <div class="w3-col m3 w3-center">
            <button
              class="w3-btn w3-teal"
              ng-click="$ctrl.editItem(item)">
              <i class="material-icons">edit</i>
            </button>
            <button
              class="w3-btn w3-yellow"
              ng-click="$ctrl.showModal(item)">
              <i class="material-icons">visibility</i>
            </button>
            <button
              class="w3-btn w3-red"
              ng-click="$ctrl.deleteItem(item)">
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
      <button
        class="w3-btn w3-green"
        ng-show="$ctrl.selectedCarousel"
        ng-click="$ctrl.addItem()">
        Add an item
      </button>
      <button
        class="w3-btn w3-indigo"
        ng-click="$ctrl.addCarousel()">
        Create a carousel
      </button>
      <carouselmodal></carouselmodal>
      <p>{{ $ctrl.selectedCarousel }}</p>
    `,
    controller: ['$http', '$scope',
      function CarouselAdminController ($http, $scope) {
        this.selectedCarousel = null
        this.$onInit = function () {}

        this.onSelect = function (carousel) {
          this.selectedCarousel = carousel
        }

        this.showModal = function (content) {
          $scope.$broadcast('showModal', content)
        }

        this.addItem = function () {

        }

        this.upItem = function (item) {
          let position1 = item.position - 1
          const position2 = item.position
          if (position1 < 0) {
            position1 = this.selectedCarousel.items.length - 1
          }
          this.selectedCarousel.items = this.selectedCarousel.items.map((item) => {
            if (item.position === position2) {
              item.position = position1
            } else if (item.position === position1) {
              item.position = position2
            }
            return item
          })
        }

        this.downItem = function (item) {

        }
      }
    ]
  })
}