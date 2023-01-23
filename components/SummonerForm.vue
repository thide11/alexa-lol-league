<template>
  <div id="summoner-form">
    <input type="text" v-model="nick" :placeholder="$t('SUMMONER_FIELD_PLACEHOLDER')" id="nickname"/>
    <select name="select" v-model="selectedRegion" id="region">
      <option value="">{{$t("REGION")}}</option>
      <option v-for="region in regions" :value="region">
        {{region}}
      </option>
    </select>
    <div style="flex: 0 0 100%; height: 10px;"></div>
    <span style="color: red">{{errorMessage}}</span>
    <div style="flex: 0 0 100%"></div>
    <span style="color: green">{{sucessMessage}}</span>
    <div style="flex: 0 0 100%; height: 10px;"></div>
    <div id="league-button" @click="$emit('change-nickname', {nick, selectedRegion})">
      <LoadingIndicator v-if="isSaving"></LoadingIndicator>
      <div v-else-if="showButton">
        <!-- <img src="~/assets/images/challanger.png" id="challanger-logo"> -->
        <!-- <object data="~/assets/images/close-icon.svg" type="image/svg+xml"></object> -->
        <img src="~/assets/images/confirm-button-cancel.png" id="logout-button-container" :alt="$t('LOGOUT')" @click="logout">
        <div>
          <!-- <div id="logout-button-container"> -->
            <!-- <img src="~/assets/images/close-icon.svg"> -->
            <!-- </div> -->
          <div id="play-button-container">
            <span>{{buttonLabel}}</span>
          </div>
          <img src="~/assets/images/play-button-click-area.png" id="play-button">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      buttonLabel: {
        type: String,
        default: "Save"
      },
      showButton: {
        type: Boolean,
        default: true,
      },
      isSaving: {
        type: Boolean,
        default: false
      },
      errorMessage: {
        type: String,
        default: ""
      },
      sucessMessage: {
        type: String,
        default: ""
      },
      baseNickname: {
        type: String,
        default: ""
      },
      baseRegion: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        nick: this.baseNickname,
        selectedRegion: this.baseRegion,
        regions: [
          "BR1", 
          "EUN1",
          "EUW1",
          "JP1",
          "KR",
          "LA1",
          "LA2",
          "NA1",
          "OC1",
          "TR1",
          "RU",
        ]
      }
    },
    methods: {
      submit: function (event) {
        console.log("submit!")
        this.loading = true;
      },
      logout: function (event) {
        localStorage.removeItem("jwt");
        this.$router.go("/");
      }
    }
  }
</script>