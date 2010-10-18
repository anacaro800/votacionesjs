require "rubygems"
require "json"
require "open-uri"

class Modelo

  def obtenerdatos(key)
    data_raw = open('http://spreadsheets.google.com/tq?key='+key+'&pub=1')
    data = data_raw.read
    data = data.split("(")[1].split(")")[0]
    data = data.gsub("'", '"')
    data = data.gsub(/([a-z]+):/, '"\1":')   
  end
  
end
