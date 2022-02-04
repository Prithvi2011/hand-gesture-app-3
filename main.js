prediction="";

Webcam.set({
    width:350,
    heigtht:300,
    image_foramt:"png",
    png_quality:90
});
camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+ data_uri+"'/>"
    });
}
console.log("ml5 verion:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jnDyTOcUK/model.json",modelloaded);
function modelloaded(){
    console.log("modelloaded");
}
function speak(){
    var synth=window.SpeechSynthesis;
    speakdata_1="the prediction is"+prediction;
    
    utterThis=new SpeechSynthesisUtterance(speakdata_1);
    synth.speak(utterThis);

}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        document.getElementById("result_hand_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if(results[0].label=="best"){
            document.getElementById("update_hand").innerHTML="&#128077";
        }
        if(results[0].label=="victory"){
            document.getElementById("update_hand").innerHTML="&#9996";
        }
        if(results[0].label=="amazing"){
            document.getElementById("update_hand").innerHTML="#128076";
        }
    }
}