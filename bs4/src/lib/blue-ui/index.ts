import riot from 'riot';
import biz from '../../biz'

class UiResource {
  constructor(name: string) {
    const a = biz.filter(biz => biz.name == name)[0]
    this._resource = a.module[name];
  }
  _resource: {[key: string]: any} 

  _getBody(): string {
    return this._resource.body;
  }
  _getHeader(): string {
    return this._resource.header;
  }
  _getFooter(): string {
    return this._resource.footer;
  }
}

interface UiMixin extends riot.TagMixin {
  ui: {
    loads(base: string, name: string): void;
    getBody(): string;
    getHeader(): string;
    getFooter(): string;
    resource: any
  },
}
export const uiMixin: UiMixin = {
  init() {
  },
  ui: {
    loads(name: string): void {
      this.resource.ui = new UiResource(name);
    },
    getHeader(): string {
      return this.resource.ui._getHeader();
    },
    getBody(): string {
      return this.resource.ui._getBody();
    },
    getFooter(): string {
      return this.resource.ui._getFooter();
    },
    resource: {}
  }
}
riot.mixin('ui', uiMixin);