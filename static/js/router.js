import Router from "./core/routing/Router.js";
const router = new Router('.container');
router.isProtect = !localStorage.getItem('login');
export default router;
//# sourceMappingURL=router.js.map