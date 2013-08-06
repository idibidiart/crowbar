(function() {

  ____crowbar____ = {};

  var currEl, on, off;

  var overlay = document.body.appendChild(document.createElement("DIV"))

  $(overlay).attr("class", "____crowbar_overlay")

  $(overlay).css({position: 'absolute', top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: 100000,
          '-webkit-filter': 'none',
          display: 'none'
      })

  function getMatchedRules(el, list) {

    var currList = list || "";

    var doc= el.ownerDocument;
    var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

    var rules = "";
    var cssRuleList = win.getMatchedCSSRules(el, '');

    if (cssRuleList) {
        for (var i = 0; i < cssRuleList.length; i++) {

            if (currList.indexOf(cssRuleList[i].cssText) == -1)
                rules += "\n" + cssRuleList[i].cssText
        }
        return rules;
    }
    return "";
  }

  function computeEnclosingStyles(el, prop) {

      var doc= el.ownerDocument;
      var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

      // a mix of traditional inherited properties
      // (minus speech/accessibility related properties)
      // and block-scoped visual effects
      var enclosingProperties = [
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
          "word-spacing",
          "opacity",
          "-webkit-transform",
          "-webkit-transform-origin",
          "-webkit-transform-style",
          "-webkit-perspective",
          "-webkit-perspective-origin",
          "-webkit-backface-visibility"
      ]

      var doc= el.ownerDocument;
      var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

      var result = "", computedStyle;

      computedStyle = win.getComputedStyle(el, null)

      if (!prop) {
          $(enclosingProperties).each(function() {

              result += this + ": "
                                    + computedStyle.getPropertyValue(this)
                                    + " " + computedStyle.getPropertyPriority(this) + "; "
          })

          return result;

      }   else {

          return prop + ": "
              + computedStyle.getPropertyValue(prop)
              + " " + computedStyle.getPropertyPriority(prop) + "; "
      }
  }

  function getFontFaceRules() {

    var ss = document.styleSheets;

    var result = []

    for (var i = 0; i < ss.length; i++)
    {
        if (ss[i].cssRules)
            for (var j = 0; j < ss[i].cssRules.length; j++)
            {
                if (ss[i].cssRules[j].type == window.CSSRule.FONT_FACE_RULE)
                    result.push(ss[i].cssRules[j].cssText)
            }
    }
    return result;
  }

  window.onmouseover = function(e) {

    this.focus();

    if (on) return;

    // if not block-level element
    // it can't be directly appended to the body of a document (our use case)
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
       $(currEl).attr("style", $(currEl).attr("style").replace(/outline:(.*);/, ""))
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

      on = true;

      document.body.style['-webkit-transition'] = "-webkit-filter .50s"
      document.body.style['-webkit-filter'] = "blur(129px) hue-rotate(21.7deg) saturate(14)"

      var log, rules, position, overflow;

       log = "<!doctype html>\n<html>\n<meta charset='UTF-8'/>\n<style>\n\n"
       
       position = currEl.getBoundingClientRect()
       
       overflow = computeEnclosingStyles(currEl.parentNode, "overflow")

       log += ".____enclosing_styles" +
                " { width: " + (position.right- position.left) + "px; " +
                "height: " + (position.bottom - position.top) + "px; " +
                "overflow: " + overflow + "; "
                +  computeEnclosingStyles(currEl)
                + " }\n"

       rules = getMatchedRules(currEl, log)

       log += rules.trim() ? rules : ""

       $(currEl).find('*').each(function(){

           rules = getMatchedRules(this, log)

           if (rules.trim()) {
               log += rules;
           }
       });

      log += "\n\n";

      $(getFontFaceRules()).each(function() {
          log += this + "\n"
      })

      log += "\n\n</style>\n<body>\n<div class='____enclosing_styles'>"
            + currEl.outerHTML + "\n</div>\n</body>\n</html>\n\n"


      $('.____crowbar_overlay').html("<pre>" + $('<div/>').text(log).html() + "</pre>")


       $('.____crowbar_overlay').fadeIn('slow')
   }

   if (key == 88 || key == 27) {

       on = false;

       document.body.style['-webkit-transition'] = "-webkit-filter .50s"
       document.body.style['-webkit-filter'] = "none"

       $('.____crowbar_overlay').fadeOut('slow')

   }

    // p for parent
    if (key == 80) {

        if (on) return;

        // previous filter (on mouse over) allows only block-level elements to be selected
        // this prevents body element from being selected via "p" key, per our use case

        if (!currEl || currEl.parentNode.toLowerCase() == "body")
            return;

        $(currEl).css({outline: 'none'})

        currEl = currEl.parentNode;

        $(currEl).css({outline: 'red 2px solid'})
    }

  }
  
})();
