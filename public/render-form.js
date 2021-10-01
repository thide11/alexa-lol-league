function renderForm(
  onButtonClick,
  nick, 
  selectedRegion
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
  $button.innerHTML = `
    <img src="assets/images/challanger.png" id="challanger-logo">
    <img src="assets/images/play-button-click-area.png" id="play-button">
    <span>SALVAR</span>
  `
  const $uiData = document.querySelector(
    "#ui-data"
  );
  $uiData.innerHTML = `
    <span id="error-indicator" style="color: red"></span>
    <div id="summoner-form">
      <input type="text" value="${nick}" placeholder="Type our summoner name..." id="nickname"/>
      <select name="select" id="region">
        <option value="">Region</option>
        ${regions.map((region) => 
          `<option value="${region}"${selectedRegion == region ? " selected" : ""}>
            ${region}
          </option>`
        )}
      </select>
    </div>
  `
  $uiData.appendChild($button)
}