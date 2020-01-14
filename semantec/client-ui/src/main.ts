import 'semantic-ui/dist/semantic.min.js'
import 'semantic-ui-riot'
import { Route, Router } from '@riotjs/route'
import { mount, register } from 'riot'

import { UserInfo } from './share-classes'

// plagins
import './plugins/riot-class-names-plugin'
import './plugins/riot-style-attributes-plugin'
import './plugins/riot-uid-plugin'
import './plugins/riot-observable-plugin'
import './plugins/riot-i18n-plugin'

// application
import '../app/contents/layout/marcia/app'

//Component
import I18nRiotLet from '../modules/i18n-let/i18n-let.riot'

import 'semantic-ui/dist/semantic.min.css'
import '../modules/marcia-ui.css'
import '../modules/images/anchor16.png'
import '../modules/images/anchor32.png'
import '../modules/images/anchor48.png'

//global component register
register('g-router', Router)
register('g-route', Route)
register('i18n-let', I18nRiotLet)

const userInfo: UserInfo = {
  id: 'U0000000100',
  role: 'shipper',
  countryCode: 'en',
  lastLogin: Date.now(),
  details: {}
}
mount('#marcia-app', { userInfo }, 'smr-marcia')
