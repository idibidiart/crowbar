(function() {

  ____cr0wB6r____ = {};

  var currEl;

  function getMatchedRules(domNode) {
    var rules = "";
    var cssRuleList = window.getMatchedCSSRules(domNode, '');
    if (cssRuleList) {
        for (var i = 0; i < cssRuleList.length; i++) {
            rules += " " + cssRuleList[i].cssText;
        }
        return rules;
    }
    return "";
  }

  function quote(regex) {
     return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
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

       var rule = getMatchedRules(currEl)

       log += rule ? rule + "\n\n" : ""

       $(currEl).find('*').each(function(){

           rule = getMatchedRules(this)

           rule = rule.replace(new RegExp("(\\* \\{)(.*)(})", "g"), "")

           log += rule.replace(/\s/g, "") ? rule + "\n\n" : ""

       });

      log += "</style>\n<body>\n"
            + currEl.outerHTML + "\n</body></html>\n\n"

      console.log(log)

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
