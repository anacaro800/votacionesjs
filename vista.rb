class Vista
  
  attr_accessor :key
  
  def initialize(env)
    @key = env["QUERY_STRING"].split("=")[1]
  end
  
  def getkey
    @key	
  end
  
end
