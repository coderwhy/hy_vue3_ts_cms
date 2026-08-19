import { localCache } from '@/utils/cache'
import type { IMenu } from '@/service/login/types'
import { mapMenuToRoutes } from '@/utils/map-menu'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/notFound/not-found.vue')
    }
  ]
})

let firstRoute: RouteRecordRaw | undefined
const dynamicRouteNames = new Set<string>()

function getDynamicRouteName(route: RouteRecordRaw) {
  return `dynamic-${String(route.name ?? route.path)}`
}

export function resetDynamicRoutes() {
  for (const routeName of dynamicRouteNames) {
    if (router.hasRoute(routeName)) router.removeRoute(routeName)
  }

  dynamicRouteNames.clear()
  firstRoute = undefined
}

export function addRoutesWithMenu(menus: IMenu[]) {
  resetDynamicRoutes()
  const routeMap = mapMenuToRoutes(menus)
  firstRoute = routeMap.firstRoute

  for (const route of routeMap.routes) {
    const routeWithName = { ...route, name: getDynamicRouteName(route) }
    router.addRoute('main', routeWithName)
    dynamicRouteNames.add(routeWithName.name)
  }
}

router.beforeEach((to) => {
  const token = localCache.getCache<string>('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/login' && token) {
    return '/main'
  }
  if (to.path === '/main' && firstRoute) {
    return firstRoute.path
  }
})

export default router
