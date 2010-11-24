require "modelo"
require "vista"

class Controlador
 
  def get(recurso, params)
    case recurso
    when "pais"
      unless params[id].nil?
        return Pais.find_by_id(params[id])
      else
        return Pais.all
      end
    when "departamento"
      unless params[id].nil?
        return Departamento.find_by_id(params[id])
      else
        return Departamento.all
      end
    when "ciudad"
      unless params[id].nil?
        return Ciudad.find_by_id(params[id])
      else
        return Ciudad.all
      end
    when "centro"
      unless params[id].nil?
        return Centro.find_by_id(params[id])
      else
        return Centro.all
      end
    when "mesa"
      unless params[id].nil?
        return Mesa.find_by_id(params[id])
      else
        return Mesa.all
      end
    when "candidato"
      unless params[id].nil?
        return Candidato.find_by_id(params[id])
      else
        return Candidato.all
      end
    when "voto"
      unless params[id].nil? or params[id_m].nil?
        return Voto.find_by_candidato_id_and_mesa_id(params[id], params[id_m])
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
      pass
      when "mesa"
      pass
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
      pass
      when "mesa"
      pass
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

