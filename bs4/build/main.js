"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riot_1 = __importDefault(require("riot"));
const riot_route_1 = __importDefault(require("riot-route"));
require("riot-i18n");
require("bootstrap");
require("datatables.net/js/jquery.dataTables.min.js");
require("datatables.net-bs4/js/dataTables.bootstrap4.min.js");
require("datatables.net-responsive/js/dataTables.responsive.min.js");
require("datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js");
require("datatables.net-select/js/dataTables.select.min.js");
require("datatables.net-select-bs4/js/select.bootstrap4.min.js");
require("flatpickr/dist/flatpickr.js");
require("gasparesganga-jquery-loading-overlay/dist/loadingoverlay.min.js");
require("bootstrap/dist/css/bootstrap.min.css");
require("datatables.net-bs4/css/dataTables.bootstrap4.min.css");
require("datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css");
require("datatables.net-select-bs4/css/select.bootstrap4.min.css");
require("datatables.net-select-bs4/css/select.bootstrap4.min.css");
require("flatpickr/dist/flatpickr.css");
require("flatpickr/dist/themes/material_orange.css");
require("../fontawesome5.2.0/css/all.min.css");
require("../modules/work/css/workspace.css");
require("../modules/navbar-top/css/navbar-top.css");
require("../modules/scroll-sidebar/css/scroll-sidebar.css");
require("./lib/blue-notify");
require("./lib/blue-i18n");
require("./lib/blue-validator");
require("./lib/blue-conversion");
require("./lib/blue-theme");
require("./lib/blue-ui");
require("../modules");
require("../demo");
riot_1.default.mount('menu', 'scroll-sidebar');
riot_1.default.mount('navbar-top', 'navbar-top');
riot_1.default.mount('guidance', 'guidance');
riot_route_1.default('/navbar/*', (name) => {
    console.log("aa");
    riot_1.default.mount('main', 'workspace', { action: name });
});
riot_route_1.default('/sidemenu/*/*', (menu, submenu) => {
    console.log("bb");
    riot_1.default.mount('main', 'workspace', { action: menu + '.' + submenu });
});
riot_route_1.default('/*', (name) => {
    console.log("cc");
    riot_1.default.mount('main', 'workspace', { action: name });
});
riot_route_1.default('/', () => {
    console.log("dd");
    riot_1.default.mount('main', 'workspace', { action: 'blank' });
});
riot_route_1.default.start(true);
