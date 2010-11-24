require "modelo"
require "vista"

class Controlador
 
  attr_accessor :modelo, :vista, :resultado, :keys, :profundidad
  
  def initialize(modelo,vista)
    @modelo = modelo
    @vista = vista
    @resultado = []
    @profundidad = 'pais'
    @keys = {}
  end
  
  def controlar
    key = @vista.getkey
    @modelo.obtenerdatos(key, @profundidad)
    res = @vista.printhtml(@modelo.resultados, @modelo.totales_acumulados)
  end
  
end

