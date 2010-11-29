require "rubygems"
gem "activerecord"
require 'active_record'

# ActiveRecord::Base.pluralize_table_names = false
# ActiveRecord::Base.establish_connection(:adapter => "mysql2",
#   :host => "localhost",
#   :username => "root",
#   :password => "root",
#   :database => "votaciones")

class Pais < ActiveRecord::Base
  set_table_name 'pais'
  has_many :departamento
end

class Departamento < ActiveRecord::Base
  set_table_name 'departamento'
  belongs_to :pais
  has_many :ciudad
end

class Ciudad < ActiveRecord::Base
  set_table_name 'ciudad'
  belongs_to :departamento
  has_many :centro
end

class Centro < ActiveRecord::Base
  set_table_name 'centro'
  belongs_to :ciudad
  has_many :mesa
end

class Mesa < ActiveRecord::Base
  set_table_name 'mesa'
  belongs_to :centro
  has_many :votos
end

class Voto < ActiveRecord::Base
  set_table_name 'voto'
  belongs_to :mesa
  belongs_to :candidato
end

class Candidato < ActiveRecord::Base
  set_table_name 'candidato'
  has_many :voto
end

# d = Departamento.find_by_id(1)
# ci = Ciudad.new(:nombre => "medellin", :departamento => d)
# ci.save
# ce = Centro.new(:nombre => "plaza", :ciudad_id => 1)
# ce.save
# m = Mesa.new(:nombre => "mesa 1", :centro => ce)
# m.save
# candidato = Candidato.new(:nombre => "Alejo")
# candidato.save
# voto = Voto.new(:mesa => m, :candidato => candidato, :votos => 10)
# voto.save
# mesa =  Mesa.find_by_id(4)
# mesa.votos.each do |v|
#   puts v.candidato.nombre
# end
