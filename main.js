song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
volume = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0 ; 

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("posenet on");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreLeftWrist > 0.2) {
        circle(leftwristX, leftwristY, 20);
        inNumberLeftWristY = Number(leftwristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist > 0.2 )
    {
        circle(rightwristX,rightwristY,20);
        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristY > 100 && rightwristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.0x";
            song.rate(1.0);  
        }
        else if(rightwristY > 200 && rightwristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightwristY > 300 && rightwristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.0x";
            song.rate(2.0);
        }
        else{
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("leftwristX = " + leftwristX + " leftwristY = " + leftwristY);
        console.log("rightWristX = " + rightwristX + " rightWristY = " + rightwristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

    }
}