(function() {
  if(typeof d3 == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='ttp://d3js.org/d3.v3.min.js ';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
  if(typeof ____crowbar____ == 'undefined'){
    myScript=document.createElement('SCRIPT');
    myScript.type='text/javascript';
    myScript.src='https://rawgithub.com/idibidiart/crowbar/master/crowbar.js';
    document.getElementsByTagName('body')[0].appendChild(myScript);
  }
})()
