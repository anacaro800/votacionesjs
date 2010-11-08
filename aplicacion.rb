require "controlador"
require "vista"
require "modelo"

class Aplicacion

  def call(env)  
    modelo = Modelo.new
    vista = Vista.new(env)
    controlador = Controlador.new(modelo,vista)
    res = controlador.controlar
    [200, {"Content-Type" => "text/html"}, res]
  end

end
