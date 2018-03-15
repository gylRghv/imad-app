var button = document.getElementById('counter');
var counter = 0;

button.onclick = function(){
    //create a request variable
    var request  = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){
          
            if(request.status === 200){
                
                counter = request.responseText;
                var span = document.getElementById('count');  
                span.innerHTML = counter.toString();
                
            }
        }
    };
    
    //make a request
    request.open('GET','http://gylrghv.imad.hasura-app.io/counter', true);
    request.send(null);
};

var namelist = document.getElementById('name');
var name = namelist.value;
alert(name);
var submit = document.getElementById('submit_btn');

submit.onclick  = function(){
    //make a request to server
    var request  = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){
          
            if(request.status === 200){
                var names = request.responseText; //names is a string -> to an array (in this case)
                names = JSON.parse(names);
                var list = '';
                for (var i=0; i< names.length;i++){
                    list += '<li>'+names[i]+'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list; 
            }
        }
    };
    
    //make a request
    request.open('GET','http://gylrghv.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    
    var names = [];
   
};