<template>
  <div>
    <div id="amazon-root"></div>
    <a href="dqwedwe" @click.prevent="login" v-if="showButton">
      <img border="0" :alt="$t('TITLE')" src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png" width="156" height="32" />
    </a>
  </div>
</template>


<script>
  function configureAmazonSdk(constants) {  
    window.onAmazonLoginReady = function () {
      amazon.Login.setClientId(constants.clientId);
    };
    
    (function (d) {
      var a = d.createElement('script'); a.type = 'text/javascript';
      a.async = true; a.id = 'amazon-login-sdk';
      a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
      d.getElementById('amazon-root').appendChild(a);
    })(document);
  }

  async function getConstants() {
    const response = await fetch("/api/constants");
    const json = await response.json();
    return json;
  }
  export default {
    props: {
      redirectToAlexa: {
        type: Boolean,
        default: false
      },
    },
    data: function() {
      return {
        showButton: true,
        constants: {},
      }
    },
    beforeMount: async function() {
      this.constants = await getConstants();
      await configureAmazonSdk(this.constants)
    },
    methods: {
      login: function(event) {
        this.showButton = false;
        const options = {}
        options.popup = false;
        options.scope = 'profile:user_id';
        options.response_type = 'code';
        if(this.state) {
          options.state = this.state;
        }
        amazon.Login.authorize(
          options,
          this.constants.redirectUri,
        );
      }
    }
  }
</script>