var colors = ["gold","yellow","greenyellow","limegreen","teal","mediumblue","darkslateblue",
        "darkmagenta","mediumvioletred","red","tomato","orange"];

var FFplaces = ["Five Guys","PotBellys","Yummy Pho","Garlic Crush","Zeke's Pizza","Qdoba",
          "Sunny Teriyaki","Popeye's","Feed Co","Chipotle","Jack n the Box","Jimmy Johns"];

var RSplaces = ["Cheesecake Factory","Red Robin","Blue C Sushi","Spaghetti Factory","PF Changs",
          "Thai Fusion Bistro","BJs Pizza & Brewery","Buffalo Wild Wings","The Melting Pot","Matador"];


var currentPlaces = [];
var startAngle = 0;
var arc = Math.PI / 6;
var spinTimeout = null;
var ticker;
var tickerPosition;
var tickerBounce;
var tickerUp = false;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
var fastfoodTheme = '';
var restaurantTheme = '';
var themeSelectBox = document.getElementById('themeSelect');
var backgroundImage = '';
var wheelofSound;
var spinmeSound;


//code that runs immediately
$(document).ready(function(){
  selectTheme();
  currentPlaces = (FFplaces).slice();
  // console.log(currentPlaces, "should be defined here");
  var canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  tickerPosition = {
    left: {x: 265, y: 12},
    right: {x: 250, y: 50},
    bottom: {x: 235, y: 12}
  }

  wheelofSound = document.getElementById("wheelof");
  wheelofSound.play();

  spinmeSound = document.getElementById("spinme");
  spinmeSound.play();

  reDrawWheel();
});

function selectTheme() {
  document.getElementById('themeSelect').style.visibility = 'visible';
  document.getElementById('submitTheme').addEventListener('click', setTheme);

function setTheme() {
    if (document.getElementsByName('theme')[0].checked){
      fastfoodTheme = 'fastfoodTheme';
      setPlaceTheme(FFplaces, "url('./Img/fastfood.png')");
    }else if(document.getElementsByName('theme')[1].checked){
      restaurantTheme = 'restaurantTheme';
      setPlaceTheme(RSplaces, "url('./Img/restaurant2.png')");
    }
  }
}
function setPlaceTheme(placesArray, backgroundImage){
    document.getElementsByTagName("body")[0].style.background = backgroundImage;
    currentPlaces = placesArray.slice();

    reDrawWheel();

    console.log(currentPlaces, "set fast food here");

    //Set the fastfood checkboxes
    //First remove what's already there
    document.getElementById("FFplaces").innerHTML = '';

    for(var i = 0; i < placesArray.length; i++){
      var newLi = document.createElement("li");
      var span = document.createElement("span");
      span.innerHTML = placesArray[i];
      var newInput = document.createElement("input");
      newInput.type = "checkbox";
      newInput.name = "FFplaces";
      newInput.value = placesArray[i];

      newLi.appendChild(newInput);
      newLi.appendChild(span);

      document.getElementById("FFplaces").appendChild(newLi);
    }
}

function hideThemeSelect() {
  themeSelectBox.style.visibility = 'hidden';
  console.log('I was called!!!')
}

//set spin and rpm
function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 3000;//start animation interval before calling rotate wheel
  tickerBounce = 12;
  ticker = setInterval(animateTicker, 150);
  rotateWheel();
  var notthatsimpleSound = document.getElementById("notthatsimple");
  notthatsimpleSound.play()
}

//set spin time and wheel roatation and stop
function rotateWheel(){
  spinTime += 30;
  if(spinTime >= spinTimeTotal){
    stopRotateWheel();
    return;
  }
    //set spin timeout
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    reDrawWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel(){
  clearTimeout(spinTimeout);
  clearInterval(ticker);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.restore();
}

//slow spinning down when wheel starts stopping
function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

$("#remove").click(function(e) {
  e.preventDefault();
  var uncheckedBoxes = $("input[type=checkbox]").not(":checked");
  $("input[type=checkbox]:checked").parent().remove();
  currentPlaces = [];

  var whatdoyouwantSound = document.getElementById("whatdoyouwant");
  whatdoyouwantSound.play()

  for(var i = 0; i < (uncheckedBoxes).length; i++){
    console.log(uncheckedBoxes[i].value);
    currentPlaces.push(uncheckedBoxes[i].value);
  }

  reDrawWheel(); //use currentPlaces to draw

});

function reDrawWheel() {
  // just code!!!
  ctx.clearRect(0,0,500,500);
  var outsideRadius = 230;
  var insideRadius = 0;
  var textRadius = 140;
  console.log(currentPlaces.length)
  for(var i = 0; i < currentPlaces.length; i++) {
    var arc = Math.PI / (currentPlaces.length / 2);
    var angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];
    ctx.shadowBlur = 15;
    ctx.shadowColor = "indigo";

    ctx.beginPath();
    ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
    ctx.arc(250, 250, insideRadius, angle + arc, angle, false);
    ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 9;
    ctx.shadowColor = "cyan";
    ctx.fillStyle = "white";
    ctx.font = 'bold 16px Arial';
    ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
      250 + Math.sin(angle + arc / 2) * textRadius);
    ctx.rotate(angle + arc / 2);
    var text = currentPlaces[i];
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  //creat ticker // move to animate ticker function
  ctx.shadowOffsetX = -3;
  ctx.shadowOffsetY = -1;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "black";
  ctx.fillStyle = "honeydew";
  ctx.beginPath();
  ctx.lineTo(tickerPosition.left.x, tickerPosition.left.y);
  ctx.lineTo(tickerPosition.right.x, tickerPosition.right.y);
  ctx.lineTo(tickerPosition.bottom.x, tickerPosition.bottom.y);
  ctx.fill();
}


function animateTicker(){
  // console.log("tick");

  if(tickerUp){
    tickerPosition.left.y += tickerBounce;
    tickerPosition.right.y += tickerBounce;
    tickerPosition.bottom.y += tickerBounce;
  }
  else {
    tickerPosition.left.y -= tickerBounce;
    tickerPosition.right.y -= tickerBounce;
    tickerPosition.bottom.y -= tickerBounce;
  }
  tickerUp = !tickerUp;
  tickerBounce -= 0.14;

  if(tickerBounce <= 0){
    tickerBounce = 0;
  }
}