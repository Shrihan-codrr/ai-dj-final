var L_wrist_x = 0;
var L_wrist_y = 0;
var R_wrist_x = 0;
var R_wrist_y = 0;
var Math_Floor = 0;
var music_1 = "music.mp3";
var music_2 = "music2.mp3";
var score_l = 0;
var score_r = 0;
var song1_status = "";
var song2_status = "";



function preload() {
     music_1 = loadSound("music.mp3");
     music_2 = loadSound("music2.mp3");
}

function setup() {
     canvas = createCanvas(500, 450);
     background("white");
     canvas.position(435, 190);

     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, model_loaded);
     poseNet.on('pose', Get_results);


}

function draw() {

     image(video, 0, 0, 500, 450);
     fill("red");
     stroke("red");
     

     song1_status = music_1.isPlaying();
     song2_status = music_2.isPlaying();


     if (score_l > 0.2) {
          circle(L_wrist_x, L_wrist_y, 15);
          music_2.stop();
          if (song1_status == false) {
               music_1.play();
               document.getElementById("song").innerHTML = " Harry Potter is playing"
          }

     }

     
     if (score_r > 0.2) {
          circle(R_wrist_x, R_wrist_y, 15);
          music_1.stop();
          if (song2_status == false) {
               music_2.play();
               document.getElementById("song").innerHTML = "Peter Pan is playing";
          }

     }


}

/* Volume Reference Range (0  - 1) 
○ Means variableName.setVolume(0.1) - Very low
○ Means variableName.setVolume(0.3) - Little low
○ Means variableName.setVolume(0.5) - Medium
○ Means variableName.setVolume(0.7) - Little high
○ Means variableName.setVolume(0.9) - High
○ Means variableName.setVolume(1) - Full volume

Playback Rate Reference
 0 - 450 into 5 parts 
○ Means variableName.rate(0.5) - Very slow 0-90
○ Means variableName.rate(1) - Normal 90-180
○ Means variableName.rate(1.5) - Little fast 180-270
○ Means variableName.rate(2) - Twice as fast 270-360
○ Means variableName.rate(2.5) - Very fast 360-450


*/



function model_loaded() {
     console.log("Model Successfully Loaded....");
}

function Get_results(results) {

     if (results.length > 0) {
          //console.log(results);

          L_wrist_x = results[0].pose.leftWrist.x;
          R_wrist_x = results[0].pose.rightWrist.x;

          L_wrist_y = results[0].pose.leftWrist.y;
          R_wrist_y = results[0].pose.rightWrist.y;

          score_l = results[0].pose.keypoints[9].score;

          score_r = results[0].pose.keypoints[10].score;

          console.log("Left Wrist X : " + L_wrist_x + " & Y : " + L_wrist_y);

          console.log("Right Writs X : " + R_wrist_x + " & Y : " + R_wrist_y);
     }
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
