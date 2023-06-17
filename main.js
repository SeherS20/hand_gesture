Webcam.set ({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90,
}
)

camera = document.getElementById("camera")

Webcam.attach ('#camera')

function snapshot(){
    Webcam.snap ( function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">'
    })
}

console.log ('ml5.version', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DyC2uCeaC/model.json',modelLoaded)

function modelLoaded(){
    console.log ('model is loaded')
}

function speak(){
    synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is" + prediction_1
    speak_data_2 = "the second prediction is" + prediction_2
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis)
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify( img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results)
        document.getElementById("prediction1").innerHTML = results[0].label;
        document.getElementById("prediction2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak()
        if(results[0].label == "thumbs"){
            document.getElementById("update_emoji").innerHTML = "👍"
        }
        
        if(results[0].label == "peace"){
            document.getElementById("update_emoji").innerHTML = "✌️"
        }
        
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "👌"
        }
        if(results[1].label == "thumbs"){
            document.getElementById("update_emoji2").innerHTML = "👍"
        }
        
        if(results[1].label == "peace"){
            document.getElementById("update_emoji2").innerHTML = "✌️"
        }
        
        if(results[1].label == ""){
            document.getElementById("update_emoji2").innerHTML = "👌"
        }
    }
}
