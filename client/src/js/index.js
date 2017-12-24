import route from 'riot-route';
var $ = require('jquery')
$.fn.transition = require('semantic-ui-transition');

import "../tag/auth.tag";
import "../tag/header.tag";
import "../tag/home.tag";
import "../tag/inquire";
import "../tag/guidance";
import "../tag/dimmer.tag";

//import "../tag/footer.tag";


riot.mount('header', 'header');
riot.mount('guidance', 'guidance');
//riot.mount('footer', 'footer');

route('/', function () {
    riot.mount('content', 'home');
});

route('/signin', function() {
    riot.mount('content', 'auth', { type: 'signin' });
});

route('/signup', function () {
    riot.mount('content', 'auth', { type: 'signup' });
});

route('/inquire', function () {
    riot.mount('content', 'inquire', { method:"post", url:"/service/" });
});

route.start(true);
