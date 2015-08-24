/*
Inserts CSS into the style element in the head element of index.html.
Uses the number of iframe elements in index.html and the user's device
screen width to generate breakpoints that provides equal-width partitions
of the screen for each iframe.
*/
$(document).ready(function() {
    var iframeCount = $('iframe').length; // number of iframes in index.html
    var screenWidth = window.screen.width; // user's device screen width
    
    for (var i = 0; i < iframeCount; i++) {
        // compute the horizontal pixel range for the current iframe
        var minBreakPoint = screenWidth * i / iframeCount + 1;
        var maxBreakPoint = screenWidth * (i + 1) / iframeCount;
        
        // insert the @media query into the style element
        document.querySelector('style').textContent +=
            "@media screen and (min-width: " + minBreakPoint + "px) and " +
            "(max-width: " + maxBreakPoint + "px) { iframe:nth-child(" +
            (i + 1) + ") { display: block; } }";
    }
});