(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// https://g14n.info/load-html
// License: MIT
function loadHtml (callback) {
  var nodes = document.querySelectorAll('load-html:not([loaded])');
  var toBeLoaded = nodes.length;
  nodes.forEach(function (node) {
    try {
      var loader = new XMLHttpRequest();
      loader.addEventListener('load', function loadHtml () {
        if (loader.status == 200) {
          node.innerHTML = loader.responseText;
        }
        node.setAttribute('data-loaded', true);
        toBeLoaded--;

        if (toBeLoaded == 0) {
          if (typeof callback == 'function') {
            callback(nodes)
          }

          loadHtml(callback);
        }
      });
      loader.open('GET', node.getAttribute('src'), true);
      loader.send();
    } catch (error) {
      console.error(error);
      node.setAttribute('data-error', error.message);
      node.setAttribute('data-loaded', true);
    }
  })
}
window.loadHtml = loadHtml;

},{}],2:[function(require,module,exports){
require('load-html')
window.toggleNav = require('./toggleNav')
var scrollHandler = require('./scrollHandler')

window.addEventListener('load', function() {
  scrollHandler()
  loadHtml()
})

},{"./scrollHandler":3,"./toggleNav":4,"load-html":1}],3:[function(require,module,exports){
function scrollHandler () {
  var scrollY = window.pageYOffset || document.documentElement.scrollTop
  var brake = 10
  var nav = document.querySelector('nav')
  navIsHidden = false

  window.addEventListener('scroll', function () {
    var windowScrollY = window.scrollY
    var up = scrollY > windowScrollY + brake
    var down = scrollY < windowScrollY - brake

    if (up && navIsHidden) {
      nav.style.display = 'initial'
      navIsHidden = false
    }

    if (down && !navIsHidden) {
      nav.style.display = 'none'
      navIsHidden = true
    }

    scrollY = windowScrollY
  }, true)
}

module.exports = scrollHandler

},{}],4:[function(require,module,exports){
function toggleNav () {
  document.querySelector('nav').style.display = 'initial'
  document.querySelector('nav ul').classList.toggle('responsive')
  document.getElementById('hamburgericon').classList.toggle('open')

  // Desativa a rolagem quando o menu está aberto.

  var overflow = document.body.style.overflow

  if (overflow === '') {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

module.exports = toggleNav

},{}]},{},[2]);
