<script setup>
  const route = useRoute();
  const originIsFromAlexa = route?.query?.origin == "alexa";
  const state = route?.query?.state;
  const showTutorial = originIsFromAlexa
  const userFromAlexa = originIsFromAlexa
  
  const appConfig = useRuntimeConfig()
</script>
<template>
  <div class="base">
    <div>
      <Header></Header>
      <Tutorial v-if="showTutorial"></Tutorial>
      <AppForm :redirect-to-alexa="userFromAlexa" :state="state"></AppForm>
    </div>
    <div class="footer">
      V {{ appConfig.public.version }}
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
}
.base {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  text-align: right;
  padding: 10px;
  position: relative;
  bottom: 0px;
  left: 0px;
}
</style>