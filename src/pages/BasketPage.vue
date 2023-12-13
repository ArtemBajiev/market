<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
     <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/" >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info" >
        {{ $store.getters.KolProd }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CardItemBasket v-for="product in $store.state.cartProductsData" :key="product.id" :item="product"></CardItemBasket>

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ $store.getters.totalPrice }}</span>
          </p>

          <router-link class="cart__button button button--primery" to="/Pay" type="submit">
          >Оформить заказ</router-link>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import CardItemBasket from '@/components/CardItemBasket.vue';

export default
{
  components: { CardItemBasket },
  computed: {
    products() {
      return this.$store.getters.cartDetailProducts;
    },
  },
};
</script>
