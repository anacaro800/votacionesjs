require "controlador"
require "vista"
require "modelo"

class Aplicacion

  def call(env)  
    modelo = Modelo.new
    vista = Vista.new(env)
    controlador = Controlador.new(vista,modelo)
    [200, {"Content-Type" => "text/plain"}, "hola"]
  end

end
