import riot from 'riot';
interface ConversionMixin extends riot.TagMixin {
  conversion: {
    toBoolean(data: string): boolean;
    toDateFormat(str: string, delimiter: string): string;
    contains(str: string, key: string): boolean;
  }
}

export const conversionMixin: ConversionMixin = {
  conversion: {
    toBoolean(data: string): boolean {
      const test = data || 'false';
      return test.toLowerCase() === 'true';
    },
    toDateFormat(str: string, delimiter: string): string {
      return str.substr(0, 4) + delimiter + str.substr(4, 2) + delimiter + str.substr(6, 2);
    },
    contains(str: string, key: string): boolean {
      return str.indexOf(key) !== -1;
    }
  }
}
riot.mixin('conversion', conversionMixin);