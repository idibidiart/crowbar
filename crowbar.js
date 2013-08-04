(function() {

  ____cr0wB6r____ = {};

  var currEl;

  function getMatchedRules(el, list) {

    var currList = list || "";

    var rules = "";
    var cssRuleList = window.getMatchedCSSRules(el, '');

    if (cssRuleList) {
        for (var i = 0; i < cssRuleList.length; i++) {

            if (currList.indexOf(cssRuleList[i].cssText) == -1)
                rules += "\n\n" + cssRuleList[i].cssText;
        }
        return rules;
    }
    return "";
  }

  window.onmouseover = function(e) {

    // return if parent is not semantically decoupled from element
    if (
            e.target.parentNode.tagName.toLowerCase() != "div" &&
            e.target.parentNode.tagName.toLowerCase() != "span" &&
            e.target.parentNode.tagName.toLowerCase() != "header" &&
            e.target.parentNode.tagName.toLowerCase() != "footer" &&
            e.target.parentNode.tagName.toLowerCase() != "nav" &&
            e.target.parentNode.tagName.toLowerCase() != "article" &&
            e.target.parentNode.tagName.toLowerCase() != "section" &&
            e.target.parentNode.tagName.toLowerCase() != "aside" &&
            e.target.parentNode.tagName.toLowerCase() != "body"
        )
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

       var log, rules = "";

       log = "<!doctype html>\n<html>\n<meta charset='UTF-8'/>\n<style>\n"

       rules = getMatchedRules($('body')[0])

       log += rules ? rules + "\n" : ""

       rules = getMatchedRules(currEl, log)

       log += rules ? rules + "\n" : ""

       $(currEl).find('*').each(function(){

           rules = getMatchedRules(this, log)

           if (rules) {
               log += rules;
           }
       });

      log += "\n\n</style>\n<body>\n"
            + currEl.outerHTML + "\n</body></html>\n\n"

      console.log(log)
   }

    // p for parent
    if (key == 80) {

        if (!currEl || currEl.parentNode.toLowerCase() == "body")
            return;

        $(currEl).css({outline: 'none'})

        currEl = currEl.parentNode;

        $(currEl).css({outline: 'red 2px solid'})
    }

  }
  
})();
