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
	    this.getAll = function(key, parent){
		self = this;
		    mycallback = function(root) {
			var rows = root.table.rows;
			var result = new Object();
			result['type'] = '';
			result['data'] = [];
			result['title'] = '';
			result['parent'] = '';
			var found = false;
			// Aqui leemos la primera.

			if (parent == undefined) {
			    result['parent'] = rows[0].c[0].v;
			} else {
			    result['parent'] = parent;
			}

			if (rows[0].c[0].v == 'mesa') {
			    result['type'] = 'mesa';
			} else {
			    result['type'] = 'keys';
			}

			result['title'] = rows[0].c[1].v;
			for (i=0; i<rows.length; i++) {
			    if (found){
				if (result['type'] == 'keys'){
		    		    result['data'].push( rows[i].c[1].v );
				} else
				{
				    totales[rows[i].c[0].v] += rows[i].c[1].v;
				    //alert(totales[rows[i].c[0].v]);
				}
			    }
			    if (rows[i].c[0].v == "" & found != true) {
				if (rows[i+1].c[0].v != "") {
				    found = true;
				}
			    }
			}
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
