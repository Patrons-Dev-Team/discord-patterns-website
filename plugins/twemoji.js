import Vue from 'vue'
import twemoji from 'twemoji'

Vue.directive('emoji', {
  inserted(el) {
    el.innerHTML = twemoji.parse(el.innerHTML)
  }
})
