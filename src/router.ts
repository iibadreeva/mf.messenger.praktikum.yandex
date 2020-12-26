import Router from './core/routing/Router';

const router = new Router('.container');
router.isProtect = !localStorage.getItem('login');

export default router;
