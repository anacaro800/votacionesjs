include.resources();
include.engines();
include.plugins(
    'controller','view'
    );

include(function(){ //runs after prior includes are loaded
  include.models();
  include.controllers('todo');
  include.views();
});