import angular from 'angular'

import SlideshowComponent from './slideshow.component'
import SelectComponent from './select.component'
import AdminComponent from './admin.component'
import ModalComponent from './modal.component'

const CarouselModule = angular.module('carousel', [])

// add components to the module
SlideshowComponent(CarouselModule)
SelectComponent(CarouselModule)
AdminComponent(CarouselModule)
ModalComponent(CarouselModule)

export default CarouselModule
