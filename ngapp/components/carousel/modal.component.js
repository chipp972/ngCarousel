export default function (module) {
  module.component('carouselmodal', {
    template: `
      <div ng-style="$ctrl.modalStyle" class="w3-modal">
        <div class="w3-modal-content">
          <div class="w3-container">
            <span
              ng-click="$ctrl.hideModal()"
              class="w3-closebtn">&times;
            </span>
            <span>{{$ctrl.content._id.title}}</span>
            <p>{{$ctrl.content._id.body}}</p>
            <span>{{$ctrl.content._id.reference}}</span>
          </div>
        </div>
      </div>
    `,
    controller: function CarouselModalController ($scope) {
      const self = this
      this.modalStyle = { display: 'none' }
      this.content = {}

      $scope.$on('showModal', function (event, content) {
        self.modalStyle = { display: 'block' }
        self.content = content
      })

      this.hideModal = function () {
        this.modalStyle = { display: 'none' }
      }
    }
  })
}
