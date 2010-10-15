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
	
	this.createConsolidado = function(finales){
	    var $html = $("<br><table width='500'><tr><th colspan='2' scope='col'><h1>VOTOS TOTALES POR CANDIDATO</h1></th></tr><tr><td width='243' class='contenido'><h2>Candidato</h2></td><td width='241' class='contenido'><h2>Votos</h2></td></tr>");
	    for (var key in finales ){
		$html.append("<tr><td class='contenido'>"+key+"</td><td class='contenido'>"+finales[key]+" votos"+"</td></tr>");
	    }
	    $html.append("</table><br>");
	    //$messages.append(str + "<br>");
	    $console.append($html);
	}

        this.createGraph = function(finales){
            var $graph = $("<div id='chart' name='chart' style='height:200px;width:500px;'></div>")
            $console.append($graph);
            var nombres = [];
            var valores = [];
            for (var key in finales) {
                nombres.push(key);
                valores.push(parseInt(finales[key]));
            }
            // Se necesita lista de listas en values
            var values = [];
            values.push(valores);
            $.jqplot('chart', values, {
                legend:{show:true, location:'ne'},title:'GRAFICA VOTOS TOTALES POR CANDIDATO',
	        seriesDefaults:{
		    renderer:$.jqplot.BarRenderer, 
		    rendererOptions:{barPadding: 3, barMargin: 10}
	        },
                series: [{label:"Votos"}],
                axes:{
                    xaxis:{renderer:$.jqplot.CategoryAxisRenderer,
                           ticks:nombres}, 
                    yaxis:{min:0}
                }
            });
        }
        
	this.createTable = function(resultados){
	    var $parent = undefined;
	    var $table = $("<div id='main'><h1>TABLA RESULTADOS POR REGIONES</h1></div>");
	    for (var parent in resultados['sons']) {
		//alert("El padre es: "+parent);
		if ($("#"+parent.replace(/ /g,'')).length > 0) {
		    //alert("Encontro a padre: "+parent);
		    var $padre = $("#"+parent.replace(/ /g,''));
		} else {
		    var $padre = $("<div class='data' id='"+parent.replace(/ /g,'')+"'><h2>"+parent+"</h2></div>");
		    $table.append($padre);
		}
		for (var son in resultados['sons'][parent]) {
		    //alert("Crea el hijo: "+resultados['sons'][parent][son]);
		    var $hijo = $("<div class='data' id='"+resultados['sons'][parent][son].replace(/ /g,'')+"'><h2>"+resultados['sons'][parent][son]+"</h2></div>");
		    $padre.append($hijo);
		}
		$console.append($table);
	    }
            for (var title in resultados['partials']) {
                var $padre = $("#"+title.replace(/ /g,''));
                for (i in resultados['partials'][title]) {
                    $padre.append("<p class='result'>"+resultados['partials'][title][i]+"</p>");
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
