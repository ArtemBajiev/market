<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="filterActive()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price"
          v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price"  v-model.number="currentPriceTo" >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" >
          <select class="form__select" type="text" name="category"  v-model.number="currentcategoriesId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in categoriesColor" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" :value="color.id" v-model="currentColor">
              <span class="colors__value" :style="{backgroundColor: color.color}">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" >
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" >
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="filterOff()">
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import categoriesColor from '@/data/categoriesColor';
import axios from 'axios';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentcategoriesId: 0,
      currentColor: '',
      categoriesData: null,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoriesId', 'color'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : {};
    },
    categoriesColor() {
      return categoriesColor;
    },
  },
  methods: {
    filterActive() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoriesId', this.currentcategoriesId);
      this.$emit('update:color', this.currentColor);
    },
    filterOff() {
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentcategoriesId = 0;
      this.currentColor = '';
      this.filterActive();
    },
    getCategories() {
      axios.get(`${this.$store.state.URL__DATA}/api/productCategories`)
      // eslint-disable-next-line no-return-assign
        .then((response) => this.categoriesData = response.data);
    },
  },
  created() {
    this.getCategories();
  },

};
</script>
