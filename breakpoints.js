/*
Inserts CSS into the style element in the head element of index.html.
Uses the number of iframe elements in index.html and the user's device
screen width to generate breakpoints that provides equal-width partitions
of the screen for each iframe.
*/
$(document).ready(function() {

    var loadAnimation = function() {
        setTimeout(function() {
            $('#welcome-text').fadeIn(500, function() {
                setTimeout(function() {
                    $('#loading-screen').fadeOut(100);
                }, 2000);
            });
        }, 2500);
    
    };

    var displayIframes = function() {
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        // generate iframes based on list of websites that support iframes
        shuffle(sites);
        var $iframeContainer = $('#iframe-container');
        for (var i = 0; i < 10; i++) {
            $iframeContainer.append('<iframe src="' + sites[i] + '"></iframe>');
        }

        var iframeCount = $('iframe').length; // number of iframes in index.html
        var screenWidth = window.screen.width; // user's device screen width

        for (var i = 0; i < iframeCount - 1; i++) {
            // compute the horizontal pixel range for the current iframe
            var minBreakpoint = screenWidth * i / iframeCount + 1;
            var maxBreakpoint = screenWidth * (i + 1) / iframeCount;

            // insert the @media query into the style element
            document.querySelector('style').textContent +=
                "@media screen and (min-width: " + minBreakpoint + "px) and " +
                "(max-width: " + maxBreakpoint + "px) { iframe:nth-child(" +
                (i + 1) + ") { display: block; } }";
        }

        // insert @media query for final iframe without a max-width
        var finalBreakpoint = screenWidth * (iframeCount - 1) / iframeCount + 1;
        document.querySelector('style').textContent +=
            "@media screen and (min-width: " + finalBreakpoint +
            "px) { iframe:nth-child(" + iframeCount + ") { display: block; } }";
    };
    
    
    // kick it all off
    loadAnimation();
    displayIframes();
});