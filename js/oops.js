var Oops = {
    clone: function( obj ) {
        var $ = function(){};
        $.prototype = obj; 
        return new $();
    },
    constructor: function( p ){

        var result = null;
        var base = null;

        if ( p.init === undefined ) {
            result = function(){};
        }
        else {
            result = p.init;
        }
        
        if ( p.base === undefined ) {
            base = Object;
        }
        else {
            base = p.base;
        }
        
        result.prototype = new base();

        if ( p.augment !== undefined ) {
            for( i in p.augment ) {
                var clazz = p.augment[i];
                for( m in clazz.prototype )
                    result.prototype[m] = clazz.prototype[m];
            }
        }

        if (p.proto !== undefined) { 
            p.proto( result.prototype );
        }
        
        return result;
    }
};
