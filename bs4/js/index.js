"use strict";

import riot from 'riot'
import route from 'riot-route'

import 'bootstrap'
import 'datatables.net/js/jquery.dataTables.min.js'
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'

import "../tags/datatables.tag";

riot.mount('content', 'datatables');
route.start(true);
