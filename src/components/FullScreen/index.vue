<template>
  <div style="margin: 0 10px">
    <svg-icon
      iconClass="fullscreen"
      className="fullscreen"
      @click="onScreenFull"
    />
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "FullScreen",
  data() {
    return {};
  },

  created() {},

  methods: {
    onScreenFull() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fullscreen {
  font-size: 28px;
  display: flex;
}
</style>
