jQuery.extend({

	Controller: function(model, view){
	    var finales;
	    var parent = {};
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
			// Esto no importa
		    view.message("Fetching Data...");
		},
		loadFinish : function(result) {
			// Aqui esta el problema.
			//De alguna manera hay que meter en un diccionario cosas del tipo: resultados[result['title']].push(hijo) algo asi
			//pero me falla la creatividad :)
			if (result['type'] == 'keys') {
			    for ( key in result['data'] ) {
				model.getAll(result['data'][key]);
			    }
			} else {
			    // Aqui cuando es mesa pues se guarda el resultado en finales y al final de todo se llama una funcion que recorre esto.
			    // la funcion esta por alla arriba.
			    finales = result['data'];
			}
		    },
		});
	    model.addListener(mlist);
	}
	
});
