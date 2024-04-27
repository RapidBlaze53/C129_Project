swing = "";
classical = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
songStatus = "" 

function preload() {
    swing = loadSound("swing.mp3");
    classical = loadSound("classical.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized :D");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "and rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "and leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    songStatus = swing.isPlaying();

    if(scoreLeftWrist > 0.2) {
        
        fill("FF0000");
        stroke("00FFFF");
        circle(leftWristX, leftWristY, 20);
        classical.stop();
        if(songStatus = false) {
            swing.play();
            document.getElementById("song_name").innerHTML = "Swing";
        }   
    }

}