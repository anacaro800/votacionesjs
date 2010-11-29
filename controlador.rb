require 'modelo'

class Controlador
 
  attr_accessor :vista

  def initialize(vista)
    @vista = vista
  end
  
  def get(recurso, params)
    case recurso
    when "pais"
      unless params['id'].nil?
        return [200, Pais.find_by_id(params['id']).to_json]
      else
        return [200, Pais.all.to_json]
      end
    when "departamento"
      unless params['id'].nil?
        return [200, Departamento.find_by_id(params['id']).to_json]
      else
        return [200, Departamento.all.to_json]
      end
    when "ciudad"
      unless params['id'].nil?
        return [200, Ciudad.find_by_id(params['id']).to_json]
      else
        return [200, Ciudad.all.to_json]
      end
    when "centro"
      unless params['id'].nil?
        centro =  Centro.find_by_id(params['id'])
        ciudades = Ciudad.all
        [200, @vista.centro_id("html/centroedit.html", centro, ciudades)]
      else
        centros = Centro.all
        ciudades = Ciudad.all
        [200, @vista.centros("html/centros.html", centros, ciudades)]
      end
    when "mesa"
      unless params['id'].nil?
        mesa =  Mesa.find_by_id(params['id'])
        centros = Centro.all
        [200, @vista.mesa_id("html/mesaedit.html", mesa, centros)]
      else
        centros = Centro.all
        mesas = Mesa.all
        [200, @vista.mesas("html/mesas.html", mesas, centros)]
      end
    when "candidato"
      unless params['id'].nil?
        return Candidato.find_by_id(params['id'])
      else
        return Candidato.all
      end
    when "voto"
      unless params['id'].nil? or params['id_m'].nil?
        return Voto.find_by_candidato_id_and_mesa_id(params['id'], params['id_m'])
      else
        return Voto.all
      end
    end
  end
  
  def post(recurso, params)
    case recurso
      when "pais"
      pass
      when "departamento"
      pass
      when "ciudad"
      pass
      when "centro"
      ciudad = Ciudad.find_by_id(params['data']['ciudad'])
      centro = Centro.new(:nombre => params['data']['nombre'], :ciudad => ciudad)
      centro.save
      [200, "Centro creado exitosamente"]
      when "mesa"
      centro = Centro.find_by_id(params['data']['centro'])
      mesa = Mesa.new(:nombre => params['data']['nombre'], :centro => centro)
      mesa.save
      [200, "Mesa creada exitosamente"]
      when "candidato"
      pass
      when "voto"
      pass
    end
  end

  def delete(recurso, params)
    case recurso
      when "pais"
      pass
      when "departamento"
      pass
      when "ciudad"
      pass
      when "centro"
      Centro.destroy(params['id'])
      [200, "Borrado exitosamente"]
      when "mesa"
      Mesa.destroy(params['id'])
      [200, "Borrado exitosamente"]
      when "candidato"
      pass
      when "voto"
      pass
    end
  end

  def put(recurso, params)
    case recurso
      when "pais"
      pass
      when "departamento"
      pass
      when "ciudad"
      pass
      when "centro"
      pass
      when "mesa"
      pass
      when "candidato"
      pass
      when "voto"
      pass
    end
  end

end

