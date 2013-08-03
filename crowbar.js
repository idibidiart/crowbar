(function() {

____cr0wB6r____ = {}

var currEl;
  
  function diff(template, override) {
    var ret = {};
    for (var name in template) {
        if (name in override) {
            if (_.isObject(override[name]) && !_.isArray(override[name])) {
                var diff = difference(template[name], override[name]);
                if (!_.isEmpty(diff)) {
                    ret[name] = diff;
                }
            } else if (!_.isEqual(template[name], override[name])) {
                ret[name] = override[name];
            }
        }
    }
    return ret;
  }
  
  function camel(a,b){
    return b.toUpperCase();
  }
  
  function style(el) {
    
      var styleDeclaration;
      var styleObject = {}, styleObjectSandboxed = {};
      
      styleDeclaration = window.getComputedStyle(el, null);
      
      for (var j = 0; j < styleDeclaration.length; j++){
          var prop = styleDeclaration[j];
          var cProp = prop.replace(/\-([a-z])/g, camel);
          var val = styleDeclaration.getPropertyValue(prop);
          styleObject[cProp] = val;
      }
      
      //var ifrm = document.createElement("IFRAME")
      //
      
      return styleObject; 
  }
  
  window.onmouseover = function(e) {
    if (currEl) { 
      $(currEl).css({outline: 'none'}) 
    } 
    currEl = e.target;
      $(currEl).css({outline: 'red 2px solid'})             
  }
  
  window.onkeyup = function(e) {
    
    var key = e.keyCode || window.event.keyCode
    
    if (key == 83) {
      
      console.log(currEl, style(currEl))
      
      $(currEl).find('*').each(function(){
        console.log(this, style(this));
      }); 
      
    } 
  }
  
})()
