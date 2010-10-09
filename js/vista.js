var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.SubsVistaInterface = Oops.constructor({
    proto: function(p) {
        p.alClickCargar = function() {
            console.log("alClickCargar");
        };
    }
});

MVCGooogleDocs.Vista = Oops.constructor({
    init: function( panel ) {
        this.panel = panel;
        this.boton = panel.getElementsByTagName("button")[0];
        this.subscriptor = new MVCGooogleDocs.SubsVistaInterface;
        var self = this;

        this.boton.onclick = function() {
            self.subscriptor.alClickCargar();
        };

    },
    proto: function(p) {
        p.setSubscriptor = function( obj ) {
            this.subscriptor = obj;
        };
        p.mostrarDias = function( dias ) {
            var contenido = "";
            for (d in dias)
                contenido = contenido + "<li>" + dias[d] + "</li>";

            this.panel.getElementsByTagName("ul")[0].innerHTML = contenido;
        };
    }
});

