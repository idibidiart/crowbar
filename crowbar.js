(function() {

  ____cr0wB6r____ = {};

  var currEl;

    function getMatchedRules(domNode) {
        var cssText = "";
        var cssRuleList = window.getMatchedCSSRules(domNode, '');
        if (cssRuleList) {
            for (var i = 0; i < cssRuleList.length; i++) {
                cssText += " " + cssRuleList[i].cssText;
            }
            return "Matched CSS Rules:\n\n" + cssText + "\n\n";
        }
        return "No Matched CSS Rules\n\n";
    }
  
  window.onmouseover = function(e) {

    if (!e.target.parentNode || !e.target.parentNode.tagName)
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

      $(currEl).attr("style", $(currEl).attr("style").replace(/outline:(.*);/, ""))

      console.log($(currEl)
          .parentsUntil('body')
          .andSelf()
          .map(function() {
              return this.nodeName + ':eq(' + $(this).index() + ')';
          }).get().join('>') + '\n\n'
      )

      console.log(getMatchedRules(currEl))

      console.log("HTML:\n\n" + currEl.outerHTML)

      //$(currEl).find('*').each(function(){


      //});
    }

    // p for parent
    if (key == 80) {

        if (currEl.tagName.toLowerCase() == "body")
            return;
        
        $(currEl).css({outline: 'none'})

        currEl = currEl.parentNode;

        $(currEl).css({outline: 'red 2px solid'})
    }

  }
  
})()
