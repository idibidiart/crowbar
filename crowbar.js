;(function() {

  ____crowbar____ = {};

  var currEl, overlay, on, page;

    (function() {

        var links = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]'), 0)

        var style = document.querySelector('style')
            || document.querySelector('head').appendChild(document.createElement('STYLE'))

        function xhr(url, callback, path) {
            var XHR =  new XMLHttpRequest();

            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    callback(XHR.responseText, path, XHR);
                }
            };

            try {
                XHR.open("GET", url, true);
                XHR.send("");
            } catch (e) {
                setTimeout(function() {
                   xhr(url, callback, path)
                }, 500)
            }
            return XHR;

        }

        var cssBase;

        links.forEach(function(v, i) {

            var url;

            if (v.getAttribute("href").match(/(http[s]{0,1}:\/\/|\/\/)/)) {

                var URL = parseURL(v.getAttribute("href"))

                cssBase = URL.protocol + "://" + URL.host + URL.path.replace(URL.segments[URL.segments.length - 1], "")

                url = "http://www.corsproxy.com/" + v.getAttribute("href").replace(/(http[s]{0,1}:\/\/|\/\/)/, "")

            } else {

                cssBase = document.baseURI

                url = "http://www.corsproxy.com/" +
                    toAbsoluteURL(v.getAttribute("href"), cssBase).replace(/(http[s]{0,1}:\/\/|\/\/)/, "")
            }

            xhr(url,

                function(css, _cssBase){

                    css = css.replace(/url\(['"]([^\s;}]+)['"]\)/gi, function r(m, p, offset, string){

                        if (p.indexOf('data') != 0) {

                            if (!p.match(/(http[s]{0,}:\/\/|\/\/)/)) {

                                return "url('" +
                                            toAbsoluteURL(p, _cssBase)
                                            + "')"
                            } else {
                                return m
                            }
                        } else {
                            return m;
                        }
                    })

                    console.log(css)

                    style.appendChild(document.createTextNode(css))
                },
                cssBase)

            document.querySelector('head').removeChild(v)
        })
    })()

  function parseURL(url) {

    var a =  document.querySelector(".____url_parser") ||
        (function() {
            var a = document.createElement('a')
            document.body.appendChild(a)
            a.setAttribute("class", "____url_parser")
            return a;
        })()

    a.href = url;

    return {

        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    }
  }

  function toAbsoluteURL(url, base_url) {

          var doc = document
              , old_base = doc.getElementsByTagName('base')[0]
              , old_href = old_base && old_base.href
              , doc_head = doc.head || doc.getElementsByTagName('head')[0]
              , our_base = old_base || doc_head.appendChild(doc.createElement('base'))
              , resolver = doc.querySelector(".____url_resolver") ||
                  (function() {
                      var a = document.createElement('a')
                      document.body.appendChild(a)
                      a.setAttribute("class", "____url_resolver")
                      return a;
                  })()
              , resolved_url
              ;
          our_base.href = base_url;
          resolver.href = url;
          resolved_url  = resolver.href; // browser magic at work here

          if (old_base) old_base.href = old_href;
          else doc_head.removeChild(our_base);
          return resolved_url;

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
      return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),
                                (ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
  }

  function getDocHeight() {

    var doc = document;

    return Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
    )
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

       log = log.replace(/(href|src)\s*=\s*['"]([^\s;}]+)['"]/gi, function r(m, p1, p2, offset, string){

           if (p2.indexOf("data") != 0) {
               if (!p2.match(/(http[s]{0,1}:\/\/|\/\/)/)) {

                   return p1 + "='" +
                       toAbsoluteURL(p2, document.baseURI)
                       + "'"
               } else {
                   return m
               }
           } else {
               return m;
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
