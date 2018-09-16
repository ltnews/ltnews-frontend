<template>
  <section class="page-head">
    <h1 class="display-1 primary--text" v-text="title"></h1>
    <p v-text="subtitle"></p>
  </section>
</template>

<script>
  export default {
    name: 'PageHead',
    props: {
      title: {type: String, required: true},
      subtitle: {type: String, required: true}
    }
  }
</script>

<style scoped>
  .page-head {
    margin-bottom: 48px;
  }
  p.page-head {
    margin-top: 16px;
  }
</style>
