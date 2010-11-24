require "controlador"
require "vista"
require "modelo"

class Aplicacion

  def call(env)  
    req = Rack::Request.new(env)
    modelo = Modelo.new
    vista = Vista.new(req)
    controlador = Controlador.new(modelo,vista)
    if env['PATH_INFO'] == "/"
      [200, {"Content-Type" => "text/html"}, File.open("form.html")]
    elsif env['PATH_INFO'] == "/go"
      res = controlador.controlar
      [200, {"Content-Type" => "text/html"}, res]
    elsif env['PATH_INFO'] == "/hojaestilo.css"
      [200, {"Content-Type" => "text/css"}, File.open("hojaestilo.css")]
    elsif env['PATH_INFO'] == "/Imagen2.png"
      [200, {"Content-Type" => "image/png"}, File.open("Imagen2.png")]
    end
  end

end
