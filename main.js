Status = "";
objects = [];
video = "";

function preload() {
    video = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (Status != "") {
        objectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects dectected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects dectected are : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status : Decting Objects";
}

function modelloaded() {
    console.log("I am loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}