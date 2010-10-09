var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.Controlador = Oops.constructor({
    init: function( v, m ) {
        v.setSubscriptor( this );
        m.setSubscriptor( this );
        this.modelo = m;
        this.vista = v;
	this.nivel = 0;
    },
    augment: [ MVCGooogleDocs.SubsVistaInterface, MVCGooogleDocs.SubsModeloInterface ],
    proto: function(p) {
        p.alClickCargar = function(key) {
            this.modelo.obtenerDias(key);
        };
        p.alRecibirDias = function(keys) {
	    for ( key in keys ) {
		this.nivel++;
		if (this.nivel == 5) {
		    this.vista.mostrarDias(keys);
		    this.nivel = 0;
		}		
		this.modelo.obtenerDias(keys[key]);
	    }	        
        };
    }
});

