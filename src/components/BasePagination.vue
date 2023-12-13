<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable max-len -->
<template>
  <ul class="catalog__pagination pagination">
     <li class="pagination__item">
       <a class="pagination__link pagination__link--arrow " href="#" aria-label="Предыдущая страница" @click.prevent="BackPage(page)"><!--pagination__link--disabled-->
         <svg width="8" height="14" fill="currentColor">
           <use xlink:href="#icon-arrow-left"></use>
         </svg>
       </a>
     </li>
     <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
       <a class="pagination__link " href="#" :class="{'pagination__link--current': pageNumber === page }" @click.prevent="paginate(pageNumber)">
         {{ pageNumber }}
       </a>
     </li>
     <li class="pagination__item">
       <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница" @click.prevent="NextPage(page)">
         <svg width="8" height="14" fill="currentColor">
           <use xlink:href="#icon-arrow-right"></use>
         </svg>
       </a>
     </li>
   </ul>
</template>
<script>
export default
{
  props: ['page', 'count', 'perPage'],
  emits: ['update:page'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('update:page', page);
    },
    NextPage(page) {
      this.$emit('update:page', page + 1);
    },
    BackPage(page) {
      this.$emit('update:page', page - 1);
    },

  },
};
</script>
