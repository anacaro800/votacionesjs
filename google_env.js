window.location = "main.html";
console = window.console || { log: function(){} };

load("js/oops.js");
load("js/modelo.js");
load("js/vista.js");
load("js/controlador.js");

var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.VistaConsola = Oops.constructor({
    proto: function(p) {
        p.setSubscriptor = function( obj ) {
            this.subscriptor = obj;
        };
        p.mostrarDias = function( dias ) {
            for (d in dias)
                print( dias[d] );
        };
    }
});

Envjs.scriptTypes['text/javascript'] = true; 


function init()
{
    var google = new MVCGooogleDocs.VistaConsola();
    var mod = new MVCGooogleDocs.Modelo();
    var contGoogle = new MVCGooogleDocs.Controlador( google, mod );
    
    contGoogle.alClickCargar();
}

window.onload=init;
window.onload();