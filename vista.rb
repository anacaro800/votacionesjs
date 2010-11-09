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
    
    # html << "
    #   %div{:id=>'#{padre}',:class=>'hyhh'}
    #    %h2 #{padre}"
    # unless hijo1.is_a? Hash or hijo1.start_with? "mesa"
    #   html << "\n       %div #{i}"
    # else 


    # res['colombia'] = ['antioquia']
    # res['antioq'] = ['chigo']
    # res['chigo'] = ['plaza']
    # res['plaza'] = ['mesa 1']
    # res['mesa 1'] = {'jojo' => '1'}
    estructura.keys.each do |padre|      
      # padre = colombia
      html << "
        %div{:id=>'#{padre}',:class=>'hyhh'}
         %h2 #{padre}"
      estructura[padre].each do |hijo1|
        # hijo1 = antiouqi
        html << "\n       %div #{hijo1}"
        # estructura[hijo1].each do |hijo2|
        #   # hijo2 = chigo
        #   html << "\n       %div #{hijo2}
        #                      %h2 #{hijo2}"
        #   # estructura[hijo2].each do |hijo3|
        #   #   # hijo3 = plaza
        #   #   html << "\n       %div #{hijo3}
        #   #                      %h2 #{hijo3}"
        #   #   # estructura[hijo3].each do |hijo4|
        #   #   #   # hijo4 = mesa1
        #   #   #   html << "\n       %div #{hijo4}
        #   #   #                      %h2 #{hijo3}"
        #   #   # end
        #   # end
          
        # end
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
