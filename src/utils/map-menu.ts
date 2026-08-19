import type { RouteRecordRaw } from 'vue-router'
import type { IMenu } from '@/service/main/types'

export interface IMenuRouteMap {
  routes: RouteRecordRaw[]
  firstRoute?: RouteRecordRaw
}

export interface IBreadcrumbItem {
  name: string
  path: string
}

interface IRouteModule {
  default: RouteRecordRaw
}

function loadLocalRoutes() {
  const modules = import.meta.glob<IRouteModule>('../router/main/**/*.ts', { eager: true })
  return Object.values(modules).map((module) => module.default)
}

function getChildren(menu: IMenu) {
  return menu.children ?? []
}

function findFirstPagePath(menus: IMenu[]): string | undefined {
  for (const menu of menus) {
    if (menu.type === 2 && menu.url) return menu.url

    const firstChildPath = findFirstPagePath(getChildren(menu))
    if (firstChildPath) return firstChildPath
  }
}

function findMenuPath(menus: IMenu[], path: string, parents: IMenu[] = []): IMenu[] | undefined {
  for (const menu of menus) {
    const currentPath = [...parents, menu]
    if (menu.url === path) return currentPath

    const matchedPath = findMenuPath(getChildren(menu), path, currentPath)
    if (matchedPath) return matchedPath
  }
}

/**
 * 映射菜单到路由
 * @param menus 菜单
 * @returns 路由
 */
export function mapMenuToRoutes(menus: IMenu[]): IMenuRouteMap {
  const localRoutes = loadLocalRoutes()
  const localRouteMap = new Map(localRoutes.map((route) => [route.path, route]))
  const finalRoutes: RouteRecordRaw[] = []
  let firstRoute: RouteRecordRaw | undefined

  function collectRoutes(menuList: IMenu[]) {
    for (const menu of menuList) {
      if (menu.type === 2) {
        const route = localRouteMap.get(menu.url)
        if (route) {
          finalRoutes.push(route)
          firstRoute ??= route
        }
      } else {
        const children = getChildren(menu)
        const redirect = menu.type === 1 ? findFirstPagePath(children) : undefined
        if (redirect) {
          finalRoutes.push({ path: menu.url, redirect })
        }
        collectRoutes(children)
      }
    }
  }

  collectRoutes(menus)

  return { routes: finalRoutes, firstRoute }
}

export function mapPathToBreadcrumbs(menus: IMenu[], path: string): IBreadcrumbItem[] {
  return (findMenuPath(menus, path) ?? []).map((menu) => ({
    name: menu.name,
    path: menu.url
  }))
}

export function mapPathToMenu(menus: IMenu[], path: string): IMenu | undefined {
  const matchedPath = findMenuPath(menus, path)
  return matchedPath?.at(-1)
}

export function mapMenuToIds(menus: IMenu[]): number[] {
  const ids: number[] = []
  function collectIds(menusList: IMenu[]) {
    for (const menu of menusList) {
      const children = getChildren(menu)
      if (children.length) {
        collectIds(children)
      } else {
        ids.push(menu.id)
      }
    }
  }
  collectIds(menus)
  return ids
}

export function mapMenuToPermissions(menus: IMenu[]): string[] {
  const permissions: string[] = []
  function collectPermissions(menuList: IMenu[]) {
    for (const menu of menuList) {
      const children = getChildren(menu)
      if (children.length) {
        collectPermissions(children)
      } else if (menu.permission) {
        permissions.push(menu.permission)
      }
    }
  }
  collectPermissions(menus)
  return permissions
}

/** @deprecated Use mapMenuToPermissions instead. */
export const mapMenuToPersssions = mapMenuToPermissions
