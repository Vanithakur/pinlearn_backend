/*!
 * Viewer.js v1.10.5
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2022-04-05T08:21:02.491Z
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : ((t =
              "undefined" != typeof globalThis
                  ? globalThis
                  : t || self).Viewer = e());
})(this, function () {
    "use strict";
    function s(e, t) {
        var i,
            n = Object.keys(e);
        return (
            Object.getOwnPropertySymbols &&
                ((i = Object.getOwnPropertySymbols(e)),
                t &&
                    (i = i.filter(function (t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    })),
                n.push.apply(n, i)),
            n
        );
    }
    function q(n) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2
                ? s(Object(o), !0).forEach(function (t) {
                      var e, i;
                      (e = n),
                          (i = o[(t = t)]),
                          t in e
                              ? Object.defineProperty(e, t, {
                                    value: i,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                })
                              : (e[t] = i);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                      n,
                      Object.getOwnPropertyDescriptors(o)
                  )
                : s(Object(o)).forEach(function (t) {
                      Object.defineProperty(
                          n,
                          t,
                          Object.getOwnPropertyDescriptor(o, t)
                      );
                  });
        }
        return n;
    }
    function n(t) {
        return (n =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t &&
                          "function" == typeof Symbol &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? "symbol"
                          : typeof t;
                  })(t);
    }
    function r(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
        }
    }
    var h = {
            backdrop: !0,
            button: !0,
            navbar: !0,
            title: !0,
            toolbar: !0,
            className: "",
            container: "body",
            filter: null,
            fullscreen: !0,
            inheritedAttributes: [
                "crossOrigin",
                "decoding",
                "isMap",
                "loading",
                "referrerPolicy",
                "sizes",
                "srcset",
                "useMap",
            ],
            initialViewIndex: 0,
            inline: !1,
            interval: 5e3,
            keyboard: !0,
            focus: !0,
            loading: !0,
            loop: !0,
            minWidth: 200,
            minHeight: 100,
            movable: !0,
            rotatable: !0,
            scalable: !0,
            zoomable: !0,
            zoomOnTouch: !0,
            zoomOnWheel: !0,
            slideOnTouch: !0,
            toggleOnDblclick: !0,
            tooltip: !0,
            transition: !0,
            zIndex: 2015,
            zIndexInline: 0,
            zoomRatio: 0.1,
            minZoomRatio: 0.01,
            maxZoomRatio: 100,
            url: "src",
            ready: null,
            show: null,
            shown: null,
            hide: null,
            hidden: null,
            view: null,
            viewed: null,
            move: null,
            moved: null,
            rotate: null,
            rotated: null,
            scale: null,
            scaled: null,
            zoom: null,
            zoomed: null,
            play: null,
            stop: null,
        },
        t = "undefined" != typeof window && void 0 !== window.document,
        e = t ? window : {},
        a =
            !(!t || !e.document.documentElement) &&
            "ontouchstart" in e.document.documentElement,
        i = t && "PointerEvent" in e,
        g = "viewer",
        l = "move",
        W = "switch",
        c = "zoom",
        f = "".concat(g, "-active"),
        j = "".concat(g, "-close"),
        H = "".concat(g, "-fade"),
        B = "".concat(g, "-fixed"),
        V = "".concat(g, "-fullscreen"),
        U = "".concat(g, "-fullscreen-exit"),
        v = "".concat(g, "-hide"),
        K = "".concat(g, "-hide-md-down"),
        Z = "".concat(g, "-hide-sm-down"),
        $ = "".concat(g, "-hide-xs-down"),
        u = "".concat(g, "-in"),
        p = "".concat(g, "-invisible"),
        b = "".concat(g, "-loading"),
        _ = "".concat(g, "-move"),
        G = "".concat(g, "-open"),
        d = "".concat(g, "-show"),
        m = "".concat(g, "-transition"),
        w = "click",
        J = "dblclick",
        Q = "dragstart",
        tt = "focusin",
        et = "keydown",
        y = "load",
        x = "error",
        it = i ? "pointerdown" : a ? "touchstart" : "mousedown",
        nt = i ? "pointermove" : a ? "touchmove" : "mousemove",
        ot = i
            ? "pointerup pointercancel"
            : a
            ? "touchend touchcancel"
            : "mouseup",
        st = "resize",
        k = "transitionend",
        at = "wheel",
        rt = "ready",
        ht = "show",
        z = "viewed",
        lt = "rotated",
        ct = "".concat(g, "Action"),
        ut = /\s\s*/,
        dt = [
            "zoom-in",
            "zoom-out",
            "one-to-one",
            "reset",
            "prev",
            "play",
            "next",
            "rotate-left",
            "rotate-right",
            "flip-horizontal",
            "flip-vertical",
        ];
    function E(t) {
        return "string" == typeof t;
    }
    var mt = Number.isNaN || e.isNaN;
    function T(t) {
        return "number" == typeof t && !mt(t);
    }
    function D(t) {
        return void 0 === t;
    }
    function o(t) {
        return "object" === n(t) && null !== t;
    }
    var gt = Object.prototype.hasOwnProperty;
    function I(t) {
        if (!o(t)) return !1;
        try {
            var e = t.constructor,
                i = e.prototype;
            return e && i && gt.call(i, "isPrototypeOf");
        } catch (t) {
            return !1;
        }
    }
    function A(t) {
        return "function" == typeof t;
    }
    function S(e, i) {
        if (e && A(i))
            if (Array.isArray(e) || T(e.length))
                for (
                    var t = e.length, n = 0;
                    n < t && !1 !== i.call(e, e[n], n, e);
                    n += 1
                );
            else
                o(e) &&
                    Object.keys(e).forEach(function (t) {
                        i.call(e, e[t], t, e);
                    });
    }
    var O =
            Object.assign ||
            function (i) {
                for (
                    var t = arguments.length,
                        e = new Array(1 < t ? t - 1 : 0),
                        n = 1;
                    n < t;
                    n++
                )
                    e[n - 1] = arguments[n];
                return (
                    o(i) &&
                        0 < e.length &&
                        e.forEach(function (e) {
                            o(e) &&
                                Object.keys(e).forEach(function (t) {
                                    i[t] = e[t];
                                });
                        }),
                    i
                );
            },
        ft = /^(?:width|height|left|top|marginLeft|marginTop)$/;
    function C(t, e) {
        var i = t.style;
        S(e, function (t, e) {
            ft.test(e) && T(t) && (t += "px"), (i[e] = t);
        });
    }
    function L(t, e) {
        return (
            t &&
            e &&
            (t.classList
                ? t.classList.contains(e)
                : -1 < t.className.indexOf(e))
        );
    }
    function R(t, e) {
        var i;
        t &&
            e &&
            (T(t.length)
                ? S(t, function (t) {
                      R(t, e);
                  })
                : t.classList
                ? t.classList.add(e)
                : (i = t.className.trim())
                ? i.indexOf(e) < 0 &&
                  (t.className = "".concat(i, " ").concat(e))
                : (t.className = e));
    }
    function F(t, e) {
        t &&
            e &&
            (T(t.length)
                ? S(t, function (t) {
                      F(t, e);
                  })
                : t.classList
                ? t.classList.remove(e)
                : 0 <= t.className.indexOf(e) &&
                  (t.className = t.className.replace(e, "")));
    }
    function N(t, e, i) {
        e &&
            (T(t.length)
                ? S(t, function (t) {
                      N(t, e, i);
                  })
                : (i ? R : F)(t, e));
    }
    var vt = /([a-z\d])([A-Z])/g;
    function pt(t) {
        return t.replace(vt, "$1-$2").toLowerCase();
    }
    function Y(t, e) {
        return o(t[e])
            ? t[e]
            : t.dataset
            ? t.dataset[e]
            : t.getAttribute("data-".concat(pt(e)));
    }
    function bt(t, e, i) {
        o(i)
            ? (t[e] = i)
            : t.dataset
            ? (t.dataset[e] = i)
            : t.setAttribute("data-".concat(pt(e)), i);
    }
    (yt = !1),
        t &&
            ((wt = !1),
            (i = function () {}),
            (t = Object.defineProperty({}, "once", {
                get: function () {
                    return (yt = !0), wt;
                },
                set: function (t) {
                    wt = t;
                },
            })),
            e.addEventListener("test", i, t),
            e.removeEventListener("test", i, t));
    var wt,
        yt,
        xt = yt;
    function X(i, t, n, e) {
        var o = 3 < arguments.length && void 0 !== e ? e : {},
            s = n;
        t.trim()
            .split(ut)
            .forEach(function (t) {
                var e;
                xt ||
                    ((e = i.listeners) &&
                        e[t] &&
                        e[t][n] &&
                        ((s = e[t][n]),
                        delete e[t][n],
                        0 === Object.keys(e[t]).length && delete e[t],
                        0 === Object.keys(e).length && delete i.listeners)),
                    i.removeEventListener(t, s, o);
            });
    }
    function M(s, t, a, e) {
        var r = 3 < arguments.length && void 0 !== e ? e : {},
            h = a;
        t.trim()
            .split(ut)
            .forEach(function (n) {
                var t, o;
                r.once &&
                    !xt &&
                    ((t = s.listeners),
                    (h = function () {
                        delete o[n][a], s.removeEventListener(n, h, r);
                        for (
                            var t = arguments.length, e = new Array(t), i = 0;
                            i < t;
                            i++
                        )
                            e[i] = arguments[i];
                        a.apply(s, e);
                    }),
                    (o = void 0 === t ? {} : t)[n] || (o[n] = {}),
                    o[n][a] && s.removeEventListener(n, o[n][a], r),
                    (o[n][a] = h),
                    (s.listeners = o)),
                    s.addEventListener(n, h, r);
            });
    }
    function P(t, e, i, n) {
        var o;
        return (
            A(Event) && A(CustomEvent)
                ? (o = new CustomEvent(
                      e,
                      q({ bubbles: !0, cancelable: !0, detail: i }, n)
                  ))
                : (o = document.createEvent("CustomEvent")).initCustomEvent(
                      e,
                      !0,
                      !0,
                      i
                  ),
            t.dispatchEvent(o)
        );
    }
    function kt(t) {
        var e = t.rotate,
            i = t.scaleX,
            n = t.scaleY,
            o = t.translateX,
            t = t.translateY,
            s = [],
            o =
                (T(o) && 0 !== o && s.push("translateX(".concat(o, "px)")),
                T(t) && 0 !== t && s.push("translateY(".concat(t, "px)")),
                T(e) && 0 !== e && s.push("rotate(".concat(e, "deg)")),
                T(i) && 1 !== i && s.push("scaleX(".concat(i, ")")),
                T(n) && 1 !== n && s.push("scaleY(".concat(n, ")")),
                s.length ? s.join(" ") : "none");
        return { WebkitTransform: o, msTransform: o, transform: o };
    }
    var zt =
        e.navigator &&
        /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(
            e.navigator.userAgent
        );
    function Et(i, t, e) {
        var n = document.createElement("img");
        if (i.naturalWidth && !zt) return e(i.naturalWidth, i.naturalHeight), n;
        var o = document.body || document.documentElement;
        return (
            (n.onload = function () {
                e(n.width, n.height), zt || o.removeChild(n);
            }),
            S(t.inheritedAttributes, function (t) {
                var e = i.getAttribute(t);
                null !== e && n.setAttribute(t, e);
            }),
            (n.src = i.src),
            zt ||
                ((n.style.cssText =
                    "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;"),
                o.appendChild(n)),
            n
        );
    }
    function Tt(t) {
        switch (t) {
            case 2:
                return $;
            case 3:
                return Z;
            case 4:
                return K;
            default:
                return "";
        }
    }
    function Dt(t, e) {
        var i = t.pageX,
            t = t.pageY,
            n = { endX: i, endY: t };
        return e ? n : q({ timeStamp: Date.now(), startX: i, startY: t }, n);
    }
    var It,
        i = {
            render: function () {
                this.initContainer(),
                    this.initViewer(),
                    this.initList(),
                    this.renderViewer();
            },
            initBody: function () {
                var t = this.element.ownerDocument,
                    e = t.body || t.documentElement;
                (this.body = e),
                    (this.scrollbarWidth =
                        window.innerWidth - t.documentElement.clientWidth),
                    (this.initialBodyPaddingRight = e.style.paddingRight),
                    (this.initialBodyComputedPaddingRight =
                        window.getComputedStyle(e).paddingRight);
            },
            initContainer: function () {
                this.containerData = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            initViewer: function () {
                var t,
                    e = this.options,
                    i = this.parent;
                e.inline &&
                    ((t = {
                        width: Math.max(i.offsetWidth, e.minWidth),
                        height: Math.max(i.offsetHeight, e.minHeight),
                    }),
                    (this.parentData = t)),
                    (!this.fulled && t) || (t = this.containerData),
                    (this.viewerData = O({}, t));
            },
            renderViewer: function () {
                this.options.inline &&
                    !this.fulled &&
                    C(this.viewer, this.viewerData);
            },
            initList: function () {
                var r = this,
                    t = this.element,
                    h = this.options,
                    l = this.list,
                    c = [];
                (l.innerHTML = ""),
                    S(this.images, function (i, t) {
                        var e,
                            n,
                            o = i.src,
                            s =
                                i.alt ||
                                (E((s = o))
                                    ? decodeURIComponent(
                                          s
                                              .replace(/^.*\//, "")
                                              .replace(/[?&#].*$/, "")
                                      )
                                    : ""),
                            a = r.getImageURL(i);
                        (o || a) &&
                            ((e = document.createElement("li")),
                            (n = document.createElement("img")),
                            S(h.inheritedAttributes, function (t) {
                                var e = i.getAttribute(t);
                                null !== e && n.setAttribute(t, e);
                            }),
                            (n.src = o || a),
                            (n.alt = s),
                            n.setAttribute("data-original-url", a || o),
                            e.setAttribute("data-index", t),
                            e.setAttribute("data-viewer-action", "view"),
                            e.setAttribute("role", "button"),
                            h.keyboard && e.setAttribute("tabindex", 0),
                            e.appendChild(n),
                            l.appendChild(e),
                            c.push(e));
                    }),
                    S((this.items = c), function (e) {
                        var t,
                            i,
                            n = e.firstElementChild;
                        bt(n, "filled", !0),
                            h.loading && R(e, b),
                            M(
                                n,
                                y,
                                (t = function (t) {
                                    X(n, x, i),
                                        h.loading && F(e, b),
                                        r.loadImage(t);
                                }),
                                { once: !0 }
                            ),
                            M(
                                n,
                                x,
                                (i = function () {
                                    X(n, y, t), h.loading && F(e, b);
                                }),
                                { once: !0 }
                            );
                    }),
                    h.transition &&
                        M(
                            t,
                            z,
                            function () {
                                R(l, m);
                            },
                            { once: !0 }
                        );
            },
            renderList: function () {
                var t,
                    e,
                    i = this.index,
                    n = this.items[i];
                n &&
                    ((t = n.nextElementSibling),
                    (t = parseInt(
                        window.getComputedStyle(t || n).marginLeft,
                        10
                    )),
                    (n = n.offsetWidth),
                    C(
                        this.list,
                        O(
                            { width: (e = n + t) * this.length - t },
                            kt({
                                translateX:
                                    (this.viewerData.width - n) / 2 - e * i,
                            })
                        )
                    ));
            },
            resetList: function () {
                var t = this.list;
                (t.innerHTML = ""), F(t, m), C(t, kt({ translateX: 0 }));
            },
            initImage: function (r) {
                var t,
                    h = this,
                    l = this.options,
                    e = this.image,
                    i = this.viewerData,
                    n = this.footer.offsetHeight,
                    c = i.width,
                    u = Math.max(i.height - n, n),
                    d = this.imageData || {};
                (this.imageInitializing = {
                    abort: function () {
                        t.onload = null;
                    },
                }),
                    (t = Et(e, l, function (t, e) {
                        var i = t / e,
                            n = c,
                            o = u,
                            s =
                                ((h.imageInitializing = !1),
                                c < u * i ? (o = c / i) : (n = u * i),
                                (n = Math.min(0.9 * n, t)),
                                (o = Math.min(0.9 * o, e)),
                                (c - n) / 2),
                            a = (u - o) / 2,
                            s = {
                                left: s,
                                top: a,
                                x: s,
                                y: a,
                                width: n,
                                height: o,
                                oldRatio: 1,
                                ratio: n / t,
                                aspectRatio: i,
                                naturalWidth: t,
                                naturalHeight: e,
                            },
                            a = O({}, s);
                        l.rotatable &&
                            ((s.rotate = d.rotate || 0), (a.rotate = 0)),
                            l.scalable &&
                                ((s.scaleX = d.scaleX || 1),
                                (s.scaleY = d.scaleY || 1),
                                (a.scaleX = 1),
                                (a.scaleY = 1)),
                            (h.imageData = s),
                            (h.initialImageData = a),
                            r && r();
                    }));
            },
            renderImage: function (t) {
                var e,
                    i = this,
                    n = this.image,
                    o = this.imageData;
                C(
                    n,
                    O(
                        {
                            width: o.width,
                            height: o.height,
                            marginLeft: o.x,
                            marginTop: o.y,
                        },
                        kt(o)
                    )
                ),
                    t &&
                        ((this.viewing ||
                            this.moving ||
                            this.rotating ||
                            this.scaling ||
                            this.zooming) &&
                        this.options.transition &&
                        L(n, m)
                            ? ((e = function () {
                                  (i.imageRendering = !1), t();
                              }),
                              (this.imageRendering = {
                                  abort: function () {
                                      X(n, k, e);
                                  },
                              }),
                              M(n, k, e, { once: !0 }))
                            : t());
            },
            resetImage: function () {
                var t;
                (this.viewing || this.viewed) &&
                    ((t = this.image),
                    this.viewing && this.viewing.abort(),
                    t.parentNode.removeChild(t),
                    (this.image = null));
            },
        },
        t = {
            bind: function () {
                var t = this.options,
                    e = this.viewer,
                    i = this.canvas,
                    n = this.element.ownerDocument;
                M(e, w, (this.onClick = this.click.bind(this))),
                    M(e, Q, (this.onDragStart = this.dragstart.bind(this))),
                    M(
                        i,
                        it,
                        (this.onPointerDown = this.pointerdown.bind(this))
                    ),
                    M(
                        n,
                        nt,
                        (this.onPointerMove = this.pointermove.bind(this))
                    ),
                    M(n, ot, (this.onPointerUp = this.pointerup.bind(this))),
                    M(n, et, (this.onKeyDown = this.keydown.bind(this))),
                    M(window, st, (this.onResize = this.resize.bind(this))),
                    t.zoomable &&
                        t.zoomOnWheel &&
                        M(e, at, (this.onWheel = this.wheel.bind(this)), {
                            passive: !1,
                            capture: !0,
                        }),
                    t.toggleOnDblclick &&
                        M(i, J, (this.onDblclick = this.dblclick.bind(this)));
            },
            unbind: function () {
                var t = this.options,
                    e = this.viewer,
                    i = this.canvas,
                    n = this.element.ownerDocument;
                X(e, w, this.onClick),
                    X(e, Q, this.onDragStart),
                    X(i, it, this.onPointerDown),
                    X(n, nt, this.onPointerMove),
                    X(n, ot, this.onPointerUp),
                    X(n, et, this.onKeyDown),
                    X(window, st, this.onResize),
                    t.zoomable &&
                        t.zoomOnWheel &&
                        X(e, at, this.onWheel, { passive: !1, capture: !0 }),
                    t.toggleOnDblclick && X(i, J, this.onDblclick);
            },
        },
        At = {
            click: function (t) {
                var e = this.options,
                    i = this.imageData,
                    n = t.target,
                    o = Y(n, ct);
                switch (
                    (o ||
                        "img" !== n.localName ||
                        "li" !== n.parentElement.localName ||
                        (o = Y((n = n.parentElement), ct)),
                    a &&
                        t.isTrusted &&
                        n === this.canvas &&
                        clearTimeout(this.clickCanvasTimeout),
                    o)
                ) {
                    case "mix":
                        this.played
                            ? this.stop()
                            : e.inline
                            ? this.fulled
                                ? this.exit()
                                : this.full()
                            : this.hide();
                        break;
                    case "hide":
                        this.hide();
                        break;
                    case "view":
                        this.view(Y(n, "index"));
                        break;
                    case "zoom-in":
                        this.zoom(0.1, !0);
                        break;
                    case "zoom-out":
                        this.zoom(-0.1, !0);
                        break;
                    case "one-to-one":
                        this.toggle();
                        break;
                    case "reset":
                        this.reset();
                        break;
                    case "prev":
                        this.prev(e.loop);
                        break;
                    case "play":
                        this.play(e.fullscreen);
                        break;
                    case "next":
                        this.next(e.loop);
                        break;
                    case "rotate-left":
                        this.rotate(-90);
                        break;
                    case "rotate-right":
                        this.rotate(90);
                        break;
                    case "flip-horizontal":
                        this.scaleX(-i.scaleX || -1);
                        break;
                    case "flip-vertical":
                        this.scaleY(-i.scaleY || -1);
                        break;
                    default:
                        this.played && this.stop();
                }
            },
            dblclick: function (t) {
                t.preventDefault(),
                    this.viewed &&
                        t.target === this.image &&
                        (a &&
                            t.isTrusted &&
                            clearTimeout(this.doubleClickImageTimeout),
                        this.toggle(
                            t.isTrusted ? t : t.detail && t.detail.originalEvent
                        ));
            },
            load: function () {
                var t = this,
                    e =
                        (this.timeout &&
                            (clearTimeout(this.timeout), (this.timeout = !1)),
                        this.element),
                    i = this.options,
                    n = this.image,
                    o = this.index,
                    s = this.viewerData;
                F(n, p),
                    i.loading && F(this.canvas, b),
                    (n.style.cssText =
                        "height:0;" +
                        "margin-left:".concat(s.width / 2, "px;") +
                        "margin-top:".concat(s.height / 2, "px;") +
                        "max-width:none!important;position:relative;width:0;"),
                    this.initImage(function () {
                        N(n, _, i.movable),
                            N(n, m, i.transition),
                            t.renderImage(function () {
                                (t.viewed = !0),
                                    (t.viewing = !1),
                                    A(i.viewed) &&
                                        M(e, z, i.viewed, { once: !0 }),
                                    P(
                                        e,
                                        z,
                                        {
                                            originalImage: t.images[o],
                                            index: o,
                                            image: n,
                                        },
                                        { cancelable: !1 }
                                    );
                            });
                    });
            },
            loadImage: function (t) {
                var n = t.target,
                    t = n.parentNode,
                    o = t.offsetWidth || 30,
                    s = t.offsetHeight || 50,
                    a = !!Y(n, "filled");
                Et(n, this.options, function (t, e) {
                    var t = t / e,
                        e = o,
                        i = s;
                    o < s * t
                        ? a
                            ? (e = s * t)
                            : (i = o / t)
                        : a
                        ? (i = o / t)
                        : (e = s * t),
                        C(
                            n,
                            O(
                                { width: e, height: i },
                                kt({
                                    translateX: (o - e) / 2,
                                    translateY: (s - i) / 2,
                                })
                            )
                        );
                });
            },
            keydown: function (t) {
                var e = this.options;
                if (e.keyboard) {
                    var i = t.keyCode || t.which || t.charCode;
                    if (
                        (13 === i &&
                            this.viewer.contains(t.target) &&
                            this.click(t),
                        this.fulled)
                    )
                        switch (i) {
                            case 27:
                                this.played
                                    ? this.stop()
                                    : e.inline
                                    ? this.fulled && this.exit()
                                    : this.hide();
                                break;
                            case 32:
                                this.played && this.stop();
                                break;
                            case 37:
                                this.prev(e.loop);
                                break;
                            case 38:
                                t.preventDefault(), this.zoom(e.zoomRatio, !0);
                                break;
                            case 39:
                                this.next(e.loop);
                                break;
                            case 40:
                                t.preventDefault(), this.zoom(-e.zoomRatio, !0);
                                break;
                            case 48:
                            case 49:
                                t.ctrlKey &&
                                    (t.preventDefault(), this.toggle());
                        }
                }
            },
            dragstart: function (t) {
                "img" === t.target.localName && t.preventDefault();
            },
            pointerdown: function (t) {
                var e = this.options,
                    i = this.pointers,
                    n = t.buttons,
                    o = t.button;
                !this.viewed ||
                    this.showing ||
                    this.viewing ||
                    this.hiding ||
                    (("mousedown" === t.type ||
                        ("pointerdown" === t.type &&
                            "mouse" === t.pointerType)) &&
                        ((T(n) && 1 !== n) ||
                            (T(o) && 0 !== o) ||
                            t.ctrlKey)) ||
                    (t.preventDefault(),
                    t.changedTouches
                        ? S(t.changedTouches, function (t) {
                              i[t.identifier] = Dt(t);
                          })
                        : (i[t.pointerId || 0] = Dt(t)),
                    (n = !!e.movable && l),
                    e.zoomOnTouch && e.zoomable && 1 < Object.keys(i).length
                        ? (n = c)
                        : e.slideOnTouch &&
                          ("touch" === t.pointerType ||
                              "touchstart" === t.type) &&
                          this.isSwitchable() &&
                          (n = W),
                    !e.transition || (n !== l && n !== c) || F(this.image, m),
                    (this.action = n));
            },
            pointermove: function (t) {
                var e = this.pointers,
                    i = this.action;
                this.viewed &&
                    i &&
                    (t.preventDefault(),
                    t.changedTouches
                        ? S(t.changedTouches, function (t) {
                              O(e[t.identifier] || {}, Dt(t, !0));
                          })
                        : O(e[t.pointerId || 0] || {}, Dt(t, !0)),
                    this.change(t));
            },
            pointerup: function (t) {
                var e,
                    i = this,
                    n = this.options,
                    o = this.action,
                    s = this.pointers;
                t.changedTouches
                    ? S(t.changedTouches, function (t) {
                          (e = s[t.identifier]), delete s[t.identifier];
                      })
                    : ((e = s[t.pointerId || 0]), delete s[t.pointerId || 0]),
                    o &&
                        (t.preventDefault(),
                        !n.transition ||
                            (o !== l && o !== c) ||
                            R(this.image, m),
                        (this.action = !1),
                        a &&
                            o !== c &&
                            e &&
                            Date.now() - e.timeStamp < 500 &&
                            (clearTimeout(this.clickCanvasTimeout),
                            clearTimeout(this.doubleClickImageTimeout),
                            n.toggleOnDblclick &&
                            this.viewed &&
                            t.target === this.image
                                ? this.imageClicked
                                    ? ((this.imageClicked = !1),
                                      (this.doubleClickImageTimeout =
                                          setTimeout(function () {
                                              P(i.image, J, {
                                                  originalEvent: t,
                                              });
                                          }, 50)))
                                    : ((this.imageClicked = !0),
                                      (this.doubleClickImageTimeout =
                                          setTimeout(function () {
                                              i.imageClicked = !1;
                                          }, 500)))
                                : ((this.imageClicked = !1),
                                  n.backdrop &&
                                      "static" !== n.backdrop &&
                                      t.target === this.canvas &&
                                      (this.clickCanvasTimeout = setTimeout(
                                          function () {
                                              P(i.canvas, w, {
                                                  originalEvent: t,
                                              });
                                          },
                                          50
                                      )))));
            },
            resize: function () {
                var e = this;
                this.isShown &&
                    !this.hiding &&
                    (this.fulled &&
                        (this.close(), this.initBody(), this.open()),
                    this.initContainer(),
                    this.initViewer(),
                    this.renderViewer(),
                    this.renderList(),
                    this.viewed &&
                        this.initImage(function () {
                            e.renderImage();
                        }),
                    this.played &&
                        (this.options.fullscreen &&
                        this.fulled &&
                        !(
                            document.fullscreenElement ||
                            document.webkitFullscreenElement ||
                            document.mozFullScreenElement ||
                            document.msFullscreenElement
                        )
                            ? this.stop()
                            : S(
                                  this.player.getElementsByTagName("img"),
                                  function (t) {
                                      M(t, y, e.loadImage.bind(e), {
                                          once: !0,
                                      }),
                                          P(t, y);
                                  }
                              )));
            },
            wheel: function (t) {
                var e,
                    i,
                    n = this;
                this.viewed &&
                    (t.preventDefault(),
                    this.wheeling ||
                        ((this.wheeling = !0),
                        setTimeout(function () {
                            n.wheeling = !1;
                        }, 50),
                        (e = Number(this.options.zoomRatio) || 0.1),
                        (i = 1),
                        t.deltaY
                            ? (i = 0 < t.deltaY ? 1 : -1)
                            : t.wheelDelta
                            ? (i = -t.wheelDelta / 120)
                            : t.detail && (i = 0 < t.detail ? 1 : -1),
                        this.zoom(-i * e, !0, t)));
            },
        },
        St = {
            show: function () {
                var t =
                        0 < arguments.length &&
                        void 0 !== arguments[0] &&
                        arguments[0],
                    e = this.element,
                    i = this.options;
                if (i.inline || this.showing || this.isShown || this.showing)
                    return this;
                if (!this.ready)
                    return this.build(), this.ready && this.show(t), this;
                if (
                    (A(i.show) && M(e, ht, i.show, { once: !0 }),
                    !1 === P(e, ht) || !this.ready)
                )
                    return this;
                this.hiding && this.transitioning.abort(),
                    (this.showing = !0),
                    this.open();
                var n,
                    o = this.viewer;
                return (
                    F(o, v),
                    o.setAttribute("role", "dialog"),
                    o.setAttribute("aria-labelledby", this.title.id),
                    o.setAttribute("aria-modal", !0),
                    o.removeAttribute("aria-hidden"),
                    i.transition && !t
                        ? ((n = this.shown.bind(this)),
                          (this.transitioning = {
                              abort: function () {
                                  X(o, k, n), F(o, u);
                              },
                          }),
                          R(o, m),
                          (o.initialOffsetWidth = o.offsetWidth),
                          M(o, k, n, { once: !0 }),
                          R(o, u))
                        : (R(o, u), this.shown()),
                    this
                );
            },
            hide: function () {
                var i = this,
                    t =
                        0 < arguments.length &&
                        void 0 !== arguments[0] &&
                        arguments[0],
                    e = this.element,
                    n = this.options;
                if (n.inline || this.hiding || (!this.isShown && !this.showing))
                    return this;
                if (
                    (A(n.hide) && M(e, "hide", n.hide, { once: !0 }),
                    !1 === P(e, "hide"))
                )
                    return this;
                this.showing && this.transitioning.abort(),
                    (this.hiding = !0),
                    this.played
                        ? this.stop()
                        : this.viewing && this.viewing.abort();
                var o,
                    s,
                    a = this.viewer,
                    r = this.image,
                    h = function () {
                        F(a, u), i.hidden();
                    };
                return (
                    n.transition && !t
                        ? ((o = function t(e) {
                              e && e.target === a && (X(a, k, t), i.hidden());
                          }),
                          (s = function () {
                              L(a, m) ? (M(a, k, o), F(a, u)) : h();
                          }),
                          (this.transitioning = {
                              abort: function () {
                                  i.viewed && L(r, m)
                                      ? X(r, k, s)
                                      : L(a, m) && X(a, k, o);
                              },
                          }),
                          this.viewed && L(r, m)
                              ? (M(r, k, s, { once: !0 }),
                                this.zoomTo(0, !1, null, !0))
                              : s())
                        : h(),
                    this
                );
            },
            view: function () {
                var i = this,
                    t =
                        0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : this.options.initialViewIndex,
                    t = Number(t) || 0;
                if (
                    this.hiding ||
                    this.played ||
                    t < 0 ||
                    t >= this.length ||
                    (this.viewed && t === this.index)
                )
                    return this;
                if (!this.isShown) return (this.index = t), this.show();
                this.viewing && this.viewing.abort();
                var e = this.element,
                    n = this.options,
                    o = this.title,
                    s = this.canvas,
                    a = this.items[t],
                    r = a.querySelector("img"),
                    h = Y(r, "originalUrl"),
                    l = r.getAttribute("alt"),
                    c = document.createElement("img");
                if (
                    (S(n.inheritedAttributes, function (t) {
                        var e = r.getAttribute(t);
                        null !== e && c.setAttribute(t, e);
                    }),
                    (c.src = h),
                    (c.alt = l),
                    A(n.view) && M(e, "view", n.view, { once: !0 }),
                    !1 ===
                        P(e, "view", {
                            originalImage: this.images[t],
                            index: t,
                            image: c,
                        }) ||
                        !this.isShown ||
                        this.hiding ||
                        this.played)
                )
                    return this;
                function u() {
                    var t = i.imageData,
                        e = Array.isArray(n.title) ? n.title[1] : n.title;
                    o.innerHTML = E(
                        (e = A(e)
                            ? e.call(i, c, t)
                            : ""
                                  .concat(l, " (")
                                  .concat(t.naturalWidth, " × ")
                                  .concat(t.naturalHeight, ")"))
                    )
                        ? e
                              .replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;")
                              .replace(/"/g, "&quot;")
                              .replace(/'/g, "&#39;")
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")
                        : e;
                }
                var d,
                    m,
                    h = this.items[this.index];
                h && (F(h, f), h.removeAttribute("aria-selected")),
                    R(a, f),
                    a.setAttribute("aria-selected", !0),
                    n.focus && a.focus(),
                    (this.image = c),
                    (this.viewed = !1),
                    (this.index = t),
                    (this.imageData = {}),
                    R(c, p),
                    n.loading && R(s, b),
                    (s.innerHTML = ""),
                    s.appendChild(c),
                    this.renderList(),
                    (o.innerHTML = "");
                return (
                    M(e, z, u, { once: !0 }),
                    (this.viewing = {
                        abort: function () {
                            X(e, z, u),
                                c.complete
                                    ? i.imageRendering
                                        ? i.imageRendering.abort()
                                        : i.imageInitializing &&
                                          i.imageInitializing.abort()
                                    : ((c.src = ""),
                                      X(c, y, d),
                                      i.timeout && clearTimeout(i.timeout));
                        },
                    }),
                    c.complete
                        ? this.load()
                        : (M(
                              c,
                              y,
                              (d = function () {
                                  X(c, x, m), i.load();
                              }),
                              { once: !0 }
                          ),
                          M(
                              c,
                              x,
                              (m = function () {
                                  X(c, y, d),
                                      i.timeout &&
                                          (clearTimeout(i.timeout),
                                          (i.timeout = !1)),
                                      F(c, p),
                                      n.loading && F(i.canvas, b);
                              }),
                              { once: !0 }
                          ),
                          this.timeout && clearTimeout(this.timeout),
                          (this.timeout = setTimeout(function () {
                              F(c, p), (i.timeout = !1);
                          }, 1e3))),
                    this
                );
            },
            prev: function () {
                var t = this.index - 1;
                return (
                    t < 0 &&
                        (t =
                            0 < arguments.length &&
                            void 0 !== arguments[0] &&
                            arguments[0]
                                ? this.length - 1
                                : 0),
                    this.view(t),
                    this
                );
            },
            next: function () {
                var t = this.length - 1,
                    e = this.index + 1;
                return (
                    this.view(
                        (e =
                            t < e
                                ? 0 < arguments.length &&
                                  void 0 !== arguments[0] &&
                                  arguments[0]
                                    ? 0
                                    : t
                                : e)
                    ),
                    this
                );
            },
            move: function (t) {
                var e =
                        1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : t,
                    i = this.imageData;
                return (
                    this.moveTo(
                        D(t) ? t : i.x + Number(t),
                        D(e) ? e : i.y + Number(e)
                    ),
                    this
                );
            },
            moveTo: function (t) {
                var e = this,
                    i =
                        1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : t,
                    n =
                        2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : null,
                    o = this.element,
                    s = this.options,
                    a = this.imageData;
                if (
                    ((t = Number(t)),
                    (i = Number(i)),
                    this.viewed && !this.played && s.movable)
                ) {
                    var r = a.x,
                        h = a.y,
                        l = !1;
                    if (
                        (T(t) ? (l = !0) : (t = r),
                        T(i) ? (l = !0) : (i = h),
                        l)
                    ) {
                        if (
                            (A(s.move) && M(o, "move", s.move, { once: !0 }),
                            !1 ===
                                P(o, "move", {
                                    x: t,
                                    y: i,
                                    oldX: r,
                                    oldY: h,
                                    originalEvent: n,
                                }))
                        )
                            return this;
                        (a.x = t),
                            (a.y = i),
                            (a.left = t),
                            (a.top = i),
                            (this.moving = !0),
                            this.renderImage(function () {
                                (e.moving = !1),
                                    A(s.moved) &&
                                        M(o, "moved", s.moved, { once: !0 }),
                                    P(
                                        o,
                                        "moved",
                                        {
                                            x: t,
                                            y: i,
                                            oldX: r,
                                            oldY: h,
                                            originalEvent: n,
                                        },
                                        { cancelable: !1 }
                                    );
                            });
                    }
                }
                return this;
            },
            rotate: function (t) {
                return (
                    this.rotateTo((this.imageData.rotate || 0) + Number(t)),
                    this
                );
            },
            rotateTo: function (t) {
                var e = this,
                    i = this.element,
                    n = this.options,
                    o = this.imageData;
                if (
                    T((t = Number(t))) &&
                    this.viewed &&
                    !this.played &&
                    n.rotatable
                ) {
                    var s = o.rotate;
                    if (
                        (A(n.rotate) && M(i, "rotate", n.rotate, { once: !0 }),
                        !1 === P(i, "rotate", { degree: t, oldDegree: s }))
                    )
                        return this;
                    (o.rotate = t),
                        (this.rotating = !0),
                        this.renderImage(function () {
                            (e.rotating = !1),
                                A(n.rotated) &&
                                    M(i, lt, n.rotated, { once: !0 }),
                                P(
                                    i,
                                    lt,
                                    { degree: t, oldDegree: s },
                                    { cancelable: !1 }
                                );
                        });
                }
                return this;
            },
            scaleX: function (t) {
                return this.scale(t, this.imageData.scaleY), this;
            },
            scaleY: function (t) {
                return this.scale(this.imageData.scaleX, t), this;
            },
            scale: function (t) {
                var e = this,
                    i =
                        1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : t,
                    n = this.element,
                    o = this.options,
                    s = this.imageData;
                if (
                    ((t = Number(t)),
                    (i = Number(i)),
                    this.viewed && !this.played && o.scalable)
                ) {
                    var a = s.scaleX,
                        r = s.scaleY,
                        h = !1;
                    if (
                        (T(t) ? (h = !0) : (t = a),
                        T(i) ? (h = !0) : (i = r),
                        h)
                    ) {
                        if (
                            (A(o.scale) && M(n, "scale", o.scale, { once: !0 }),
                            !1 ===
                                P(n, "scale", {
                                    scaleX: t,
                                    scaleY: i,
                                    oldScaleX: a,
                                    oldScaleY: r,
                                }))
                        )
                            return this;
                        (s.scaleX = t),
                            (s.scaleY = i),
                            (this.scaling = !0),
                            this.renderImage(function () {
                                (e.scaling = !1),
                                    A(o.scaled) &&
                                        M(n, "scaled", o.scaled, { once: !0 }),
                                    P(
                                        n,
                                        "scaled",
                                        {
                                            scaleX: t,
                                            scaleY: i,
                                            oldScaleX: a,
                                            oldScaleY: r,
                                        },
                                        { cancelable: !1 }
                                    );
                            });
                    }
                }
                return this;
            },
            zoom: function (t) {
                var e =
                        1 < arguments.length &&
                        void 0 !== arguments[1] &&
                        arguments[1],
                    i =
                        2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : null,
                    n = this.imageData;
                return (
                    (t = Number(t)),
                    this.zoomTo(
                        (n.width * (t = t < 0 ? 1 / (1 - t) : 1 + t)) /
                            n.naturalWidth,
                        e,
                        i
                    ),
                    this
                );
            },
            zoomTo: function (t) {
                var i,
                    n,
                    o,
                    e = this,
                    s =
                        1 < arguments.length &&
                        void 0 !== arguments[1] &&
                        arguments[1],
                    a =
                        2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : null,
                    r =
                        3 < arguments.length &&
                        void 0 !== arguments[3] &&
                        arguments[3],
                    h = this.element,
                    l = this.options,
                    c = this.pointers,
                    u = this.imageData,
                    d = u.x,
                    m = u.y,
                    g = u.width,
                    f = u.height,
                    v = u.naturalWidth,
                    p = u.naturalHeight;
                if (
                    T((t = Math.max(0, t))) &&
                    this.viewed &&
                    !this.played &&
                    (r || l.zoomable)
                ) {
                    if (
                        (r ||
                            ((r = Math.max(0.01, l.minZoomRatio)),
                            (w = Math.min(100, l.maxZoomRatio)),
                            (t = Math.min(Math.max(t, r), w))),
                        a)
                    )
                        switch (a.type) {
                            case "wheel":
                                0.055 <= l.zoomRatio &&
                                    0.95 < t &&
                                    t < 1.05 &&
                                    (t = 1);
                                break;
                            case "pointermove":
                            case "touchmove":
                            case "mousemove":
                                0.99 < t && t < 1.01 && (t = 1);
                        }
                    var b,
                        r = v * t,
                        w = p * t,
                        v = r - g,
                        p = w - f,
                        y = u.ratio;
                    if (
                        (A(l.zoom) && M(h, "zoom", l.zoom, { once: !0 }),
                        !1 ===
                            P(h, "zoom", {
                                ratio: t,
                                oldRatio: y,
                                originalEvent: a,
                            }))
                    )
                        return this;
                    (this.zooming = !0),
                        a
                            ? ((b = {
                                  left:
                                      (b = (b =
                                          this.viewer).getBoundingClientRect())
                                          .left +
                                      (window.pageXOffset -
                                          document.documentElement.clientLeft),
                                  top:
                                      b.top +
                                      (window.pageYOffset -
                                          document.documentElement.clientTop),
                              }),
                              (c =
                                  c && 0 < Object.keys(c).length
                                      ? ((o = n = i = 0),
                                        S(c, function (t) {
                                            var e = t.startX,
                                                t = t.startY;
                                            (i += e), (n += t), (o += 1);
                                        }),
                                        { pageX: (i /= o), pageY: (n /= o) })
                                      : { pageX: a.pageX, pageY: a.pageY }),
                              (u.x -= ((c.pageX - b.left - d) / g) * v),
                              (u.y -= ((c.pageY - b.top - m) / f) * p))
                            : ((u.x -= v / 2), (u.y -= p / 2)),
                        (u.left = u.x),
                        (u.top = u.y),
                        (u.width = r),
                        (u.height = w),
                        (u.oldRatio = y),
                        (u.ratio = t),
                        this.renderImage(function () {
                            (e.zooming = !1),
                                A(l.zoomed) &&
                                    M(h, "zoomed", l.zoomed, { once: !0 }),
                                P(
                                    h,
                                    "zoomed",
                                    { ratio: t, oldRatio: y, originalEvent: a },
                                    { cancelable: !1 }
                                );
                        }),
                        s && this.tooltip();
                }
                return this;
            },
            play: function () {
                var e = this,
                    t =
                        0 < arguments.length &&
                        void 0 !== arguments[0] &&
                        arguments[0];
                if (!this.isShown || this.played) return this;
                var i = this.element,
                    o = this.options;
                if (
                    (A(o.play) && M(i, "play", o.play, { once: !0 }),
                    !1 === P(i, "play"))
                )
                    return this;
                var s = this.player,
                    a = this.loadImage.bind(this),
                    r = [],
                    h = 0,
                    l = 0;
                return (
                    (this.played = !0),
                    (this.onLoadWhenPlay = a),
                    t && this.requestFullscreen(t),
                    R(s, d),
                    S(this.items, function (t, e) {
                        var i = t.querySelector("img"),
                            n = document.createElement("img");
                        (n.src = Y(i, "originalUrl")),
                            (n.alt = i.getAttribute("alt")),
                            (n.referrerPolicy = i.referrerPolicy),
                            (h += 1),
                            R(n, H),
                            N(n, m, o.transition),
                            L(t, f) && (R(n, u), (l = e)),
                            r.push(n),
                            M(n, y, a, { once: !0 }),
                            s.appendChild(n);
                    }),
                    T(o.interval) &&
                        0 < o.interval &&
                        1 < h &&
                        (function t() {
                            e.playing = setTimeout(function () {
                                F(r[l], u),
                                    R(r[(l = (l += 1) < h ? l : 0)], u),
                                    t();
                            }, o.interval);
                        })(),
                    this
                );
            },
            stop: function () {
                var e = this;
                if (!this.played) return this;
                var t = this.element,
                    i = this.options;
                if (
                    (A(i.stop) && M(t, "stop", i.stop, { once: !0 }),
                    !1 === P(t, "stop"))
                )
                    return this;
                i = this.player;
                return (
                    (this.played = !1),
                    clearTimeout(this.playing),
                    S(i.getElementsByTagName("img"), function (t) {
                        X(t, y, e.onLoadWhenPlay);
                    }),
                    F(i, d),
                    (i.innerHTML = ""),
                    this.exitFullscreen(),
                    this
                );
            },
            full: function () {
                var t = this,
                    e = this.options,
                    i = this.viewer,
                    n = this.image,
                    o = this.list;
                return (
                    !this.isShown ||
                        this.played ||
                        this.fulled ||
                        !e.inline ||
                        ((this.fulled = !0),
                        this.open(),
                        R(this.button, U),
                        e.transition && (F(o, m), this.viewed && F(n, m)),
                        R(i, B),
                        i.setAttribute("role", "dialog"),
                        i.setAttribute("aria-labelledby", this.title.id),
                        i.setAttribute("aria-modal", !0),
                        i.removeAttribute("style"),
                        C(i, { zIndex: e.zIndex }),
                        e.focus && this.enforceFocus(),
                        this.initContainer(),
                        (this.viewerData = O({}, this.containerData)),
                        this.renderList(),
                        this.viewed &&
                            this.initImage(function () {
                                t.renderImage(function () {
                                    e.transition &&
                                        setTimeout(function () {
                                            R(n, m), R(o, m);
                                        }, 0);
                                });
                            })),
                    this
                );
            },
            exit: function () {
                var t = this,
                    e = this.options,
                    i = this.viewer,
                    n = this.image,
                    o = this.list;
                return (
                    this.isShown &&
                        !this.played &&
                        this.fulled &&
                        e.inline &&
                        ((this.fulled = !1),
                        this.close(),
                        F(this.button, U),
                        e.transition && (F(o, m), this.viewed && F(n, m)),
                        e.focus && this.clearEnforceFocus(),
                        i.removeAttribute("role"),
                        i.removeAttribute("aria-labelledby"),
                        i.removeAttribute("aria-modal"),
                        F(i, B),
                        C(i, { zIndex: e.zIndexInline }),
                        (this.viewerData = O({}, this.parentData)),
                        this.renderViewer(),
                        this.renderList(),
                        this.viewed &&
                            this.initImage(function () {
                                t.renderImage(function () {
                                    e.transition &&
                                        setTimeout(function () {
                                            R(n, m), R(o, m);
                                        }, 0);
                                });
                            })),
                    this
                );
            },
            tooltip: function () {
                var t = this,
                    e = this.options,
                    i = this.tooltipBox,
                    n = this.imageData;
                return (
                    this.viewed &&
                        !this.played &&
                        e.tooltip &&
                        ((i.textContent = "".concat(
                            Math.round(100 * n.ratio),
                            "%"
                        )),
                        this.tooltipping
                            ? clearTimeout(this.tooltipping)
                            : e.transition
                            ? (this.fading && P(i, k),
                              R(i, d),
                              R(i, H),
                              R(i, m),
                              i.removeAttribute("aria-hidden"),
                              (i.initialOffsetWidth = i.offsetWidth),
                              R(i, u))
                            : (R(i, d), i.removeAttribute("aria-hidden")),
                        (this.tooltipping = setTimeout(function () {
                            e.transition
                                ? (M(
                                      i,
                                      k,
                                      function () {
                                          F(i, d),
                                              F(i, H),
                                              F(i, m),
                                              i.setAttribute("aria-hidden", !0),
                                              (t.fading = !1);
                                      },
                                      { once: !0 }
                                  ),
                                  F(i, u),
                                  (t.fading = !0))
                                : (F(i, d), i.setAttribute("aria-hidden", !0)),
                                (t.tooltipping = !1);
                        }, 1e3))),
                    this
                );
            },
            toggle: function () {
                var t =
                    0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : null;
                return (
                    1 === this.imageData.ratio
                        ? this.zoomTo(this.imageData.oldRatio, !0, t)
                        : this.zoomTo(1, !0, t),
                    this
                );
            },
            reset: function () {
                return (
                    this.viewed &&
                        !this.played &&
                        ((this.imageData = O({}, this.initialImageData)),
                        this.renderImage()),
                    this
                );
            },
            update: function () {
                var e = this,
                    t = this.element,
                    i = this.options,
                    n = this.isImg;
                if (n && !t.parentNode) return this.destroy();
                var o,
                    s = [];
                return (
                    S(n ? [t] : t.querySelectorAll("img"), function (t) {
                        A(i.filter)
                            ? i.filter.call(e, t) && s.push(t)
                            : e.getImageURL(t) && s.push(t);
                    }),
                    s.length &&
                        ((this.images = s),
                        (this.length = s.length),
                        this.ready
                            ? ((o = []),
                              S(this.items, function (t, e) {
                                  var t = t.querySelector("img"),
                                      i = s[e];
                                  (i &&
                                      t &&
                                      i.src === t.src &&
                                      i.alt === t.alt) ||
                                      o.push(e);
                              }),
                              C(this.list, { width: "auto" }),
                              this.initList(),
                              this.isShown &&
                                  (this.length
                                      ? this.viewed &&
                                        (0 <= (n = o.indexOf(this.index))
                                            ? ((this.viewed = !1),
                                              this.view(
                                                  Math.max(
                                                      Math.min(
                                                          this.index - n,
                                                          this.length - 1
                                                      ),
                                                      0
                                                  )
                                              ))
                                            : (R(
                                                  (t = this.items[this.index]),
                                                  f
                                              ),
                                              t.setAttribute(
                                                  "aria-selected",
                                                  !0
                                              )))
                                      : ((this.image = null),
                                        (this.viewed = !1),
                                        (this.index = 0),
                                        (this.imageData = {}),
                                        (this.canvas.innerHTML = ""),
                                        (this.title.innerHTML = ""))))
                            : this.build()),
                    this
                );
            },
            destroy: function () {
                var t = this.element,
                    e = this.options;
                return (
                    t[g] &&
                        ((this.destroyed = !0),
                        this.ready
                            ? (this.played && this.stop(),
                              e.inline
                                  ? (this.fulled && this.exit(), this.unbind())
                                  : this.isShown
                                  ? (this.viewing &&
                                        (this.imageRendering
                                            ? this.imageRendering.abort()
                                            : this.imageInitializing &&
                                              this.imageInitializing.abort()),
                                    this.hiding && this.transitioning.abort(),
                                    this.hidden())
                                  : this.showing &&
                                    (this.transitioning.abort(), this.hidden()),
                              (this.ready = !1),
                              this.viewer.parentNode.removeChild(this.viewer))
                            : e.inline &&
                              (this.delaying
                                  ? this.delaying.abort()
                                  : this.initializing &&
                                    this.initializing.abort()),
                        e.inline || X(t, w, this.onStart),
                        (t[g] = void 0)),
                    this
                );
            },
        },
        Ot = {
            getImageURL: function (t) {
                var e = this.options.url;
                return (e = E(e)
                    ? t.getAttribute(e)
                    : A(e)
                    ? e.call(this, t)
                    : "");
            },
            enforceFocus: function () {
                var n = this;
                this.clearEnforceFocus(),
                    M(
                        document,
                        tt,
                        (this.onFocusin = function (t) {
                            var e = n.viewer,
                                i = t.target;
                            if (i !== document && i !== e && !e.contains(i)) {
                                for (; i; ) {
                                    if (
                                        null !== i.getAttribute("tabindex") ||
                                        "true" === i.getAttribute("aria-modal")
                                    )
                                        return;
                                    i = i.parentElement;
                                }
                                e.focus();
                            }
                        })
                    );
            },
            clearEnforceFocus: function () {
                this.onFocusin &&
                    (X(document, tt, this.onFocusin), (this.onFocusin = null));
            },
            open: function () {
                var t = this.body;
                R(t, G),
                    (t.style.paddingRight = "".concat(
                        this.scrollbarWidth +
                            (parseFloat(this.initialBodyComputedPaddingRight) ||
                                0),
                        "px"
                    ));
            },
            close: function () {
                var t = this.body;
                F(t, G), (t.style.paddingRight = this.initialBodyPaddingRight);
            },
            shown: function () {
                var t = this.element,
                    e = this.options,
                    i = this.viewer;
                (this.fulled = !0),
                    (this.isShown = !0),
                    this.render(),
                    this.bind(),
                    (this.showing = !1),
                    e.focus && (i.focus(), this.enforceFocus()),
                    A(e.shown) && M(t, "shown", e.shown, { once: !0 }),
                    !1 !== P(t, "shown") &&
                        this.ready &&
                        this.isShown &&
                        !this.hiding &&
                        this.view(this.index);
            },
            hidden: function () {
                var t = this.element,
                    e = this.options,
                    i = this.viewer;
                e.fucus && this.clearEnforceFocus(),
                    (this.fulled = !1),
                    (this.viewed = !1),
                    (this.isShown = !1),
                    this.close(),
                    this.unbind(),
                    R(i, v),
                    i.removeAttribute("role"),
                    i.removeAttribute("aria-labelledby"),
                    i.removeAttribute("aria-modal"),
                    i.setAttribute("aria-hidden", !0),
                    this.resetList(),
                    this.resetImage(),
                    (this.hiding = !1),
                    this.destroyed ||
                        (A(e.hidden) && M(t, "hidden", e.hidden, { once: !0 }),
                        P(t, "hidden", null, { cancelable: !1 }));
            },
            requestFullscreen: function (t) {
                var e = this.element.ownerDocument;
                this.fulled &&
                    !(
                        e.fullscreenElement ||
                        e.webkitFullscreenElement ||
                        e.mozFullScreenElement ||
                        e.msFullscreenElement
                    ) &&
                    ((e = e.documentElement).requestFullscreen
                        ? I(t)
                            ? e.requestFullscreen(t)
                            : e.requestFullscreen()
                        : e.webkitRequestFullscreen
                        ? e.webkitRequestFullscreen(
                              Element.ALLOW_KEYBOARD_INPUT
                          )
                        : e.mozRequestFullScreen
                        ? e.mozRequestFullScreen()
                        : e.msRequestFullscreen && e.msRequestFullscreen());
            },
            exitFullscreen: function () {
                var t = this.element.ownerDocument;
                this.fulled &&
                    (t.fullscreenElement ||
                        t.webkitFullscreenElement ||
                        t.mozFullScreenElement ||
                        t.msFullscreenElement) &&
                    (t.exitFullscreen
                        ? t.exitFullscreen()
                        : t.webkitExitFullscreen
                        ? t.webkitExitFullscreen()
                        : t.mozCancelFullScreen
                        ? t.mozCancelFullScreen()
                        : t.msExitFullscreen && t.msExitFullscreen());
            },
            change: function (t) {
                var e = this.options,
                    i = this.pointers,
                    n = i[Object.keys(i)[0]];
                if (n) {
                    var s,
                        a,
                        o = n.endX - n.startX,
                        r = n.endY - n.startY;
                    switch (this.action) {
                        case l:
                            this.move(o, r, t);
                            break;
                        case c:
                            this.zoom(
                                ((s = q({}, (h = i))),
                                (a = []),
                                S(h, function (o, t) {
                                    delete s[t],
                                        S(s, function (t) {
                                            var e = Math.abs(
                                                    o.startX - t.startX
                                                ),
                                                i = Math.abs(
                                                    o.startY - t.startY
                                                ),
                                                n = Math.abs(o.endX - t.endX),
                                                t = Math.abs(o.endY - t.endY),
                                                e = Math.sqrt(e * e + i * i),
                                                i = Math.sqrt(n * n + t * t);
                                            a.push((i - e) / e);
                                        });
                                }),
                                a.sort(function (t, e) {
                                    return Math.abs(t) < Math.abs(e);
                                }),
                                a[0]),
                                !1,
                                t
                            );
                            break;
                        case W:
                            this.action = "switched";
                            var h = Math.abs(o);
                            1 < h &&
                                h > Math.abs(r) &&
                                ((this.pointers = {}),
                                1 < o
                                    ? this.prev(e.loop)
                                    : o < -1 && this.next(e.loop));
                    }
                    S(i, function (t) {
                        (t.startX = t.endX), (t.startY = t.endY);
                    });
                }
            },
            isSwitchable: function () {
                var t = this.imageData,
                    e = this.viewerData;
                return (
                    1 < this.length &&
                    0 <= t.x &&
                    0 <= t.y &&
                    t.width <= e.width &&
                    t.height <= e.height
                );
            },
        },
        Ct = e.Viewer,
        Lt =
            ((It = -1),
            function () {
                return (It += 1);
            }),
        e = (function () {
            function o(t) {
                var e =
                        1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                    i = this,
                    n = o;
                if (!(i instanceof n))
                    throw new TypeError("Cannot call a class as a function");
                if (!t || 1 !== t.nodeType)
                    throw new Error(
                        "The first argument is required and must be an element."
                    );
                (this.element = t),
                    (this.options = O({}, h, I(e) && e)),
                    (this.action = !1),
                    (this.fading = !1),
                    (this.fulled = !1),
                    (this.hiding = !1),
                    (this.imageClicked = !1),
                    (this.imageData = {}),
                    (this.index = this.options.initialViewIndex),
                    (this.isImg = !1),
                    (this.isShown = !1),
                    (this.length = 0),
                    (this.moving = !1),
                    (this.played = !1),
                    (this.playing = !1),
                    (this.pointers = {}),
                    (this.ready = !1),
                    (this.rotating = !1),
                    (this.scaling = !1),
                    (this.showing = !1),
                    (this.timeout = !1),
                    (this.tooltipping = !1),
                    (this.viewed = !1),
                    (this.viewing = !1),
                    (this.wheeling = !1),
                    (this.zooming = !1),
                    (this.id = Lt()),
                    this.init();
            }
            var t, e, i;
            return (
                (t = o),
                (i = [
                    {
                        key: "noConflict",
                        value: function () {
                            return (window.Viewer = Ct), o;
                        },
                    },
                    {
                        key: "setDefaults",
                        value: function (t) {
                            O(h, I(t) && t);
                        },
                    },
                ]),
                (e = [
                    {
                        key: "init",
                        value: function () {
                            var t,
                                e,
                                i,
                                n,
                                o = this,
                                s = this.element,
                                a = this.options;
                            s[g] ||
                                ((s[g] = this),
                                a.focus && !a.keyboard && (a.focus = !1),
                                (t = "img" === s.localName),
                                (e = []),
                                S(
                                    t ? [s] : s.querySelectorAll("img"),
                                    function (t) {
                                        A(a.filter)
                                            ? a.filter.call(o, t) && e.push(t)
                                            : o.getImageURL(t) && e.push(t);
                                    }
                                ),
                                (this.isImg = t),
                                (this.length = e.length),
                                (this.images = e),
                                this.initBody(),
                                D(document.createElement(g).style.transition) &&
                                    (a.transition = !1),
                                a.inline
                                    ? ((i = 0),
                                      (n = function () {
                                          var t;
                                          (i += 1) === o.length &&
                                              ((o.initializing = !1),
                                              (o.delaying = {
                                                  abort: function () {
                                                      clearTimeout(t);
                                                  },
                                              }),
                                              (t = setTimeout(function () {
                                                  (o.delaying = !1), o.build();
                                              }, 0)));
                                      }),
                                      (this.initializing = {
                                          abort: function () {
                                              S(e, function (t) {
                                                  t.complete ||
                                                      (X(t, y, n), X(t, x, n));
                                              });
                                          },
                                      }),
                                      S(e, function (t) {
                                          var e, i;
                                          t.complete
                                              ? n()
                                              : (M(
                                                    t,
                                                    y,
                                                    (e = function () {
                                                        X(t, x, i), n();
                                                    }),
                                                    { once: !0 }
                                                ),
                                                M(
                                                    t,
                                                    x,
                                                    (i = function () {
                                                        X(t, y, e), n();
                                                    }),
                                                    { once: !0 }
                                                ));
                                      }))
                                    : M(
                                          s,
                                          w,
                                          (this.onStart = function (t) {
                                              t = t.target;
                                              "img" !== t.localName ||
                                                  (A(a.filter) &&
                                                      !a.filter.call(o, t)) ||
                                                  o.view(o.images.indexOf(t));
                                          })
                                      ));
                        },
                    },
                    {
                        key: "build",
                        value: function () {
                            var t, s, e, i, n, o, a, r, h, l, c, u, d, m;
                            this.ready ||
                                ((t = this.element),
                                (s = this.options),
                                (e = t.parentNode),
                                ((d = document.createElement("div")).innerHTML =
                                    '<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>'),
                                (d = (i = d.querySelector(
                                    ".".concat(g, "-container")
                                )).querySelector(".".concat(g, "-title"))),
                                (n = i.querySelector(
                                    ".".concat(g, "-toolbar")
                                )),
                                (m = i.querySelector(".".concat(g, "-navbar"))),
                                (o = i.querySelector(".".concat(g, "-button"))),
                                (a = i.querySelector(".".concat(g, "-canvas"))),
                                (this.parent = e),
                                (this.viewer = i),
                                (this.title = d),
                                (this.toolbar = n),
                                (this.navbar = m),
                                (this.button = o),
                                (this.canvas = a),
                                (this.footer = i.querySelector(
                                    ".".concat(g, "-footer")
                                )),
                                (this.tooltipBox = i.querySelector(
                                    ".".concat(g, "-tooltip")
                                )),
                                (this.player = i.querySelector(
                                    ".".concat(g, "-player")
                                )),
                                (this.list = i.querySelector(
                                    ".".concat(g, "-list")
                                )),
                                (i.id = "".concat(g).concat(this.id)),
                                (d.id = "".concat(g, "Title").concat(this.id)),
                                R(
                                    d,
                                    s.title
                                        ? Tt(
                                              Array.isArray(s.title)
                                                  ? s.title[0]
                                                  : s.title
                                          )
                                        : v
                                ),
                                R(m, s.navbar ? Tt(s.navbar) : v),
                                N(o, v, !s.button),
                                s.keyboard && o.setAttribute("tabindex", 0),
                                s.backdrop &&
                                    (R(i, "".concat(g, "-backdrop")),
                                    s.inline ||
                                        "static" === s.backdrop ||
                                        bt(a, ct, "hide")),
                                E(s.className) &&
                                    s.className &&
                                    s.className.split(ut).forEach(function (t) {
                                        R(i, t);
                                    }),
                                s.toolbar
                                    ? ((r = document.createElement("ul")),
                                      (h = I(s.toolbar)),
                                      (l = dt.slice(0, 3)),
                                      (c = dt.slice(7, 9)),
                                      (u = dt.slice(9)),
                                      h || R(n, Tt(s.toolbar)),
                                      S(h ? s.toolbar : dt, function (t, e) {
                                          var i,
                                              n = h && I(t),
                                              e = h ? pt(e) : t,
                                              o = n && !D(t.show) ? t.show : t;
                                          !o ||
                                              (!s.zoomable &&
                                                  -1 !== l.indexOf(e)) ||
                                              (!s.rotatable &&
                                                  -1 !== c.indexOf(e)) ||
                                              (!s.scalable &&
                                                  -1 !== u.indexOf(e)) ||
                                              ((i =
                                                  n && !D(t.size) ? t.size : t),
                                              (n =
                                                  n && !D(t.click)
                                                      ? t.click
                                                      : t),
                                              (t =
                                                  document.createElement("li")),
                                              s.keyboard &&
                                                  t.setAttribute("tabindex", 0),
                                              t.setAttribute("role", "button"),
                                              R(t, "".concat(g, "-").concat(e)),
                                              A(n) || bt(t, ct, e),
                                              T(o) && R(t, Tt(o)),
                                              -1 !==
                                              ["small", "large"].indexOf(i)
                                                  ? R(
                                                        t,
                                                        ""
                                                            .concat(g, "-")
                                                            .concat(i)
                                                    )
                                                  : "play" === e &&
                                                    R(
                                                        t,
                                                        "".concat(g, "-large")
                                                    ),
                                              A(n) && M(t, w, n),
                                              r.appendChild(t));
                                      }),
                                      n.appendChild(r))
                                    : R(n, v),
                                s.rotatable ||
                                    (R(
                                        (d = n.querySelectorAll(
                                            'li[class*="rotate"]'
                                        )),
                                        p
                                    ),
                                    S(d, function (t) {
                                        n.appendChild(t);
                                    })),
                                s.inline
                                    ? (R(o, V),
                                      C(i, { zIndex: s.zIndexInline }),
                                      "static" ===
                                          window.getComputedStyle(e).position &&
                                          C(e, { position: "relative" }),
                                      e.insertBefore(i, t.nextSibling))
                                    : (R(o, j),
                                      R(i, B),
                                      R(i, H),
                                      R(i, v),
                                      C(i, { zIndex: s.zIndex }),
                                      (m =
                                          (m = E((m = s.container))
                                              ? t.ownerDocument.querySelector(m)
                                              : m) || this.body).appendChild(
                                          i
                                      )),
                                s.inline &&
                                    (this.render(),
                                    this.bind(),
                                    (this.isShown = !0)),
                                (this.ready = !0),
                                A(s.ready) && M(t, rt, s.ready, { once: !0 }),
                                !1 === P(t, rt)
                                    ? (this.ready = !1)
                                    : this.ready &&
                                      s.inline &&
                                      this.view(this.index));
                        },
                    },
                ]) && r(t.prototype, e),
                i && r(t, i),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                o
            );
        })();
    return O(e.prototype, i, t, At, St, Ot), e;
});
