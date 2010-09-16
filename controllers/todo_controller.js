$.Controller.extend('TodoController',
{
    onDocument: true
},
{
	mouseover: function(el){
		el.addClass("mouseover")
	},
	mouseout: function(el){
		el.removeClass("mouseover")
	}
});
