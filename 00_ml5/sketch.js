// camera object
let mCamera;

// model object
let mModel;

// array to keep track of detected "things"
let mDetected = [];

// start camera and create model
// where you put code where it will take time to load (e.g images, sound etc.)
function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  // hiding the HTML camera
  mCamera.hide();

  // toggle between face mesh and hand pose
  // mModel = ml5.faceMesh();
  mModel = ml5.handPose();
}

// when some "thing" is detected, just copy it to mDetected
function updateDetected(detected) {
  mDetected = detected;
  mModel.detect(mCamera, updateDetected);
}

function setup() {
  // create p5js canvas
  createCanvas(windowWidth, windowHeight);

  // run the model once on camera image
  mModel.detect(mCamera, updateDetected);
}

function draw() {
  background(180, 200, 255);
  image(mCamera, 0, 0);

  fill(0, 255, 0);
  noStroke();

  // draw a circle at every keypoint of each detected "thing"
  for (let dObj of mDetected) {
    for (let kpoint of dObj.keypoints) { // 468 points (?)
      circle(kpoint.x, kpoint.y, 8);
    }
  }
}
