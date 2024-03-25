var stars = [];
let planetsData;
let planetNames = ["soleil", "mercure", "venus", "terre", "mars", "jupiter", "saturne", "uranus", "neptune"];
let soleil, mercure, venus, terre, mars, jupiter, saturne, uranus, neptune;
let hoverSound;
var api = 'https://api.le-systeme-solaire.net/rest/bodies/';
var url;
let info;

let dataFetched = false;

function preload() {
  soleil = loadImage("assets/sun.png");
  mercure = loadImage("assets/mercury.png");
  venus = loadImage("assets/venus.png");
  terre = loadImage("assets/earth.png");
  mars = loadImage("assets/mars.png");
  jupiter = loadImage("assets/jupiter.png");
  saturne = loadImage("assets/saturn.png");
  uranus = loadImage("assets/uranus.png");
  neptune = loadImage("assets/neptune.png");

  hoverSound = loadSound("assets/hover.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(30);
  

  for (var i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }
}

function gotData(data) {
  planetsData = data;
  // console.log(planetsData);
}

function draw() {
  background(30);

  for (var i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
  // scale(0.75,0.75);

  push()
  noFill();
  strokeWeight(1);
  stroke(255);
  ellipseMode(CORNER);
  ellipse(-547, 51, 756);
  ellipse(-547, -26, 875);
  ellipse(-605, -93, 1045);
  ellipse(-584, -155, 1168);
  ellipse(-500, -207, 1288);
  ellipse(-555, -331, 1537);
  ellipse(-719, -500, 1927);
  ellipse(-600, -544, 1970);
  pop()

  image(soleil, -149, 205, 285, 285);
  image(mercure, 185, 412, 49, 49);
  image(venus, 274, 272, 89, 89);
  image(terre, 370, 473, 105, 105);
  image(mars, 519, 243, 110, 110);
  image(jupiter, 646, 529, 200, 200);
  image(saturne, 861, 114, 200, 250);
  image(uranus, 1052, 640, 225, 215);
  image(neptune, 1268, 147, 127, 127);

  checkMouseOverPlanet(-149, 205, 285, 285, planetNames[0], soleil); // Soleil
  checkMouseOverPlanet(185, 412, 49, 49, planetNames[1], mercure);    // Mercure
  checkMouseOverPlanet(274, 272, 89, 89, planetNames[2], venus);    // Vénus
  checkMouseOverPlanet(370, 473, 105, 105, planetNames[3], terre);   // Terre
  checkMouseOverPlanet(519, 243, 110, 110, planetNames[4], mars);   // Mars
  checkMouseOverPlanet(646, 529, 200, 200, planetNames[5], jupiter);   // Jupiter
  checkMouseOverPlanet(861, 114, 200, 250, planetNames[6], saturne);   // Saturne
  checkMouseOverPlanet(1052, 640, 225, 215, planetNames[7], uranus);  // Uranus
  checkMouseOverPlanet(1268, 147, 127, 127, planetNames[8], neptune);  // Neptune

  
  // hoverSound.stop();



}

function checkMouseOverPlanet(x, y, w, h, planetName,img) {
  if ((mouseX > x && mouseX < x + w) && (mouseY > y && mouseY < y + h)) {
    hoverSound.rate(map(w, 0, 200, 1, 1.3));
    hoverSound.play();
    if (!dataFetched) {
      url = api + planetName;
      loadJSON(url, gotData);
      dataFetched = true; // Set the flag to true once data is fetched
    }
    console.log("Mouse over " + planetName);

    // Scale up the hovered planet
    w *= 1.25;
    h *= 1.25;
    image(img,x-(w/8),y-(h/8),w,h);

    // Display planet information in the pop-up
    if (planetsData) {
      push()
      fill(255,255,255,180);
      rect(mouseX, mouseY - 60, 280, 180,10);
      textFont('Space Mono');
      textStyle(BOLD);
      textAlign(CENTER);
      textSize(26);
      fill(0);
      // Testing code incase of IP bannings down here
      // text("Sun",mouseX+140,mouseY-20);
      text(planetsData.englishName, mouseX + 140, mouseY - 20);
      textSize(16);
      textStyle(NORMAL);
      // Testing code incase of IP bannings down here
      // let info = `Radius: 10km \n Mass: 456^54kg \n Volume: 45^4 km3 \n Orbit: 365AU \n Rotation: 24hours`;
      info = `Radius: ${planetsData.meanRadius} km\nMass: ${planetsData.mass.massValue} ${planetsData.mass.massExponent} kg\nOrbit: ${planetsData.semimajorAxis} AU\nRotation: ${planetsData.sideralRotation} hours`;
      text(info, mouseX + 140, mouseY+10);
      pop()
    }
      
    else{
      // push()
      fill(255,255,255,180);
      rect(mouseX, mouseY - 60, 280, 180,10);
      textFont('Space Mono');
      textStyle(BOLD);
      textAlign(CENTER);
      textSize(26);
      fill(0);
      // text("Earth",mouseX+140,mouseY-20);
      textSize(16);

      // let info = `Radius: 10km \n Mass: 456^54kg \n Volume: 45^4 km3 \n Orbit: 365AU \n Rotation: 24hours`;
      text(info, mouseX + 140, mouseY+10);
      text(`API is loading, \n comeback in 10 minutes`,mouseX+140,mouseY-20);
      fill(255);
      // pop()
    }
  } else {
    hoverSound.stop();
    dataFetched = false;
    info = '';
    // console.log("Mouse out");
  }
  info = '';

}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(0.25, 3);
    this.t = random(TAU);
  }

  draw() {
    fill(255);

    this.t += 0.1; // Adjust the speed of twinkling
    var scale = this.size + sin(this.t) ;
    noStroke();
    ellipse(this.x, this.y, scale, scale);
  }
}