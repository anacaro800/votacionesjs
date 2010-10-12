jQuery.extend({

	View: function($console){
		/**
		 * keep a reference to ourselves
		 */
		var that = this;
		/**
		 * who is listening to us?
		 */
		var listeners = new Array();
	
		/**
		 * a box to put our incoming messages
		 */
		var $messages = $("<div></div>");
		/**
		 * show a simple text-only message
		 * in the view
		 */
		this.message = function(str){
			$messages.append(str + "<br>");
		}

		this.createTable = function(resultados){
		    var $parent = undefined;
		    var $table = $("<div id='main'></div>");
		    for (var parent in resultados['sons']) {
			//alert("El padre es: "+parent);
			if ($("#"+parent).length > 0) {
			    //alert("Encontro a padre: "+parent);
			    var $padre = $("#"+parent);
			} else {
			    var $padre = $("<div id='"+parent+"'><h1>"+parent+"</h1></div>");
			    $table.append($padre);
			}
			for (var son in resultados['sons'][parent]) {
			    //alert("Crea el hijo: "+resultados['sons'][parent][son]);
			    var $hijo = $("<div id='"+resultados['sons'][parent][son]+"'><h1>"+resultados['sons'][parent][son]+"</h1></div>");
			    $padre.append($hijo);
			}
		    }
		    $console.append($table);
		}
		/**
		 * set up the buttons to load data
		 */
		$console.append($("<input type='button' value='Cargar Datos'></input>").click(function(){
		    var key = $('#key').val();
		    that.notifyAllClicked(key);
		}));
		$console.append($messages);
		
		/**
		 * add a listener to this view
		 */
		this.addListener = function(list){
			listeners.push(list);
		}
		
		/**
		 * notify everone that the user wants
		 * to load all the data
		 */
		this.notifyAllClicked = function(key){
		    $.each(listeners, function(i){
			listeners[i].loadAllClicked(key);
		    });
		}		
	},
    
	/**
	 * let people create listeners easily
	 */
	ViewListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadAllClicked : function(key) { },
		}, list);
	}	
});
