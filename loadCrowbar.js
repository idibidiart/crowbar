(function() {
  var myScript;
  if(typeof jQuery == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='http://code.jquery.com/jquery-1.10.2.min.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
  if (typeof ____log____ == 'undefined') {
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='https://rawgithub.com/idibidiart/crowbar/master/log.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
  if(typeof ____crowbar____ == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='https://rawgithub.com/idibidiart/crowbar/master/crowbar.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
})()
