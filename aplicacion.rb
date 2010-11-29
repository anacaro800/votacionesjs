require "controlador"
require "vista"
require "modelo"

ActiveRecord::Base.pluralize_table_names = false
ActiveRecord::Base.establish_connection(:adapter => "mysql2",
  :host => "localhost",
  :username => "root",
  :password => "root",
  :database => "votaciones")

class Aplicacion

  def call(env)  
    req = Rack::Request.new(env)
    vista = Vista.new()
    controlador = Controlador.new(vista)
    method = env["REQUEST_METHOD"]
    recurso_url = env['PATH_INFO']

    return [200, {"Content-Type" => "text/javascript"}, File.read("comandos.js")] if recurso_url == "/javascripts/comandos.js"
    recurso_url.slice!(0)
    puts "URL: "+recurso_url
    recurso, id = recurso_url.split("/")
    params = {"id" => id, "data" => req.params}
    puts params['data']

    status, msg = case method
                  when "POST" then controlador.post(recurso, params)
                  when "DELETE" then controlador.delete(recurso, params)
                  when "PUT" then controlador.put(recurso, params)
                  when "GET" then controlador.get(recurso, params)
                  else [400, "Metodo no soportado"]
                  end

    [status, {"Content-Type" => "text/html"}, msg]
  end
  
end
