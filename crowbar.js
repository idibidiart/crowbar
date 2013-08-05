(function() {

  ____crowbar____ = {};

  var currEl;

  function getMatchedRules(el, list) {

    var currList = list || "";

    var doc= el.ownerDocument;
    var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

    var rules = "";
    var cssRuleList = win.getMatchedCSSRules(el, '');

    if (cssRuleList) {
        for (var i = 0; i < cssRuleList.length; i++) {

            if (currList.indexOf(cssRuleList[i].cssText) == -1)
                rules += "\n\n" + cssRuleList[i].cssText;
        }
        return rules;
    }
    return "";
  }

  function computeInheritedProperties(el) {

      var doc= el.ownerDocument;
      var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

      var inheritedProperties = [
          "border-collapse",
          "border-spacing",
          "caption-side",
          "color",
          "cursor",
          "direction",
          "empty-cells",
          "font-family",
          "font-size",
          "font-style",
          "font-variant",
          "font-weight",
          "font",
          "letter-spacing",
          "line-height",
          "list-style-image",
          "list-style-position",
          "list-style-type",
          "list-style",
          "text-align",
          "text-indent",
          "text-transform",
          "visibility",
          "white-space",
          "word-spacing"
      ]

      var doc= el.ownerDocument;
      var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

      return win.getComputedStyle(this, null).getPropertyCSSValue("font-family").cssText


  }


  window.onmouseover = function(e) {

    // ignore if not block-level element
    if (
        (["p", "h1", "h2", "h3", "h4", "h5", "h6",
        "ol", "ul", "pre", "address", "blockquote",
        "dl", "div", "fieldset", "form", "output",
        "blockquote", "table", "tfoot",
        "article", "section", "aside", "nav",
        "header", "footer", "hr", "figcaption",
        "figure", "address", "dd"]
            .indexOf(e.target.tagName.toLowerCase()) == -1)
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

       var log, rules, inheritedCSSStyles;

       var containerClass = "crowbar_container"

       log = "<!doctype html>\n<html>\n<meta charset='UTF-8'/>\n<style>\n"

       inheritanceChain = $(currEl)
           .parentsUntil('html')
           .addBack()

       inheritedCSSStyles = computeInheritedProperties(currEl.parentNode)

       console.log(inheritedCSSStyles)

       return

       rules = getMatchedRules(currEl, log)

       log += rules ? rules + "\n" : ""

       $(currEl).find('*').each(function(){

           rules = getMatchedRules(this, log)

           if (rules) {
               log += rules;
           }
       });

      log += "\n\n</style>\n<body>\n<div class='crowbar_container>'\n"
            + currEl.outerHTML + "\n</div>\n</body>\n</html>\n\n"

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
