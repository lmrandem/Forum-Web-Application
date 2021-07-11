'use strict';

import App from './utils/App';
import MainLayout from './layout/MainLayout';

// router.route('/', /* middleware/redirect/auth layer, */ HomePage);

/*
// User auth
router.route('/login', LoginPage);
router.route('/register', RegisterPage);

// Posts
router.route('/posts', PostsPage);
router.route('/posts/new', PostFormPage);
router.route('/posts/:id', PostPage);
router.route('/posts/:id/edit', PostFormPage);
*/

const root = document.getElementById('app');
const app = new App(root);

const component = new MainLayout(app);

app.start(component);
