jQuery.extend({

	Controller: function(model, view){
	    var finales;
	    $("#console").ajaxStop(function() {
		for (var key in finales )
		    view.message(key+" = "+finales[key]);
	    });
		/**
		 * listen to the view
		 */
		var vlist = $.ViewListener({
			loadAllClicked : function(key){
				var all = model.getAll(key);
				$.each(all, function(i){
					view.message("from cache: " + all[i]);
				});
			},
		});
		view.addListener(vlist);

		/**
		 * listen to the model
		 */
	    var mlist = $.ModelListener({
		loadBegin : function() {
		    view.message("Fetching Data...");
		},
		loadFinish : function(result) {
		    if (result['type'] == 'keys') {
			view.message(result['title']+" => Parent: "+result['parent']);
			for ( key in result['data'] ) {
			    model.getAll(result['data'][key], result['parent']);
			}
		    } else {
			finales = result['data'];
			// for ( key in result['data'] )
			//     view.message(result['data'][key])
			;
		    }
		},
	    });
	    model.addListener(mlist);
	}
	
});
