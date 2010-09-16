//js apps/app/compress.js

include = {
    done : function(total){
        var compressed = include.collectAndCompress(total);
        new include.File('apps/app/production.js').save(compressed);
        print("Compressed to 'apps/app/production.js'.");
        include.plugins('documentation')
        var app = new include.Doc.Application(total, "app");
        app.generate();
        print("Generated docs.");
        if(!window.MVCDontQuit) quit();
    },
    env: "compress"
}

load('jmvc/rhino/env.js');
Envjs('apps/app/index.html', {scriptTypes : {"text/javascript" : true,"text/envjs" : true}});