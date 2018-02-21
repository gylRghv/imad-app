var button = document.getElementByID('counter');

button.onclick = function(){
    var request  = new XMLHttpRequest();
    var counter = 0;
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){
          
          if(request.status === 200){
            counter = request.responseText;
            var span = document.getElemntById('count');  
            span.innerHtml = counter;  
          }
      }  
        
    };
    
    request.get('http://gylrghv.imad.hasura-app.io/counter', true);
    request.send(null);
};