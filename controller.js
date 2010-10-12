jQuery.extend({

	Controller: function(model, view){
	    var finales;
	    var resultados = {'parents':[]};
	    $("#console").ajaxStop(function() {
		    for (var key in finales ){
			view.message(key+" = "+finales[key]);
		    }
		    view.createTable(resultados);
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
			// Esto no importa
		    view.message("Fetching Data...");
		},
		loadFinish : function(result) {
			resultados['parents'].push(result['title']);
			if (result['type'] == 'keys') {
			    for ( key in result['data'] ) {
				model.getAll(result['data'][key]);
			    }
			    //for ( i in result[result['title']]) {
			    //view.row(result['type'],result['title'],result[result['title']][i],result['data']);
			    //}
			} else {
			    //view.message(result['title']+" => resultaos: "+result['data']);
			    finales = result['data'];
			}
		    },
		});
	    model.addListener(mlist);
	}
	
});
