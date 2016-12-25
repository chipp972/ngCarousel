import angular from 'angular'

/**
 * create a sidebar component for the module with the same name
 */
export default function (module) {
  module.component('sidebarblue', {
    bindings: {
      title: '@'
    },
    template:`
      <nav>
        <ul class="w3-navbar w3-blue w3-border w3-xlarge">
          <li ng-class="$ctrl.homeClass"><a href="/">Home</a></li>
          <li ng-class="$ctrl.adminClass"><a href="#!/admin">Admin</a></li>
        </ul>
      </nav>
    `,
    controller: function SidebarController () {
      this.$onInit = function () {
        this.homeClass = { 'w3-black': this.title === "Home" }
        this.adminClass = { 'w3-black': this.title === "Admin" }
      }
    }
  })
}
