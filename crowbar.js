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

       var log = "<!doctype html>\n<html>\n<meta charset='UTF-8'/>\n<style>\n"

       log += getMatchedRules(currEl) + "\n"

       $(currEl).find('*').each(function(){

           log += getMatchedRules(this) + "\n"

       });

      log += "</style>\n<body>\n"
            + currEl.outerHTML + "\n"

      log += "</body></html>"

      console.log(log)

   }

   // x for extra details
   if (key == 88) {

      $(currEl).attr("style", $(currEl).attr("style").replace(/outline:(.*);/, ""))

      var log =  "HTML:\n\n" + currEl.outerHTML + "\n\n";

      console.log("Matched CSS Rules:\n\n")

      console.log($(currEl).getClassPath())

      console.log(getMatchedRules(currEl))

      $(currEl).find('*').each(function(){

          console.log($(this).getClassPath())

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
        getClassPath: function(){

            var rightArrowParents = [];

            var jqParents = $(this).parents()
            var arr = Array.prototype.slice.call(jqParents, 0)

            arr.pop();
            arr.unshift(jqParents.context)

            $(arr).each(function() {
                var entry = this.tagName.toUpperCase();
                if (this.className) {
                    entry += "." + this.className.toLowerCase().replace(/ /g, '.');
                }
                rightArrowParents.push(entry);
            });

            rightArrowParents.reverse();

            return rightArrowParents.join(" \u27a5 ");
        }
    });
})(jQuery);
