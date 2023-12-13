<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <li class="catalog__item">
            <router-link :to="{name: 'prod', params:{id: product.id}}" class="catalog__pic">
              <img :src="product.img" alt="Название товара">
            </router-link>>

            <h3 class="catalog__title">
              <router-link to="/">
                {{ product.title }}
              </router-link>
            </h3>

            <span class="catalog__price">
              {{ product.price }}
            </span>

            <ul class="colors colors--black" >
              <li class="colors__item" v-for="color in product.colors" :key="color.colorId">
                <label class="colors__label">
                  <input class="colors__radio sr-only" name="1" type="radio" :value="color.colorId" >
                  <span class="colors__value" :style="{backgroundColor: color.colorcode}">
                  </span>
                </label>
              </li>
            </ul>
          </li>
</template>
<script>
import categoriesColor from '@/data/categoriesColor';

export default
{
  data() {
    return {
      categoriesColor,
    };
  },
  props: ['product'],

};
</script>
