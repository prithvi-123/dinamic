  img ="";
  Status = "";
  objects = [];
  
  
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}

function modelLoaded()
{
    console.log("Model Loaded!")
    Status = true;
   
}

function gotResult(error, results)
{
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload(){
    alarm=loadSound("alarm_clock_old.mp3");
}

function draw(){
    image(video, 0,0,380,380);
   
    if(Status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
          
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("objects").innerHTML="Baby found " ;
                alarm.stop();
            }
            else
            {
                document.getElementById("objects").innerHTML="Baby not found " ;
                alarm.play();
            }
          
    }
    if(objects.length==0)
    {
        document.getElementById("objects").innerHTML="Baby not found " ;
        alarm.play();
    }
}

}
