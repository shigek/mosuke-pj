import 'semantic-ui/dist/semantic.min.js'
import 'semantic-ui-riot'
import { Route, Router } from '@riotjs/route'
import { component, register } from 'riot'

import Marcia from '../app/contents/layout/marcia/app.riot'
import { MenuConfig } from './sidebar/sidebar'

/* eslint-disable sort-imports */
import 'semantic-ui/dist/semantic.min.css'
import '../modules/marcia-ui.css'

//global component register
register('g-router', Router)
register('g-route', Route)

// 直接マウント (arg1:element, arg2:initialProp)
// ログイン済みか済みでないかを検証する
// ログイン済みの場合はinitiaPropにログイン情報を渡す
const menuConfig: MenuConfig = {
  id: 'shipper',
  details: {}
}
component(Marcia)(document.getElementById('app') || document.body, { menuConfig })