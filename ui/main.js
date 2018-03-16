var submit = document.getElementById('login_btn');

submit.onclick  = function(){
    
   
    //create a request object
    var request  = new XMLHttpRequest();
    //capture the response and store it in a variable 
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){
          
            if(request.status === 200){
              console.log("user logged in");
              alert("Log-In successful");
            } else if (request.status === 403){
                alert("uername/password is wrong");                
            } else if (request.status === 500 ){
                alert("something went wrong on server!");
            }
        }
    };
    
    //make a request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://gylrghv.imad.hasura-app.io/login', true);
    request.send(JSON.stringify({username: useranme, password: password}));

};


/*var button = document.getElementById('counter');
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
*/
/*var submit = document.getElementById('submit_btn');

submit.onclick  = function(){
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    //alert(name);
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

};*/
