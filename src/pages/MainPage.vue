<!-- eslint-disable no-return-assign -->
<!-- eslint-disable max-len -->
<template>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>

      <div class="content__catalog">
        <ProductFilter v-model:priceFrom="filterPriceFrom" v-model:priceTo="filterPriceTo" v-model:categoriesId="filterCategoryId" v-model:color="filterColor" />
        <section class="catalog">
          <div class="loading" v-show="ProductsLoad"><div class="kub"><div class="napoln"></div></div> <div><br><strong>Загрузка . . .</strong> </div></div>
          <div v-show="ProductLoadingFail">Сломалось</div>
          <ProductList :products="products" @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"/>
          <BasePagination v-model:page="page" :count="countProducts" :per-page="productsPerPage"/>
        </section>
      </div>
    </main>
  </template>

<script>

import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
  components: {
    ProductList, BasePagination, ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      ProductData: null,
      page: 1,
      productsPerPage: 4,
      ProductsLoad: true,
      ProductLoadingFail: false,
    };
  },
  computed: {

    products() {
      return this.ProductData ? this.ProductData.items.map((product) => ({
        ...product,
        img: product.image.file.url,
      }))
        : [];
    },
    countProducts() {
      return this.ProductData ? this.ProductData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.ProductsLoad = true;
      this.ProductLoadingFail = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${this.$store.state.URL__DATA}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
        // eslint-disable-next-line no-return-assign
          .then((response) => this.ProductData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.ProductLoadingFail = true)
          // eslint-disable-next-line no-undef, no-return-assign
          .then(() => this.ProductsLoad = false);
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
      console.log('pidr');
    },
    productsPerPage() {
      this.loadProducts();
      console.log('pidr');
    },
    filterCategoryId() {
      this.loadProducts();
      console.log('pidr');
    },
    filterPriceFrom() {
      this.loadProducts();
      console.log('pidr');
    },
    filterPriceTo() {
      this.loadProducts();
      console.log('pidr');
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
<style>
.loading{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.kub{
  height: 50px;
  width: 50px;
  color: transparent;
  border: 4px solid rgb(202, 202, 202);
  border-radius: 10px;
  overflow: hidden;
  animation-name: load;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: normal;
}
.napoln{
  height: 40%;
  width: 100%;
  background-color: rgba(0, 0, 255, 0.658);
  transform: scaleY();
  animation-name: napoln;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  position: absolute;
  bottom: 0px;
}
@keyframes load{
  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
@keyframes napoln{
  0%{
    transform: rotate(0deg) scaleX(2) ;
  }
  40%{
    transform: rotate(-170deg) scaleX(2) scaleY(3) translateY(80%);
    border-radius: 50%;
  }
  50%{
    transform: rotate(-170deg) scaleX(2) scaleY(3) translateY(15px);
    border-radius: 40%;
  }
  100%{
    transform: rotate(-363deg) scaleX(2);
  }
}

</style>
