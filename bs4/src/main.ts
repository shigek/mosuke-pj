import riot from 'riot';
import route from 'riot-route';
import 'riot-i18n';

import 'bootstrap';
import 'datatables.net/js/jquery.dataTables.min.js';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';

import 'datatables.net-responsive/js/dataTables.responsive.min.js';
import 'datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js';

import 'datatables.net-select/js/dataTables.select.min.js';
import 'datatables.net-select-bs4/js/select.bootstrap4.min.js';
import 'flatpickr/dist/flatpickr.js';
import 'gasparesganga-jquery-loading-overlay/dist/loadingoverlay.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_orange.css';
import '../fontawesome5.2.0/css/all.min.css'
import '../modules/work/css/workspace.css'
import '../modules/navbar-top/css/navbar-top.css'
import '../modules/scroll-sidebar/css/scroll-sidebar.css'

import './lib/blue-notify';
import './lib/blue-i18n';
import './lib/blue-validator';
import './lib/blue-conversion';
import './lib/blue-theme';
import './lib/blue-ui';

import '../modules';
import '../demo';

riot.mount('menu', 'scroll-sidebar');
riot.mount('navbar-top', 'navbar-top');
riot.mount('guidance', 'guidance');

route('/navbar/*', (name) => {
  console.log("aa")
  riot.mount('main', 'workspace', { action: name });
});

route('/sidemenu/*/*', (menu, submenu) => {
  console.log("bb")
  riot.mount('main', 'workspace', { action: menu + '.' + submenu });
});

route('/*', (name) => {
  console.log("cc")
  riot.mount('main', 'workspace', { action: name });
});

route('/', () => {
  console.log("dd")
  riot.mount('main', 'workspace', { action: 'blank' });
});
route.start(true);
