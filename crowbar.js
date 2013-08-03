(function() {

  ____cr0wB6r____ = {};

  var currEl;
  
  function difference(template, override) {
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

  function getStyle(el, iframe) {
      var styleDeclaration;
      var styleObject = {};

      console.log(el)

      if (iframe) {
          debugger;
          styleDeclaration =  iframe.contentWindow.getComputedStyle(el, null)
      } else {
          styleDeclaration =  window.getComputedStyle(el, null);
      }

      for (var j = 0; j < styleDeclaration.length; j++){
          var prop = styleDeclaration[j];
          var cProp = prop.replace(/\-([a-z])/g, camel);
          var val = styleDeclaration.getPropertyValue(prop);
          styleObject[cProp] = val;
      }

      return JSON.stringify(styleObject);
  }

  function getSandboxedStyle(el) {

      var ifrm = $('<iframe seamless style="margin-left: -1000px; overflow: visible !important"></iframe>').appendTo('body')

      ifrm
          .contents()
          .find(el.tagName == 'body' ? 'html' : 'body')
          .html(el.outerHTML.replace(/\<iframe(.*)\<\/iframe\>/i, ""))

      return getStyle($(el.tagName, $(ifrm).contents())[0], ifrm[0])
  }
  
  window.onmouseover = function(e) {

    if (!e.target.parentNode || !e.target.parentNode.tagName ||
        (e.target.parentNode.tagName.toLowerCase() != "div" &&
        e.target.parentNode.tagName.toLowerCase() != "body" &&
        e.target.parentNode.tagName.toLowerCase() != "html"))
            return;

    if (currEl) { 
      $(currEl).css({outline: 'none'}) 
    }

    currEl = e.target;

    $(currEl).css({outline: 'red 2px solid'})
  }
  
  window.onkeyup = function(e) {

   if (!currEl) return;

   var key = e.keyCode || window.event.keyCode

    // s for select
    if (key == 83) {

      $(currEl).css({outline: 'none'})

      var diff;

      diff = difference(JSON.parse(getSandboxedStyle(currEl)), JSON.parse(getStyle(currEl)))

      console.log(JSON.stringify(diff))

//      $(currEl).css(JSON.parse(style(currEl)))
//
//      $(currEl).find('*').each(function(){
//
//          if (this.tagName.toLowerCase() == "head" ||
//              this.tagName.toLowerCase() == "meta" ||
//              this.tagName.toLowerCase() == "title" ||
//              this.tagName.toLowerCase() == "link" ||
//              this.tagName.toLowerCase() == "script")
//                return true; //continue
//
//          $(this).css(JSON.parse(style(this)))
//      });
    }

    // p for parent
    if (key == 80) {

        if (!currEl.parentNode || !currEl.parentNode.tagName ||
            (currEl.parentNode.tagName.toLowerCase() != "div" &&
            currEl.parentNode.tagName.toLowerCase() != "body" &&
            currEl.parentNode.tagName.toLowerCase() != "html"))
            return;
        
        $(currEl).css({outline: 'none'})

        currEl = currEl.parentNode;

        $(currEl).css({outline: 'red 2px solid'})
    }

  }
  
})()
