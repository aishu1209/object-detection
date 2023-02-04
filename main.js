img = "";
status1 = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload(){
    img = loadImage('tree.jpg');

}

function draw(){
    image(video,0,0,380,380);


    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);

    objectDetector.detect(video,gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected is: " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x - 30, objects[i].y - 30, objects[i].width, objects[i].height);

        }
    }

}

function modelLoaded(){
    console.log("model has loaded");
    status1 = true;

}

function gotResult(error,results){

    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;

    

}





