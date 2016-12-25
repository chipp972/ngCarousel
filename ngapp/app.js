import 'babel-polyfill'
import angular from 'angular'
import ngRoute from 'angular-route'

// config
import routing from './routes'

// custom modules
import Carousel from './components/carousel/carousel.module'
import Sidebar from './components/sidebar/sidebar.module'

const app = angular
.module('app', [
  ngRoute,
  Carousel.name,
  Sidebar.name
])
.config(routing)

export default app
