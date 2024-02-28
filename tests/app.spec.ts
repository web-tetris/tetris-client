import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import { h } from 'vue'
import App from '@/App.vue'
import { RouteName } from '@/shared/consts/route-name'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: h('div') },
    ...Object.values(RouteName)
      .map(name => ({
        name,
        path: `/${name.toLowerCase()}`,
        component: h('div'),
      })),
  ],
})

describe('App', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = mount(App, { global: { plugins: [router] } })
    await router.isReady()
  })

  it('should be visible', () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })
})
