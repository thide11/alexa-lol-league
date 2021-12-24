<template>
  <div>
    <Header></Header>
    <Tutorial v-if="userFromAlexa"></Tutorial>
    <AppForm :redirect-to-alexa="userFromAlexa"></AppForm>
  </div>
</template>

<script>
  export default {
    asyncData: function ({route, params}) {
      return {
        userFromAlexa: route?.query?.origin == "alexa" || route?.query?.state == "alexa",
      }
    },
  }
</script>