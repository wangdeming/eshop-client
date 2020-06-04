import Vue from 'vue'
import logic from '@/logic'
import {router} from '@/router'
var PopupConstructor = Vue.extend(require('./m-popup.vue').default)

let getAnInstance = () => {
  return new PopupConstructor({
    el: document.createElement('div')
  })
}

let instance = getAnInstance()

instance.close = () => {
  if (instance.$el.parentNode) {
    instance.$el.parentNode.removeChild(instance.$el)
    logic.commit('common/CLEAR_POPUP')
    logic.dispatch('common/getcartnum')
  }
}

let mPopup = (options, render) => {
  instance.mask = options ? options.mask : false
  if (render) {
    instance.expand = render
  }
  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    logic.commit('common/ADD_POPUP', instance);
    instance.init();
		var p = instance.$children[0].$el.getElementsByClassName('temp');
		for (var i=0;i<p.length;i++) {
			p[i].classList.remove("spanHover");
		}
  })
  return instance
}

export default mPopup
