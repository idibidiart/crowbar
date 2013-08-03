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
            return cssText + '\n\n';
        }
        return "None.\n\n";
    }
  
  window.onmouseover = function(e) {

    if (e.target.tagName.toLowerCase() == "html"
            || e.target.tagName.toLowerCase() == "body")
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

      console.log("HTML:\n\n" + currEl.outerHTML + "\n\n")

      console.log("Matched CSS Rules:\n\n")

      console.log($(currEl).getFullPath(true))

      console.log(getMatchedRules(currEl))

      $(currEl).find('*').each(function(){

          console.log($(this).getFullPath(true))

          console.log(getMatchedRules(this))

      });
    }

    // p for parent
    if (key == 80) {

        if (currEl.parentNode.toLowerCase() == "body")
            return;

        $(currEl).css({outline: 'none'})

        currEl = currEl.parentNode;

        $(currEl).css({outline: 'red 2px solid'})
    }

  }
  
})();

(function($){
    $.fn.extend({
        getFullPath: function(stopAtBody){
            stopAtBody = stopAtBody || false;
            function traverseUp(el){
                var result = el.tagName + ':eq(' + $(el).index() + ')',
                    pare = $(el).parent()[0];
                if (pare.tagName !== undefined && (!stopAtBody || pare.tagName !== 'BODY')){
                    result = [traverseUp(pare), result].join(' ');
                }
                return result;
            };
            return this.length > 0 ? traverseUp(this[0]) : '';
        }
    });
})(jQuery);
