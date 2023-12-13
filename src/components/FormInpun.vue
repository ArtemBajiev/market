<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <label class="form__label" for="name">
        <slot></slot>
        <span class="form__value">{{ name }}</span>
        <span class="form__error">{{ error }}</span>
    </label>
</template>
<script>
export default {
  props: ['name', 'error'],
};
</script>
<style lang="scss">

</style>
