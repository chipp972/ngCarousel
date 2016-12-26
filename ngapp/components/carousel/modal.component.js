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
            <div ng-show="$ctrl.edit">
              <input
                class="w3-input" ng-model="$ctrl.content._id.title"
                type="text" placeholder="Title"
                maxlength="50" required/>
              <textarea
                class="w3-input" ng-model="$ctrl.content._id.body" type="text"
                placeholder="Body"
                maxlength="750" rows="10">
              </textarea>
              <input class="w3-input" ng-model="$ctrl.content._id.reference" type="text"
                placeholder="Reference"
                minlength="10" maxlength="10" required/>
              <br />
              <button class="w3-btn w3-green" ng-click="$ctrl.save()">Save</button>
              <button class="w3-btn w3-orange" ng-click="$ctrl.hideModal()">Cancel</button>
            </div>
            <div ng-show="!$ctrl.edit">
              <span>{{$ctrl.content._id.title}}</span>
              <p>{{$ctrl.content._id.body}}</p>
              <span>{{$ctrl.content._id.reference}}</span>
            </div>
            <br />
          </div>
        </div>
      </div>
    `,
    controller: ['$http', '$scope',
      function CarouselModalController ($http, $scope) {
        const self = this
        this.modalStyle = { display: 'none' }
        this.content = { _id: {} }
        this.edit = false

        $scope.$on('showModal', function (event, content) {
          self.modalStyle = { display: 'block' }
          self.content = content
          self.edit = false
        })

        $scope.$on('showEditModal', function (event, content) {
          self.modalStyle = { display: 'block' }
          if (content) { self.content = content }
          self.edit = true
        })

        this.hideModal = function () {
          this.modalStyle = { display: 'none' }
        }

        this.save = function () {
          if (this.content._id._id) {
            $http({
              method: `PUT`,
              url: `/api/content/${this.content._id._id}`,
              data: this.content._id
            })
            .then((response) => {
              console.log(response)
              this.modalStyle = { display: 'none' }
            }, (errResponse) => {
              $scope.$emit('error', errResponse)
              console.log(errResponse)
            })
          } else {
            $http({
              method: `POST`,
              url: `/api/content`,
              data: this.content._id
            })
            .then((response) => {
              console.log(response)
              this.modalStyle = { display: 'none' }
              // add the content to the current carousel
            }, (errResponse) => {
              $scope.$emit('error', errResponse)
              console.log(errResponse)
            })
          }
        }
      }
    ]
  })
}
