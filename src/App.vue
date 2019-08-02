<template>
  <div id="app">
    <div class="view-container">
      <div class="view-wrapper">
        <transition name="default">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'ralewayregular';
}
.view-container {
  z-index: 1000;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url('../public/imgs/wallpaper-blur.jpg');
  background-size: cover;
  padding: 0 auto;
}
.view-wrapper {
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  min-width: 400px;
  max-width: 400px;
}
.main-container {
    min-height: 100vh;
    min-width: 100%;
}
.default-enter-active, .default-leave-active {
  transition: opacity 1s;
}
.default-enter, .default-leave-to {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
