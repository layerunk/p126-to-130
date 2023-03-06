function setup(){
    canvas = createCanvas(600 , 400);
    canvas.position(450, 300);
    background("white");

    video = createCapture(VIDEO);
    video.hide();
}

function preload(){
    son1 = loadSound("music.mp3");
    son2 = loadSound("music2.mp3");
    son3 = loadSound("music3.mp3");
    son = 0;
}

function draw(){
    image(video, 0, 0, 600, 400);
}

function play12(){
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
