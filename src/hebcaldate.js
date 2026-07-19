// From https://www.hebcal.com/home/40/displaying-todays-hebrew-date-on-your-website

!function () {
  "use strict";
  const t = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  [t, t.slice()][1][2] = 29;
  const n = "Nisan", e = ["", n, "Iyyar", "Sivan", "Tamuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Sh'vat"], o = [[...e, "Adar", n], [...e, "Adar I", "Adar II", n]], u = 5e3, f = new Int32Array(2e3), a = -1373428;
  function i(t, r) {
    if ("number" != typeof t || isNaN(t)) throw new TypeError(`param '${r}' not a number: ${t}`);
  }
  function c(t, r, n) {
    if (i(t, "year"), i(r, "month"), i(n, "day"), t < 1) throw new RangeError(`hebrew2abs: invalid year ${t}`);
    let e = n;
    if (r < 7) {
      const n = function (t) {
        return +((1 + 7 * t) % 19 < 7) + 12;
      }(t);
      for (let r = 7; r <= n; r++) e += y(r, t);
      for (let n = 1; n < r; n++) e += y(n, t);
    } else for (let n = 7; n < r; n++) e += y(n, t);
    return a + w(t) + e - 1;
  }
  const l = [0, 30, 29, 30, 29, 30, 29, 30, 0, 0, 29, 30, 0, 29];
  function y(t, r) {
    const n = l[t];
    return 0 !== n ? n : 12 === t ? (1 + 7 * r) % 19 < 7 ? 30 : 29 : 8 === t ? function (t) {
      return (w(t + 1) - w(t)) % 10 == 5;
    }(r) ? 30 : 29 : function (t) {
      return (w(t + 1) - w(t)) % 10 == 3;
    }(r) ? 29 : 30;
  }
  function w(t) {
    if (t >= u && t <= 6999) {
      const r = t - u, n = f[r];
      if (0 !== n) return n;
      const e = d(t);
      return f[r] = e, e;
    }
    return d(t);
  }
  function d(t) {
    const r = t - 1, n = 235 * Math.floor(r / 19) + r % 19 * 12 + Math.floor((r % 19 * 7 + 1) / 19), e = 204 + n % 1080 * 793, o = 5 + 12 * n + 793 * Math.floor(n / 1080) + Math.floor(e / 1080), u = e % 1080 + o % 24 * 1080, f = 1 + 29 * n + Math.floor(o / 24);
    let a = f;
    return (u >= 19440 || 2 == f % 7 && u >= 9924 && !((1 + 7 * t) % 19 < 7) || 1 == f % 7 && u >= 16789 && (1 + 7 * r) % 19 < 7) && a++, a % 7 == 0 || a % 7 == 3 || a % 7 == 5 ? a + 1 : a;
  }
  const b = new Date;
  let p = function (t) {
    if ("object" != typeof (n = t) || !Date.prototype.isPrototypeOf(n)) throw new TypeError(`not a Date: ${t}`);
    if (isNaN(t.getTime())) throw new RangeError("Invalid Date");
    var n;
    return function (t, n, e) {
      const o = t - 1;
      return 365 * o + Math.floor(o / 4) - Math.floor(o / 100) + Math.floor(o / 400) + Math.floor((367 * n - 362) / 12) + (n <= 2 ? 0 : function (t) {
        return !(t % 4 || !(t % 100) && t % 400);
      }(t) ? -1 : -2) + e;
    }(t.getFullYear(), t.getMonth() + 1, t.getDate());
  }(b);
  b.getHours() > 19 && p++;
  const v = function (t) {
    if (i(t, "abs"), (t = Math.trunc(t)) <= a) throw new RangeError(`abs2hebrew: ${t} is before epoch`);
    let r = Math.floor((t - a) / 365.24682220597794);
    for (; a + w(r) <= t;) ++r;
    --r;
    let n = t < c(r, 1, 1) ? 7 : 1;
    for (; t > c(r, n, y(n, r));) ++n;
    return {yy: r, mm: n, dd: 1 + t - c(r, n, 1)};
  }(p), M = function (t, r) {
    if (i(t, "month"), i(r, "year"), t < 1 || t > 14) throw new TypeError(`bad monthNum: ${t}`);
    return o[+((1 + 7 * r) % 19 < 7)][t];
  }(v.mm, v.yy), g = function (t) {
    const r = ["th", "st", "nd", "rd"], n = t % 100;
    return t + (r[(n - 20) % 10] || r[n] || "th");
  }(v.dd) + " of " + M + ", " + v.yy;
  document.write(g);
}();
