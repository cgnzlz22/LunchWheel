document.addEventListener('DOMContentLoaded', function() {

  selectTheme();

  var fastfoodTheme = '';
  var restaurantTheme = '';
  var themeSelectBox = document.getElementById('themeSelect');

  function selectTheme() {
  	document.getElementById('themeSelect').style.visibility = 'visible';
  	document.getElementById('submitTheme').addEventListener('click', setTheme);
  }
  function setTheme() {
  	var themeSelection = document.getElementsByName('theme')[0].checked;
  }
  function hideThemeSelect() {
  	themeSelectBox.style.visibility = 'hidden';
  }
  function setFastfoodTheme() {
  	fastfoodTheme = 'fastfoodTheme';
  	bodyCss.style.backgroundImage = "url('./Img/')";
  	hideThemeSelect();
  }
  function setRestaurantsTheme() {
  	restaurantTheme = 'restaurantTheme';
  	bodyCss.style.backgroundImage = "url('./Img/')";
  	hideThemeSelect();
  }

  function initializeBoard() { //redrawWheel function
  }
});
