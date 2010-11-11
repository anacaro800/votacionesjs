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

  def printhtml(est, totales)
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


    padre = est.first[0] # Colombia
    hijos = est.first[1] #  ['antioquia', 'valle']
    html << "
      %div{:id => '#{padre}'}
       %h1 #{padre}"
    hijos.each do |hijo| #departamentos
      html << "
      %div{:id => '#{hijo}'}
       %h2 #{hijo}"
      if est.has_key?(hijo)
        est[hijo].each do |subhijo| #ciudades
          html << "
       %div{:id => '#{subhijo}'}
        %h4 #{subhijo}"
          if est.has_key?(subhijo)
            est[subhijo].each do |subhijo1| #centros
              html << "
        %div{:id => '#{subhijo1}'}
         %p #{subhijo1}"
              if est.has_key?(subhijo1)
                est[subhijo1].each do |subhijo2| #mesas
                  html << "
         %div{:id => '#{subhijo2}'}
          %p #{subhijo2}"
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
    # res['colombia'] = ['antioquia']
    # res['antioq'] = ['chigo']
    # res['chigo'] = ['plaza']
    # res['plaza'] = ['mesa 1']
    # res['mesa 1'] = {'jojo' => '1'}
    
    html << "
   %tr
    %td 
     %h1 Informaci&oacute;n Adicional
     %p Este sistema fue elaborado por Alejandro Cadavid Lopez, Ana Carolina Alvarez y Ruben Bueno Angel estudiantes de Ingenier&iacute;a de Sistemas de la universidad EAFIT."    
    engine = Haml::Engine.new(html)
    engine.render
    
  end

end
