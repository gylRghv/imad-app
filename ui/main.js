var button = document.getElementByID('counter');
var counter = 0;

button.onclick = function(){
    var request  = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){
          
          if(request.status === 200){
            counter = request.responseText;
            var span = document.getElementById('count');  
            span.innerHtml = counter.toString();  
          }
      }  
        
    };
    
    request.open('get','http://gylrghv.imad.hasura-app.io/counter', true);
    request.send(null);
};