define(function(require) {

	var Adapt = require('coreJS/adapt');
	
    // Listen for start up
    Adapt.once('adapt:start', function () {

		// Get number pages - check we have at least one to go to
        var numRoutes = Adapt.course.getChildren().length;        
        if (numRoutes > 0) {
            
            // Randomly choose a route
            var newRoute = 0;
            if (numRoutes > 1) {
                newRoute = Math.round(Math.random() * (numRoutes - 1));
            }
            
            // Get new route ID
            var newRouteID = Adapt.contentObjects.models[newRoute].get('_id');
            
            // Jump to new ID
            window.location.hash = "#/id/" + newRouteID;
        } else {
            console.log("No pages found");
        }
    });
    
    // Listen for page being displayed
    Adapt.on('router:page', function (model) {
        
        // Once all rendering has finished, hide the home button
        _.defer(function () {
            $('.navigation-back-button').addClass('display-none');
        });
    });
    
});