$(document).ready(function() {

$("a[name^='del']").click(function(event) {
    event.preventDefault(); 
    $.ajax({url: $(this).attr("href"), type: "DELETE"});
    alert("Borrado Exitosamente");
    location.reload();
});

$("#sub_edit").click(function(event) {
    event.preventDefault(); 
    $.ajax({type: "PUT", data: $("#form_edit").serialize() });
    alert("Editado Exitosamente");
    //location.reload();
})


});