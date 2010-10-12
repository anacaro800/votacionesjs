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
		var $messages = $("<div style='height:600px; overflow: auto;'></div>");
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
		    for (name in resultados['parents']) {
			var nombre = resultados['parents'][name];
			//alert(nombre);
			//alert(resultados['sons'][nombre]);
			var $exists = $("#"+nombre);
			if ($exists.length > 0) {
			    //alert("padre existe: "+nombre);
			    $parent = $exists;
			} else {
			    $parent = $("<div id='"+nombre+"'><h1>"+nombre+"</h1></div>");
			    $table.append($parent);
			}
			for (sons in resultados['sons'][nombre]) {
			    var existss = $("#"+resultados['sons'][nombre][sons]);
			    if (existss.length > 0) {
				$parent.append(existss);
				existss.remove();
			    } else {
				$parent.append("<div id='"+resultados['sons'][nombre][sons]+"'><h1>"+resultados['sons'][nombre][sons]+"</h1></div>");
			    }
			    //if ($parent.length != 0) {
			    //
			    //   } else {
			    //}
			    //alert(resultados['sons'][nombre][sons]);
			}
		    }
		    $console.append($table);
		}
		/**
		 * set up the buttons to load data
		 */
		$console.append($("<input type='button' value='Load All'></input>").click(function(){
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
