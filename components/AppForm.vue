<template>
  <div style="text-align: center">
    <template v-if="authStatusProcessed">
      <SummonerForm 
        @change-nickname="changeNickname" :is-saving="isSaving" :error-message="errorMessage" :sucess-message="sucessMessage"
        :base-nickname="baseNickname" :base-region="baseRegion"
        :show-button="showButton"
        :button-label="redirectToAlexa ? $t('SAVE_AND_REDIRECT') : $t('SAVE')"
        v-if="isAuthenticated"
      >
      </SummonerForm>
      <AmazonLoginButton v-else :redirect-to-alexa="redirectToAlexa"></AmazonLoginButton>
      <h2>{{url}}</h2>
    </template>
    <LoadingIndicator v-else></LoadingIndicator>
  </div>
</template>

<script>
  async function getLoggedUserData(jwt) {
    const response = await fetch(`/api/leagueData?jwt=${jwt}`);
    const json = await response.json();
    return json;
  }

  async function saveLoggedUserData(jwt, data) {
    const response = await fetch(`/api/leagueData?jwt=${jwt}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await response.json();
    return json;
  }

  export default {
    props: {
      redirectToAlexa: {
        type: Boolean,
        default: false
      },
      state: {
        type: String,
      },
    },
    data: function() {
      return {
        showButton: true,
        authStatusProcessed: false,
        isAuthenticated: false,
        baseNickname: "",
        baseRegion: "",
        errorMessage: "",
        sucessMessage: "",
        isSaving: false,
        url: "",
        countDownTimeLeft: 5,
      }
    },
    computed: {
      jwt: function() {
        return localStorage.getItem("jwt");
      },
    },
    mounted: async function() {
      console.log("Async data chamado")
      console.log(this.$route.query?.code);
      console.log(this.jwt);
      if(this.$route.query?.code != undefined && !this.jwt) {
        const { code } = this.$route.query;
        const response = await fetch("/api/exchangeCodeToJWT", {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: {
            "Content-type": "application/json"
          }
        })
        const data = await response.json();
        if(data.message) {
          this.errorMessage = data.message;
          this.showButton = false;
          
        } else if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
        }
      }
      this.loadAuthStatus();
    },
    watch: {
      countDownTimeLeft: {
        handler(value) {
          console.log(value);
            if (value > 0) {
              //Start lock
              if(value != 5) {
                this.sucessMessage = this.$t("SAVE_SUCCESS_REDIRECT") + " " + value;
                setTimeout(() => {
                    this.countDownTimeLeft--;
                }, 1000);
              }
            } else {
              this.makeAlexaRedirect();
            }
        },
      }
    },
    methods: {
      makeAlexaRedirect: function() {
        const redirectUrl = localStorage.getItem("redirect_uri");
        const state = localStorage.getItem("state");
        console.log("Recebido do local storage a url de redirecionamento:")
        console.log(redirectUrl)
        const urlRedirect = `${this.$route.query.redirect_uri ?? redirectUrl}&access_token=${this.jwt}&token_type=Bearer&state=${this.$route.query.state ?? state}`;
        localStorage.removeItem("redirect_uri")
        localStorage.removeItem("state")
        console.log("Final:")
        console.log(urlRedirect)
        this.url = urlRedirect;
        window.location = urlRedirect;
      },
      countDownTimer: function() {
        this.countDownTimeLeft--;
      },
      loadAuthStatus: async function() {
        const jwt = localStorage.getItem("jwt");
        if(jwt) {
          const data = await getLoggedUserData(jwt);
          // if(data.nickname && this.redirectToAlexa) {
          //   this.makeAlexaRedirect();
          //   return;
          // }
          this.baseNickname = data.nickname;
          this.baseRegion = data.region;
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
        this.authStatusProcessed = true;
      },
      changeNickname: async function(formData) {
        console.log(formData)
        this.isSaving = true;
        this.errorMessage = "";
        this.sucessMessage = "";
        const jwt = localStorage.getItem("jwt");
        const data = await getLoggedUserData(jwt);
        console.log(formData);
        data.nickname = formData.nick;
        data.region = formData.selectedRegion;
        const response = await saveLoggedUserData(jwt, data);
        this.isSaving = false;
        if(response.code || response.message) {
          this.errorMessage = this.$t(response.code) || response.message;
        } else {
          if(this.redirectToAlexa) {
            this.showButton = false,
            this.countDownTimer();
          } else {
            this.sucessMessage = this.$t("SUMMONER_NICKNAME_SAVED");
          }
        }
      },
    }
  }
</script>