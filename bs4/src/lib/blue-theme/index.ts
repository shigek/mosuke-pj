import riot from 'riot';
let defaulTheme: string = 'dark-theme';
interface ThemeMixin extends riot.TagMixin {
  theme: {
    setTheme(theme: string): void;
    getTheme(): String;
  }
}

export const themeMixin: ThemeMixin = {
  init() {

  },
  theme: {
    setTheme(theme: string): void {
      defaulTheme = theme;
    },
    getTheme(): string {
      return defaulTheme;
    }
  }
}
riot.mixin('theme', themeMixin);
