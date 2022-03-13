song="";
status="";
object=[];
function preload(){
 song=loadSound("Alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        r= random(255);
        g= random(255);
        b= random(255);
        for(i=0; i<object.length;i++){
            document.getElementById("status").innerHTML="status: object detected";
            fill(r,g,b);        
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);    
            if(object[i].label=="person"){
                document.getElementById("baby_status").innerHTML="Baby Found";
                song.stop();
            }     
            else{
                document.getElementById("baby_status").innerHTML="Baby not Found";
                song.play();
            }                                  
        }
        if(object.length==0){
            document.getElementById("baby_status").innerHTML="Baby not Found";
            song.play();
        }
    }
}
function gotResult(error,results){
 if(error){
     console.error(error);
 }
 else{
     console.log(results);
     object=results;
 }
}