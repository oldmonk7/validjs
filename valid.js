
( function(){

  

  //Constructor
  function Valid(){
    if (!(this instanceof Valid)) {
            return new Valid();
        }

    return this;      
  }

  Valid.prototype.VERSION = "0.0.1";


  //Validate Email
  Valid.prototype.validateEmail = function(inputEmail){
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(inputEmail);
  };

  //Validate Name
  Valid.prototype.validateName = function(inputName){
    var nameRegex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$/;
    return (nameRegex.test(inputName));
  };

  //Validate SSN
  Valid.prototype.validateSSN = function(inputSSN){
    var ssnRegex = /(\d{3}-\d{2}|\*{3}-\*{2})-\d{4}/;
    return (ssnRegex.test(inputSSN));
  };

  //Validate Phone
  Valid.prototype.validatePhone = function(inputPhone){
    var phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/g;
    return (phoneRegex.test(inputPhone));
  };

  //Validate DOB
  Valid.prototype.validateDOB = function(inputDOB){
    var dobRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return (dobRegex.test(inputDOB));
  };

  //Validate URL
  Valid.prototype.validateURL = function(inputURL){
    var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
    return (urlRegex.test(inputURL));
  };
  //Validate Credit Card
  // Supports 'Visa', 'MasterCard', 'Discover', 'American Express', 'Diners Club', 'JCB'
  Valid.prototype.validateCC = function(inputCC){
    var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

    return (ccRegex.test(inputCC));
  };

  //Helper Function to test if the browser has local storage
  function lsTest(){
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
  }

  // Check for the quantative strength of the password, and attaches a value to progressbar element of HTML5
  // Also checks the quality of the password
  Valid.prototype.passStrength = function(keyUpValue, progressElementID, qualityID){
    
        var level = 0;
        var p1 = /[a-z]/;
        var p2 = /[A-Z]/;
        var p3 = /[0-9]/;
        var p4 = /[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\|\\\;\:\'\"\,\<\.\>\/\?\`\~]/;
        if(keyUpValue.length>=8)
          level++;
        if(p1.test(keyUpValue))
          level++;
        if(p2.test(keyUpValue))
          level++;
        if(p3.test(keyUpValue))
          level++;
        if(p4.test(keyUpValue))
          level++;
        prog_bar(level,0,5);
     
      var cur_val = level;
      var min_val = 0;
      var max_val = 5;

   
      var str = "",res = 0;
      if(cur_val>=min_val && cur_val<=max_val){
        
        if(min_val<max_val){
          res = ((cur_val-min_val)/(max_val-min_val))*100;
          res = Math.floor(res);
        }
        else {
          res = 0;
        }
      }
      else {
        res = 0;
      }
      
      if(res<=40)
        str = "Weak";
      else if(res<=60)
        str = "Good";
      else if(res<=80)
        str = "Strong";
      else
        str = "Excellent";
      var d = document.getElementById(progressElementID);
      d.setAttribute("value",res);
    
      document.getElementById('qualityID').innerHTML = str;
    
   };     

  Valid.prototype.matchPassword =  function(originalPasswordID, confirmPasswordID, matchedID){
        var original = document.getElementById(originalPasswordID).value;
        var confirm = document.getElementById(confirmPasswordID).value;
        if(original === confirm ){
          document.getElementById(matchedID).innerHTML = "Matched";
        }
      };

  //Add to Local Storage    
  Valid.prototype.addToLocalStorage = function(key, valueObject){
          
         if(lsTest()){ 
          if(key!=null){
          
          localStorage.setItem(key, valueObject );
          return true;
          }  
          else{
            console.log("No Local Storage");
            return false;
          }

        }
  };      

  // Remove from LocalStorage
  Valid.prototype.removeFromLocalStorage = function(key){
          
         if(lsTest()){ 
          if(key!=null){
          
          localStorage.removeItem(key);
          return true;
          }  
          else{
            console.log("No Local Storage");
            return false;
          }

        }
  };    

  Valid.prototype.setOffLineMessage = function(msgDivID, msg){
        window.addEventListener("offline", function(e) {
          document.getElementById(msgDivID).innerHTML = msg || 
          "You are offline but your data has been saved";
        })
  };

  Valid.prototype.setOnLineMessage  = function(msgDivID, msg){   
      window.addEventListener("online", function(e) {document.getElementById(msgDivID).innerHTML = msg || 
        "Welcome back Online";
        })
  };    

  // If there is a window object, that at least has a document property,
    // instantiate and define chance on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Valid = Valid;
        window.valid = new Valid();
    }

})();//Self Invoking Function