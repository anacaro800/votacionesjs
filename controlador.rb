require "modelo"
require "vista"

class Controlador
 
  attr_accessor :modelo
  attr_accessor :vista
  
  def initialize(modelo,vista)
    @modelo = modelo
    @vista = vista
    controlar
  end
  
  def controlar
    key = @vista.getkey
    @modelo.obtenerdatos(key)
  end
  
end

