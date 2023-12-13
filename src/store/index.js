/* eslint-disable max-len */
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    cartProducts:
    [
      { id: 1, amount: 1 },
    ],
    URL__DATA: 'https://vue-study.skillbox.cc',
    userKey: null,
    cartProductsData: [],
    checkData: null,
  },
  getters: {
    totalPrice(state) {
      return state.cartProductsData.reduce((prev, item) => prev + (item.price * item.quantity), 0);
    },
    KolProd(state) {
      return state.cartProductsData.length;
    },
  },
  mutations: {
    clearBasket(state) {
      state.cartProductsData = [];
    },
    checkDataUpdate(state, data) {
      state.checkData = data.data;
    },
    addProductToCart(state, payload) {
      const item = state.cartProducts.find((elem) => elem.id === payload.id);
      if (item !== undefined) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push(payload);
      }
    },
    updateAmount(state, { id, amount }) {
      const item = state.cartProducts.find((elem) => elem.id === id);
      if (item) {
        item.amount = amount;
      }
    },
    delProdBask(state, id) {
      state.cartProducts = state.cartProducts.filter((item) => item.id !== id);
    },
    updateUserKey(state, item) {
      state.userKey = item;
    },
    updateCardProductsData(state, item) {
      state.cartProductsData = item;
    },
    updateQuant(state, { quant, id }) {
      // eslint-disable-next-line no-unused-vars
      const item = state.cartProductsData.find((elem) => elem.product.id === id);
      if (quant) {
        item.quantity = quant;
      }
    },
  },
  actions: {
    loadCart(context) {
      axios.get(`${this.state.URL__DATA}/api/baskets`, {
        params: {
          userAccessKey: context.state.userKey,
        },
      })
        // eslint-disable-next-line no-return-assign
        .then((response) => {
          if (!context.state.userKey) {
            localStorage.setItem('userAccesKey', response.data.user.accessKey);
            context.commit('updateUserKey', response.data.user.accessKey);
          }

          context.commit('updateCardProductsData', response.data.items);
        });
    },
    addProductBask(context, { id, amount }) {
      axios.post(`${this.state.URL__DATA}/api/baskets/products`, {
        productId: id,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userKey,
        },
      }).then((response) => {
        context.commit('updateCardProductsData', response.data.items);
      });
    },
    // eslint-disable-next-line no-unused-vars
    delProdBask(context, id) {
      axios.delete(
        `${this.state.URL__DATA}/api/baskets/products`,
        {
          params: {
            userAccessKey: context.state.userKey,

          },
          data: {
            productId: id,
          },
        },
      ).then((response) => {
        context.commit('updateCardProductsData', response.data.items);
      });
    },
  },
  modules: {
  },
});
