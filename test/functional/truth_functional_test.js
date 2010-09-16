jQuery.Test.Functional.extend('Tests.Functional.Truth',{
    test_truth: function(){
        this.driver.exists('body', this.timeoutCallback('ready', 5000));
    },
    ready : function(){
        this.assert(true)
    }
});