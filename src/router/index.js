import Router from 'vue-router'
import Foo from '@/views/foo.vue'
import Bar from '@/views/bar.vue'
import Vue from 'vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar
        }
      ]
    }
  ]
})