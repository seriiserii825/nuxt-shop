<template lang="pug">
  .popup.popup--530
    .popup__overlay(@click="closePopup")
    .popup__content
      .popup__close(@click="closePopup")
        svg(width='17', height='18', viewbox='0 0 17 18', fill='none', xmlns='http://www.w3.org/2000/svg')
          line(x1='1.06066', y1='1.93934', x2='15.2028', y2='16.0815', stroke='#1467a4', stroke-width='3')
          line(x1='15.2032', y1='2.06066', x2='1.0611', y2='16.2028', stroke='#1467a4', stroke-width='3')
      ul
        li
          a(href="https://blupoint.bludelego.it/" target="_blank")
            img(src="/bluepoint.jpg" alt="bluepoint")
        li
          a(href="http://wt.blupoint.ml/" target="_blank")
            img(src="/worktime.jpg" alt="worktime")
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$store.dispatch('popup/setHeaderPopup', false)
    }
  }
}
</script>

<style lang="scss">

</style>