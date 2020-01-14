import _ from 'lodash/fp'
import { RiotComponent } from 'riot'
import { template } from '../../../../src/riot-ts-decorator'
import { Menu, UserInfo } from '../../../../src/share-classes'

import Marcia from './app.riot'
import { ja } from '../../../lang/ja'
import { en } from '../../../lang/en'

const languages = {
  ja,
  en
}

interface MarciaComponentProps {
  userInfo: UserInfo;
}

interface MarciaComponentState {
  userInfo?: UserInfo;
  loggedIn: string;
  countryCode: string;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any, fp/no-class*/
const $$ = $ as any

@template(Marcia)
export class MarciaClass {
  onBeforeMount(this: RiotComponent<MarciaComponentProps, MarciaComponentState>) {
    const state = this.state as MarciaComponentState
    state.userInfo = this.props.userInfo
    state.countryCode = this.props.userInfo.countryCode
    state.loggedIn = (state.userInfo) ? 'navbar.logout' : 'navbar.login'
    this.i18n.changeLanguage(state.countryCode)
    this.i18n.loads(languages)
  }
  onMounted(this: RiotComponent<MarciaComponentProps, MarciaComponentState>) {
    const state = this.state as MarciaComponentState

    $$('.ui.accordion').accordion({ exclusive: true })
    $$('.ui.sidebar').sidebar('setting', { transition: 'overlay' })
    $$('.ui.language.dropdown').dropdown()
    this.languageSet('.language.dropdown > .text')

    $('.ui.language.dropdown').change(
      () => {
        state.countryCode = this.languageSet('.language.dropdown > .text')
        this.i18n.changeLanguage(state.countryCode)
        this.update()
      }
    )
    $('#hamburger').click(() => { $$('.ui.sidebar').sidebar('toggle') })
    $('#logged-in').click(() => { this.showLogin(this) })
  }
  languageSet(selector: string): string {
    const countryCode = $('input[name=language-name').val()
    const fullName = $(`.language.dropdown .item[data-value='${countryCode}']`).eq(0).text()
    $(selector).html(fullName)
    return (countryCode as any)
  }
  findMenu(): Menu {
    return {
      navbar: [],
      sidebar: [
        {
          title: 'メニュー',
          type: 'dropdown',
          menu: [
            {
              label: 'ボイス',
              item: [
                {
                  label: '登録',
                  href: '#'
                },
                {
                  label: '照会',
                  href: '#'
                },
                {
                  label: '更新',
                  href: '#'
                }
              ]
            },
            {
              label: '書類',
              item: [
                {
                  label: '登録',
                  href: '#'
                },
                {
                  label: '照会',
                  href: '#'
                },
                {
                  label: '更新',
                  href: '#'
                }
              ]
            },
            {
              label: 'リスト',
              item: [
                {
                  label: '登録',
                  href: '#'
                },
                {
                  label: '照会',
                  href: '#'
                },
                {
                  label: '更新',
                  href: '#'
                }
              ]
            }
          ]
        },
        {
          type: 'divider'
        }
      ]
    }
  }
  showSidebar(this: RiotComponent<MarciaComponentProps, MarciaComponentState>) {
    $$('.ui.sidebar').sidebar('toggle')
  }
  showLogin(this: RiotComponent<MarciaComponentProps, MarciaComponentState>): void {
    const state = this.state as MarciaComponentState
    if (this.$('.logout')) {
      this.state = _.omit('userInfo', state)
      state.loggedIn = 'navbar.login'
      this.update({ loggedIn: state.loggedIn })
    } else {
      const eventId = `${this.uid}-show`
      this.obs.trigger(eventId)
      state.loggedIn = 'navbar.logout'
    }
  }
  buttonFace(this: RiotComponent<MarciaComponentProps, MarciaComponentState>) {
    const state = this.state as MarciaComponentState
    return this.classNames(
      {
        ui: true,
        primary: !(state.userInfo),
        orange: (state.userInfo),
        login: !(state.userInfo),
        logout: (state.userInfo),
        button: true
      }
    )
  }
}

export default Marcia
