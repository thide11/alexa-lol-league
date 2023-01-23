<template>
  <header>
    <div id="logos">
      <img src="~/assets/images/alexa.png">
    </div>
    <h1 style="text-align: center; color: #CDBE91;">{{$t('TITLE')}}</h1>
  </header>
</template>

<script>
  export default {
    props: [
      "translationPack"
    ]
  }
</script>