import 'semantic-ui/dist/semantic.min.js'
import 'semantic-ui-riot'
import { Route, Router } from '@riotjs/route'
import { component, register } from 'riot'

// plagins
import './plugins/riot-class-names-plugin'
import './plugins/riot-style-attributes-plugin'
import './plugins/riot-uid-plugin'
import './plugins/riot-observable-plugin'


// application
import Marcia from '../app/contents/layout/marcia/app.riot'
//Component

import 'semantic-ui/dist/semantic.min.css'
import '../modules/marcia-ui.css'
import '../modules/images/anchor16.png'
import '../modules/images/anchor32.png'
import '../modules/images/anchor48.png'

//global component register
register('g-router', Router)
register('g-route', Route)

// 直接マウント (arg1:element, arg2:initialProp)
// ログイン済みか済みでないかを検証する
// ログイン済みの場合はinitiaPropにログイン情報を渡す
export type MenuConfig = {
  id: string;
  role: string;
  lastLogin: number;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  details?: { [key: string]: any };
  /* eslint-enable */
}
const menuConfig: MenuConfig = {
  id: 'U0000000100',
  role: 'shipper',
  lastLogin: Date.now(),
  details: {}
}
component(Marcia)(document.getElementById('app') || document.body, { menuConfig })