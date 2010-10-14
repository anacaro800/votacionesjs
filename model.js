jQuery.extend({
	Model: function(){
	    /**
	     * our local cache of data
	     */
	    var cache = new Array();
	    /**
	     * a reference to ourselves
	     */
	    var that = this;
	    /**
	     * who is listening to us?
	     */
	    var listeners = new Array();
	    var totales = {'reyes' : 0, 'piedad': 0, 'jojoy':0}
	    /**
	     * load lots of data from the server
	     * or return data from cache if it's already
	     * loaded
	     */
	    this.getAll = function(key){
		self = this;
		mycallback = function(root) {
		    var rows = root.table.rows;
		    var result = new Object();
		    result['type'] = '';
		    result['data'] = [];
		    result['title'] = '';
		    result['sons'] = [];
		    result['mesas'] = {};
		    var found = false;
		    // Aqui leemos la primera.

		    // Aqui comprobamos si es una mesa. Si es una mesa
		    // Entonces al final pasamos las sumas de los resultados y no los keys.
		    if (rows[0].c[0].v == 'mesa') {
			result['type'] = 'mesa';
			result['title'] = "mesa "+rows[0].c[1].v;
		    } else {
			result['type'] = 'keys';
			result['title'] = rows[0].c[1].v;
		    }
		    

		    // La idea de esta variable es guardar el nombre de la ciudad o el dpt, o etc.


		    for (i=0; i<rows.length; i++) {
			if (found){
			    // En caso de ser keys, las mete en data y se las pasa al controlador pa seguir iterando
			    if (result[result['title']] == undefined) {
				result[result['title']] = [];
			    }
			    if (result['type'] == 'keys'){
				result['data'].push( rows[i].c[1].v );
				result[result['title']].push( rows[i].c[0].v );
			    } else {
				// En este caso hace la suma de los resultados. totales[candidato] += votos
				result[result['title']].push([rows[i].c[0].v+": "+rows[i].c[1].v]);
				totales[rows[i].c[0].v] += rows[i].c[1].v;
			    }
			}
			// Esto es pa brincarnos la basura de arriba del documento.
			if (rows[i].c[0].v == "" & found != true) {
			    if (rows[i+1].c[0].v != "") {
				found = true;
			    }
			}
		    }

		    // Data se vuelve los totales cuando se leyo una mesa.
		    if (result['type'] == 'mesa'){
			result['data'] = totales;
			that.notifyLoadFinish(result);
		    } else {
			that.notifyLoadFinish(result);
		    }
		    }
		
		$.getScript('http://spreadsheets.google.com/tq?tqx=responseHandler:mycallback&key='+key+'&pub=1');
	    }
		
	    /**
	     * add a listener to this model
	     */
	    this.addListener = function(list){
		listeners.push(list);
	    }
	    
	    /**
	     * notify everone that we're starting 
	     * to load some data
	     */
	    this.notifyLoadBegin = function(){
		$.each(listeners, function(i){
			listeners[i].loadBegin();
		    });
	    }
	    /**
	     * we're done loading, tell everyone
	     */
	    this.notifyLoadFinish = function(keys){
		$.each(listeners, function(i){
			listeners[i].loadFinish(keys);
		    });
	    }
	    
	},
	    
	    /**
	     * let people create listeners easily
	     */
	    ModelListener: function(list) {
	    if(!list) list = {};
	    return $.extend({
		    loadBegin : function() { },
			loadFinish : function() { },
			}, list);
	}
    });
