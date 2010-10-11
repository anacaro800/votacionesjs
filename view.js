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
