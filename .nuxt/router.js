import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _17d8534e = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _00201006 = () => interopDefault(import('..\\pages\\students\\index.vue' /* webpackChunkName: "pages_students_index" */))
const _55ef7433 = () => interopDefault(import('..\\pages\\req\\human.vue' /* webpackChunkName: "pages_req_human" */))
const _13cbb11e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'hash',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _17d8534e,
      name: "about"
    }, {
      path: "/students",
      component: _00201006,
      name: "students"
    }, {
      path: "/req/human",
      component: _55ef7433,
      name: "req-human"
    }, {
      path: "/",
      component: _13cbb11e,
      name: "index"
    }],

    fallback: false
  })
}
