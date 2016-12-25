export default function (module) {
  module.component('carouselselect', {
    bindings: {
      onSelect: '&'
    },
    template: `
      <div class="w3-row">
        <select class="w3-select w3-border w3-content"
          ng-model="$ctrl.selectedCarousel"
          ng-change="$ctrl.changeHandler()"
          ng-options="option.name for option in $ctrl.carouselList track by option._id">
          <option value="" selected disabled>Choose a carousel</option>
        </select>
      </div>
    `,
    controller: ['$http',
      function CarouselSelectController ($http) {
        this.$onInit = function () {
          $http.get(`/api/carousel`)
          .then((response) => {
            this.carouselList = response.data
          }, (errResponse) => {
            this.carouselList = {}
          })
        }

        this.changeHandler = function () {
          this.onSelect({ carousel: this.selectedCarousel})
        }
      }
    ]
  })
}
