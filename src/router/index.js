/* eslint-disable no-unused-vars */
import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import BasketPage from '@/pages/BasketPage.vue';
import FormPay from '@/pages/FormPay.vue';
import CheckComp from '@/pages/CheckComp.vue';

const routes = [
  {
    name: 'home',
    component: MainPage,
    path: '/',
  },
  {
    name: 'BasketPage',
    component: BasketPage,
    path: '/Basket',
  },
  {
    path: '/404', name: 'NotFound', component: NotFoundPage,
  },
  {
    path: '/:catchAll(.*)', redirect: '404',
  },
  {
    name: 'prod',
    component: ProductPage,
    path: '/prod/:id',
  },
  {
    name: 'form',
    component: FormPay,
    path: '/pay',
  },
  {
    name: 'check',
    component: CheckComp,
    path: '/check/:id',
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
