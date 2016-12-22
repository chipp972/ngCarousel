import 'babel-polyfill'
import angular from 'angular'
import ngRoute from 'angular-route'

import routing from './routes'
import ngCarousel from './ng-carousel'

const app = angular
.module('app', [
  ngRoute,
  ngCarousel.name
])
.config(routing)

angular.module('app')
.component('app', {
  template: `
  <h1>haha</h1>
  <carousel></carousel>
  `
})

export default app
