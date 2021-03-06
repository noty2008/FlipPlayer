var FlipPlayer = (function () {
  "use strict";
  var t = 0;
  var e = "#" + ++t;
  var i = "#" + ++t;
  var s = "#" + ++t;
  var n = "#" + ++t;
  var r = "#" + ++t;
  var h = "#" + ++t;
  var o = "#" + ++t;
  var a = "#" + ++t;
  var u = "#" + ++t;
  var l = "#" + ++t;
  var f = "#" + ++t;
  var v = "#" + ++t;
  var c = "#" + ++t;
  var d = "#" + ++t;
  var y = "#" + ++t;
  var p = "#" + ++t;
  var g = "#" + ++t;
  var b = "#" + ++t;
  var k = "#" + ++t;
  function m(t, n, r) {
    this[e] = document.getElementById(t);
    this[i] = n.slice();
    this[s] = r ? r.jumpURL || null : null;
    var h = r ? r.background || null : null;
    var o = r ? r.isPixelated || true : true;
    this[f] = r ? r.callback || null : null;
    if (r && r.keyEvents) this[c](r.keyEvents);
    this[v](h, o);
    this.reset();
  }
  var w = m.prototype;
  Object.defineProperties(w, {
    index: {
      get: function () {
        return this[r];
      },
    },
    frames: {
      get: function () {
        return this[i];
      },
    },
    count: {
      get: function () {
        return this[i].length;
      },
    },
  });
  w[v] = function (t, s) {
    var n = this[e];
    n.tabIndex = 0;
    n.style.display = "inline-block";
    n.style.position = "relative";
    n.style.userSelect = "none";
    n.style.outline = "none";
    var r = n.id + "_";
    var h = n.style.width != "" ? "width:" + n.style.width + ";" : "";
    var o = n.style.height != "" ? "height:" + n.style.height + ";" : "";
    var a = function (t, e) {
      if (document.getElementById(r + t) != null) return;
      n.insertAdjacentHTML(
        "beforeEnd",
        '<img id="' +
          r +
          t +
          '" src="' +
          t +
          '" style="' +
          (e ? "" : "position:absolute;") +
          "visibility:hidden;" +
          "left:0px;top:0px;" +
          h +
          o +
          (!s
            ? ""
            : "image-rendering:pixelated;" +
              "image-rendering:crisp-edges;" +
              "-ms-interpolation-mode:nearest-neighbor;") +
          '">'
      );
    };
    for (var u = 0; u < this[i].length; u++) {
      if (0 <= ["for", "next"].indexOf(this[i][u][0].toLowerCase())) continue;
      a(this[i][u][0], u == 0);
    }
    if (t) {
      a(t, false);
      var l = document.getElementById(r + t);
      l.style.zIndex = "-1";
      l.style.visibility = "";
    }
  };
  w[c] = function (t) {
    var i = {
      next: {
        event: "keyup",
        keys: ["z", "Z", " ", "Spacebar", "Enter", "ArrowRight", "Right"],
        onKeys: this.next.bind(this),
      },
      skip: {
        event: "keydown",
        keys: ["x", "X"],
        onKeys: this.next.bind(this),
      },
      prev: {
        event: "keyup",
        keys: ["Backspace", "ArrowLeft", "Left"],
        onKeys: function () {
          return this.prev().stop();
        }.bind(this),
      },
      stop: {
        event: "keyup",
        keys: ["p", "P", "ArrowDown", "Down"],
        onKeys: this.stop.bind(this),
      },
      reset: {
        event: "keyup",
        keys: ["t", "T", "Escape", "Esc", "ArrowUp", "Up"],
        onKeys: this.reset.bind(this),
      },
    };
    Object.keys(i).forEach(
      function (s) {
        var n = s + "Keys";
        var r = "on" + s[0].toUpperCase() + s.slice(1) + "Keys";
        if (!(n in t)) t[n] = i[s].keys;
        if (!(r in t)) t[r] = i[s].onKeys;
        if (t[n] === null || t[r] === null) return;
        this[e].addEventListener(i[s].event, function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (0 <= t[n].indexOf(e.key)) t[r]();
        });
      }.bind(this)
    );
  };
  w[d] = function (t) {
    var s = 0;
    var n = this[e].id + "_";
    t = n + t;
    var r = this[i];
    document.getElementById(t).style.visibility = "visible";
    setTimeout(function () {
      for (var e = 0; e < r.length; e++) {
        if (0 <= ["for", "next"].indexOf(r[e][0].toLowerCase())) continue;
        var i = document.getElementById(n + r[e][s]);
        if (i.id == t) continue;
        i.style.visibility = "hidden";
      }
    }, 1);
  };
  w[y] = function (t) {
    this[u] = t;
    this[e].style.cursor = t ? "" : "pointer";
  };
  w.reset = function () {
    this[r] = 0;
    this[l] = false;
    this[k]();
    return this;
  };
  w[p] = function () {
    this[l] = true;
    this[k]();
  };
  w[g] = function () {
    var t = 0;
    var e = 1;
    if (this[i].length <= this[r]) return this[p]();
    var s = this[i][this[r]];
    if (s[t].toLowerCase() == "for") {
      this[r]++;
      this[a] = 0;
      this[o] = s[e];
      this[h] = this[r];
      s = this[i][this[r]];
    }
    if (s[t].toLowerCase() == "next") {
      this[a]++;
      if (this[a] < this[o]) {
        this[r] = this[h];
      } else {
        this[r]++;
      }
      s = this[i][this[r]];
    }
    if (this[f] !== null) this[f](this, this[r], this[i]);
    this[d](s[t]);
    this[y](0 < s[e]);
    this[r]++;
    this[b] = setTimeout(
      function () {
        if (!this[u]) return;
        this[g]();
      }.bind(this),
      s[e]
    );
  };
  w[k] = function () {
    if (this[l]) {
      if (this[s] === null) return this.reset();
      return window.open(this[s], "_self");
    }
    this[g]();
  };
  w.next = function () {
    if (this[u]) return this;
    this[k]();
    return this;
  };
  w.prev = function () {
    this[r] -= 2;
    if (this[r] < 0) this[r] = 0;
    this[k]();
    return this;
  };
  w.jump = function (t, e) {
    clearTimeout(this[b]);
    this.setIndex(t, e);
    this[k]();
    return this;
  };
  w.stop = function () {
    this[y](false);
    return this;
  };
  w.setIndex = function (t, e) {
    var s;
    if ("number" == typeof t && !isNaN(t)) {
      s = t;
      if (this[i].length <= s) throw new RangeError();
    } else {
      var n = t;
      s = -1;
      if (e) {
        for (var h = this[i].length - 1; 0 <= h; h--) {
          if (this[i][h][0] == n) {
            s = h;
            break;
          }
        }
      } else {
        for (var h = 0; h < this[i].length; h++) {
          if (this[i][h][0] == n) {
            s = h;
            break;
          }
        }
      }
      if (s < 0) throw new TypeError();
    }
    this[r] = s;
    return this;
  };
  return m;
})();
