import route from 'riot-route';

import "../tag/auth.tag";
import "../tag/header.tag";
import "../tag/home.tag";

//import "../tag/footer.tag";

riot.mount('header', 'header');
//riot.mount('footer', 'footer');

route('/', function () {
    riot.mount('content', 'home');
});
route('/signin', function () {
    riot.mount('content', 'auth', { type: 'signin' });
});
route('/signup', function () {
    riot.mount('content', 'auth', { type: 'signup' });
});

route.start(true);
