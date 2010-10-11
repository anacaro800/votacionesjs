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
		this.vista.mostrarDias(keys);
		llamarModelo(keys[key])
	    }	        
        };
	p.llamarModelo = function(key) {
	    this.modelo.obtenerDias(key);
	}
    }
});

