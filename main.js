function preload() {
  classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
  canvas = createCanvas(500, 500);
  canvas.center();
  background("#ffffffd7");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
}

function draw() {
  strokeWeight(5);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function clearcanvas() {
  background("#ffffffd7");
}
function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("object_name").innerHTML = results[0].label;
    percent = Math.round(results[0].confidence * 100);
    console.log(percent);
    document.getElementById("accuracy").innerHTML = percent.toFixed(2) + " %";
    spEech = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(spEech);
  }
}
