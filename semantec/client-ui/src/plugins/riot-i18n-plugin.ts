import { install } from 'riot'
import I18nlet from 'i18nlet'
import { AnyJson } from '../share-classes'

/* eslint-disable @typescript-eslint/no-explicit-any, fp/no-class */
class I18nRIot extends I18nlet {
  init(settings = {}): void {

    super.init(settings)
  }
  getMessage(context: string, vals?: AnyJson, options?: AnyJson): string {
    /* eslint-disable fp/no-let */
    let languageStore = this.store[this.currentLanguage()]
    if (!languageStore || Object.keys(languageStore).length === 0) {
      return context
    }
    //@@@ 今一
    const splitContext = context.split('.')
    if (splitContext.length > 0) {
      splitContext.forEach((v) => {
        if (v in languageStore) {
          languageStore = languageStore[v]
        }
      })
      return (!languageStore) ? context : languageStore
    }

    return this[this.settings.getMessageFunctionName](context, vals, options)
  }
  currentLanguage(): string {
    return super.currentLangage()
  }
  changeLanguage(language: string): string {
    return super.changeLangage(language)
  }
}
const i18nRiot = new I18nRIot()
i18nRiot.init()

install(function (component) {
  component.i18n = i18nRiot
  return component
})
