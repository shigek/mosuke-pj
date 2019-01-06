import riot from 'riot';
import i18n from 'riot-i18nlet';
const riotI18nlet = i18n.init();

interface I18nRiotMixin extends riot.TagMixin {
  lang: {
    loads(dic:any): any;
    setLanguage(lang: string): void;
    getLanguage(): string;
    i18n(): any;
  }
}

export const i18nRiotMixin: I18nRiotMixin = {
  init() {

  },
  lang: {
    loads(dic:any): any {
      riotI18nlet.loads(dic);
    },
    setLanguage(lang: string): void {
      riotI18nlet.settings.currentLangage = lang;
    },
    getLanguage(): string {
      return riotI18nlet.settings.currentLangage;
    },
    i18n(): any {
      return riotI18nlet;
    }
  }
}
riot.mixin('lang', i18nRiotMixin);
