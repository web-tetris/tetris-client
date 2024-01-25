import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const homeRoute: RouteRecordRaw = {
  path: '/',
  name: RouteName.HOME,
  component: () => import('@/home/views/HomeView.vue'),
}
