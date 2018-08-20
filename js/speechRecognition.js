var targets = ["FarmHouse", "Seed", "Sensor", "Bench", "Farm"],
    commands = ["navigate", "navigiere", "browse", "move"],
    portalString = "https://flpnwc-ae2189f76.dispatcher.hana.ondemand.com/sites/launchpad";



function Speech() {
    if ('webkitSpeechRecognition' in window) {
        // creating voice capture object

        this.recognition = new webkitSpeechRecognition();

        var grammar = '#JSGF V1.0; grammar colors; public <color> = FarmHouse | Farm | Seed | Sensor | Bench | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
        var speechRecognitionList = new webkitSpeechGrammarList;
        speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = speechRecognitionList;
        // settings
        this.recognition.continuous = true; // stop automatically
        this.recognition.interimResults = true;

        this.startCapture = function() {
            this.recognition.start();
        }

        this.stopCapture = function() {
            this.recognition.stop();
        }

        this.recognition.onresult = function(event) {

            console.log(event.results[0][0].transcript);
            $('#output').text(event.results[0][0].transcript);

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) { //Final results
                    console.log("final results: " + event.results[i][0].transcript); //Of course – here is the place to do useful things with the results.
                    var result = event.results[i][0].transcript;
                    var spokenCommand = _.find(commands, function(o) {
                        return _.includes(result, _.lowerCase(o));
                    });
                    if (spokenCommand) {
                        var target = _.find(targets, function(semanticObj) {
                            return _.includes(result, _.lowerCase(semanticObj));
                        }.bind(this));
                        if (target) {
                            var url = portalString + "#" + target + "-Display";
                            //  window.location.href = url;
                            chrome.tabs.create({
                                //     //"url": "chrome://extensions/?options=" + chrome.runtime.id
                                "url": url
                            });

                        } else {
                            console.log("no target found");
                        }
                    }
                } else { //i.e. interim...
                    console.log("interim results: " + event.results[i][0].transcript); //You can use these results to give the user near real time experience.
                }
            } //end for loop

        }

        this.recognition.onerror = function(event) {
            alert("error: " + event.error)
            if (event.error === 'not-allowed') {
                //alert("error: " + event.error);
                chrome.tabs.create({
                    //"url": "chrome://extensions/?options=" + chrome.runtime.id
                    "url": "chrome-extension://olfgnpblbibaillbhnhigmkaddindjfo/html/main.html"
                });

            }
        }


        //alert("webkitSpeechRecognition is available.");
    } else {
        //alert("webkitSpeechRecognition is not available.");
    }
}
