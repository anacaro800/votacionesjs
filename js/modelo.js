var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.SubsModeloInterface = Oops.constructor({
    proto: function(p) {
        p.alRecibirDias = function( dias ) {
            console.log("alRecibirDias!");
        };
    }
});

MVCGooogleDocs.Modelo = Oops.constructor({
    init: function() {
        this.subscriptor = new MVCGooogleDocs.SubsModeloInterface();
    },
    proto: function(p) {
        p.setSubscriptor = function(obj) {
            this.subscriptor = obj;
        };
        p.recibirDatos = function(root) {
            console.log(root);
            this.subscriptor.alRecibirDias(null);
        };
        p.obtenerDias = function() {
            var self = this;
            MVCGooogleDocs.callback = function(root) {

                var rows = root.table.rows;
                var result = [];

                for ( r in rows ) {
                    result.push( rows[r].c[0].v );
                }

                self.subscriptor.alRecibirDias(result);
            }

            // Leer de google docs
            var e = document.createElement("script");
            e.src = 'http://spreadsheets.google.com/tq?tqx=responseHandler:MVCGooogleDocs.callback&tq=select%20A&key=tvL0_bf3YSbCW9dmKBU0neg&pub=1';
            e.type="text/javascript";
            document.getElementsByTagName("head")[0].appendChild(e); 
        };
    }
});

