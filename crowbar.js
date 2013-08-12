;(function() {

  ____crowbar____ = {};

  var currEl, overlay, on, page;

    (function() {

        var links = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]'), 0)

        var style = document.querySelector('style')
            || document.querySelector('head').appendChild(document.createElement('STYLE'))

        function xhr(url, callback) {
            var XHR =  new XMLHttpRequest();

            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    callback(XHR.responseText, XHR);
                }
            };

            XHR.open("GET", url, true);
            XHR.send("");
            return XHR;
        }

        links.forEach(function(v, i) {

            var url = v.getAttribute("href").resolve;

            if (v.getAttribute("href").match(/(http[s]{0,}:\/\/|\/\/)/)) {

                url = "http://www.corsproxy.com/" + v.getAttribute("href").replace(/(http[s]{0,}:\/\/|\/\/)/, "")
            } else {

                url = "http://www.corsproxy.com/" +
                    toAbsoluteURL(v.getAttribute("href"), window.location.hostname + "/")
                        .replace(/(http[s]{0,}:\/\/|\/\/)/, "")
            }

            xhr(url,

                function(css){

                    css = css.replace(/url\(\s*['"]+((?!data).*):?['"]\s*\)/gi, function r(m, p, offset, string){

                        if (p.match(/(http[s]{0,}:\/\/|\/\/)/)) {

                            return "url(http://www.corsproxy.com/" + p.trim().replace(/(http[s]{0,}:\/\/|\/\/)/, "") + ")"
                        } else {

                            return "url(http://www.corsproxy.com/" +
                                        toAbsoluteURL(p.trim(), window.location.hostname + "/")
                                            .replace(/(http[s]{0,}:\/\/|\/\/)/, "") + ")"
                        }
                    })

                    style.appendChild(document.createTextNode(css))
                }
            )

            document.querySelector('head').removeChild(v)
        })

    })()

  function toAbsoluteURL(url, base_url) {

    var doc = document
        , old_base = doc.querySelector('base')
        , head = doc.head || doc.querySelector('head')
        , base = old_base || head.appendChild(doc.createElement('base'))
        , resolver = doc.querySelector(".____base_resolver") ||
            (function() {
                var a = doc.createElement('a')
                    doc.body.appendChild(a)
                    a.setAttribute("class", "____base_resolver")
                    return a;
            })()
        , absolute_url;

    if (base.href != base_url)   // avoid DOM write if possible
            base.href = base_url;

    resolver.href = url;

    absolute_url = resolver.href

    return absolute_url;
  }

  function removeOutline(el) {
      el.style.outline = null;
  }

  function addOutline(el) {
      el.style.outline  ='red 2px solid'
  }

  function getMatchedRules(el, currList) {

    var doc= el.ownerDocument;
    var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

    var rules = "";
    var cssRuleList = win.getMatchedCSSRules(el, '');

    if (cssRuleList) {
        for (var i = 0; i < cssRuleList.length; i++) {

            if (currList.indexOf(cssRuleList[i].cssText) == -1)  {
                rules += "\n" + cssRuleList[i].cssText
            }
        }

        return rules;
    }
    return "";
  }

  function computeEnclosingStyles(el) {

    var enclosingProperties = [
        "opacity",
        "background",
        "-webkit-filter",
        "-webkit-transform",
        "-webkit-transform-style",
        "-webkit-perspective",
        "-webkit-backface-visibility"
    ]

    var doc= el.ownerDocument;
    var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

    var result = "", computedStyle;

    computedStyle = win.getComputedStyle(el, null)

    enclosingProperties.forEach(function(v, i) {

        result += v + ": "
            + computedStyle.getPropertyValue(v)
            + " " + computedStyle.getPropertyPriority(v) + "; "
    })

    return result;

  }

  function computeInheritedStyles(el) {

      var doc= el.ownerDocument;
      var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

      // a mix of traditional inherited properties
      // (minus speech/accessibility related properties)
      // and visually and physically enclosing styles
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
      ]

      var doc= el.ownerDocument;
      var win= 'defaultView' in doc? doc.defaultView : doc.parentWindow;

      var result = "", computedStyle;

      computedStyle = win.getComputedStyle(el, null)

      inheritedProperties.forEach(function(v, i) {

          result += v + ": "
                    + computedStyle.getPropertyValue(v)
                    + " " + computedStyle.getPropertyPriority(v) + "; "
      })

      return result;

  }

  function getFontFaceRules(currList) {

    var ss = document.styleSheets;

    var result = [];

    for (var i = 0; i < ss.length; i++)
    {
        if (ss[i].cssRules)
            for (var j = 0; j < ss[i].cssRules.length; j++)
            {
                if (ss[i].cssRules[j].type == window.CSSRule.FONT_FACE_RULE)

                    if (result.indexOf(ss[i].cssRules[j].cssText) == -1)

                        result.push(ss[i].cssRules[j].cssText)
            }
    }
    return result;
  }



  function findAll(el) {

      return Array.prototype.slice.call(el.getElementsByTagName("*"), 0);

  }

  String.prototype.replaceAll = function(str1, str2, ignore)
  {
      return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
  }

  function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
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
        removeOutline(currEl)
    }

    currEl = e.target;


      while ((JSON.stringify(currEl.getBoundingClientRect()) ===  JSON.stringify(currEl.parentNode.getBoundingClientRect())) &&
            currEl.parentNode.tagName.toLowerCase() !== "body") {

       currEl = currEl.parentNode

       console.log(1)
      }

      addOutline(currEl)

  }
  
  window.onkeyup = function(e) {

   if (!currEl) return;

   var key = e.keyCode || window.event.keyCode

   // s for select
   if (key == 83) {

      if (on) return;

      on = true;

      removeOutline(currEl)

      var log, rules, bounds;

      log = "<!doctype html>\n<html>\n<meta charset='UTF-8'/>\n<style>\n\n"

      bounds = currEl.getBoundingClientRect()

      log += ".____enclosing_styles"
                + " { width: " + bounds.width  + "px ; "
                + " height: " + bounds.height  + "px ; "
                +  computeInheritedStyles(currEl)
                +  computeEnclosingStyles(currEl)
                + " }\n"

       rules = getMatchedRules(currEl, log)

       log += rules.trim() ? rules : "";

       findAll(currEl).forEach(function(v, i){

           rules = getMatchedRules(v, log)

           log += rules.trim() ? rules : "";
       });

      log += "\n\n";

      getFontFaceRules().forEach(function(v, i) {
          log += v + "\n"
      })

      log += "\n\n</style>\n<body>\n<div class='____enclosing_styles'>\n"
            + currEl.outerHTML + "\n</div>\n</body>\n</html>\n\n"

      var d = document.createElement("DIV")

      if (!overlay) {
          d.style.cssText = "display: none; position: absolute; z-index: 100000; left: 0px;" +
                            "padding-left: 10px; top: 0px; width: 100%; height: " + getDocHeight() + "px;" +
                            "color: black;"

          d.setAttribute("class", "____overlay")

          overlay = document.body.appendChild(d)

          overlay.style['-webkit-user-select'] = 'text'

          page = [].slice.call(document.body.children,0)
      }

       log = log.replace(/(href|src)\s*=\s*['"]+((?!data).*):?['"]\s*/gi, function r(m, p1, p2, offset, string){

           if (p2.match(/(http[s]{0,}:\/\/|\/\/)/)) {

               return p1 + "='http://www.corsproxy.com/" + p2.trim().replace(/(http[s]{0,}:\/\/|\/\/)/, "") + "'"
           } else {

               return p1 "='http://www.corsproxy.com/" +
                   toAbsoluteURL(p2.trim(), window.location.hostname + "/")
                       .replace(/(http[s]{0,}:\/\/|\/\/)/, "") + "'"
           }
       })


       log = log
          .replaceAll('&', '&amp;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')


      page.forEach(function(v, i) {

          if (v.getAttribute("class") != '____overlay') {

              v.style['-webkit-transition'] = "-webkit-filter .50s"

              v.style['-webkit-filter'] = "blur(150px) hue-rotate(20deg) saturate(14)"
          }
      })

      console.log(log)



      overlay.innerHTML =  "<pre>" + log + "</pre>"

      document.body.style['-webkit-user-select'] = 'none'

      overlay.style.display = "block"

   }

   // esc or x
   if (key == 88 || key == 27) {

       on = false;

       if (overlay) {

           page.forEach(function(v, i) {

               if (v.getAttribute("class") != '____overlay') {

                   v.style['-webkit-transition'] = "-webkit-filter .50s"

                   v.style['-webkit-filter'] = "none"
               }
           })

           document.body.style['-webkit-user-select'] = 'text'

           overlay.style.display = "none"

       }
   }

    // p for parent
    if (key == 80) {

        // previous filter (on mouse over) allows only block-level elements to be selected
        // this prevents body element from being selected via "p" key, per our use case

        if (!currEl || currEl.parentNode.tagName.toLowerCase() == "body")
            return;

        removeOutline(currEl)

        currEl = currEl.parentNode;

        addOutline(currEl)

    }

  }
  
})();
