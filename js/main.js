/*
 ** file: js/main.js
 ** description: javascript code for "html/main.html" page
 */

function init_main() {
    $('html').hide().fadeIn('slow');
    navigator.webkitGetUserMedia({
        audio: true,
    }, function(stream) {
        stream.stop();
        // Now you know that you have audio permission. Do whatever you want...
    }, function() {
        // Aw. No permission (or no microphone available).
    });
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);
