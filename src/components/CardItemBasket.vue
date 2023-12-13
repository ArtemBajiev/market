<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
      <li class="cart__item product">
              <div class="product__pic">
                <img :src="item.product.image.file.url" width="120" height="120" alt="Название товара">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>
              <!-- <p class="product__info">
                Объем: <span>128GB</span>
              </p> -->
              <span class="product__code">
                Артикул {{ item.product.id }}
              </span>

              <div class="product__counter form__counter">
                <button  aria-label="Убрать один товар" >
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text"  name="count" v-model.Number="dataQuant" @input="updateQuantet">

                <button type="button" aria-label="Добавить один товар" >
                  <svg width="10" height="10" fill="currentColor" >
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{ item.product.price * item.quantity }}
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click="delProdBask(item.product.id)">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
                123
              </button>
            </li>
</template>
<script>
export default {
  props: ['item'],
  data() {
    return {
      dataQuant: this.item.quantity,
    };
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateAmount', { id: this.item.id, amount: value });
      },
    },
  },
  methods: {
    delProdBask(id) {
      this.$store.dispatch('delProdBask', id);
    },
    updateQuantet() {
      this.$store.commit('updateQuant', { quant: parseInt(this.dataQuant, 10), id: this.item.product.id });
    },
  },
};
</script>
