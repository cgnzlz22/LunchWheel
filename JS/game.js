var colors = ["gold","yellow","greenyellow","limegreen","teal","mediumblue","darkslateblue",
				"darkmagenta","mediumvioletred","red","tomato","orange"];

var places = ["Five Guys","PotBellys","Yummy Pho","Garlic Crush","Zeke's Pizza","Qdoba",
					"Sunny Teriyaki","Panera","Feed Co","Chipotle","Jack n the Box","Jimmy Johns"];

var startAngle = 0;
var arc = Math.PI / 6;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

//create wheel within canvas
function drawLunchWheel() {
  var canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var insideRadius = 0;
    var textRadius = 140;
   
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
   
   //set font type, slice outline/shadow and fill
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = 0;
    ctx.font = 'bold 16px Arial';
   
    for(var i = 0; i < 12; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[i];
      ctx.shadowBlur = 20;
      ctx.shadowColor = "darkslateblue";

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, false);
      ctx.stroke();
      ctx.fill();
    //create fill text properties and placement/angle
      ctx.save();
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 7;
      ctx.shadowColor = "cyan";
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2);
      var text = places[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }
    //creat pointer
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "black";
    ctx.fillStyle = "honeydew";
    ctx.beginPath();
    ctx.lineTo(250 + 15, 250 - (outsideRadius + 15));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 25));5
    ctx.lineTo(250 - 15, 250 - (outsideRadius + 15));
    ctx.fill();
  }
}
//set spin and rpm
function spin() {
	spinAngleStart = Math.random() * 10 + 10;
	spinTime = 0;
	spinTimeTotal = Math.random() * 3 + 4 * 3000;
	rotateWheel();
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
		drawLunchWheel();
		spinTimeout = setTimeout('rotateWheel()', 15);
}

function stopRotateWheel(){
	clearTimeout(spinTimeout);
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

//Checking to see if checkboxes were recognizing actual text that was checked. Remove once verified
// $(function(){
// $('input[type=checkbox]').on('change', function() {
//     console.log($(this).val());
// });
// });

$("#remove").click(function(e) {
  $("input:checked").parent("li").remove();
  e.preventDefault();
});


drawLunchWheel();


//  function reDrawWheel() {
//  var unSelectedBoxes = input:"checked",
//   for(var unSelectedBox) {
//     $("input:checked").parent("li").remove();
// }
//   if(var i = 0; i < 12; i++) {
//       var angle = startAngle + i * arc;
//       ctx.fillStyle = colors[i];;
//   }
// else {
//   (var i = 0; i < 12; i++) {
//       var angle = startAngle + i * arc;
//       ctx.fillStyle = colors[i];
//       ctx.shadowBlur = 20;
//       ctx.shadowColor = "darkslateblue";
//     }
//   }
//  }



















