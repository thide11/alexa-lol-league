<template>
  <div>
    <Header></Header>
    <Tutorial v-if="showTutorial"></Tutorial>
    <AppForm :redirect-to-alexa="userFromAlexa" :state="state"></AppForm>
  </div>
</template>

<script>
  export default {
    asyncData: function ({route, params}) {
      const originIsFromAlexa = route?.query?.origin == "alexa";
      const state = route?.query?.state;
      return {
        showTutorial: originIsFromAlexa,
        userFromAlexa: originIsFromAlexa || state,
        state: state,
      }
    },
  }
</script>