require "rubygems"
require "haml"
require "gchart"

class Vista

  def initialize

  end

  def mesas(template, m, c)
    tp = File.read(template)
    engine = Haml::Engine.new(tp)
    engine.render(Object.new, {:mesas => m, :centros => c})
  end

  def mesa_id(template, m, c)
    tp = File.read(template)
    engine = Haml::Engine.new(tp)
    engine.render(Object.new, {:mesa => m, :centros => c})
  end

  def centros(template, c, d)
    tp = File.read(template)
    engine = Haml::Engine.new(tp)
    engine.render(Object.new, {:centros => c, :ciudades => d})
  end

  def centro_id(template, c, ci)
    tp = File.read(template)
    engine = Haml::Engine.new(tp)
    engine.render(Object.new, {:centro => c, :ciudades => ci})
  end

end
