jQuery.extend({
    
    Controller: function(model, view){
	var finales;
	var resultados = {'sons':{}, 'partials':{}};
	$("#console").ajaxStop(function() {
	    view.createConsolidado(finales); 
	    view.createGraph(finales); 
	    view.createTable(resultados);
	});
	/**
	 * listen to the view
	 */
	var vlist = $.ViewListener({
	    loadAllClicked : function(key){
		var all = model.getAll(key);
	    },
	});
	view.addListener(vlist);
        
	/**
	 * listen to the model
	 */
	var mlist = $.ModelListener({
	    loadFinish : function(result) {
		if (result['type'] == 'keys') {
		    if ( resultados['sons'][result['title']] == undefined ) {
			resultados['sons'][result['title']] = [];
			resultados['sons'][result['title']] = result[result['title']];
		    }
		    for ( key in result['data'] ) {
			model.getAll(result['data'][key]);
		    }
		} else {
		    if ( resultados['partials'][result['title']] == undefined ) {
                        resultados['partials'][result['title']] = []
                        resultados['partials'][result['title']] = result[result['title']];
                    }
		    finales = result['data'];
		}
	    },
	});
	model.addListener(mlist);
    }    
});
