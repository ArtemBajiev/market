<!-- eslint-disable max-len -->
<template>
      <router-link  to="/Basket" class="header__cart"  aria-label="Корзина с товарами">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{ $store.getters.KolProd }}</span>
    </router-link>
</template>
<script>
export default
{

};
</script>
