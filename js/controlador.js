var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.Controlador = Oops.constructor({
    init: function( v, m ) {
        v.setSubscriptor( this );
        m.setSubscriptor( this );
        this.modelo = m;
        this.vista = v;
    },
    augment: [ MVCGooogleDocs.SubsVistaInterface, MVCGooogleDocs.SubsModeloInterface ],
    proto: function(p) {
        p.alClickCargar = function() {
            this.modelo.obtenerDias();
        };
        p.alRecibirDias = function(dias) {
            // Transformar los datos
            this.vista.mostrarDias(dias);
        };
    }
});

