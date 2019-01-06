import riot from 'riot';
const observable = riot.observable();
interface NotifyMixIn extends riot.TagMixin {
  notify: {
    on(event: string, callback: riot.ObservableCallback): any;
    one(event: string, callback: riot.ObservableCallback): any;
    off(event: string, callback: riot.ObservableCallback): any;
    trigger(event: string, ...args: any[]): any;
  }
}

export const notifyMixIn: NotifyMixIn = {
  notify: {
    on(event: string, callback: riot.ObservableCallback): any {
      return observable.on(event, callback);
    },
    one(event: string, callback: riot.ObservableCallback): any {
      return observable.one(event, callback);
    },
    off(event: string, callback: riot.ObservableCallback): any {
      return observable.off(event, callback);
    },
    trigger(event: string, ...args: any[]): any {
      return observable.trigger(event, ...args);
    }
  }
}
riot.mixin('notify', notifyMixIn);
