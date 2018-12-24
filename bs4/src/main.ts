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


import '../modules';
import '../demo';
import './blue-validator';
import './blue-conversion';

// import "../tags/datatables.tag";
// import "../tags/flatpickr.tag";

// import "../tags/main.tag";
// import "../tags/repeat.tag";

riot.mount('content', 'workspace');
route.start(true);
