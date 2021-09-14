<template lang="pug">
  #js-sandwitch-wrap.sandwitch-wrap
    .sandwitch(:class="{'sandwitch--active': active}")
      .sandwitch__line.sandwitch__line--top
      .sandwitch__line.sandwitch__line--middle
      .sandwitch__line.sandwitch__line--bottom
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/partials/variables";
.sandwitch-wrap {
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 18px 10px;
  border-radius: 3px;
  z-index: 1001;
}
.sandwitch {
  position: relative;
  display: block;
  width: 23px;
  height: 14px;
  cursor: pointer;
}
.sandwitch--active .sandwitch__line--top {
  top: 6px;
  transform: rotate(45deg);
}
.sandwitch--active .sandwitch__line--middle {
  opacity: 0;
}
.sandwitch--active .sandwitch__line--bottom {
  top: 6px;
  transform: rotate(-45deg);
}
.sandwitch__line {
  position: absolute;
  left: 0;
  display: block;
  width: 100%;
  height: 2px;
  transition: all linear 0.1s;
  background-color: $accent;
}
.sandwitch__line--top {
  top: 0;
}
.sandwitch__line--middle {
  top: 6px;
}
.sandwitch__line--bottom {
  top: 12px;
}
</style>
