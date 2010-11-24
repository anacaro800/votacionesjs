require "rubygems"
require "haml"
require "gchart"

class Vista

  attr_accessor :key
  
  def initialize(req)
    @key = req.params["key"]
  end
  
  def getkey
    @key	
  end

  def graficar(totales)
    Gchart.pie_3d(:title => 'RESULTADOS TOTALES', :size => '400x200',
                  :data => totales.values, :labels => totales.keys)
  end

  def printhtml(est, totales)
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

    # html << "%img{:src=>'"
    # html << graficar(totales)
    # html << "',:width=>'400',:height=>'200'}"
    
    html << "
     %div{:id =>'main', :class => 'data'}
      %h1 TABLA RESULTADOS POR REGIONES"


    padre = est.first[0] # Colombia
    hijos = est.first[1] #  ['antioquia', 'valle']
    html << "
      %div{:id => '#{padre}', :class => 'data'}
       %h1 #{padre}"
    hijos.each do |hijo| #departamentos
      html << "
      %div{:id => '#{hijo}', :class => 'data'}
       %h2 #{hijo}"
      if est.has_key?(hijo)
        est[hijo].each do |subhijo| #ciudades
          html << "
       %div{:id => '#{subhijo}', :class => 'data'}
        %h5 #{subhijo}"
          if est.has_key?(subhijo)
            est[subhijo].each do |subhijo1| #centros
              html << "
        %div{:id => '#{subhijo1}', :class => 'data'}
         %h3 #{subhijo1}"
              if est.has_key?(subhijo1)
                est[subhijo1].each do |subhijo2| #mesas
                  html << "
         %div{:id => '#{subhijo2}', :class => 'data'}
          %h4 #{subhijo2}"
                  if est.has_key?(subhijo2)
                    est[subhijo2].each do |res| #resultados
                      res.each_pair do |p,v|
                        html << "
          %p #{p} = #{v}"
                      end
                    end
                  end
                end
              end
            end
          end
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
