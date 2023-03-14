function setup(){
    canvas = createCanvas(600 , 400);
    canvas.position(450, 300);
    background("white");

    video = createCapture(VIDEO);
    video.hide();

    
    poseNet = ml5.poseNet(video, consoler);
    poseNet.on("pose" , results);
}

function preload(){
    son1 = loadSound("music.mp3");
    son2 = loadSound("music2.mp3");
    son3 = loadSound("music3.mp3");
    son = 0;
}

red12= 0;
green12 = 0;
blue12 = 0;
s= 0;

rainbow = "";

leftWristY = 0;
leftWristX = 0;
rightWristY= 0;
rightWristX = 0;
discant = "";
lscore= 0;
rscore= 0;

function disco(){
    discant = "true";
    red12 = floor(Math.random() * 256) + 1;
    green12 = floor(Math.random() * 256) + 1;
    blue12 = floor(Math.random() * 256) + 1;

    console.log( red12, blue12, green12);
}

function draw(){

    if(s < 50){
        s = s + 1;
    }

    if(red12 < 150){
        red12 = floor(Math.random() * 256) + 1;
    }
    if(green12 < 150){
        green12 = floor(Math.random() * 256) + 1;
    }
    if(blue12 < 150){
        blue12 = floor(Math.random() * 256) + 1;
    }
    
    if(blue12 > 150 && green12 > 150){
        console.log("first parameter");
        if(red12 > 150){
            console.log("second parameter");
            if(discant == "true" && s >= 10){
                s = 0;
                tint(red12 , green12 , blue12);
                disco();
            }
        }
    }
    
    image(video, 0, 0, 600, 400);
    stroke("black");
    fill("red");

    if(lscore > 0.2){
        
        circle(leftWristX - 20, leftWristY - 50, 15);


        if(leftWristY >= 300 && leftWristY < 400){
            document.getElementById("volume").innerHTML = "volume = Max volume";
            son1.setVolume(1);
            son2.setVolume(1);
            son3.setVolume(1);
        }

        if(leftWristY >= 200 && leftWristY < 300){
            document.getElementById("volume").innerHTML = "Volume = 0.75";
            son1.setVolume(0.75);
            son2.setVolume(0.75);
            son3.setVolume(0.75);
        }

        if(leftWristY >= 100 && leftWristY < 200){
            document.getElementById("volume").innerHTML = "Volume = 0.5";
            son1.setVolume(0.5);
            son2.setVolume(0.5);
            son3.setVolume(0.5);
        }

        if(leftWristY > 0 && leftWristY < 100){
            document.getElementById("volume").innerHTML = "Volume = 0.25";
            son1.setVolume(0.25);
            son2.setVolume(0.25);
            son3.setVolume(0.25);
        }
    }

    if(rscore > 0.2){
        
        circle(rightWristX - 20, rightWristY - 100, 15);


        if(rightWristY >= 300 && rightWristY < 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            son1.rate(2);
            son2.rate(2);
            son3.rate(2);
        }

        if(rightWristY >= 200 && rightWristY < 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            son1.rate(1.5);
            son2.rate(1.5);
            son3.rate(1.5);
        }

        if(rightWristY >= 100 && rightWristY < 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            son1.rate(1);
            son2.rate(1);
            son3.rate(1);
        }

        if(rightWristY > 0 && rightWristY < 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            son1.rate(0.5);
            son2.rate(0.5);
            son3.rate(0.5);
        }
    }
}


function consoler(){
    console.log("Initilization has begun");
}

function results(result){
    if(result.length > 0){
        console.log("results will be displayed");
        leftWristX = Math.floor(result[0].pose.leftWrist.x);
        leftWristY = Math.floor(result[0].pose.leftWrist.y);
        rightWristX = Math.floor(result[0].pose.rightWrist.x);
        rightWristY = Math.round(result[0].pose.rightWrist.y);

        console.log("Left Wrist = " + leftWristX + "," + leftWristY + " Right Wrist = " + rightWristX  + "," +  rightWristY);
        lscore = result[0].pose.keypoints[9].score;
        rscore = result[0].pose.keypoints[10].score;
    }
}

function play12(){
    son1.stop();
    son2.stop();
    son3.stop();

    son = 1;
    son1.rate(1);
    son1.setVolume(1);
    son1.play();
}

function next12(){
        son = son + 1;
        son1.stop();
        son2.stop();
        son3.stop();

        if(son > 3){
            son = 1
        }
        if(son == 1){
            son1.play();
        }
        if(son == 2){
            son2.play();
        }
        if(son == 3){
            son3.play();
        }
}

function stop12(){
    son1.stop();
    son2.stop();
    son3.stop();
}
