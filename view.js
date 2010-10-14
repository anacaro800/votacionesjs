jQuery.extend({

    View: function($console, $hiddenconsole){
	/**
	 * keep a reference to ourselves
	 */
	var that = this;
	/**
	 * who is listening to us?
	 */
	var listeners = new Array();
	
	this.createConsolidado = function(finales){
	    var $html = $("<br><table width='500'><tr><th colspan='2' scope='col'><h1>VOTOS TOTALES POR CANDIDATO</h1></th></tr><tr><td width='243' class='contenido'><h2>Candidato</h2></td><td width='241' class='contenido'><h2>Votos</h2></td></tr>");
	    for (var key in finales ){
		$html.append("<tr><td class='contenido'>"+key+"</td><td class='contenido'>"+finales[key]+" votos"+"</td></tr>");
	    }
	    $html.append("</table>");
	    //$messages.append(str + "<br>");
	    $console.append($html);
	}
        
	this.createTable = function(resultados){
	    var $parent = undefined;
	    var $table = $("<div id='main'></div>");
	    for (var parent in resultados['sons']) {
		//alert("El padre es: "+parent);
		if ($("#"+parent.replace(/ /g,'')).length > 0) {
		    //alert("Encontro a padre: "+parent);
		    var $padre = $("#"+parent.replace(/ /g,''));
		} else {
		    var $padre = $("<div id='"+parent.replace(/ /g,'')+"'><h2>"+parent+"</h2></div>");
		    $table.append($padre);
		}
		for (var son in resultados['sons'][parent]) {
		    //alert("Crea el hijo: "+resultados['sons'][parent][son]);
		    var $hijo = $("<div id='"+resultados['sons'][parent][son].replace(/ /g,'')+"'><p>"+resultados['sons'][parent][son]+"</p></div>");
		    $padre.append($hijo);
		}
		$hiddenconsole.append($table);
	    }
            for (var title in resultados['partials']) {
                var $padre = $("#"+title.replace(/ /g,''));
                for (i in resultados['partials'][title]) {
                    $padre.append("<p>"+resultados['partials'][title][i]+"</p>");
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
