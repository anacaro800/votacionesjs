require "modelo"
require "vista"

class Controlador
 
  attr_accessor :modelo, :vista, :resultado, :keys, :profundidad
  
  def initialize(modelo,vista)
    @centro= Centro.new
	@mesa = Mesa.new
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
  
  def decidir(tipo)
	case tipo
	      when 1 then #postcentro 
		  when 2 then #delete centro
		  when 3 then #put centro
		  when 4 then #get centro
		  when 5 then #post mesa 
		  when 6 then #delete mesa
		  when 7 then #put mesa
		  when 8 then #get mesa
  end
end

