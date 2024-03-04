import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

import App from '@/App.vue'

describe('App', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(App)
  })

  it('should be visible', () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })
})
