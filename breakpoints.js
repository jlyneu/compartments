/*
Inserts CSS into the style element in the head element of index.html.
Uses the number of iframe elements in index.html and the user's device
screen width to generate breakpoints that provides equal-width partitions
of the screen for each iframe.
*/
$(document).ready(function() {

    var currentIframeCount = 6;
    var disableMoreCompartments = false;

    // display loading screen, fade away, then display more compartments bar
    var loadAnimation = function() {
        setTimeout(function() {
            $('#welcome-text').fadeIn(500, function() {
                setTimeout(function() {
                    $('#loading-screen').fadeOut(500, function() {
                        setTimeout(function() {
                            displayMoreCompartmentsBar();
                        }, 2000);
                    });
                }, 4000);
            });
        }, 4500);
    
    };
    
    // remove all iframes and related media queries from the page
    var clearAll = function() {
        $('iframe').remove();
        document.querySelector('style').textContent = "";
    };

    // clear all current iframes and media queries then add given number of iframes to page
    var displayIframes = function(iframeCount) {
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        // generate iframes based on list of websites that support iframes
        shuffle(sites);
        var $iframeContainer = $('#iframe-container');
        
        // clear iframes and related media queries
        clearAll();
        
        for (var i = 0; i < iframeCount; i++) {
            $iframeContainer.append('<iframe src="' + sites[i] + '"></iframe>');
        }

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
    
    // have more compartments bar slide down from top
    var displayMoreCompartmentsBar = function() {
        $('#more-compartments-bar').slideDown(1000, function() {
            $('iframe').css('height', '90vh');
        });
    };
    
    // increase number of compartments by given number and generate new random compartments
    var addMoreCompartments = function(numToAdd) {
        currentIframeCount += numToAdd;
        displayIframes(currentIframeCount);
    };
    
    
    
    
    // kick it all off
    loadAnimation();
    displayIframes(currentIframeCount);
    $('#more-compartments-bar').click(function() {
        if (currentIframeCount < sites.length && !disableMoreCompartments) {
            var $this = $(this);
            addMoreCompartments(2);
            disableMoreCompartments = true;
            $this.removeClass('enabled-bar');
            $this.text('Here you go...');
            setTimeout(function() {
                if (currentIframeCount >= sites.length) {
                    $this.text("I have enough compartments...");
                } else {
                    $this.text("I don't have enough compartments...");
                    disableMoreCompartments = false;
                    $this.addClass('enabled-bar');
                }
            }, 2000);
        }
    });
});