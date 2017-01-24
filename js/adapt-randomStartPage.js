define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	
    // Listen for start up
    Adapt.once('adapt:start', function () {
	
		// Display random page
		var startId = getRandomStartId();
		if (startId != null) {
			window.location.hash = startId;
		} else {
			console.log("adapt-randomStartPage: No pages found");
		}
		
		// Add listener to redisplay current page on language change
		Adapt.on('app:languageChanged', function () {
		
			// Defer jump to page until rendering complete
			// Ensures all navigation items etc are displayed correctly
			_.defer(function () {		
				var navId = "#/id/" + Adapt.location._lastVisitedPage;
				Backbone.history.navigate(navId, true);
			});
		});
    });
    
	// Method displays a random start page provided pages exist
	function getRandomStartId() {
		var returnId = null;
	
		// Get number pages - check we have at least one to go to
        var numRoutes = Adapt.course.getChildren().length;        
        if (numRoutes > 0) {
            
            // Randomly choose a route
            var newRoute = 0;
            if (numRoutes > 1) {
                newRoute = Math.round(Math.random() * (numRoutes - 1));
            }
            
            // Get new route ID
            returnId = "#/id/" + Adapt.contentObjects.models[newRoute].get('_id');
        }
		
		return returnId;
	}
	
    // Listen for page being displayed
    Adapt.on('router:page', function (model) {
        
        // Once all rendering has finished, hide the home button
        _.defer(function () {
            $('.navigation-back-button').addClass('display-none');
        });
    });
    
});