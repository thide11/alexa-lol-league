function getSubmitButtonHtml(title) {
  return `
    <img src="assets/images/challanger.png" id="challanger-logo">
    <img src="assets/images/play-button-click-area.png" id="play-button">
    <span>${title}</span>
  `
}

function renderForm(
  onButtonClick,
  nick, 
  selectedRegion,
  translationPack
) {
  const regions = [
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

  const $button = document.createElement('div');
  $button.id = "league-button"
  $button.addEventListener('click', onButtonClick);
  $button.innerHTML = getSubmitButtonHtml(translationPack["SAVE"]);
  const $uiData = document.querySelector(
    "#ui-data"
  );
  $uiData.innerHTML = `
    <div id="summoner-form">
      <input type="text" value="${nick}" placeholder="${translationPack["SUMMONER_FIELD_PLACEHOLDER"]}" id="nickname"/>
      <select name="select" id="region">
        <option value="">${translationPack["REGION"]}</option>
        ${regions.map((region) => 
          `<option value="${region}"${selectedRegion == region ? " selected" : ""}>
            ${region}
          </option>`
        )}
      </select>
      <div style="flex: 0 0 100%; height: 10px;"></div>
      <span id="error-indicator" style="color: red"></span>
      <div style="flex: 0 0 100%"></div>
      <span id="sucess-indicator" style="color: green"></span>
    </div>
  `
  $uiData.appendChild($button)
}