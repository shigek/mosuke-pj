import demo from './demo';
import settings from './settings';
import dashbord from './dashbord';

const action = [
  { name: 'demo', module: demo },
  { name: 'settings', module: settings },
  { name: 'blank', module: demo },
  { name: 'dashbord.1', module: dashbord }
]
export = action;