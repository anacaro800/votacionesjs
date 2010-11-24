require "rubygems"
require "json"
require "openssl"
require "net/https"
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

class Modelo

  attr_accessor :profundidad, :resultados, :totales_acumulados

  def initialize
    @profundidad = {'pais' => 'departamento',
      'departamento' => 'ciudad',
      'ciudad' => 'centro',
      'centro' => 'mesa',
      'mesa' => 'done'}
    @resultados = {}
    @totales_acumulados = {}
  end

  def obtenerdatos(key, profundidad, father="colombia")
    resultados_parciales = {}
    return if key.nil?
    # HTTP Request
    url_old = 'http://spreadsheets.google.com/tq?key='+key+'&pub=1'
    url = URI.parse(url_old)
    http = Net::HTTP.new(url.host, url.port)
    request = Net::HTTP::Get.new(url.request_uri)
    response = http.request(request)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    data_raw = response.body
 
    # Transform to JSON
    # puts "Datos JSON: "+data_raw
    data = data_raw
    data = data.split('(')[1].split(")")[0]
    data = data.gsub("'", '"')
    data = data.gsub(/([a-z]+):/, '"\1":')
    result = JSON.parse(data)

    title = @profundidad[profundidad]
    # puts "Profundidad: "+title

    # Agregar comprobaciones
    start = 0

    for i in (1..result['table']['rows'].size-1)
      start = i+1
      break if result['table']['rows'][i]['c'][0]['v'] == "" and result['table']['rows'][i+1]['c'][0]['v'] != ""
    end

    keys = result['table']['rows'][start..-1]

    # Recursion    
    if title == 'done'
      keys.each do |key|
        if key['c'][1]['f'] != nil
          if @resultados[father].nil?
            @resultados[father] = []
          end
          @resultados[father].push({key['c'][0]['v'] => key['c'][1]['f']})
          @totales_acumulados[key['c'][0]['v']] = 0 if @totales_acumulados[key['c'][0]['v']] == nil
          @totales_acumulados[key['c'][0]['v']] += key['c'][1]['f'].to_i
        end
      end
    else
      keys.each do |key|
        if key['c'][1]['v'].strip != "" and not key['c'][1]['v'].nil?
          if @resultados[father].nil?
            @resultados[father] = []
          end
          #puts "Padre al que se le agregan hijos: "+father
          @resultados[father].push(key['c'][0]['v'])
          #puts "Los hijos: "+@resultados[father].join(" ,")
          oldfather = father
          father = key['c'][0]['v']
          #puts "Nuevo padre que se pasa a la funcion: "+father
          obtenerdatos(key['c'][1]['v'], title, father)
          father = oldfather
        end
      end
    end
  end
end
