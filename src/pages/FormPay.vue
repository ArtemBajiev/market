<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div v-if="!post">
        <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="Order()">
        <div class="cart__field">
          <div class="cart__data">
            <FormInput :name="'ФИО'" :error="formError.name">
              <input class="form__input" type="text" name="name" placeholder="Введите ваше полное имя" v-model="formData.name">
            </FormInput>

            <FormInput :name="'Адрес'" :error="formError.address">
              <input class="form__input" type="text" name="address" placeholder="Введите ваш адрес" v-model="formData.address">
            </FormInput>

            <FormInput :name="'Телефон'" :error="formError.phone">
              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон" v-model="formData.phone">
            </FormInput>

            <FormInput :name="'Email'" :error="formError.email">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email" v-model="formData.email">
            </FormInput>

            <FormInput :name="'Коментарий'">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания" v-model="formData.comment"></textarea>
            </FormInput>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in $store.state.cartProductsData" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.price }}</b>
              <span>{{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
    </div>
    <div >Заказ оформлен <br>
    Состав заказа: <br>
    <span v-for="item in post" :key="item.id">{{ item.data.basket.items.product.title }}<br></span>
    </div>
</template>
<script>
import FormInput from '@/components/FormInpun.vue';
import axios from 'axios';

export default {
  components: { FormInput },
  data() {
    return {
      formData: {

      },
      formError: {},
      post: null,
    };
  },
  methods: {
    Order() {
      axios.post(`${this.$store.state.URL__DATA}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userKey,
        },
      })
        .catch((error) => {
          this.formError = error.response.data.error.message || {};
        })
        .then(
          (response) => {
            this.$router.push({ name: 'check', params: { id: `${response.data.id}` } });
            this.$store.commit('clearBasket');
          },
        );
    },
  },
};
</script>
<style lang="scss">

</style>
