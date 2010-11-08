require "rubygems"
require "haml"

class Vista

  attr_accessor :key
  
  def initialize(env)
    @key = env["QUERY_STRING"].split("=")[1]
  end
  
  def getkey
    @key	
  end

  def printhtml(estructura, totales)
    #estructura={"colombia"=>["ant","valle"],"antioquia"=>["chigo","pueblox"]}
    html = "%html
 %head
  %link{:rel=>'stylesheet',:href=>'hojaestilo.css'}
  %title Consolidado de Votaciones
 %body"
    
    html << "
  %table{:border=>'1',:align=>'center'} 
   %tr
    %td
     %img{:src=>'Imagen2.png',:width=>'786',:height=>'113'}
   %tr
    %td"
	
    html << "
     %table{:width=>'500'}
      %tr
       %th{:colspan=>'2',:scope=>'col'}>
        %h1 VOTOS TOTALES POR CANDIDATO
      %tr
       %td{:width=>'243',:class=>'contenido'}
        %h2 Candidato
       %td{:width=>'241',:class=>'contenido'}
        %h2 Votos"

    totales.each do |nombre,votos| 
      html<< "
      %tr
       %td{:class=>'contenido'}#{nombre}
       %td{:class=>'contenido'}#{votos}"
    end

    html << "
     %div{:id =>'Main'}
      %h1 TABLA RESULTADOS POR REGIONES"

    estructura.each do |padre,hijos|
      html << "
      %div{:id=>'#{padre}',:class=>'hyhh'}
       %h2 #{padre}"

      hijos.each do |i|
        unless i.is_a? Hash
          html << "\n       %div #{i}"
        end
      end

    end
    
    html << "
   %tr
    %td 
     %h1 Informaci&oacute;n Adicional
     %p Este sistema fue elaborado por Alejandro Cadavid Lopez, Ana Carolina Alvarez y Ruben Bueno Angel estudiantes de Ingenier&iacute;a de Sistemas de la universidad EAFIT."    
    engine = Haml::Engine.new(html)
    engine.render
    
  end
end
