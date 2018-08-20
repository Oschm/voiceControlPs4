$(document).ready(function() {
    console.log('Starting SpeechRecognition library.');
    var speech = new Speech();

    speech.recognition.onstart = function() {
        var button = document.getElementById('capture');
        var status = document.getElementById('status');
        button.innerHTML = "Stop";
        button.value = "false";
        status.innerHTML = "Listening...";
    }

    speech.recognition.onend = function() {
        var button = document.getElementById('capture');
        var status = document.getElementById('status');
        button.innerHTML = "Start";
        button.value = "true";
        status.innerHTML = "Idle";
        console.log('Listening stopped.');
    }

    // $('#capture').click(function(){
    // 	if ($('#capture').val() == "true") {
    // 		speech.startCapture();
    // 	}
    // 	else {
    // 		speech.stopCapture();
    // 	}
    // });

    let changeColor = document.getElementById('capture');
    changeColor.onclick = function(element) {
        var buttonVal = document.getElementById('capture').value;
        if (buttonVal == "true") {
            speech.startCapture();

        } else {
            speech.stopCapture();

        }
    };


});
