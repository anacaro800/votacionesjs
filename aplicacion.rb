require "controlador"
require "vista"
require "modelo"

class Aplicacion

  def call(env)  
    req = Rack::Request.new(env)
    modelo = Modelo.new
    vista = Vista.new(req)
    controlador = Controlador.new(modelo,vista)
	
	 method = env["REQUEST_METHOD"]
	 tipo=env['PATH_INFO'] 
	 
	 if (tipo== "/centro")
	  status, msg = case method
              when "POST" then Controlador.Decidir(1)
              when "DELETE" then Controlador.Decidir(2)
              when "PUT" then Controlador.Decidir(3)
              when "GET" then Controlador.Decidir(4)
              else [400, "Metodo no soportado"]
	 
	 end
	 else if(tipo=="/mesa")
	  status, msg = case method
              when "POST" then Controlador.Decidir(5)
              when "DELETE" then Controlador.Decidir(6)
              when "PUT" then Controlador.Decidir(7)
              when "GET" then Controlador.Decidir(8)
              else [400, "Metodo no soportado"]
	 end
	 
	
	 
	 
	 
	 
	
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
