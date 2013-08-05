(function() {
  var myScript;
  if(typeof _ == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
  if(typeof jQuery == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='http://code.jquery.com/jquery-1.10.2.min.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
  if (typeof ____l0g____ == 'undefined') {
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='https://rawgithub.com/idibidiart/crowbar/master/log.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
  if(typeof ____cr0wB6r____ == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='https://rawgithub.com/idibidiart/crowbar/master/crowbar.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
})()
