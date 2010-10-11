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
        p.obtenerDias = function(key) {
            var self = this;
            MVCGooogleDocs.callback = function(root) {

                var rows = root.table.rows;
                var result = [];
		var found = false;
		
		// Aqui leemos la primera.

                for (i=0; i<rows.length; i++) {
		    alert(rows[i].c[1].v)
		    if (found)
		    	result.push( rows[i].c[1].v );
		    if (rows[i].c[0].v == "" & found != true) {
			if (rows[i+1].c[0].v != "") {
			    found = true;
			}
		    }
                }
                self.subscriptor.alRecibirDias(result);
            }

            // Leer de google docs
	    
            var e = document.createElement("script");
            e.src = 'http://spreadsheets.google.com/tq?tqx=responseHandler:MVCGooogleDocs.callback&tq=select%20*&key='+key+'&pub=1';
            e.type="text/javascript";
            document.getElementsByTagName("head")[0].appendChild(e); 
        };
    }
});
