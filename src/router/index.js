import Router from 'vue-router';
import Home from '@/containers/Home';
import Auth from '@/containers/Auth';
import ResourceDetails from '@/containers/ResourceDetails';
import { isLogged } from '@/auth';

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true, progress: false },
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: { requiresAuth: false, progress: true },
    },
    {
      path: '/details/:type/:id/',
      name: 'resource-details',
      component: ResourceDetails,
      meta: { requiresAuth: true, progress: false },
      props: true,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isLogged()) {
    next({ path: '/auth' });
    return;
  }

  next();
});

export default router;
