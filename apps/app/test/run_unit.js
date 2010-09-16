// load('apps/app/run_unit.js')

include = {
    env: "test",
    done : function(){
        print('\n\nRUNNING UNIT TESTS\nremember to update apps/app/index.html\n');
        
        OpenAjax.hub.subscribe("jquery.test.test.start", jQuery.Test.report.startTest);
        OpenAjax.hub.subscribe("jquery.test.case.complete", jQuery.Test.report.caseComplete);
        OpenAjax.hub.subscribe("jquery.test.test.complete", jQuery.Test.report.testCompete);
        OpenAjax.hub.subscribe("jquery.test.unit.complete", jQuery.Test.report.unitTestsComplete);
        jQuery.Test.Unit.runAll();
    }
}


load('jmvc/rhino/env.js');
Envjs('apps/app/index.html', {scriptTypes : {"text/javascript" : true,"text/envjs" : true}});
