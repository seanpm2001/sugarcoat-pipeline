{
    const $___mock_c959e1c702756f5f = {};
    (exports => {
        'use strict';
        const xhrUnsent = 0;
        const xhrOpened = 1;
        const xhrHeadersReceived = 2;
        const xhrLoading = 3;
        const xhrDone = 4;
        const xhrDeferredHandleSymbol = Symbol('deferredHandle');
        const xhrOnLoadStartSymbol = Symbol('onloadstart');
        const xhrOnProgressSymbol = Symbol('onprogress');
        const xhrOnAbortSymbol = Symbol('onabort');
        const xhrOnErrorSymbol = Symbol('onerror');
        const xhrOnLoadSymbol = Symbol('onload');
        const xhrOnTimeoutSymbol = Symbol('ontimeout');
        const xhrOnLoadEndSymbol = Symbol('onloadend');
        const xhrOnReadyStateChangeSymbol = Symbol('onreadystatechange');
        const xhrReadyStateSymbol = Symbol('readyState');
        const xhrTimeoutSymbol = Symbol('timeout');
        const xhrWithCredentialsSymbol = Symbol('withCredentials');
        const xhrUploadSymbol = Symbol('upload');
        const xhrResponseTypeSymbol = Symbol('responseType');
        const defineEvent = (obj, symbol) => {
            const type = symbol.description.substring(2);
            Object.defineProperty(obj, symbol, {
                configurable: false,
                enumerable: false,
                value: null,
                writable: true
            });
            obj.addEventListener(type, function (event) {
                const handler = this[symbol];
                if (handler) {
                    handler.call(this, event);
                }
            });
        };
        const changeReadyState = (xhr, readyState) => {
            xhr[xhrReadyStateSymbol] = readyState;
            xhr.dispatchEvent(new Event('readystatechange'));
        };
        let isSealed = true;
        class XMLHttpRequestEventTarget extends EventTarget {
            constructor() {
                super();
                if (!(this instanceof XMLHttpRequest) && !(this instanceof XMLHttpRequestUpload)) {
                    throw new TypeError('Illegal constructor');
                }
                defineEvent(this, xhrOnLoadStartSymbol);
                defineEvent(this, xhrOnProgressSymbol);
                defineEvent(this, xhrOnAbortSymbol);
                defineEvent(this, xhrOnErrorSymbol);
                defineEvent(this, xhrOnLoadSymbol);
                defineEvent(this, xhrOnTimeoutSymbol);
                defineEvent(this, xhrOnLoadEndSymbol);
            }
            get onloadstart() {
                return this[xhrOnLoadStartSymbol];
            }
            set onloadstart(value) {
                this[xhrOnLoadStartSymbol] = value;
            }
            get onprogress() {
                return this[xhrOnProgressSymbol];
            }
            set onprogress(value) {
                this[xhrOnProgressSymbol] = value;
            }
            get onabort() {
                return this[xhrOnAbortSymbol];
            }
            set onabort(value) {
                this[xhrOnAbortSymbol] = value;
            }
            get onerror() {
                return this[xhrOnErrorSymbol];
            }
            set onerror(value) {
                this[xhrOnErrorSymbol] = value;
            }
            get ontimeout() {
                return this[xhrOnTimeoutSymbol];
            }
            set ontimeout(value) {
                this[xhrOnTimeoutSymbol] = value;
            }
            get onloadend() {
                return this[xhrOnLoadEndSymbol];
            }
            set onloadend(value) {
                this[xhrOnLoadEndSymbol] = value;
            }
        }
        exports.XMLHttpRequestEventTarget = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequestEventTarget,
            writable: true
        };
        class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
            constructor() {
                if (isSealed) {
                    throw new TypeError('Illegal constructor');
                }
                super();
            }
        }
        exports.XMLHttpRequestUpload = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequestUpload,
            writable: true
        };
        class XMLHttpRequest extends XMLHttpRequestEventTarget {
            constructor() {
                super();
                isSealed = false;
                const xhrUpload = new XMLHttpRequestUpload();
                isSealed = true;
                Object.defineProperty(this, xhrDeferredHandleSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: null,
                    writable: true
                });
                defineEvent(this, xhrOnReadyStateChangeSymbol);
                Object.defineProperty(this, xhrReadyStateSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: xhrUnsent,
                    writable: true
                });
                Object.defineProperty(this, xhrTimeoutSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: 0,
                    writable: true
                });
                Object.defineProperty(this, xhrWithCredentialsSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: false,
                    writable: true
                });
                Object.defineProperty(this, xhrUploadSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: xhrUpload,
                    writable: false
                });
                Object.defineProperty(this, xhrResponseTypeSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: '',
                    writable: true
                });
            }
            get onreadystatechange() {
                return this[xhrOnReadyStateChangeSymbol];
            }
            set onreadystatechange(value) {
                this[xhrOnReadyStateChangeSymbol] = value;
            }
            get readyState() {
                return this[xhrReadyStateSymbol];
            }
            open(method, url) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrUnsent:
                case xhrDone: {
                        changeReadyState(this, xhrOpened);
                        break;
                    }
                }
            }
            setRequestHeader(name, value) {
            }
            setTrustToken(trustToken) {
            }
            get timeout() {
                return this[xhrTimeoutSymbol];
            }
            set timeout(value) {
                this[xhrTimeoutSymbol] = value;
            }
            get withCredentials() {
                return this[xhrWithCredentialsSymbol];
            }
            set withCredentials(value) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrUnsent:
                case xhrOpened: {
                        break;
                    }
                default: {
                        throw new DOMException('Failed to set the \'withCredentials\' property on \'XMLHttpRequest\': The value may only be set if the object\'s state is UNSENT or OPENED.');
                    }
                }
                this[xhrWithCredentialsSymbol] = !!value;
            }
            get upload() {
                return this[xhrUploadSymbol];
            }
            send() {
                if (this[xhrReadyStateSymbol] === xhrOpened && this[xhrDeferredHandleSymbol] === null) {
                    this[xhrDeferredHandleSymbol] = setTimeout(() => {
                        this[xhrDeferredHandleSymbol] = null;
                        changeReadyState(this, xhrDone);
                        this.dispatchEvent(new ProgressEvent('error'));
                        this.dispatchEvent(new ProgressEvent('loadend'));
                    }, 0);
                } else {
                    throw new DOMException('Failed to execute \'send\' on \'XMLHttpRequest\': The object\'s state must be OPENED.');
                }
            }
            abort() {
                if (this[xhrReadyStateSymbol] === xhrOpened && this[xhrDeferredHandleSymbol] !== null) {
                    clearTimeout(this[xhrDeferredHandleSymbol]);
                    this[xhrDeferredHandleSymbol] = null;
                    changeReadyState(this, xhrUnsent);
                    this.dispatchEvent(new ProgressEvent('abort'));
                    this.dispatchEvent(new ProgressEvent('loadend'));
                }
            }
            get responseURL() {
                return '';
            }
            get status() {
                return 0;
            }
            get statusText() {
                return '';
            }
            getResponseHeader(name) {
                return null;
            }
            overrideMimeType(mime) {
            }
            get responseType() {
                return this[xhrResponseTypeSymbol];
            }
            set responseType(value) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrDone: {
                        throw new DOMException('Failed to set the \'responseType\' property on \'XMLHttpRequest\': The response type cannot be set if the object\'s state is LOADING or DONE.');
                    }
                }
                switch (value) {
                case '':
                case 'arraybuffer':
                case 'blob':
                case 'document':
                case 'json':
                case 'text': {
                        this[xhrResponseTypeSymbol] = value;
                        break;
                    }
                }
            }
            get response() {
                const responseType = this[xhrResponseTypeSymbol];
                return responseType === '' || responseType === 'text' ? '' : null;
            }
            get responseText() {
                const responseType = this[xhrResponseTypeSymbol];
                if (responseType === '' || responseType === 'text') {
                    return '';
                } else {
                    throw new DOMException('Failed to read the \'responseText\' property from \'XMLHttpRequest\': The value is only accessible if the object\'s \'responseType\' is \'\' or \'text\' (was \'arraybuffer\').');
                }
            }
            get responseXML() {
                return null;
            }
        }
        Object.defineProperty(XMLHttpRequest, 'UNSENT', {
            configurable: false,
            enumerable: true,
            value: xhrUnsent
        });
        Object.defineProperty(XMLHttpRequest, 'OPENED', {
            configurable: false,
            enumerable: true,
            value: xhrOpened
        });
        Object.defineProperty(XMLHttpRequest, 'HEADERS_RECEIVED', {
            configurable: false,
            enumerable: true,
            value: xhrHeadersReceived
        });
        Object.defineProperty(XMLHttpRequest, 'LOADING', {
            configurable: false,
            enumerable: true,
            value: xhrLoading
        });
        Object.defineProperty(XMLHttpRequest, 'DONE', {
            configurable: false,
            enumerable: true,
            value: xhrDone
        });
        exports.XMLHttpRequest = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequest,
            writable: true
        };
    })($___mock_c959e1c702756f5f);
    (function () {
        (function (E) {
            var window = this;
            if (window.googletag && googletag.evalScripts) {
                googletag.evalScripts();
            }
            if (window.googletag && googletag._loaded_)
                return;
            var aa = function (a) {
                    var b = 0;
                    return function () {
                        return b < a.length ? {
                            done: !1,
                            value: a[b++]
                        } : { done: !0 };
                    };
                }, ba = 'function' == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
                    if (a == Array.prototype || a == Object.prototype)
                        return a;
                    a[b] = c.value;
                    return a;
                }, ca = function (a) {
                    a = [
                        'object' == typeof globalThis && globalThis,
                        a,
                        'object' == typeof window && window,
                        'object' == typeof self && self,
                        'object' == typeof global && global
                    ];
                    for (var b = 0; b < a.length; ++b) {
                        var c = a[b];
                        if (c && c.Math == Math)
                            return c;
                    }
                    throw Error('Cannot find global object');
                }, da = ca(this), ea = 'function' === typeof Symbol && 'symbol' === typeof Symbol('x'), m = {}, fa = {}, n = function (a, b) {
                    var c = fa[b];
                    if (null == c)
                        return a[b];
                    c = a[c];
                    return void 0 !== c ? c : a[b];
                }, q = function (a, b, c) {
                    if (b)
                        a: {
                            var d = a.split('.');
                            a = 1 === d.length;
                            var e = d[0], f;
                            !a && e in m ? f = m : f = da;
                            for (e = 0; e < d.length - 1; e++) {
                                var g = d[e];
                                if (!(g in f))
                                    break a;
                                f = f[g];
                            }
                            d = d[d.length - 1];
                            c = ea && 'es6' === c ? f[d] : null;
                            b = b(c);
                            null != b && (a ? ba(m, d, {
                                configurable: !0,
                                writable: !0,
                                value: b
                            }) : b !== c && (void 0 === fa[d] && (a = 1000000000 * Math.random() >>> 0, fa[d] = ea ? da.Symbol(d) : '$jscp$' + a + '$' + d), ba(f, fa[d], {
                                configurable: !0,
                                writable: !0,
                                value: b
                            })));
                        }
                };
            q('Symbol', function (a) {
                if (a)
                    return a;
                var b = function (f, g) {
                    this.g = f;
                    ba(this, 'description', {
                        configurable: !0,
                        writable: !0,
                        value: g
                    });
                };
                b.prototype.toString = function () {
                    return this.g;
                };
                var c = 'jscomp_symbol_' + (1000000000 * Math.random() >>> 0) + '_', d = 0, e = function (f) {
                        if (this instanceof e)
                            throw new TypeError('Symbol is not a constructor');
                        return new b(c + (f || '') + '_' + d++, f);
                    };
                return e;
            }, 'es6');
            q('Symbol.iterator', function (a) {
                if (a)
                    return a;
                a = (0, m.Symbol)('Symbol.iterator');
                for (var b = 'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(' '), c = 0; c < b.length; c++) {
                    var d = da[b[c]];
                    'function' === typeof d && 'function' != typeof d.prototype[a] && ba(d.prototype, a, {
                        configurable: !0,
                        writable: !0,
                        value: function () {
                            return ha(aa(this));
                        }
                    });
                }
                return a;
            }, 'es6');
            var ha = function (a) {
                    a = { next: a };
                    a[n(m.Symbol, 'iterator')] = function () {
                        return this;
                    };
                    return a;
                }, r = function (a) {
                    var b = 'undefined' != typeof m.Symbol && n(m.Symbol, 'iterator') && a[n(m.Symbol, 'iterator')];
                    return b ? b.call(a) : { next: aa(a) };
                }, ia = function (a) {
                    for (var b, c = []; !(b = a.next()).done;)
                        c.push(b.value);
                    return c;
                }, t = function (a) {
                    return a instanceof Array ? a : ia(r(a));
                }, ja = 'function' == typeof Object.create ? Object.create : function (a) {
                    var b = function () {
                    };
                    b.prototype = a;
                    return new b();
                }, ka;
            if (ea && 'function' == typeof Object.setPrototypeOf)
                ka = Object.setPrototypeOf;
            else {
                var la;
                a: {
                    var ma = { a: !0 }, na = {};
                    try {
                        na.__proto__ = ma;
                        la = na.a;
                        break a;
                    } catch (a) {
                    }
                    la = !1;
                }
                ka = la ? function (a, b) {
                    a.__proto__ = b;
                    if (a.__proto__ !== b)
                        throw new TypeError(a + ' is not extensible');
                    return a;
                } : null;
            }
            var oa = ka, u = function (a, b) {
                    a.prototype = ja(b.prototype);
                    a.prototype.constructor = a;
                    if (oa)
                        oa(a, b);
                    else
                        for (var c in b)
                            if ('prototype' != c)
                                if (Object.defineProperties) {
                                    var d = Object.getOwnPropertyDescriptor(b, c);
                                    d && Object.defineProperty(a, c, d);
                                } else
                                    a[c] = b[c];
                    a.xa = b.prototype;
                }, v = function (a, b) {
                    return Object.prototype.hasOwnProperty.call(a, b);
                };
            q('WeakMap', function (a) {
                function b() {
                }
                function c(g) {
                    var h = typeof g;
                    return 'object' === h && null !== g || 'function' === h;
                }
                if (function () {
                        if (!a || !Object.seal)
                            return !1;
                        try {
                            var g = Object.seal({}), h = Object.seal({}), k = new a([
                                    [
                                        g,
                                        2
                                    ],
                                    [
                                        h,
                                        3
                                    ]
                                ]);
                            if (2 != k.get(g) || 3 != k.get(h))
                                return !1;
                            k.delete(g);
                            k.set(h, 4);
                            return !k.has(g) && 4 == k.get(h);
                        } catch (l) {
                            return !1;
                        }
                    }())
                    return a;
                var d = '$jscomp_hidden_' + Math.random(), e = 0, f = function (g) {
                        this.g = (e += Math.random() + 1).toString();
                        if (g) {
                            g = r(g);
                            for (var h; !(h = g.next()).done;)
                                h = h.value, this.set(h[0], h[1]);
                        }
                    };
                f.prototype.set = function (g, h) {
                    if (!c(g))
                        throw Error('Invalid WeakMap key');
                    if (!v(g, d)) {
                        var k = new b();
                        ba(g, d, { value: k });
                    }
                    if (!v(g, d))
                        throw Error('WeakMap key fail: ' + g);
                    g[d][this.g] = h;
                    return this;
                };
                f.prototype.get = function (g) {
                    return c(g) && v(g, d) ? g[d][this.g] : void 0;
                };
                f.prototype.has = function (g) {
                    return c(g) && v(g, d) && v(g[d], this.g);
                };
                f.prototype.delete = function (g) {
                    return c(g) && v(g, d) && v(g[d], this.g) ? delete g[d][this.g] : !1;
                };
                return f;
            }, 'es6');
            q('Map', function (a) {
                if (function () {
                        if (!a || 'function' != typeof a || !a.prototype.entries || 'function' != typeof Object.seal)
                            return !1;
                        try {
                            var h = Object.seal({ x: 4 }), k = new a(r([[
                                        h,
                                        's'
                                    ]]));
                            if ('s' != k.get(h) || 1 != k.size || k.get({ x: 4 }) || k.set({ x: 4 }, 't') != k || 2 != k.size)
                                return !1;
                            var l = k.entries(), p = l.next();
                            if (p.done || p.value[0] != h || 's' != p.value[1])
                                return !1;
                            p = l.next();
                            return p.done || 4 != p.value[0].x || 't' != p.value[1] || !l.next().done ? !1 : !0;
                        } catch (U) {
                            return !1;
                        }
                    }())
                    return a;
                var b = new m.WeakMap(), c = function (h) {
                        this.h = {};
                        this.g = f();
                        this.size = 0;
                        if (h) {
                            h = r(h);
                            for (var k; !(k = h.next()).done;)
                                k = k.value, this.set(k[0], k[1]);
                        }
                    };
                c.prototype.set = function (h, k) {
                    h = 0 === h ? 0 : h;
                    var l = d(this, h);
                    l.list || (l.list = this.h[l.id] = []);
                    l.m ? l.m.value = k : (l.m = {
                        next: this.g,
                        s: this.g.s,
                        head: this.g,
                        key: h,
                        value: k
                    }, l.list.push(l.m), this.g.s.next = l.m, this.g.s = l.m, this.size++);
                    return this;
                };
                c.prototype.delete = function (h) {
                    h = d(this, h);
                    return h.m && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.h[h.id], h.m.s.next = h.m.next, h.m.next.s = h.m.s, h.m.head = null, this.size--, !0) : !1;
                };
                c.prototype.clear = function () {
                    this.h = {};
                    this.g = this.g.s = f();
                    this.size = 0;
                };
                c.prototype.has = function (h) {
                    return !!d(this, h).m;
                };
                c.prototype.get = function (h) {
                    return (h = d(this, h).m) && h.value;
                };
                c.prototype.entries = function () {
                    return e(this, function (h) {
                        return [
                            h.key,
                            h.value
                        ];
                    });
                };
                c.prototype.keys = function () {
                    return e(this, function (h) {
                        return h.key;
                    });
                };
                c.prototype.values = function () {
                    return e(this, function (h) {
                        return h.value;
                    });
                };
                c.prototype.forEach = function (h, k) {
                    for (var l = this.entries(), p; !(p = l.next()).done;)
                        p = p.value, h.call(k, p[1], p[0], this);
                };
                c.prototype[n(m.Symbol, 'iterator')] = c.prototype.entries;
                var d = function (h, k) {
                        var l = k && typeof k;
                        'object' == l || 'function' == l ? b.has(k) ? l = b.get(k) : (l = '' + ++g, b.set(k, l)) : l = 'p_' + k;
                        var p = h.h[l];
                        if (p && v(h.h, l))
                            for (h = 0; h < p.length; h++) {
                                var U = p[h];
                                if (k !== k && U.key !== U.key || k === U.key)
                                    return {
                                        id: l,
                                        list: p,
                                        index: h,
                                        m: U
                                    };
                            }
                        return {
                            id: l,
                            list: p,
                            index: -1,
                            m: void 0
                        };
                    }, e = function (h, k) {
                        var l = h.g;
                        return ha(function () {
                            if (l) {
                                for (; l.head != h.g;)
                                    l = l.s;
                                for (; l.next != l.head;)
                                    return l = l.next, {
                                        done: !1,
                                        value: k(l)
                                    };
                                l = null;
                            }
                            return {
                                done: !0,
                                value: void 0
                            };
                        });
                    }, f = function () {
                        var h = {};
                        return h.s = h.next = h.head = h;
                    }, g = 0;
                return c;
            }, 'es6');
            var pa = function (a, b, c) {
                if (null == a)
                    throw new TypeError('The \'this\' value for String.prototype.' + c + ' must not be null or undefined');
                if (b instanceof RegExp)
                    throw new TypeError('First argument to String.prototype.' + c + ' must not be a regular expression');
                return a + '';
            };
            q('Array.prototype.find', function (a) {
                return a ? a : function (b, c) {
                    a: {
                        var d = this;
                        d instanceof String && (d = String(d));
                        for (var e = d.length, f = 0; f < e; f++) {
                            var g = d[f];
                            if (b.call(c, g, f, d)) {
                                b = g;
                                break a;
                            }
                        }
                        b = void 0;
                    }
                    return b;
                };
            }, 'es6');
            q('String.prototype.startsWith', function (a) {
                return a ? a : function (b, c) {
                    var d = pa(this, b, 'startsWith'), e = d.length, f = b.length;
                    c = Math.max(0, Math.min(c | 0, d.length));
                    for (var g = 0; g < f && c < e;)
                        if (d[c++] != b[g++])
                            return !1;
                    return g >= f;
                };
            }, 'es6');
            q('String.prototype.repeat', function (a) {
                return a ? a : function (b) {
                    var c = pa(this, null, 'repeat');
                    if (0 > b || 1342177279 < b)
                        throw new RangeError('Invalid count value');
                    b |= 0;
                    for (var d = ''; b;)
                        if (b & 1 && (d += c), b >>>= 1)
                            c += c;
                    return d;
                };
            }, 'es6');
            var qa = function (a, b) {
                a instanceof String && (a += '');
                var c = 0, d = !1, e = {
                        next: function () {
                            if (!d && c < a.length) {
                                var f = c++;
                                return {
                                    value: b(f, a[f]),
                                    done: !1
                                };
                            }
                            d = !0;
                            return {
                                done: !0,
                                value: void 0
                            };
                        }
                    };
                e[n(m.Symbol, 'iterator')] = function () {
                    return e;
                };
                return e;
            };
            q('String.prototype.padStart', function (a) {
                return a ? a : function (b, c) {
                    var d = pa(this, null, 'padStart');
                    b -= d.length;
                    c = void 0 !== c ? String(c) : ' ';
                    return (0 < b && c ? n(c, 'repeat').call(c, Math.ceil(b / c.length)).substring(0, b) : '') + d;
                };
            }, 'es8');
            q('Array.prototype.keys', function (a) {
                return a ? a : function () {
                    return qa(this, function (b) {
                        return b;
                    });
                };
            }, 'es6');
            q('Array.prototype.values', function (a) {
                return a ? a : function () {
                    return qa(this, function (b, c) {
                        return c;
                    });
                };
            }, 'es8');
            q('Set', function (a) {
                if (function () {
                        if (!a || 'function' != typeof a || !a.prototype.entries || 'function' != typeof Object.seal)
                            return !1;
                        try {
                            var c = Object.seal({ x: 4 }), d = new a(r([c]));
                            if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({ x: 4 }) != d || 2 != d.size)
                                return !1;
                            var e = d.entries(), f = e.next();
                            if (f.done || f.value[0] != c || f.value[1] != c)
                                return !1;
                            f = e.next();
                            return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done;
                        } catch (g) {
                            return !1;
                        }
                    }())
                    return a;
                var b = function (c) {
                    this.g = new m.Map();
                    if (c) {
                        c = r(c);
                        for (var d; !(d = c.next()).done;)
                            this.add(d.value);
                    }
                    this.size = this.g.size;
                };
                b.prototype.add = function (c) {
                    c = 0 === c ? 0 : c;
                    this.g.set(c, c);
                    this.size = this.g.size;
                    return this;
                };
                b.prototype.delete = function (c) {
                    c = this.g.delete(c);
                    this.size = this.g.size;
                    return c;
                };
                b.prototype.clear = function () {
                    this.g.clear();
                    this.size = 0;
                };
                b.prototype.has = function (c) {
                    return this.g.has(c);
                };
                b.prototype.entries = function () {
                    return this.g.entries();
                };
                b.prototype.values = function () {
                    return n(this.g, 'values').call(this.g);
                };
                b.prototype.keys = n(b.prototype, 'values');
                b.prototype[n(m.Symbol, 'iterator')] = n(b.prototype, 'values');
                b.prototype.forEach = function (c, d) {
                    var e = this;
                    this.g.forEach(function (f) {
                        return c.call(d, f, f, e);
                    });
                };
                return b;
            }, 'es6');
            q('Object.is', function (a) {
                return a ? a : function (b, c) {
                    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
                };
            }, 'es6');
            q('Array.prototype.includes', function (a) {
                return a ? a : function (b, c) {
                    var d = this;
                    d instanceof String && (d = String(d));
                    var e = d.length;
                    c = c || 0;
                    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                        var f = d[c];
                        if (f === b || n(Object, 'is').call(Object, f, b))
                            return !0;
                    }
                    return !1;
                };
            }, 'es7');
            q('String.prototype.includes', function (a) {
                return a ? a : function (b, c) {
                    return -1 !== pa(this, b, 'includes').indexOf(b, c || 0);
                };
            }, 'es6');
            var w = this || self, ra = function (a) {
                    a = a.split('.');
                    for (var b = w, c = 0; c < a.length; c++)
                        if (b = b[a[c]], null == b)
                            return null;
                    return b;
                }, ua = function (a) {
                    return Object.prototype.hasOwnProperty.call(a, sa) && a[sa] || (a[sa] = ++ta);
                }, sa = 'closure_uid_' + (1000000000 * Math.random() >>> 0), ta = 0, va = function (a, b) {
                    for (var c in b)
                        a[c] = b[c];
                }, wa = function (a, b) {
                    a = a.split('.');
                    var c = w;
                    a[0] in c || 'undefined' == typeof c.execScript || c.execScript('var ' + a[0]);
                    for (var d; a.length && (d = a.shift());)
                        a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
                };
            var xa;
            var ya = function (a) {
                var b = !1, c;
                return function () {
                    b || (c = a(), b = !0);
                    return c;
                };
            };
            var za = function (a, b) {
                    Array.prototype.forEach.call(a, b, void 0);
                }, Aa = function (a, b) {
                    return Array.prototype.filter.call(a, b, void 0);
                }, Ba = function (a, b) {
                    return Array.prototype.map.call(a, b, void 0);
                };
            function Ca(a, b) {
                a: {
                    for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
                        if (e in d && b.call(void 0, d[e], e, a)) {
                            b = e;
                            break a;
                        }
                    b = -1;
                }
                return 0 > b ? null : 'string' === typeof a ? a.charAt(b) : a[b];
            }
            function Da(a, b) {
                a: {
                    for (var c = 'string' === typeof a ? a.split('') : a, d = a.length - 1; 0 <= d; d--)
                        if (d in c && b.call(void 0, c[d], d, a)) {
                            b = d;
                            break a;
                        }
                    b = -1;
                }
                return 0 > b ? null : 'string' === typeof a ? a.charAt(b) : a[b];
            }
            function Ea(a, b) {
                return 0 <= Array.prototype.indexOf.call(a, b, void 0);
            }
            ;
            function Fa(a) {
                var b = [], c = 0, d;
                for (d in a)
                    b[c++] = a[d];
                return b;
            }
            ;
            var Ga = {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            };
            var Ja = function (a, b) {
                this.h = a === Ha && b || '';
                this.j = Ia;
            };
            Ja.prototype.A = !0;
            Ja.prototype.g = function () {
                return this.h;
            };
            var Ka = function (a) {
                    return a instanceof Ja && a.constructor === Ja && a.j === Ia ? a.h : 'type_error:Const';
                }, x = function (a) {
                    return new Ja(Ha, a);
                }, Ia = {}, Ha = {};
            var y = function (a, b) {
                this.j = b === La ? a : '';
            };
            y.prototype.A = !0;
            y.prototype.g = function () {
                return this.j.toString();
            };
            y.prototype.i = !0;
            y.prototype.h = function () {
                return 1;
            };
            var Pa = function (a, b, c) {
                a = Ma.exec(Na(a).toString());
                var d = a[3] || '';
                return new y(a[1] + Oa('?', a[2] || '', b) + Oa('#', d, c), La);
            };
            y.prototype.toString = function () {
                return this.j + '';
            };
            var Na = function (a) {
                    return a instanceof y && a.constructor === y ? a.j : 'type_error:TrustedResourceUrl';
                }, Sa = function (a, b) {
                    var c = Ka(a);
                    if (!Qa.test(c))
                        throw Error('Invalid TrustedResourceUrl format: ' + c);
                    a = c.replace(Ra, function (d, e) {
                        if (!Object.prototype.hasOwnProperty.call(b, e))
                            throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
                        d = b[e];
                        return d instanceof Ja ? Ka(d) : encodeURIComponent(String(d));
                    });
                    return new y(a, La);
                }, Ra = /%{(\w+)}/g, Qa = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i, Ma = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/, Ta = function (a) {
                    for (var b = '', c = 0; c < a.length; c++)
                        b += Ka(a[c]);
                    return new y(b, La);
                }, La = {}, Oa = function (a, b, c) {
                    if (null == c)
                        return b;
                    if ('string' === typeof c)
                        return c ? a + encodeURIComponent(c) : '';
                    for (var d in c)
                        if (Object.prototype.hasOwnProperty.call(c, d)) {
                            var e = c[d];
                            e = Array.isArray(e) ? e : [e];
                            for (var f = 0; f < e.length; f++) {
                                var g = e[f];
                                null != g && (b || (b = a), b += (b.length > a.length ? '&' : '') + encodeURIComponent(d) + '=' + encodeURIComponent(String(g)));
                            }
                        }
                    return b;
                };
            var Ua = function (a) {
                    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
                }, bb = function (a) {
                    if (!Va.test(a))
                        return a;
                    -1 != a.indexOf('&') && (a = a.replace(Wa, '&amp;'));
                    -1 != a.indexOf('<') && (a = a.replace(Xa, '&lt;'));
                    -1 != a.indexOf('>') && (a = a.replace(Ya, '&gt;'));
                    -1 != a.indexOf('"') && (a = a.replace(Za, '&quot;'));
                    -1 != a.indexOf('\'') && (a = a.replace($a, '&#39;'));
                    -1 != a.indexOf('\0') && (a = a.replace(ab, '&#0;'));
                    return a;
                }, Wa = /&/g, Xa = /</g, Ya = />/g, Za = /"/g, $a = /'/g, ab = /\x00/g, Va = /[\x00&<>"']/, db = function (a, b) {
                    var c = 0;
                    a = Ua(String(a)).split('.');
                    b = Ua(String(b)).split('.');
                    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
                        var f = a[e] || '', g = b[e] || '';
                        do {
                            f = /(\d*)(\D*)(.*)/.exec(f) || [
                                '',
                                '',
                                '',
                                ''
                            ];
                            g = /(\d*)(\D*)(.*)/.exec(g) || [
                                '',
                                '',
                                '',
                                ''
                            ];
                            if (0 == f[0].length && 0 == g[0].length)
                                break;
                            c = cb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || cb(0 == f[2].length, 0 == g[2].length) || cb(f[2], g[2]);
                            f = f[3];
                            g = g[3];
                        } while (0 == c);
                    }
                    return c;
                }, cb = function (a, b) {
                    return a < b ? -1 : a > b ? 1 : 0;
                };
            var z = function (a, b) {
                this.j = b === eb ? a : '';
            };
            z.prototype.A = !0;
            z.prototype.g = function () {
                return this.j.toString();
            };
            z.prototype.i = !0;
            z.prototype.h = function () {
                return 1;
            };
            z.prototype.toString = function () {
                return this.j.toString();
            };
            var fb = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font\/\w+|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i, gb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i, hb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i, eb = {}, ib = new z('about:invalid#zClosurez', eb);
            var A;
            a: {
                var jb = w.navigator;
                if (jb) {
                    var kb = jb.userAgent;
                    if (kb) {
                        A = kb;
                        break a;
                    }
                }
                A = '';
            }
            ;
            var lb = {}, B = function (a, b, c) {
                    this.j = c === lb ? a : '';
                    this.l = b;
                    this.A = this.i = !0;
                };
            B.prototype.h = function () {
                return this.l;
            };
            B.prototype.g = function () {
                return this.j.toString();
            };
            B.prototype.toString = function () {
                return this.j.toString();
            };
            var mb = function (a) {
                    return a instanceof B && a.constructor === B ? a.j : 'type_error:SafeHtml';
                }, nb = function (a) {
                    if (a instanceof B)
                        return a;
                    var b = 'object' == typeof a, c = null;
                    b && a.i && (c = a.h());
                    a = bb(b && a.A ? a.g() : String(a));
                    return new B(a, c, lb);
                }, rb = function (a, b) {
                    var c = { src: a }, d = {};
                    a = {};
                    for (var e in c)
                        Object.prototype.hasOwnProperty.call(c, e) && (a[e] = c[e]);
                    for (var f in d)
                        Object.prototype.hasOwnProperty.call(d, f) && (a[f] = d[f]);
                    if (b)
                        for (var g in b)
                            if (Object.prototype.hasOwnProperty.call(b, g)) {
                                e = g.toLowerCase();
                                if (e in c)
                                    throw Error('');
                                e in d && delete a[e];
                                a[g] = b[g];
                            }
                    var h;
                    b = null;
                    g = '';
                    if (a)
                        for (k in a)
                            if (Object.prototype.hasOwnProperty.call(a, k)) {
                                if (!ob.test(k))
                                    throw Error('');
                                d = a[k];
                                if (null != d) {
                                    c = k;
                                    if (d instanceof Ja)
                                        d = Ka(d);
                                    else {
                                        if ('style' == c.toLowerCase())
                                            throw Error('');
                                        if (/^on/i.test(c))
                                            throw Error('');
                                        if (c.toLowerCase() in pb)
                                            if (d instanceof y)
                                                d = Na(d).toString();
                                            else if (d instanceof z)
                                                d = d instanceof z && d.constructor === z ? d.j : 'type_error:SafeUrl';
                                            else if ('string' === typeof d)
                                                d instanceof z || (d = 'object' == typeof d && d.A ? d.g() : String(d), hb.test(d) ? d = new z(d, eb) : (d = String(d), d = d.replace(/(%0A|%0D)/g, ''), d = (e = d.match(gb)) && fb.test(e[1]) ? new z(d, eb) : null)), d = (d || ib).g();
                                            else
                                                throw Error('');
                                    }
                                    d.A && (d = d.g());
                                    c = c + '="' + bb(String(d)) + '"';
                                    g += ' ' + c;
                                }
                            }
                    var k = '<script' + g;
                    null == h ? h = [] : Array.isArray(h) || (h = [h]);
                    !0 === Ga.script ? k += '>' : (h = qb(h), k += '>' + mb(h).toString() + '</script>', b = h.h());
                    (a = a && a.dir) && (/^(ltr|rtl|auto)$/i.test(a) ? b = 0 : b = null);
                    return new B(k, b, lb);
                }, tb = function (a) {
                    var b = nb(sb), c = b.h(), d = [], e = function (f) {
                            Array.isArray(f) ? f.forEach(e) : (f = nb(f), d.push(mb(f).toString()), f = f.h(), 0 == c ? c = f : 0 != f && c != f && (c = null));
                        };
                    a.forEach(e);
                    return new B(d.join(mb(b).toString()), c, lb);
                }, qb = function (a) {
                    return tb(Array.prototype.slice.call(arguments));
                }, ob = /^[a-zA-Z0-9-]+$/, pb = {
                    action: !0,
                    cite: !0,
                    data: !0,
                    formaction: !0,
                    href: !0,
                    manifest: !0,
                    poster: !0,
                    src: !0
                }, sb = new B(w.trustedTypes && w.trustedTypes.emptyHTML || '', 0, lb);
            var ub = function (a, b) {
                    a.write(mb(b));
                }, wb = function () {
                    a: {
                        var a = w.document;
                        if (a.querySelector && (a = a.querySelector('script[nonce]')) && (a = a.nonce || a.getAttribute('nonce')) && vb.test(a))
                            break a;
                        a = '';
                    }
                    return a;
                }, vb = /^[\w+/_-]+[=]{0,2}$/;
            var xb = {}, yb = null, Ab = function (a) {
                    var b;
                    void 0 === b && (b = 0);
                    zb();
                    b = xb[b];
                    for (var c = Array(Math.floor(a.length / 3)), d = b[64] || '', e = 0, f = 0; e < a.length - 2; e += 3) {
                        var g = a[e], h = a[e + 1], k = a[e + 2], l = b[g >> 2];
                        g = b[(g & 3) << 4 | h >> 4];
                        h = b[(h & 15) << 2 | k >> 6];
                        k = b[k & 63];
                        c[f++] = l + g + h + k;
                    }
                    l = 0;
                    k = d;
                    switch (a.length - e) {
                    case 2:
                        l = a[e + 1], k = b[(l & 15) << 2] || d;
                    case 1:
                        a = a[e], c[f] = b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d;
                    }
                    return c.join('');
                }, Cb = function (a) {
                    var b = [];
                    Bb(a, function (c) {
                        b.push(c);
                    });
                    return b;
                }, Bb = function (a, b) {
                    function c(k) {
                        for (; d < a.length;) {
                            var l = a.charAt(d++), p = yb[l];
                            if (null != p)
                                return p;
                            if (!/^[\s\xa0]*$/.test(l))
                                throw Error('Unknown base64 encoding at char: ' + l);
                        }
                        return k;
                    }
                    zb();
                    for (var d = 0;;) {
                        var e = c(-1), f = c(0), g = c(64), h = c(64);
                        if (64 === h && -1 === e)
                            break;
                        b(e << 2 | f >> 4);
                        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
                    }
                }, zb = function () {
                    if (!yb) {
                        yb = {};
                        for (var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''), b = [
                                    '+/=',
                                    '+/',
                                    '-_=',
                                    '-_.',
                                    '-_'
                                ], c = 0; 5 > c; c++) {
                            var d = a.concat(b[c].split(''));
                            xb[c] = d;
                            for (var e = 0; e < d.length; e++) {
                                var f = d[e];
                                void 0 === yb[f] && (yb[f] = e);
                            }
                        }
                    }
                };
            var Db = 'function' === typeof Uint8Array;
            function Eb(a, b, c) {
                return 'object' === typeof a ? Db && !Array.isArray(a) && a instanceof Uint8Array ? c(a) : Fb(a, b, c) : b(a);
            }
            function Fb(a, b, c) {
                if (Array.isArray(a)) {
                    for (var d = Array(a.length), e = 0; e < a.length; e++) {
                        var f = a[e];
                        null != f && (d[e] = Eb(f, b, c));
                    }
                    Array.isArray(a) && a.da && C(d);
                    return d;
                }
                d = {};
                for (e in a)
                    Object.prototype.hasOwnProperty.call(a, e) && (f = a[e], null != f && (d[e] = Eb(f, b, c)));
                return d;
            }
            function Gb(a) {
                return Fb(a, function (b) {
                    return 'number' === typeof b ? isFinite(b) ? b : String(b) : b;
                }, function (b) {
                    return Ab(b);
                });
            }
            var Hb = {
                    da: {
                        value: !0,
                        configurable: !0
                    }
                }, C = function (a) {
                    Array.isArray(a) && !Object.isFrozen(a) && Object.defineProperties(a, Hb);
                    return a;
                }, Ib;
            var Jb;
            var D = function (a, b, c, d) {
                    var e = Jb;
                    Jb = null;
                    a || (a = e);
                    e = this.constructor.messageId;
                    a || (a = e ? [e] : []);
                    this.j = e ? 0 : -1;
                    this.g = null;
                    this.h = a;
                    a: {
                        e = this.h.length;
                        a = e - 1;
                        if (e && (e = this.h[a], !(null === e || 'object' != typeof e || Array.isArray(e) || Db && e instanceof Uint8Array))) {
                            this.l = a - this.j;
                            this.i = e;
                            break a;
                        }
                        void 0 !== b && -1 < b ? (this.l = Math.max(b, a + 1 - this.j), this.i = null) : this.l = Number.MAX_VALUE;
                    }
                    if (c)
                        for (b = 0; b < c.length; b++)
                            a = c[b], a < this.l ? (a += this.j, (e = this.h[a]) ? C(e) : this.h[a] = Kb) : (Lb(this), (e = this.i[a]) ? C(e) : this.i[a] = Kb);
                    if (d && d.length)
                        for (c = 0; c < d.length; c++)
                            Mb(this, d[c]);
                }, Kb = Object.freeze(C([])), Lb = function (a) {
                    var b = a.l + a.j;
                    a.h[b] || (a.i = a.h[b] = {});
                }, F = function (a, b) {
                    if (b < a.l) {
                        b += a.j;
                        var c = a.h[b];
                        return c !== Kb ? c : a.h[b] = C([]);
                    }
                    if (a.i)
                        return c = a.i[b], c !== Kb ? c : a.i[b] = C([]);
                }, G = function (a, b, c) {
                    a = F(a, b);
                    return null == a ? c : a;
                }, Nb = function (a, b) {
                    var c = void 0 === c ? 0 : c;
                    a = F(a, b);
                    a = null == a ? a : +a;
                    return null == a ? c : a;
                }, H = function (a, b, c) {
                    b < a.l ? a.h[b + a.j] = c : (Lb(a), a.i[b] = c);
                    return a;
                }, I = function (a, b, c) {
                    0 !== c ? H(a, b, c) : b < a.l ? a.h[b + a.j] = null : (Lb(a), delete a.i[b]);
                    return a;
                }, Ob = function (a, b, c, d) {
                    (c = Mb(a, c)) && c !== b && void 0 !== d && (a.g && c in a.g && (a.g[c] = void 0), H(a, c, void 0));
                    return H(a, b, d);
                }, Mb = function (a, b) {
                    for (var c, d, e = 0; e < b.length; e++) {
                        var f = b[e], g = F(a, f);
                        null != g && (c = f, d = g, H(a, f, void 0));
                    }
                    return c ? (H(a, c, d), c) : 0;
                }, J = function (a, b, c) {
                    a.g || (a.g = {});
                    if (!a.g[c]) {
                        var d = F(a, c);
                        d && (a.g[c] = new b(d));
                    }
                    return a.g[c];
                }, K = function (a, b, c) {
                    a.g || (a.g = {});
                    if (!a.g[c]) {
                        for (var d = F(a, c), e = [], f = 0; f < d.length; f++)
                            e[f] = new b(d[f]);
                        a.g[c] = e;
                    }
                    return a.g[c];
                }, Qb = function (a, b, c) {
                    a.g || (a.g = {});
                    var d = c ? Pb(c) : c;
                    a.g[b] = c;
                    return H(a, b, d);
                }, Rb = function (a, b, c) {
                    a.g || (a.g = {});
                    c = c || [];
                    for (var d = C([]), e = 0; e < c.length; e++)
                        d[e] = Pb(c[e]);
                    a.g[b] = c;
                    return H(a, b, d);
                }, Pb = function (a) {
                    if (a.g)
                        for (var b in a.g)
                            if (Object.prototype.hasOwnProperty.call(a.g, b)) {
                                var c = a.g[b];
                                if (Array.isArray(c))
                                    for (var d = 0; d < c.length; d++)
                                        c[d] && Pb(c[d]);
                                else
                                    c && Pb(c);
                            }
                    return a.h;
                };
            D.prototype.toJSON = function () {
                var a = Pb(this);
                return Ib ? a : Gb(a);
            };
            var Tb = function (a) {
                    Ib = !0;
                    try {
                        return JSON.stringify(a.toJSON(), Sb);
                    } finally {
                        Ib = !1;
                    }
                }, Sb = function (a, b) {
                    switch (typeof b) {
                    case 'number':
                        return isFinite(b) ? b : String(b);
                    case 'object':
                        if (Db && null != b && b instanceof Uint8Array)
                            return Ab(b);
                    }
                    return b;
                };
            function Ub(a) {
                var b, c = (a.ownerDocument && a.ownerDocument.defaultView || window).document;
                (b = (c = null === (b = c.querySelector) || void 0 === b ? void 0 : b.call(c, 'script[nonce]')) ? c.nonce || c.getAttribute('nonce') || '' : '') && a.setAttribute('nonce', b);
            }
            ;
            var Vb = function (a, b) {
                var c = void 0 === c ? {} : c;
                this.error = a;
                this.context = b.context;
                this.msg = b.message || '';
                this.id = b.id || 'jserror';
                this.meta = c;
            };
            var Wb = function (a) {
                this.g = a || w.document || document;
            };
            Wb.prototype.createElement = function (a) {
                var b = this.g;
                a = String(a);
                'application/xhtml+xml' === b.contentType && (a = a.toLowerCase());
                return b.createElement(a);
            };
            Wb.prototype.appendChild = function (a, b) {
                a.appendChild(b);
            };
            var Xb = function () {
                return -1 != A.indexOf('iPad') || -1 != A.indexOf('Android') && -1 == A.indexOf('Mobile') || -1 != A.indexOf('Silk');
            };
            var Yb = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/, Zb = function (a) {
                    return a ? decodeURI(a) : a;
                }, $b = /#|$/, ac = function (a, b) {
                    var c = a.search($b);
                    a: {
                        var d = 0;
                        for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                            var f = a.charCodeAt(d - 1);
                            if (38 == f || 63 == f)
                                if (f = a.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f)
                                    break a;
                            d += e + 1;
                        }
                        d = -1;
                    }
                    if (0 > d)
                        return null;
                    e = a.indexOf('&', d);
                    if (0 > e || e > c)
                        e = c;
                    d += b.length + 1;
                    return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, ' '));
                };
            var ec = function (a, b) {
                    if (!bc() && !cc()) {
                        var c = Math.random();
                        if (c < b)
                            return c = dc(w), a[Math.floor(c * a.length)];
                    }
                    return null;
                }, dc = function (a) {
                    if (!a.crypto)
                        return Math.random();
                    try {
                        var b = new Uint32Array(1);
                        a.crypto.getRandomValues(b);
                        return b[0] / 65536 / 65536;
                    } catch (c) {
                        return Math.random();
                    }
                }, fc = function (a, b) {
                    if (a)
                        for (var c in a)
                            Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a);
                }, cc = ya(function () {
                    return Array.prototype.some.call([
                        'Google Web Preview',
                        'Mediapartners-Google',
                        'Google-Read-Aloud',
                        'Google-Adwords'
                    ], gc, void 0) || 0.0001 > Math.random();
                }), bc = ya(function () {
                    return gc('MSIE');
                }), gc = function (a) {
                    return -1 != A.indexOf(a);
                }, hc = /^(-?[0-9.]{1,30})$/, ic = function (a, b) {
                    return hc.test(a) && (a = Number(a), !isNaN(a)) ? a : void 0 == b ? null : b;
                }, jc = function (a) {
                    return /^true$/.test(a);
                }, kc = ya(function () {
                    return Xb() || -1 == A.indexOf('iPod') && -1 == A.indexOf('iPhone') && -1 == A.indexOf('Android') && -1 == A.indexOf('IEMobile') ? Xb() ? 1 : 0 : 2;
                }), lc = function (a, b) {
                    a = void 0 === a ? '' : a;
                    b = void 0 === b ? window : b;
                    if (b = Zb(b.location.href.match(Yb)[3] || null))
                        if (a = b + a, b = a.length, 0 == b)
                            a = 0;
                        else {
                            for (var c = 305419896, d = 0; d < b; d++)
                                c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
                            a = 0 < c ? c : 4294967296 + c;
                        }
                    else
                        a = null;
                    return a;
                }, mc = function (a, b) {
                    b = void 0 === b ? window.document : b;
                    0 != a.length && b.head && a.forEach(function (c) {
                        if (c) {
                            var d = b;
                            d = void 0 === d ? window.document : d;
                            if (c && d.head) {
                                var e = document.createElement('meta');
                                d.head.appendChild(e);
                                e.httpEquiv = 'origin-trial';
                                e.content = c;
                            }
                        }
                    });
                }, nc = function (a) {
                    if ('number' !== typeof a.goog_pvsid)
                        try {
                            Object.defineProperty(a, 'goog_pvsid', {
                                value: Math.floor(Math.random() * Math.pow(2, 52)),
                                configurable: !1
                            });
                        } catch (b) {
                        }
                    return Number(a.goog_pvsid) || -1;
                };
            var pc = function (a, b) {
                    var c = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=' + b;
                    fc(a, function (d, e) {
                        d && (c += '&' + e + '=' + encodeURIComponent(d));
                    });
                    oc(c);
                }, oc = function (a) {
                    var b = window;
                    if (b.fetch)
                        b.fetch(a, {
                            keepalive: !0,
                            credentials: 'include',
                            redirect: 'follow',
                            method: 'get',
                            mode: 'no-cors'
                        });
                    else {
                        b.google_image_requests || (b.google_image_requests = []);
                        var c = b.document.createElement('img');
                        c.src = a;
                        b.google_image_requests.push(c);
                    }
                };
            var qc = 'a'.charCodeAt(), rc = Fa({
                    oa: 0,
                    na: 1,
                    ka: 2,
                    fa: 3,
                    la: 4,
                    ga: 5,
                    ma: 6,
                    ia: 7,
                    ja: 8,
                    ea: 9,
                    ha: 10
                }), sc = Fa({
                    qa: 0,
                    ra: 1,
                    pa: 2
                });
            var tc = function (a) {
                    if (/[^01]/.test(a))
                        throw Error('Input bitstring ' + a + ' is malformed!');
                    this.h = a;
                    this.g = 0;
                }, wc = function (a) {
                    var b = L(a, 16);
                    return !0 === !!L(a, 1) ? (a = uc(a), a.forEach(function (c) {
                        if (c > b)
                            throw Error('ID ' + c + ' is past MaxVendorId ' + b + '!');
                    }), a) : vc(a, b);
                }, uc = function (a) {
                    for (var b = L(a, 12), c = []; b--;) {
                        var d = !0 === !!L(a, 1), e = L(a, 16);
                        if (d)
                            for (d = L(a, 16); e <= d; e++)
                                c.push(e);
                        else
                            c.push(e);
                    }
                    c.sort(function (f, g) {
                        return f - g;
                    });
                    return c;
                }, vc = function (a, b, c) {
                    for (var d = [], e = 0; e < b; e++)
                        if (L(a, 1)) {
                            var f = e + 1;
                            if (c && -1 === c.indexOf(f))
                                throw Error('ID: ' + f + ' is outside of allowed values!');
                            d.push(f);
                        }
                    return d;
                }, L = function (a, b) {
                    if (a.g + b > a.h.length)
                        throw Error('Requested length ' + b + ' is past end of string.');
                    var c = a.h.substring(a.g, a.g + b);
                    a.g += b;
                    return parseInt(c, 2);
                };
            var yc = function (a, b) {
                    try {
                        var c = Cb(a.split('.')[0]).map(function (e) {
                                return n(e.toString(2), 'padStart').call(e.toString(2), 8, '0');
                            }).join(''), d = new tc(c);
                        c = {};
                        c.tcString = a;
                        c.gdprApplies = !0;
                        d.g += 78;
                        c.cmpId = L(d, 12);
                        c.cmpVersion = L(d, 12);
                        d.g += 30;
                        c.tcfPolicyVersion = L(d, 6);
                        c.isServiceSpecific = !!L(d, 1);
                        c.useNonStandardStacks = !!L(d, 1);
                        c.specialFeatureOptins = xc(vc(d, 12, sc), sc);
                        c.purpose = {
                            consents: xc(vc(d, 24, rc), rc),
                            legitimateInterests: xc(vc(d, 24, rc), rc)
                        };
                        c.purposeOneTreatment = !!L(d, 1);
                        c.publisherCC = String.fromCharCode(qc + L(d, 6)) + String.fromCharCode(qc + L(d, 6));
                        c.vendor = {
                            consents: xc(wc(d), b),
                            legitimateInterests: xc(wc(d), b)
                        };
                        return c;
                    } catch (e) {
                        return null;
                    }
                }, xc = function (a, b) {
                    var c = {};
                    if (Array.isArray(b) && 0 !== b.length) {
                        b = r(b);
                        for (var d = b.next(); !d.done; d = b.next())
                            d = d.value, c[d] = -1 !== a.indexOf(d);
                    } else
                        for (a = r(a), d = a.next(); !d.done; d = a.next())
                            c[d.value] = !0;
                    delete c[0];
                    return c;
                };
            function zc(a) {
                return function () {
                    return dc(window) <= a;
                };
            }
            var Ac = function (a, b) {
                    if (window.fetch)
                        fetch(a, {
                            method: 'POST',
                            body: b,
                            keepalive: 64536 > b.length,
                            credentials: 'omit',
                            mode: 'no-cors',
                            redirect: 'follow'
                        });
                    else {
                        var c = new XMLHttpRequest();
                        c.open('POST', a, !0);
                        c.send(b);
                    }
                }, Bc = function (a, b, c) {
                    c = void 0 === c ? Ac : c;
                    this.g = a;
                    this.i = void 0 === b ? 'https://pagead2.googlesyndication.com/pagead/ping' : b;
                    this.h = c;
                };
            var Cc = function () {
                Bc.apply(this, arguments);
            };
            u(Cc, Bc);
            var Dc = function (a, b) {
                try {
                    a.g() && a.h(a.i + '?e=1', '[[[{"4":' + Tb(b()) + '}]]]');
                } catch (c) {
                }
            };
            var M = function (a, b) {
                    this.g = a;
                    this.defaultValue = void 0 === b ? !1 : b;
                }, Ec = function (a, b) {
                    this.g = a;
                    this.defaultValue = void 0 === b ? 0 : b;
                };
            var Fc = new M(374201268, !0), Gc = new M(530, !0), Hc = new M(378896074, !0), Ic = new function (a, b) {
                    this.g = a;
                    this.defaultValue = void 0 === b ? '' : b;
                }(531), Jc = new Ec(532), Kc = new M(371364212, !0), Lc = new Ec(24), Mc = new M(203), Nc = new M(241), Oc = new Ec(1929, 50), Pc = new Ec(1905), Qc = new M(240), Rc = new M(1928), Sc = new M(1941), Tc = new M(370946349), Uc = new M(379841917), Vc = new Ec(1935), Wc = new M(385922407);
            var Yc = function (a) {
                D.call(this, a, -1, Xc);
            };
            u(Yc, D);
            var Xc = [6];
            var Zc = function (a) {
                D.call(this, a);
            };
            u(Zc, D);
            var $c = function (a) {
                D.call(this, a);
            };
            u($c, D);
            var ad = function (a) {
                D.call(this, a);
            };
            u(ad, D);
            var bd = function (a) {
                this.g = a || { cookie: '' };
            };
            bd.prototype.set = function (a, b, c) {
                var d = !1;
                if ('object' === typeof c) {
                    var e = c.va;
                    d = c.wa || !1;
                    var f = c.domain || void 0;
                    var g = c.path || void 0;
                    var h = c.ua;
                }
                if (/[;=\s]/.test(a))
                    throw Error('Invalid cookie name "' + a + '"');
                if (/[;\r\n]/.test(b))
                    throw Error('Invalid cookie value "' + b + '"');
                void 0 === h && (h = -1);
                this.g.cookie = a + '=' + b + (f ? ';domain=' + f : '') + (g ? ';path=' + g : '') + (0 > h ? '' : 0 == h ? ';expires=' + new Date(1970, 1, 1).toUTCString() : ';expires=' + new Date(Date.now() + 1000 * h).toUTCString()) + (d ? ';secure' : '') + (null != e ? ';samesite=' + e : '');
            };
            bd.prototype.get = function (a, b) {
                for (var c = a + '=', d = (this.g.cookie || '').split(';'), e = 0, f; e < d.length; e++) {
                    f = Ua(d[e]);
                    if (0 == f.lastIndexOf(c, 0))
                        return f.substr(c.length);
                    if (f == a)
                        return '';
                }
                return b;
            };
            var cd = function (a) {
                    a = new bd(a).get('FCCDCF', '');
                    try {
                        if (a) {
                            var b = a ? JSON.parse(a) : null;
                            Jb = b;
                            var c = new Zc(b);
                            Jb = null;
                            var d = c;
                        } else
                            d = null;
                        return d;
                    } catch (e) {
                        return null;
                    }
                }, dd = function (a) {
                    return (a = cd(a)) ? J(a, $c, 4) : null;
                };
            var ed = function (a, b, c, d, e, f) {
                    try {
                        var g = a.g, h = a.createElement('SCRIPT');
                        h.async = !0;
                        h.src = Na(b);
                        Ub(h);
                        g.head.appendChild(h);
                        h.addEventListener('load', function () {
                            e();
                            d && g.head.removeChild(h);
                        });
                        h.addEventListener('error', function () {
                            0 < c ? ed(a, b, c - 1, d, e, f) : (d && g.head.removeChild(h), f());
                        });
                    } catch (k) {
                        f();
                    }
                }, fd = function (a, b, c, d) {
                    ed(a ? new Wb(9 == a.nodeType ? a : a.ownerDocument || a.document) : xa || (xa = new Wb()), b, 0, !1, void 0 === c ? function () {
                    } : c, void 0 === d ? function () {
                    } : d);
                };
            var gd = function (a) {
                    this.g = a;
                    this.h = null;
                }, id = function (a) {
                    a.__tcfapiPostMessageReady || hd(new gd(a));
                }, hd = function (a) {
                    a.h = function (b) {
                        var c = 'string' == typeof b.data;
                        try {
                            var d = c ? JSON.parse(b.data) : b.data;
                        } catch (f) {
                            return;
                        }
                        var e = d.__tcfapiCall;
                        !e || 'ping' !== e.command && 'getTCData' !== e.command && 'addEventListener' !== e.command && 'removeEventListener' !== e.command || a.g.__tcfapi(e.command, e.version, function (f, g) {
                            var h = {};
                            h.__tcfapiReturn = 'removeEventListener' === e.command ? {
                                success: f,
                                callId: e.callId
                            } : {
                                returnValue: f,
                                success: g,
                                callId: e.callId
                            };
                            f = c ? JSON.stringify(h) : h;
                            b.source && 'function' === typeof b.source.postMessage && b.source.postMessage(f, b.origin);
                            return f;
                        }, e.parameter);
                    };
                    a.g.addEventListener('message', a.h);
                    a.g.__tcfapiPostMessageReady = !0;
                };
            var jd = function (a, b) {
                var c = a.document, d = a ? new Wb(9 == a.nodeType ? a : a.ownerDocument || a.document) : xa || (xa = new Wb()), e = function () {
                        if (!a.frames[b])
                            if (c.body) {
                                var f = d.createElement('IFRAME');
                                f.style.display = 'none';
                                f.style.width = '0px';
                                f.style.height = '0px';
                                f.style.border = 'none';
                                f.style.zIndex = '-1000';
                                f.style.left = '-1000px';
                                f.style.top = '-1000px';
                                f.name = b;
                                c.body.appendChild(f);
                            } else
                                a.setTimeout(e, 5);
                    };
                e();
            };
            var kd = function (a) {
                    this.g = a;
                    this.h = a.document;
                    this.l = (a = (a = cd(this.h)) ? J(a, ad, 5) || null : null) ? F(a, 2) : null;
                    this.i = (a = dd(this.h)) && null != F(a, 1) ? F(a, 1) : null;
                    this.j = (a = dd(this.h)) && null != F(a, 2) ? F(a, 2) : null;
                }, nd = function (a) {
                    a.__uspapi || a.frames.__uspapiLocator || (a = new kd(a), ld(a), md(a));
                }, ld = function (a) {
                    !a.l || a.g.__uspapi || a.g.frames.__uspapiLocator || (a.g.__uspapiManager = 'fc', jd(a.g, '__uspapiLocator'), wa('__uspapi', function (b) {
                        for (var c = [], d = 0; d < arguments.length; ++d)
                            c[d] = arguments[d];
                        return a.u.apply(a, t(c));
                    }));
                };
            kd.prototype.u = function (a, b, c) {
                'function' === typeof c && 'getUSPData' === a && c({
                    version: 1,
                    uspString: this.l
                }, !0);
            };
            var md = function (a) {
                !a.i || a.g.__tcfapi || a.g.frames.__tcfapiLocator || (a.g.__tcfapiManager = 'fc', jd(a.g, '__tcfapiLocator'), a.g.__tcfapiEventListeners = a.g.__tcfapiEventListeners || [], wa('__tcfapi', function (b) {
                    for (var c = [], d = 0; d < arguments.length; ++d)
                        c[d] = arguments[d];
                    return a.o.apply(a, t(c));
                }), id(a.g));
            };
            kd.prototype.o = function (a, b, c, d) {
                d = void 0 === d ? null : d;
                if ('function' === typeof c)
                    if (b && 2 !== b)
                        c(null, !1);
                    else
                        switch (b = this.g.__tcfapiEventListeners, a) {
                        case 'getTCData':
                            !d || Array.isArray(d) && d.every(function (e) {
                                return 'number' === typeof e;
                            }) ? c(od(this, d, null), !0) : c(null, !1);
                            break;
                        case 'ping':
                            c({
                                gdprApplies: !0,
                                cmpLoaded: !0,
                                cmpStatus: 'loaded',
                                displayStatus: 'disabled',
                                apiVersion: '2.0',
                                cmpVersion: 1,
                                cmpId: 300
                            });
                            break;
                        case 'addEventListener':
                            a = b.push(c);
                            c(od(this, null, a - 1), !0);
                            break;
                        case 'removeEventListener':
                            b[d] ? (b[d] = null, c(!0)) : c(!1);
                            break;
                        case 'getInAppTCData':
                        case 'getVendorList':
                            c(null, !1);
                        }
            };
            var od = function (a, b, c) {
                if (!a.i)
                    return null;
                b = yc(a.i, b);
                b.addtlConsent = null != a.j ? a.j : void 0;
                b.cmpStatus = 'loaded';
                b.eventStatus = 'tcloaded';
                null != c && (b.listenerId = c);
                return b;
            };
            var N = function (a) {
                if (a.I && a.hasOwnProperty('I'))
                    return a.I;
                var b = new a();
                return a.I = b;
            };
            var pd = function () {
                    var a = {};
                    this.g = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.h = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.i = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.l = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.j = function () {
                    };
                }, O = function (a) {
                    return N(pd).g(a.g, a.defaultValue);
                }, qd = function (a) {
                    return N(pd).h(a.g, a.defaultValue);
                };
            var rd = function () {
                this.i = this.i;
                this.j = this.j;
            };
            rd.prototype.i = !1;
            rd.prototype.K = function () {
                if (this.j)
                    for (; this.j.length;)
                        this.j.shift()();
            };
            var sd = function (a, b) {
                this.g = a;
                this.h = b;
            };
            sd.prototype.start = function () {
                try {
                    jd(this.g, 'googlefcPresent'), td(this);
                } catch (a) {
                }
            };
            var td = function (a) {
                var b = Sa(x('https://fundingchoicesmessages.google.com/i/%{id}?ers=%{ers}'), {
                    id: a.h,
                    ers: 5
                });
                fd(a.g, b, function () {
                }, function () {
                });
            };
            var vd = function (a) {
                D.call(this, a, -1, ud);
            };
            u(vd, D);
            var wd = function (a, b) {
                    return Qb(a, 1, b);
                }, xd = function (a, b) {
                    return Rb(a, 2, b);
                }, yd = function (a, b) {
                    return H(a, 4, C(b || []));
                }, zd = function (a, b) {
                    return Rb(a, 5, b);
                }, Ad = function (a) {
                    D.call(this, a);
                };
            u(Ad, D);
            Ad.prototype.B = function () {
                return G(this, 1, 0);
            };
            var Bd = function (a, b) {
                    return I(a, 1, b);
                }, Cd = function (a, b) {
                    return I(a, 2, b);
                }, Ed = function (a) {
                    D.call(this, a, -1, void 0, Dd);
                };
            u(Ed, D);
            var ud = [
                    2,
                    4,
                    5
                ], Dd = [[
                        1,
                        2
                    ]];
            var Gd = function (a) {
                D.call(this, a, -1, void 0, Fd);
            };
            u(Gd, D);
            var Hd = function (a) {
                    var b = new Gd(), c = Fd[0];
                    b.g || (b.g = {});
                    var d = a ? Pb(a) : a;
                    b.g[4] = a;
                    return Ob(b, 4, c, d);
                }, Fd = [[
                        4,
                        5
                    ]];
            var Id = null, Jd = function () {
                    if (null === Id) {
                        Id = '';
                        try {
                            var a = '';
                            try {
                                a = w.top.location.hash;
                            } catch (c) {
                                a = w.location.hash;
                            }
                            if (a) {
                                var b = a.match(/\bdeid=([\d,]+)/);
                                Id = b ? b[1] : '';
                            }
                        } catch (c) {
                        }
                    }
                    return Id;
                };
            var Md = function (a) {
                D.call(this, a, -1, Kd, Ld);
            };
            u(Md, D);
            var Kd = [
                    2,
                    8
                ], Ld = [
                    [
                        3,
                        4,
                        5
                    ],
                    [
                        6,
                        7
                    ]
                ];
            var Nd;
            Nd = {
                sa: 0,
                aa: 3,
                ba: 4,
                ca: 5
            };
            var Od = Nd.aa, P = Nd.ba, Q = Nd.ca, Pd = function (a) {
                    return null != a ? !a : a;
                }, Qd = function (a, b) {
                    for (var c = !1, d = 0; d < a.length; d++) {
                        var e = a[d]();
                        if (e === b)
                            return e;
                        null == e && (c = !0);
                    }
                    if (!c)
                        return !b;
                }, Sd = function (a, b) {
                    var c = K(a, Md, 2);
                    if (!c.length)
                        return Rd(a, b);
                    a = G(a, 1, 0);
                    if (1 === a)
                        return Pd(Sd(c[0], b));
                    c = Ba(c, function (d) {
                        return function () {
                            return Sd(d, b);
                        };
                    });
                    switch (a) {
                    case 2:
                        return Qd(c, !1);
                    case 3:
                        return Qd(c, !0);
                    }
                }, Rd = function (a, b) {
                    var c = Mb(a, Ld[0]);
                    a: {
                        switch (c) {
                        case Od:
                            var d = G(a, 3, 0);
                            break a;
                        case P:
                            d = G(a, 4, 0);
                            break a;
                        case Q:
                            d = G(a, 5, 0);
                            break a;
                        }
                        d = void 0;
                    }
                    if (d && (b = (b = b[c]) && b[d])) {
                        try {
                            var e = b.apply(null, t(F(a, 8)));
                        } catch (f) {
                            return;
                        }
                        b = G(a, 1, 0);
                        if (4 === b)
                            return !!e;
                        d = null != e;
                        if (5 === b)
                            return d;
                        if (12 === b)
                            a = G(a, 7, '');
                        else
                            a: {
                                switch (c) {
                                case P:
                                    a = Nb(a, 6);
                                    break a;
                                case Q:
                                    a = G(a, 7, '');
                                    break a;
                                }
                                a = void 0;
                            }
                        if (null != a) {
                            if (6 === b)
                                return e === a;
                            if (9 === b)
                                return null != e && 0 === db(String(e), a);
                            if (d)
                                switch (b) {
                                case 7:
                                    return e < a;
                                case 8:
                                    return e > a;
                                case 12:
                                    return 'string' === typeof a && 'string' === typeof e && new RegExp(a).test(e);
                                case 10:
                                    return null != e && -1 === db(String(e), a);
                                case 11:
                                    return null != e && 1 === db(String(e), a);
                                }
                        }
                    }
                }, Td = function (a, b) {
                    return !a || !(!b || !Sd(a, b));
                };
            var Vd = function (a) {
                D.call(this, a, -1, Ud);
            };
            u(Vd, D);
            var Ud = [4];
            var Wd = function (a) {
                D.call(this, a);
            };
            u(Wd, D);
            var R = function (a) {
                D.call(this, a, -1, Xd, Yd);
            };
            u(R, D);
            var Xd = [5], Yd = [[
                        1,
                        2,
                        3,
                        6,
                        7
                    ]];
            var Zd = function () {
                var a = {};
                this.g = (a[Od] = {}, a[P] = {}, a[Q] = {}, a);
            };
            var $d = jc('false');
            var ae = $d, be = function (a, b) {
                    switch (b) {
                    case 1:
                        return G(a, 1, 0);
                    case 2:
                        return G(a, 2, 0);
                    case 3:
                        return G(a, 3, 0);
                    case 6:
                        return G(a, 6, 0);
                    default:
                        return null;
                    }
                }, ce = function (a, b) {
                    if (!a)
                        return null;
                    switch (b) {
                    case 1:
                        var c = void 0 === c ? !1 : c;
                        a = F(a, 1);
                        a = null == a ? a : !!a;
                        return null == a ? c : a;
                    case 7:
                        return G(a, 3, '');
                    case 2:
                        return Nb(a, 2);
                    case 3:
                        return G(a, 3, '');
                    case 6:
                        return F(a, 4);
                    default:
                        return null;
                    }
                }, de = ya(function () {
                    if (!ae)
                        return {};
                    try {
                        var a = window.sessionStorage && window.sessionStorage.getItem('GGDFSSK');
                        if (a)
                            return JSON.parse(a);
                    } catch (b) {
                    }
                    return {};
                }), ge = function (a, b, c, d) {
                    d = void 0 === d ? 0 : d;
                    var e = de();
                    if (null != e[b])
                        return e[b];
                    b = ee(d)[b];
                    if (!b)
                        return c;
                    b = new R(b);
                    b = fe(b);
                    a = ce(b, a);
                    return null != a ? a : c;
                }, fe = function (a) {
                    var b = N(Zd).g;
                    if (b) {
                        var c = Da(K(a, Wd, 5), function (d) {
                            return Td(J(d, Md, 1), b);
                        });
                        if (c)
                            return J(c, Vd, 2);
                    }
                    return J(a, Vd, 4);
                }, he = function () {
                    this.g = {};
                    this.h = [];
                }, ie = function (a, b, c) {
                    return !!ge(1, a, void 0 === b ? !1 : b, c);
                }, je = function (a, b, c) {
                    b = void 0 === b ? 0 : b;
                    a = Number(ge(2, a, b, c));
                    return isNaN(a) ? b : a;
                }, ke = function (a, b, c) {
                    return ge(3, a, void 0 === b ? '' : b, c);
                }, le = function (a, b, c) {
                    b = void 0 === b ? [] : b;
                    return ge(6, a, b, c);
                }, ee = function (a) {
                    return N(he).g[a] || (N(he).g[a] = {});
                }, me = function (a, b) {
                    var c = ee(b);
                    fc(a, function (d, e) {
                        return c[e] = d;
                    });
                }, ne = function (a, b) {
                    var c = ee(b);
                    za(a, function (d) {
                        var e = Mb(d, Yd[0]);
                        (e = be(d, e)) && (c[e] = d.toJSON());
                    });
                }, oe = function (a, b) {
                    var c = ee(b);
                    za(a, function (d) {
                        var e = new R(d), f = Mb(e, Yd[0]);
                        (e = be(e, f)) && (c[e] || (c[e] = d));
                    });
                }, pe = function () {
                    return Ba(n(Object, 'keys').call(Object, N(he).g), function (a) {
                        return Number(a);
                    });
                }, qe = function (a) {
                    Ea(N(he).h, a) || me(ee(4), a);
                };
            var S = function (a) {
                    this.methodName = a;
                }, re = new S(1), se = new S(15), te = new S(2), ue = new S(3), ve = new S(4), we = new S(5), xe = new S(6), ye = new S(7), ze = new S(8), Ae = new S(9), Be = new S(10), Ce = new S(11), De = new S(12), Ee = new S(13), Fe = new S(14), T = function (a, b, c) {
                    c.hasOwnProperty(a.methodName) || Object.defineProperty(c, String(a.methodName), { value: b });
                }, V = function (a, b, c) {
                    return b[a.methodName] || c || function () {
                    };
                }, Ge = function (a) {
                    T(we, ie, a);
                    T(xe, je, a);
                    T(ye, ke, a);
                    T(ze, le, a);
                    T(Ee, oe, a);
                    T(se, qe, a);
                }, He = function (a) {
                    T(ve, function (b) {
                        N(Zd).g = b;
                    }, a);
                    T(Ae, function (b, c) {
                        var d = N(Zd);
                        d.g[Od][b] || (d.g[Od][b] = c);
                    }, a);
                    T(Be, function (b, c) {
                        var d = N(Zd);
                        d.g[P][b] || (d.g[P][b] = c);
                    }, a);
                    T(Ce, function (b, c) {
                        var d = N(Zd);
                        d.g[Q][b] || (d.g[Q][b] = c);
                    }, a);
                    T(Fe, function (b) {
                        for (var c = N(Zd), d = r([
                                    Od,
                                    P,
                                    Q
                                ]), e = d.next(); !e.done; e = d.next())
                            e = e.value, va(c.g[e], b[e]);
                    }, a);
                }, Ie = function (a) {
                    a.hasOwnProperty('init-done') || Object.defineProperty(a, 'init-done', { value: !0 });
                };
            var Je = function () {
                    this.g = function () {
                    };
                    this.h = function () {
                        return [];
                    };
                }, Ke = function (a, b, c) {
                    a.g = function (d) {
                        V(te, b, function () {
                            return [];
                        })(d, c);
                    };
                    a.h = function () {
                        return V(ue, b, function () {
                            return [];
                        })(c);
                    };
                };
            var Le = function (a, b) {
                    try {
                        a: {
                            var c = a.split('.');
                            a = w;
                            for (var d = 0, e; d < c.length; d++)
                                if (e = a, a = a[c[d]], null == a) {
                                    var f = null;
                                    break a;
                                }
                            f = 'function' === typeof a ? e[c[d - 1]]() : a;
                        }
                        if (typeof f === b)
                            return f;
                    } catch (g) {
                    }
                }, Me = function () {
                    var a = {};
                    this[Od] = (a[8] = function (b) {
                        try {
                            return null != ra(b);
                        } catch (c) {
                        }
                    }, a[9] = function (b) {
                        try {
                            var c = ra(b);
                        } catch (d) {
                            return;
                        }
                        if (b = 'function' === typeof c)
                            c = c && c.toString && c.toString(), b = 'string' === typeof c && -1 != c.indexOf('[native code]');
                        return b;
                    }, a[10] = function () {
                        return window == window.top;
                    }, a[6] = function (b) {
                        return Ea(N(Je).h(), parseInt(b, 10));
                    }, a[27] = function (b) {
                        b = Le(b, 'boolean');
                        return void 0 !== b ? b : void 0;
                    }, a);
                    a = {};
                    this[P] = (a[3] = function () {
                        return kc();
                    }, a[6] = function (b) {
                        b = Le(b, 'number');
                        return void 0 !== b ? b : void 0;
                    }, a[11] = function (b) {
                        b = lc(void 0 === b ? '' : b, w);
                        return null == b ? void 0 : b % 1000;
                    }, a);
                    a = {};
                    this[Q] = (a[2] = function () {
                        return window.location.href;
                    }, a[3] = function () {
                        try {
                            return window.top.location.hash;
                        } catch (b) {
                            return '';
                        }
                    }, a[4] = function (b) {
                        b = Le(b, 'string');
                        return void 0 !== b ? b : void 0;
                    }, a);
                };
            var Ne = function () {
                var a = void 0 === a ? w : a;
                return a.ggeac || (a.ggeac = {});
            };
            var Pe = function (a) {
                D.call(this, a, -1, Oe);
            };
            u(Pe, D);
            Pe.prototype.getId = function () {
                return G(this, 1, 0);
            };
            Pe.prototype.B = function () {
                return G(this, 7, 0);
            };
            var Oe = [2];
            var Re = function (a) {
                D.call(this, a, -1, Qe);
            };
            u(Re, D);
            Re.prototype.B = function () {
                return G(this, 5, 0);
            };
            var Qe = [2];
            var Te = function (a) {
                D.call(this, a, -1, Se);
            };
            u(Te, D);
            var Ve = function (a) {
                D.call(this, a, -1, Ue);
            };
            u(Ve, D);
            Ve.prototype.B = function () {
                return G(this, 1, 0);
            };
            var We = function (a) {
                D.call(this, a);
            };
            u(We, D);
            var Se = [
                    1,
                    4,
                    2,
                    3
                ], Ue = [2];
            var Xe = function (a) {
                    var b = void 0 === b ? new Cc(ya(zc(0 < a ? 1 / a : 0))) : b;
                    this.h = a;
                    this.i = b;
                    this.g = [];
                }, Ye = function (a, b, c, d, e) {
                    b = Cd(Bd(new Ad(), b), c);
                    d = xd(wd(zd(yd(new vd(), d), e), b), a.g);
                    var f = Hd(d);
                    Dc(a.i, function () {
                        var g = I(f, 1, Date.now());
                        var h = nc(window);
                        g = I(g, 2, h);
                        g = I(g, 3, 1 / a.h);
                        return I(g, 6, a.h);
                    });
                    a.g.push(b);
                    100 < a.g.length && a.g.shift();
                };
            var Ze = [
                    12,
                    13,
                    20
                ], $e = function () {
                }, af = function (a, b, c, d, e) {
                    d = void 0 === d ? {} : d;
                    var f = void 0 === d.Y ? !1 : d.Y, g = void 0 === d.Z ? {} : d.Z;
                    d = void 0 === d.$ ? [] : d.$;
                    e = void 0 === e ? null : e;
                    a.i = b;
                    a.o = {};
                    a.u = f;
                    a.j = g;
                    b = {};
                    a.g = (b[c] = [], b[4] = [], b);
                    a.h = {};
                    (c = Jd()) && za(c.split(',') || [], function (h) {
                        (h = parseInt(h, 10)) && (a.h[h] = !0);
                    });
                    za(d, function (h) {
                        a.h[h] = !0;
                    });
                    a.l = e;
                    return a;
                }, bf = function (a, b, c) {
                    if (a.o[b])
                        return 0.001 >= Math.random() && pc({
                            b: c,
                            dp: b
                        }, 'tagging_dupdiv'), !0;
                    a.o[b] = !0;
                    return !1;
                }, ff = function (a, b, c) {
                    var d = [], e = cf(a.i, b);
                    if (9 !== b && bf(a, b, c) || !e.length) {
                        var f;
                        null == (f = a.l) || Ye(f, b, c, d, []);
                        return d;
                    }
                    var g = Ea(Ze, b), h = [];
                    za(e, function (l) {
                        var p = new Ed();
                        if (l = df(a, l, c, p)) {
                            0 !== Mb(p, Dd[0]) && h.push(p);
                            p = l.getId();
                            d.push(p);
                            ef(a, p, g ? 4 : c);
                            var U = K(l, R, 2);
                            U && (g ? za(pe(), function (Vf) {
                                return ne(U, Vf);
                            }) : ne(U, c));
                        }
                    });
                    var k;
                    null == (k = a.l) || Ye(k, b, c, d, h);
                    return d;
                }, ef = function (a, b, c) {
                    a.g[c] || (a.g[c] = []);
                    a = a.g[c];
                    Ea(a, b) ? pc({
                        eids: JSON.stringify(a),
                        dup: b
                    }, 'gpt_dupeid') : a.push(b);
                }, gf = function (a, b) {
                    a.i.push.apply(a.i, t(Aa(Ba(b, function (c) {
                        return new Ve(c);
                    }), function (c) {
                        return !Ea(Ze, c.B());
                    })));
                }, df = function (a, b, c, d) {
                    var e = N(Zd).g;
                    if (!Td(J(b, Md, 3), e))
                        return null;
                    var f = K(b, Pe, 2), g = f.length * G(b, 1, 0), h = G(b, 6, 0);
                    if (h) {
                        Ob(d, 1, Dd[0], h);
                        g = e[P];
                        switch (c) {
                        case 2:
                            var k = g[8];
                            break;
                        case 1:
                            k = g[7];
                        }
                        c = void 0;
                        if (k)
                            try {
                                c = k(h), I(d, 3, c);
                            } catch (l) {
                            }
                        return (b = hf(b, c)) ? jf(a, [b], 1) : null;
                    }
                    if (h = G(b, 10, 0)) {
                        Ob(d, 2, Dd[0], h);
                        g = null;
                        switch (c) {
                        case 1:
                            g = e[P][9];
                            break;
                        case 2:
                            g = e[P][10];
                            break;
                        default:
                            return null;
                        }
                        c = g ? g(String(h)) : void 0;
                        if (void 0 === c && 1 === G(b, 11, 0))
                            return null;
                        void 0 !== c && I(d, 3, c);
                        return (b = hf(b, c)) ? jf(a, [b], 1) : null;
                    }
                    d = e ? Aa(f, function (l) {
                        return Td(J(l, Md, 3), e);
                    }) : f;
                    return d.length ? (b = G(b, 4, 0)) ? kf(a, b, g, d) : jf(a, d, g / 1000) : null;
                }, kf = function (a, b, c, d) {
                    var e = null != a.j[b] ? a.j[b] : 1000;
                    if (0 >= e)
                        return null;
                    d = jf(a, d, c / e);
                    a.j[b] = d ? 0 : e - c;
                    return d;
                }, jf = function (a, b, c) {
                    var d = a.h, e = Ca(b, function (f) {
                            return !!d[f.getId()];
                        });
                    return e ? e : a.u ? null : ec(b, c);
                }, lf = function (a, b) {
                    T(re, function (c) {
                        a.h[c] = !0;
                    }, b);
                    T(te, function (c, d) {
                        return ff(a, c, d);
                    }, b);
                    T(ue, function (c) {
                        return (a.g[c] || []).concat(a.g[4]);
                    }, b);
                    T(De, function (c) {
                        return gf(a, c);
                    }, b);
                }, cf = function (a, b) {
                    return (a = Ca(a, function (c) {
                        return c.B() == b;
                    })) && K(a, Re, 2) || [];
                }, hf = function (a, b) {
                    var c = K(a, Pe, 2), d = c.length, e = G(a, 1, 0);
                    a = G(a, 8, 0);
                    b = void 0 !== b ? b : Math.floor(1000 * dc(window));
                    var f = (b - a) % d;
                    if (b < a || b - a - f >= d * e - 1)
                        return null;
                    c = c[f];
                    d = N(Zd).g;
                    return !c || d && !Td(J(c, Md, 3), d) ? null : c;
                };
            var mf = function () {
                    this.g = function () {
                    };
                }, nf = function (a) {
                    N(mf).g(a);
                };
            var of, pf, sf = function (a) {
                    var b = N(qf), c = {
                            Y: N(W)[211],
                            Z: N(W)[227],
                            $: N(W)[226]
                        }, d = void 0, e = 2;
                    d = void 0 === d ? Ne() : d;
                    e = void 0 === e ? 0 : e;
                    var f = void 0 === f ? new Xe(null != (pf = null == (of = J(a, We, 5)) ? void 0 : G(of, 2, 0)) ? pf : 0) : f;
                    d.hasOwnProperty('init-done') ? (V(De, d)(Ba(K(a, Ve, 2), function (g) {
                        return g.toJSON();
                    })), V(Ee, d)(Ba(K(a, R, 1), function (g) {
                        return g.toJSON();
                    }), e), b && V(Fe, d)(b), rf(d, e)) : (lf(af(N($e), K(a, Ve, 2), e, c, f), d), Ge(d), He(d), Ie(d), rf(d, e), ne(K(a, R, 1), e), ae = ae || !(!c || !c.ta), nf(N(Me)), b && nf(b));
                }, rf = function (a, b) {
                    a = void 0 === a ? Ne() : a;
                    b = void 0 === b ? 0 : b;
                    var c = a, d = b;
                    d = void 0 === d ? 0 : d;
                    Ke(N(Je), c, d);
                    tf(a, b);
                    N(mf).g = V(Fe, a);
                    N(pd).j();
                }, tf = function (a, b) {
                    var c = N(pd);
                    c.g = function (d, e) {
                        return V(we, a, function () {
                            return !1;
                        })(d, e, b);
                    };
                    c.h = function (d, e) {
                        return V(xe, a, function () {
                            return 0;
                        })(d, e, b);
                    };
                    c.i = function (d, e) {
                        return V(ye, a, function () {
                            return '';
                        })(d, e, b);
                    };
                    c.l = function (d, e) {
                        return V(ze, a, function () {
                            return [];
                        })(d, e, b);
                    };
                    c.j = function () {
                        V(se, a)(b);
                    };
                };
            var uf = [
                'AwfG8hAcHnPa/kJ1Co0EvG/K0F9l1s2JZGiDLt2mhC3QI5Fh4qmsmSwrWObZFbRC9ieDaSLU6lHRxhGUF/i9sgoAAACBeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiSW50ZXJlc3RDb2hvcnRBUEkiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                'AwQ7dCmHkvR6FuOFxAuNnktYSQrGbL4dF+eBkrwNLALc69Wr//PnO1yzns3pjUoCaYbKHtVcnng2hU+8OUm0PAYAAACHeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiSW50ZXJlc3RDb2hvcnRBUEkiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                'AysVDPGQTLD/Scn78x4mLwB1tMfje5jwUpAAzGRpWsr1NzoN7MTFhT3ClmImi2svDZA7V6nWGIV8YTPsSRTe0wYAAACHeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiSW50ZXJlc3RDb2hvcnRBUEkiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9'
            ];
            function vf(a) {
                a = void 0 === a ? window.document : a;
                mc(uf, a);
            }
            ;
            var wf = function (a) {
                a = void 0 === a ? w : a;
                return (a = a.performance) && a.now ? a.now() : null;
            };
            var xf = w.performance, yf = !!(xf && xf.mark && xf.measure && xf.clearMarks), zf = ya(function () {
                    var a;
                    if (a = yf)
                        a = Jd(), a = !!a.indexOf && 0 <= a.indexOf('1337');
                    return a;
                });
            var Af = function (a, b, c) {
                    this.g = void 0 === a ? null : a;
                    this.j = void 0 === b ? 'jserror' : b;
                    this.h = null;
                    this.i = void 0 === c ? 0.01 : c;
                    this.o = this.l;
                }, Bf = function (a, b) {
                    a.h = b;
                };
            Af.prototype.l = function (a, b, c, d, e) {
                c = void 0 === c ? this.i : c;
                e = void 0 === e ? this.j : e;
                if (Math.random() > c)
                    return !1;
                b.error && b.meta && b.id || (b = new Vb(b, {
                    context: a,
                    id: e
                }));
                if (d || this.h)
                    b.meta = {}, this.h && this.h(b.meta), d && d(b.meta);
                w.google_js_errors = w.google_js_errors || [];
                w.google_js_errors.push(b);
                w.error_rep_loaded || (b = w.document, a = b.createElement('script'), a.src = Na(new y(w.location.protocol + '//pagead2.googlesyndication.com/pagead/js/err_rep.js', La)), Ub(a), (b = b.getElementsByTagName('script')[0]) && b.parentNode && b.parentNode.insertBefore(a, b), w.error_rep_loaded = !0);
                return !1;
            };
            var Cf = function (a, b) {
                try {
                    var c = a.g && a.g.start('420', 3);
                    b();
                    a.g && c && a.g.end(c);
                } catch (d) {
                    if (a.g && c && (b = c) && xf && zf() && (xf.clearMarks('goog_' + b.label + '_' + b.uniqueId + '_start'), xf.clearMarks('goog_' + b.label + '_' + b.uniqueId + '_end')), !a.o(420, d, a.i, void 0, a.j))
                        throw d;
                }
            };
            var Df = [
                'A2YAd4xOntTGygIDjApOTtXOgVI3IWsd5OnOGq3RbRkIQwyqYWNl1JGRAcvtm6VOHDj4n07T/J19VqLuJn3MmQ8AAACWeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjMxNjYzOTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlLCJ1c2FnZSI6InN1YnNldCJ9',
                'A2c5Ux+hivdkLh/KbZUGr6f7SCR0mZrBVfPJ+/OuDVHNwiYv+Lo83b9z5qL8sod78bQl0pSLtbvRWURo+xRl7AIAAACceyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjMxNjYzOTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlLCJ1c2FnZSI6InN1YnNldCJ9',
                'AzNJ4sd3tVurolpdvWYZ4cmP9Po7RJhEHSqmC3pgxW9fFVZvchhtcMUgHAs97npxMD1jhXHO8s6q6Wy1MMLxKgEAAACceyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjMxNjYzOTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlLCJ1c2FnZSI6InN1YnNldCJ9'
            ];
            function Ef(a) {
                a = void 0 === a ? window.document : a;
                mc(Df, a);
            }
            ;
            var Ff = x('gpt/pubads_impl_'), Gf = x('https://securepubads.g.doubleclick.net/');
            var Hf = function (a, b) {
                    var c = wf(b);
                    c && (a = {
                        label: a,
                        type: 9,
                        value: c
                    }, b = b.google_js_reporting_queue = b.google_js_reporting_queue || [], 2048 > b.length && b.push(a));
                }, If = function (a, b, c) {
                    var d = window;
                    return function () {
                        var e = wf(), f = 3;
                        try {
                            var g = b.apply(this, arguments);
                        } catch (h) {
                            f = 13;
                            if (c)
                                return c(a, h), g;
                            throw h;
                        } finally {
                            d.google_measure_js_timing && e && (e = {
                                label: a.toString(),
                                value: e,
                                duration: (wf() || 0) - e,
                                type: f
                            }, f = d.google_js_reporting_queue = d.google_js_reporting_queue || [], 2048 > f.length && f.push(e));
                        }
                        return g;
                    };
                }, Jf = function (a, b) {
                    return If(a, b, function (c, d) {
                        new Af().l(c, d);
                    });
                };
            function X(a, b) {
                return null == b ? '&' + a + '=null' : '&' + a + '=' + Math.floor(b);
            }
            function Kf(a, b) {
                return '&' + a + '=' + b.toFixed(3);
            }
            function Lf() {
                var a = new m.Set();
                try {
                    if ('undefined' === typeof googletag || !googletag.pubads)
                        return a;
                    for (var b = googletag.pubads(), c = r(b.getSlots()), d = c.next(); !d.done; d = c.next())
                        a.add(d.value.getSlotId().getDomId());
                } catch (e) {
                }
                return a;
            }
            function Mf(a) {
                a = a.id;
                return null != a && (Lf().has(a) || n(a, 'startsWith').call(a, 'google_ads_iframe_') || n(a, 'startsWith').call(a, 'aswift'));
            }
            function Nf(a, b, c) {
                if (!a.sources)
                    return !1;
                var d = qd(Oc);
                switch (Of(a)) {
                case 2:
                    var e = Pf(a);
                    if (e)
                        return c.some(function (g) {
                            return Qf(e, g, d);
                        });
                case 1:
                    var f = Rf(a);
                    if (f)
                        return b.some(function (g) {
                            return Qf(f, g, d);
                        });
                }
                return !1;
            }
            function Of(a) {
                if (!a.sources)
                    return 0;
                a = a.sources.filter(function (b) {
                    return b.previousRect && b.currentRect;
                });
                if (1 <= a.length) {
                    a = a[0];
                    if (a.previousRect.top < a.currentRect.top)
                        return 2;
                    if (a.previousRect.top > a.currentRect.top)
                        return 1;
                }
                return 0;
            }
            function Rf(a) {
                return Sf(a, function (b) {
                    return b.currentRect;
                });
            }
            function Pf(a) {
                return Sf(a, function (b) {
                    return b.previousRect;
                });
            }
            function Sf(a, b) {
                return a.sources.reduce(function (c, d) {
                    d = b(d);
                    return c ? d && 0 !== d.width * d.height ? d.top < c.top ? d : c : c : d;
                }, null);
            }
            var Tf = function () {
                rd.call(this);
                this.h = this.g = this.F = this.D = this.J = 0;
                this.U = this.R = Number.NEGATIVE_INFINITY;
                this.M = this.O = this.P = this.S = this.X = this.o = this.W = this.H = 0;
                this.N = !1;
                this.G = this.C = this.u = 0;
                var a = document.querySelector('[data-google-query-id]');
                this.V = a ? a.getAttribute('data-google-query-id') : null;
                this.l = null;
                this.T = !1;
                this.L = function () {
                };
            };
            u(Tf, rd);
            var Xf = function () {
                    var a = new Tf();
                    if (O(Mc) && !window.google_plmetrics && window.PerformanceObserver) {
                        window.google_plmetrics = !0;
                        for (var b = r([
                                    'layout-shift',
                                    'largest-contentful-paint',
                                    'first-input',
                                    'longtask'
                                ]), c = b.next(); !c.done; c = b.next())
                            c = c.value, Uf(a).observe({
                                type: c,
                                buffered: !O(Qc)
                            });
                        Wf(a);
                    }
                }, Uf = function (a) {
                    a.l || (a.l = new PerformanceObserver(Jf(640, function (b) {
                        var c = Yf !== window.scrollX || Zf !== window.scrollY ? [] : $f, d = ag();
                        b = r(b.getEntries());
                        for (var e = b.next(); !e.done; e = b.next())
                            switch (e = e.value, e.entryType) {
                            case 'layout-shift':
                                var f = a;
                                if (!e.hadRecentInput && (!O(Nc) || 0.01 < e.value)) {
                                    f.J += Number(e.value);
                                    Number(e.value) > f.D && (f.D = Number(e.value));
                                    f.F += 1;
                                    var g = Nf(e, c, d);
                                    g && (f.o += e.value, f.S++);
                                    if (5000 < e.startTime - f.R || 1000 < e.startTime - f.U)
                                        f.R = e.startTime, f.g = 0, f.h = 0;
                                    f.U = e.startTime;
                                    f.g += e.value;
                                    g && (f.h += e.value);
                                    f.g > f.H && (f.H = f.g, f.X = f.h, f.W = e.startTime + e.duration);
                                }
                                break;
                            case 'largest-contentful-paint':
                                a.P = Math.floor(e.renderTime || e.loadTime);
                                a.O = e.size;
                                break;
                            case 'first-input':
                                a.M = Number((e.processingStart - e.startTime).toFixed(3));
                                a.N = !0;
                                break;
                            case 'longtask':
                                e = Math.max(0, e.duration - 50), a.u += e, a.C = Math.max(a.C, e), a.G += 1;
                            }
                    })));
                    return a.l;
                }, Wf = function (a) {
                    var b = Jf(641, function () {
                            var f = document;
                            2 == ({
                                visible: 1,
                                hidden: 2,
                                prerender: 3,
                                preview: 4,
                                unloaded: 5
                            }[f.visibilityState || f.webkitVisibilityState || f.mozVisibilityState || ''] || 0) && bg(a);
                        }), c = Jf(641, function () {
                            return void bg(a);
                        });
                    document.addEventListener('visibilitychange', b);
                    document.addEventListener('unload', c);
                    var d = qd(Pc), e;
                    0 < d && (e = setTimeout(c, 1000 * d));
                    a.L = function () {
                        document.removeEventListener('visibilitychange', b);
                        document.removeEventListener('unload', c);
                        Uf(a).disconnect();
                        e && clearTimeout(e);
                    };
                };
            Tf.prototype.K = function () {
                rd.prototype.K.call(this);
                this.L();
            };
            var bg = function (a) {
                    if (!a.T) {
                        a.T = !0;
                        Uf(a).takeRecords();
                        var b = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics';
                        window.LayoutShift && (b += Kf('cls', a.J), b += Kf('mls', a.D), b += X('nls', a.F), window.LayoutShiftAttribution && (b += Kf('cas', a.o), b += X('nas', a.S)), b += Kf('wls', a.H), b += Kf('tls', a.W), window.LayoutShiftAttribution && (b += Kf('was', a.X)));
                        window.LargestContentfulPaint && (b += X('lcp', a.P), b += X('lcps', a.O));
                        window.PerformanceEventTiming && a.N && (b += X('fid', a.M));
                        window.PerformanceLongTaskTiming && (b += X('cbt', a.u), b += X('mbt', a.C), b += X('nlt', a.G));
                        for (var c = 0, d = r(document.getElementsByTagName('iframe')), e = d.next(); !e.done; e = d.next())
                            Mf(e.value) && c++;
                        b += X('nif', c);
                        c = window.google_unique_id;
                        b += X('ifi', 'number' === typeof c ? c : 0);
                        c = N(Je).h();
                        b += '&eid=' + encodeURIComponent(c.join());
                        b += '&top=' + (w === w.top ? 1 : 0);
                        b += a.V ? '&qqid=' + encodeURIComponent(a.V) : X('pvsid', nc(w));
                        window.googletag && (b += '&gpt=1');
                        window.fetch(b, {
                            keepalive: !0,
                            credentials: 'include',
                            redirect: 'follow',
                            method: 'get',
                            mode: 'no-cors'
                        });
                        a.i || (a.i = !0, a.K());
                    }
                }, Qf = function (a, b, c) {
                    if (0 === c)
                        return !0;
                    var d = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                    a = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                    return 0 >= d || 0 >= a ? !1 : 100 * d * a / ((b.right - b.left) * (b.bottom - b.top)) >= c;
                }, ag = function () {
                    var a = [].concat(t(document.getElementsByTagName('iframe'))).filter(Mf), b = [].concat(t(Lf())).map(function (c) {
                            return document.getElementById(c);
                        }).filter(function (c) {
                            return null !== c;
                        });
                    Yf = window.scrollX;
                    Zf = window.scrollY;
                    return $f = [].concat(t(a), t(b)).map(function (c) {
                        return c.getBoundingClientRect();
                    });
                }, Yf = void 0, Zf = void 0, $f = [];
            var cg = function (a) {
                    a = void 0 === a ? window : a;
                    return !a.PeriodicSyncManager;
                }, dg = function () {
                    var a = void 0 === a ? window : a;
                    if (!cg(a) && O(Rc) || cg(a) && O(Sc)) {
                        a = a.navigator.userAgent;
                        var b = /Chrome/.test(a);
                        return /Android/.test(a) && b;
                    }
                    return !1;
                }, eg = {
                    issuerOrigin: 'https://attestation.android.com',
                    issuancePath: '/att/i',
                    redemptionPath: '/att/r',
                    shouldRedeemToken: function () {
                        return dg();
                    },
                    shouldRequestToken: function () {
                        return dg();
                    }
                };
            var fg = [
                    'A88otRz1Fd3Nt567e2IYshC18LL3KGVXpVJW9oTCId4RYaygt23pbb4JqrbdIO/bwZPWEmRjBIRBu/bZbDR7Pg4AAABueyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MzQwODMxOTksImlzVGhpcmRQYXJ0eSI6dHJ1ZX0=',
                    'A0gCLbXCcL0R1Oc8tFPDs0G4Elz17w3zHp+Zst66+D17veE2o7fUcPsA114QtSTRqfVJLMeTSdeWOom0CcyCsgYAAAB7eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MzQwODMxOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                    'A9RQ+LxFazAousxUwSCzaihJjHLO1UyjQp0teZKHl7WdbVjPDfHSKMd6D/ZI5MTjqClFycbl70EFd7cBJWXqKQEAAACBeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MzQwODMxOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                    'A6WKeWsdn1Ct+ZPqS9NCxxaiBoQ7wdTkK2/gE69Yu0gfBKJfo1gOvgkGmf5/xaIajT/RUb9AbnF1FsSZ47cCcQcAAACBeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MzQwODMxOTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                    'A04ZCu7yjrHgwQJK5ISHhH1DSg0qqowEay3n70KO6wV3D2Mj+OX3Kw20aSMitzgdG1xfrN7sOJV/dZIk+RvCzA4AAAB2eyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IlRydXN0VG9rZW5zIiwiZXhwaXJ5IjoxNjM0MDgzMTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=='
                ], ig = function (a, b, c) {
                    b = void 0 === b ? null : b;
                    c = void 0 === c ? !1 : c;
                    rd.call(this);
                    O(Uc) || gg();
                    this.h = b || [eg];
                    this.g = c;
                    if (document.hasTrustToken && !O(Tc) && !Array.isArray(window.goog_tt_state)) {
                        var d = hg(this);
                        Object.defineProperty(window, 'goog_tt_state', {
                            configurable: !1,
                            get: function () {
                                return d.slice();
                            }
                        });
                    }
                };
            u(ig, rd);
            var gg = function () {
                    var a = void 0 === a ? window.document : a;
                    mc(fg, a);
                }, hg = function (a) {
                    return a.h.map(function (b) {
                        return {
                            issuerOrigin: b.issuerOrigin,
                            state: O(Uc) && !a.g ? 12 : 1
                        };
                    });
                }, Y = function (a, b) {
                    var c = n(window.goog_tt_state, 'find').call(window.goog_tt_state, function (d) {
                        return d.issuerOrigin === a;
                    });
                    c && (c.state = b);
                }, jg = function () {
                    var a = window.goog_tt_state;
                    return Array.isArray(a) && a.some(function (b) {
                        return 1 != b.state;
                    });
                }, kg = function (a) {
                    var b = a.issuerOrigin + a.redemptionPath, c = {
                            keepalive: !0,
                            redirect: 'follow',
                            method: 'get',
                            trustToken: {
                                type: 'token-redemption',
                                issuer: a.issuerOrigin,
                                refreshPolicy: 'none'
                            }
                        };
                    Y(a.issuerOrigin, 2);
                    return window.fetch(b, c).then(function (d) {
                        if (!d.ok)
                            throw Error(d.status + ': Network response was not ok!');
                        Y(a.issuerOrigin, 6);
                    }).catch(function (d) {
                        d && 'NoModificationAllowedError' === d.name ? Y(a.issuerOrigin, 6) : Y(a.issuerOrigin, 5);
                    });
                }, lg = function (a, b) {
                    var c = a.issuerOrigin + a.issuancePath;
                    Y(a.issuerOrigin, 8);
                    return window.fetch(c, { trustToken: { type: 'token-request' } }).then(function (d) {
                        if (!d.ok)
                            throw Error(d.status + ': Network response was not ok!');
                        Y(a.issuerOrigin, 10);
                        if (b)
                            return kg(a);
                    }).catch(function (d) {
                        if (d && 'NoModificationAllowedError' === d.name) {
                            if (Y(a.issuerOrigin, 10), b)
                                return kg(a);
                        } else
                            Y(a.issuerOrigin, 9);
                    });
                }, mg = function (a) {
                    if (document.hasTrustToken && !O(Tc) && (!O(Uc) || a.g)) {
                        if (jg())
                            return window.goog_tt_promise;
                        var b = [];
                        a.h.forEach(function (c) {
                            O(Wc) && Y(c.issuerOrigin, 13);
                            var d = c.shouldRedeemToken(), e = c.shouldRequestToken();
                            if (d || e) {
                                var f = document.hasTrustToken(c.issuerOrigin).then(function (g) {
                                    if (g) {
                                        if (d)
                                            return kg(c);
                                    } else {
                                        if (e)
                                            return lg(c, d);
                                        Y(c.issuerOrigin, 3);
                                    }
                                });
                                b.push(f);
                            } else
                                Y(c.issuerOrigin, 7);
                        });
                        if (window.Promise && window.Promise.all)
                            return a = window.Promise.all(b), 'object' != typeof window.goog_tt_promise && Object.defineProperty(window, 'goog_tt_promise', {
                                configurable: !1,
                                value: a,
                                writable: !1
                            }), a;
                    }
                };
            var ng = 'platform platformVersion architecture model uaFullVersion bitness'.split(' '), og = function (a) {
                    return a.navigator && a.navigator.userAgentData && 'function' === typeof a.navigator.userAgentData.getHighEntropyValues ? a.navigator.userAgentData.getHighEntropyValues(ng).then(function (b) {
                        var c = new Yc();
                        c = H(c, 1, b.platform);
                        c = H(c, 2, b.platformVersion);
                        c = H(c, 3, b.architecture);
                        c = H(c, 4, b.model);
                        c = H(c, 5, b.uaFullVersion);
                        return H(c, 9, b.bitness);
                    }) : null;
                };
            var pg = function () {
                    return w.googletag || (w.googletag = {});
                }, qg = function (a, b) {
                    var c = pg();
                    c.hasOwnProperty(a) || (c[a] = b);
                }, rg = function (a, b) {
                    a.addEventListener ? a.addEventListener('load', b, !1) : a.attachEvent && a.attachEvent('onload', b);
                };
            var Z = {
                247: 'https://securepubads.g.doubleclick.net',
                7: 0.02,
                13: 1500,
                23: 0.001,
                38: 0.001,
                58: 1,
                150: '.google.ca',
                211: !1,
                253: !1,
                172: null,
                245: {},
                180: null,
                246: [],
                227: {},
                226: [],
                248: 0,
                252: null,
                258: null,
                251: null,
                259: null
            };
            Z[6] = function (a, b) {
                b = void 0 === b ? !0 : b;
                try {
                    for (var c = null; c != a; c = a, a = a.parent)
                        switch (a.location.protocol) {
                        case 'https:':
                            return !0;
                        case 'file:':
                            return b;
                        case 'http:':
                            return !1;
                        }
                } catch (d) {
                }
                return !0;
            }(window);
            Z[49] = new Date().getTime();
            Z[36] = jc('false');
            Z[148] = $d;
            Z[221] = jc('');
            Z[254] = jc('false');
            Z[204] = ic('{{MOD}}', -1);
            Z[257] = jc('false');
            Z[260] = void 0;
            var W = function () {
                    va(this, Z);
                }, sg = function (a, b) {
                    N(W)[a] = b;
                }, tg = pg(), ug = N(W);
            va(ug, tg._vars_);
            tg._vars_ = ug;
            var vg = new m.WeakMap(), wg = function (a, b) {
                    a = [a];
                    for (var c = b.length - 1; 0 <= c; --c)
                        a.push(typeof b[c], b[c]);
                    return a.join('\x0B');
                };
            var xg = function (a, b) {
                b = void 0 === b ? wg : b;
                var c = ua(a), d = function (e) {
                        e = r(e);
                        e.next();
                        e = ia(e);
                        return b(c, e);
                    };
                return function (e) {
                    for (var f = [], g = 0; g < arguments.length; ++g)
                        f[g] = arguments[g];
                    g = this || w;
                    var h = vg.get(g);
                    h || (h = {}, vg.set(g, h));
                    g = h;
                    h = [this].concat(t(f));
                    f = d ? d(h) : h;
                    if (Object.prototype.hasOwnProperty.call(g, f))
                        g = g[f];
                    else {
                        var k = r(h);
                        h = k.next().value;
                        k = ia(k);
                        h = a.apply(h, k);
                        g = g[f] = h;
                    }
                    return g;
                };
            }(function (a) {
                return (null === a || void 0 === a ? 0 : a.src) ? /^(?:https?:)?\/\/(?:www\.googletagservices\.com|securepubads\.g\.doubleclick\.net|pagead2\.googlesyndication\.com)\/tag\/js\/gpt(?:_[a-z]+)*\.js/.test(a.src) ? 0 : 1 : 2;
            }, function (a, b) {
                var c;
                return a + '\x0B' + (null === (c = b[0]) || void 0 === c ? void 0 : c.src);
            });
            function yg() {
                return 0 === xg(N(W)[172]);
            }
            ;
            function zg() {
                return ic('1') || 0;
            }
            function Ag() {
                var a = Number('2021072403');
                1 > a || Math.floor(a) !== a ? (pc({ v: '2021072403' }, 'gpt_inv_ver'), a = '1') : a = '2021072403';
                return a;
            }
            ;
            var qf = function () {
                var a = {};
                this[Od] = (a[3] = yg, a[2] = N(W)[36], a[17] = function (b) {
                    for (var c = [], d = 0; d < arguments.length; ++d)
                        c[d] = arguments[d];
                    return n(c, 'includes').call(c, String(lc()));
                }, a[21] = function () {
                    return N(W)[148];
                }, a[50] = function () {
                    return 1 === Math.floor(new Date().getTime() / 24 / 60 / 60 / 1000) % 2;
                }, a[54] = function () {
                    return N(W)[259];
                }, a);
                a = {};
                this[P] = (a[1] = function () {
                    return N(W)[204];
                }, a[4] = zg, a);
                this[Q] = {};
            };
            var Bg = [];
            function Cg(a) {
                var b = new Te(N(W)[246]);
                a = new Te(a || Bg);
                if (!K(b, R, 1).length && K(a, R, 1).length) {
                    var c = K(a, R, 1);
                    Rb(b, 1, c);
                }
                !K(b, Ve, 2).length && K(a, Ve, 2).length && (c = K(a, Ve, 2), Rb(b, 2, c));
                null == F(b, 5) && null != F(a, 5) && (a = J(a, We, 5), Qb(b, 5, a));
                sf(b);
            }
            ;
            var Dg = function (a) {
                    if (a = a.scripts)
                        for (var b = 0; b < a.length; b++) {
                            var c = a[b];
                            if (-1 < c.src.indexOf('/tag/js/gpt'))
                                return c;
                        }
                    return null;
                }, Eg, Fg, Gg = function (a) {
                    a = (null != (Fg = null == (Eg = a) ? void 0 : Eg.src) ? Fg : '').match(Yb)[3] || null;
                    return 'pagead2.googlesyndication.com' === Zb(a);
                }, Hg = function (a) {
                    var b = a.currentScript;
                    return 'complete' === a.readyState || 'loaded' === a.readyState || !(null == b || !b.async);
                }, Ig = function (a) {
                    a = Gg(a) ? x('https://pagead2.googlesyndication.com/') : Gf;
                    a = Ta([
                        a,
                        Ff,
                        x('2021072403'),
                        x('.js')
                    ]);
                    var b = qd(Lc);
                    return b ? Pa(a, String(b)) : a;
                }, Jg = function () {
                    this.i = [];
                    this.h = this.g = void 0;
                }, Kg = function (a, b, c) {
                    a.g = b;
                    a.h = c;
                    for (var d = r(a.i), e = d.next(); !e.done; e = d.next())
                        e = e.value, e(b, c);
                    a.i.length = 0;
                }, Lg = function (a, b, c) {
                    var d = a.location.host;
                    if (O(Kc)) {
                        var e = b && ac(b.src, 'domain'), f = b && ac(b.src, 'network-code');
                        if (!d && !e && !f)
                            return Kg(c, void 0, new a.Error('no provided or inferred data')), null;
                        a = Gg(b) ? x('https://pagead2.googlesyndication.com') : x('https://securepubads.g.doubleclick.net');
                        return Pa(Ta([
                            a,
                            x('/pagead/ppub_config')
                        ]), {
                            ippd: d,
                            pppd: e,
                            pppnc: f
                        });
                    }
                    d = Gg(b) ? x('https://pagead2.googlesyndication.com/pagead/managed/js/config_%{sz}__%{ttl}.json') : x('https://securepubads.g.doubleclick.net/pagead/managed/js/config_%{sz}__%{ttl}.json');
                    e = {
                        sz: N(pd).i(Ic.g, Ic.defaultValue),
                        ttl: qd(Jc)
                    };
                    a = { domain: a.location.host };
                    return Pa(Sa(d, e), a, void 0);
                }, Mg = function (a, b) {
                    const $___old_f6e3fa62f91c8460 = {}.constructor.getOwnPropertyDescriptor(window, 'XMLHttpRequest'), $___old_3409f823567aee17 = {}.constructor.getOwnPropertyDescriptor(window, 'XMLHttpRequest');
                    try {
                        if ($___old_f6e3fa62f91c8460)
                            ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___mock_c959e1c702756f5f.XMLHttpRequest));
                        if ($___old_3409f823567aee17)
                            ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___mock_c959e1c702756f5f.XMLHttpRequest));
                        return function () {
                            var c = new a.XMLHttpRequest(), d = new Jg();
                            b = Lg(a, b, d);
                            sg(260, function (e) {
                                void 0 !== d.g || d.h ? e(d.g, d.h) : d.i.push(e);
                            });
                            b && (c.open('GET', b.toString(), !0), c.withCredentials = !1, c.onload = function () {
                                300 > c.status ? (Hf('13', a), Kg(d, 204 == c.status ? '' : c.responseText)) : Kg(d, void 0, new a.Error('resp:' + c.status));
                            }, c.onerror = function () {
                                return Kg(d, void 0, new a.Error('s:' + c.status + ' rs:' + c.readyState));
                            }, c.send());
                        }.apply(this, arguments);
                    } finally {
                        if ($___old_f6e3fa62f91c8460)
                            ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___old_f6e3fa62f91c8460));
                        if ($___old_3409f823567aee17)
                            ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___old_3409f823567aee17));
                    }
                }, Ng = function (a, b, c, d) {
                    sg(172, d);
                    sg(259, Hg(a));
                    Cg(b);
                    N(Je).g(12);
                    N(Je).g(5);
                    O(Uc) ? gg() : (a = new ig(), 0 < qd(Vc) ? sg(258, mg(a)) : mg(a));
                    (a = og(c)) && a.then(function (e) {
                        return sg(251, Tb(e));
                    });
                    Ef(c.document);
                    vf(c.document);
                    O(Fc) || (a = '', d && d.hasAttribute('data-load-fc') && (a = ac(d.src, 'network-code')) && new sd(c, a).start());
                }, Og = function (a, b, c) {
                    var d = pg();
                    a = a || d.fifWin || window;
                    b = b || a.document;
                    var e = d.fifWin ? window : a;
                    qg('_loaded_', !0);
                    qg('getVersion', Ag);
                    qg('cmd', []);
                    var f = b.currentScript || Dg(b);
                    Ng(b, c, a, f);
                    try {
                        Xf();
                    } catch (l) {
                    }
                    Hf('1', a);
                    a = Ig(f);
                    if (!N(W)[259]) {
                        c = 'gpt-impl-' + Math.random();
                        try {
                            ub(b, rb(a, {
                                id: c,
                                nonce: wb()
                            }));
                        } catch (l) {
                        }
                        b.getElementById(c) && (d._loadStarted_ = !0);
                    }
                    if (!d._loadStarted_) {
                        c = d.fifWin ? e.document : b;
                        var g = c.createElement('script');
                        g.src = Na(a);
                        Ub(g);
                        g.async = !0;
                        var h = c.head || c.body || c.documentElement;
                        'complete' !== e.document.readyState && d.fifWin ? rg(e, function () {
                            return void h.appendChild(g);
                        }) : h.appendChild(g);
                        d._loadStarted_ = !0;
                    }
                    var k;
                    O(Gc) && e === e.top && (N(W)[259] || !b.currentScript && (null == (k = Dg(b)) ? 0 : k.async)) && (O(Hc) && nd(e), Mg(e, f));
                };
            var Pg;
            a: {
                try {
                    if (Array.isArray(E)) {
                        Pg = E;
                        break a;
                    }
                } catch (a) {
                }
                Pg = [];
            }
            (function (a, b, c) {
                var d = new Af(null, 'gpt_exception', 0.01);
                Bf(d, function (e) {
                    e.methodId = 420;
                });
                Cf(d, function () {
                    return Og(a, b, c);
                });
            }(void 0, void 0, Pg));
        }.call(this.googletag && googletag.fifWin ? googletag.fifWin.parent : this, [
            [
                [
                    null,
                    7,
                    null,
                    [
                        null,
                        0.1
                    ]
                ],
                [
                    376190677,
                    null,
                    null,
                    [1]
                ],
                [
                    378899425,
                    null,
                    null,
                    [1]
                ],
                [
                    514,
                    null,
                    null,
                    [1]
                ],
                [
                    377966085,
                    null,
                    null,
                    [1]
                ],
                [
                    361174373,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    378290974,
                    null,
                    [
                        null,
                        0.01
                    ]
                ],
                [
                    null,
                    385440135,
                    null,
                    [
                        null,
                        100
                    ]
                ],
                [
                    null,
                    385610149,
                    null,
                    [
                        null,
                        300
                    ]
                ],
                [
                    504,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    529,
                    null,
                    [
                        null,
                        20
                    ]
                ],
                [
                    null,
                    494,
                    null,
                    [
                        null,
                        5000
                    ]
                ],
                [
                    383178307,
                    null,
                    null,
                    [1]
                ],
                [
                    383133998,
                    null,
                    null,
                    [1]
                ],
                [
                    375971837,
                    null,
                    null,
                    [1]
                ],
                [
                    382086337,
                    null,
                    null,
                    [1]
                ],
                [
                    378147356,
                    null,
                    null,
                    [1]
                ],
                [
                    375090993,
                    null,
                    null,
                    [1]
                ],
                [
                    20,
                    null,
                    null,
                    null,
                    [[
                            [
                                1,
                                [[
                                        6,
                                        null,
                                        null,
                                        3,
                                        null,
                                        0
                                    ]]
                            ],
                            [1]
                        ]]
                ],
                [
                    null,
                    492,
                    null,
                    [
                        null,
                        0.01
                    ]
                ],
                [
                    374665379,
                    null,
                    null,
                    [1]
                ],
                [
                    339043665,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    470,
                    null,
                    [
                        null,
                        10
                    ]
                ],
                [
                    null,
                    8,
                    null,
                    [
                        null,
                        -1
                    ]
                ],
                [
                    null,
                    374201269,
                    null,
                    [
                        null,
                        60000
                    ]
                ],
                [
                    374201268,
                    null,
                    null,
                    [1]
                ],
                [
                    530,
                    null,
                    null,
                    [1]
                ],
                [
                    378896074,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    371364213,
                    null,
                    [
                        null,
                        60000
                    ]
                ],
                [
                    null,
                    373440923,
                    null,
                    [
                        null,
                        0.0001
                    ]
                ],
                [
                    null,
                    376149757,
                    null,
                    [
                        null,
                        0.0025
                    ]
                ],
                [
                    371364212,
                    null,
                    null,
                    [1]
                ],
                [
                    437,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    47,
                    null,
                    [
                        null,
                        1
                    ]
                ],
                [
                    null,
                    null,
                    2,
                    [
                        null,
                        null,
                        '1-0-38'
                    ]
                ],
                [
                    373056377,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    360245595,
                    null,
                    [
                        null,
                        200
                    ]
                ],
                [
                    null,
                    61,
                    null,
                    [
                        null,
                        0.001
                    ]
                ],
                [
                    1936,
                    null,
                    null,
                    [1]
                ],
                [
                    373821891,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    null,
                    null,
                    [
                        null,
                        null,
                        null,
                        [
                            'criteo',
                            'index',
                            'indextest',
                            'openx',
                            'openxtest',
                            'pubcid.org',
                            'pubmatic',
                            'thetradedesktest'
                        ]
                    ],
                    null,
                    1918
                ],
                [
                    null,
                    1921,
                    null,
                    [
                        null,
                        72
                    ]
                ],
                [
                    null,
                    1920,
                    null,
                    [
                        null,
                        24
                    ]
                ],
                [
                    null,
                    1922,
                    null,
                    [
                        null,
                        5
                    ]
                ],
                [
                    null,
                    1917,
                    null,
                    [
                        null,
                        300
                    ]
                ],
                [
                    null,
                    1916,
                    null,
                    [
                        null,
                        0.001
                    ]
                ],
                [
                    497,
                    null,
                    null,
                    [1]
                ],
                [
                    382136472,
                    null,
                    null,
                    [1]
                ],
                [
                    1931,
                    null,
                    null,
                    [1]
                ],
                [
                    377431981,
                    null,
                    null,
                    [1]
                ],
                [
                    1945,
                    null,
                    null,
                    [1]
                ],
                [
                    1938,
                    null,
                    null,
                    [1]
                ],
                [
                    null,
                    1929,
                    null,
                    [
                        null,
                        50
                    ]
                ],
                [
                    374326588,
                    null,
                    null,
                    [1]
                ],
                [
                    377105258,
                    null,
                    null,
                    [1]
                ]
            ],
            [
                [
                    12,
                    [
                        [
                            1000,
                            [[
                                    20211866,
                                    [
                                        [
                                            1064,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            null,
                                            1056,
                                            null,
                                            [
                                                null,
                                                3000
                                            ]
                                        ],
                                        [
                                            null,
                                            1057,
                                            null,
                                            [
                                                null,
                                                650
                                            ]
                                        ]
                                    ]
                                ]]
                        ],
                        [
                            1,
                            [
                                [31061828],
                                [
                                    31061829,
                                    [
                                        [
                                            null,
                                            1032,
                                            null,
                                            [
                                                null,
                                                200
                                            ],
                                            [[
                                                    [
                                                        12,
                                                        null,
                                                        null,
                                                        null,
                                                        4,
                                                        null,
                                                        'Android',
                                                        ['navigator.userAgent']
                                                    ],
                                                    [
                                                        null,
                                                        500
                                                    ]
                                                ]]
                                        ],
                                        [
                                            null,
                                            360245595,
                                            null,
                                            [
                                                null,
                                                200
                                            ],
                                            [[
                                                    [
                                                        12,
                                                        null,
                                                        null,
                                                        null,
                                                        4,
                                                        null,
                                                        'Android',
                                                        ['navigator.userAgent']
                                                    ],
                                                    [
                                                        null,
                                                        500
                                                    ]
                                                ]]
                                        ],
                                        [
                                            360245597,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            null,
                                            517,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            20,
                            [
                                [21065724],
                                [
                                    21065725,
                                    [[
                                            203,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            [
                                4,
                                null,
                                9,
                                null,
                                null,
                                null,
                                null,
                                ['LayoutShift']
                            ]
                        ],
                        [
                            null,
                            [
                                [31061487],
                                [
                                    31061488,
                                    [
                                        [
                                            379841917,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            null,
                                            1935,
                                            null,
                                            [
                                                null,
                                                200
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31061690],
                                [
                                    31061691,
                                    [
                                        [
                                            83,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            84,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31062064],
                                [
                                    31062065,
                                    [[
                                            385922407,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    20,
                    [[
                            10,
                            [
                                [31061694],
                                [
                                    31061695,
                                    [[
                                            380025941,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                            201,
                            null,
                            102
                        ]]
                ],
                [
                    4,
                    [[
                            null,
                            [
                                [
                                    44714449,
                                    [[
                                            null,
                                            7,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]]
                                ],
                                [
                                    676982961,
                                    [
                                        [
                                            null,
                                            7,
                                            null,
                                            [
                                                null,
                                                0.4
                                            ]
                                        ],
                                        [
                                            212,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ],
                                [
                                    676982996,
                                    [[
                                            null,
                                            7,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]]
                                ]
                            ]
                        ]]
                ],
                [
                    3,
                    [
                        [
                            null,
                            [
                                [44732730],
                                [44732731]
                            ]
                        ],
                        [
                            null,
                            [
                                [676982960],
                                [676982994],
                                [676982998]
                            ]
                        ],
                        [
                            null,
                            [
                                [676982975],
                                [676982980]
                            ]
                        ],
                        [
                            null,
                            [[
                                    1337,
                                    [
                                        [
                                            77,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            78,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            85,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            80,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            76,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            84,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            188,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ]]
                        ],
                        [
                            10,
                            [
                                [21064365],
                                [
                                    21064366,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                ['u_tz']
                                            ],
                                            null,
                                            489
                                        ]]
                                ],
                                [
                                    21064367,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                ['u_his']
                                            ],
                                            null,
                                            489
                                        ]]
                                ],
                                [
                                    21064368,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                [
                                                    'u_ah',
                                                    'u_aw'
                                                ]
                                            ],
                                            null,
                                            489
                                        ]]
                                ],
                                [
                                    21064369,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                ['u_cd']
                                            ],
                                            null,
                                            489
                                        ]]
                                ],
                                [
                                    21064370,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                ['u_nplug']
                                            ],
                                            null,
                                            489
                                        ]]
                                ],
                                [
                                    21064371,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                ['u_nmime']
                                            ],
                                            null,
                                            489
                                        ]]
                                ],
                                [
                                    21064372,
                                    [[
                                            null,
                                            null,
                                            null,
                                            [
                                                null,
                                                null,
                                                null,
                                                ['flash']
                                            ],
                                            null,
                                            489
                                        ]]
                                ]
                            ],
                            null,
                            15
                        ],
                        [
                            50,
                            [
                                [21068030],
                                [
                                    21068031,
                                    [[
                                            437,
                                            null,
                                            null,
                                            []
                                        ]]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [21068110],
                                [
                                    21068111,
                                    [
                                        [
                                            453,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            454,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [21068766],
                                [
                                    21068767,
                                    [[
                                            null,
                                            488,
                                            null,
                                            [
                                                null,
                                                0.1
                                            ]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [21068863],
                                [
                                    21068864,
                                    [[
                                            98,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            1000,
                            [
                                [
                                    22316437,
                                    null,
                                    [
                                        2,
                                        [
                                            [
                                                2,
                                                [
                                                    [
                                                        8,
                                                        null,
                                                        null,
                                                        1,
                                                        null,
                                                        -1
                                                    ],
                                                    [
                                                        7,
                                                        null,
                                                        null,
                                                        1,
                                                        null,
                                                        5
                                                    ]
                                                ]
                                            ],
                                            [
                                                4,
                                                null,
                                                3
                                            ]
                                        ]
                                    ]
                                ],
                                [
                                    22316438,
                                    null,
                                    [
                                        2,
                                        [
                                            [
                                                2,
                                                [
                                                    [
                                                        8,
                                                        null,
                                                        null,
                                                        1,
                                                        null,
                                                        4
                                                    ],
                                                    [
                                                        7,
                                                        null,
                                                        null,
                                                        1,
                                                        null,
                                                        10
                                                    ]
                                                ]
                                            ],
                                            [
                                                4,
                                                null,
                                                3
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                3
                            ]
                        ],
                        [
                            null,
                            [
                                [31060396],
                                [
                                    31060397,
                                    null,
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['window.top.frames.google_ads_top_frame']
                                    ]
                                ],
                                [
                                    31060398,
                                    null,
                                    [
                                        1,
                                        [[
                                                4,
                                                null,
                                                8,
                                                null,
                                                null,
                                                null,
                                                null,
                                                ['window.top.frames.google_ads_top_frame']
                                            ]]
                                    ]
                                ],
                                [
                                    31060399,
                                    null,
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['window.top.frames.google_ads_top_frame_ctrl']
                                    ]
                                ],
                                [
                                    31060400,
                                    null,
                                    [
                                        1,
                                        [[
                                                4,
                                                null,
                                                8,
                                                null,
                                                null,
                                                null,
                                                null,
                                                ['window.top.frames.google_ads_top_frame_ctrl']
                                            ]]
                                    ]
                                ]
                            ]
                        ],
                        [
                            null,
                            [
                                [31060411],
                                [
                                    31060412,
                                    [[
                                            null,
                                            359346956,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]]
                                ],
                                [
                                    31060413,
                                    [[
                                            null,
                                            359346956,
                                            null,
                                            [
                                                null,
                                                2
                                            ]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            1000,
                            [[
                                    31060475,
                                    null,
                                    [
                                        2,
                                        [
                                            [
                                                1,
                                                [[
                                                        4,
                                                        null,
                                                        9,
                                                        null,
                                                        null,
                                                        null,
                                                        null,
                                                        ['window.PeriodicSyncManager']
                                                    ]]
                                            ],
                                            [
                                                12,
                                                null,
                                                null,
                                                null,
                                                4,
                                                null,
                                                'Android',
                                                ['navigator.userAgent']
                                            ]
                                        ]
                                    ]
                                ]]
                        ],
                        [
                            1,
                            [
                                [31060544],
                                [
                                    31060545,
                                    [[
                                            null,
                                            null,
                                            363931022,
                                            [
                                                null,
                                                null,
                                                'AxSG4we7YFgn53zNH6LCBXBKv3Utfzlzc8GYS8daqjDqlkvQnrnTixUci+Se+p4i+jfdB10gdleeb7P4hepBXwUAAACBeyJvcmlnaW4iOiJodHRwczovL3NlY3VyZXB1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiU3VicmVzb3VyY2VXZWJCdW5kbGVzIiwiZXhwaXJ5IjoxNjI5ODQ5NTk5LCJpc1RoaXJkUGFydHkiOnRydWV9'
                                            ]
                                        ]]
                                ]
                            ],
                            [
                                12,
                                null,
                                null,
                                null,
                                4,
                                null,
                                'Chrome/(9\\d|\\d{3,})',
                                ['navigator.userAgent']
                            ]
                        ],
                        [
                            100,
                            [
                                [31060748],
                                [
                                    31060749,
                                    [[
                                            360245598,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            [
                                4,
                                null,
                                9,
                                null,
                                null,
                                null,
                                null,
                                ['document.interestCohort']
                            ]
                        ],
                        [
                            1,
                            [
                                [31061155],
                                [
                                    31061156,
                                    [[
                                            493,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            50,
                            [
                                [31061180],
                                [
                                    31061181,
                                    [[
                                            370993688,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            null,
                            [
                                [
                                    31061184,
                                    null,
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['top.frames.google_ads_top_frame']
                                    ]
                                ],
                                [
                                    31061185,
                                    [[
                                            360245596,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['top.frames.google_ads_top_frame']
                                    ]
                                ],
                                [
                                    31061186,
                                    [
                                        [
                                            371157910,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            360245596,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['top.frames.google_ads_top_frame']
                                    ]
                                ]
                            ]
                        ],
                        [
                            1000,
                            [
                                [
                                    31061199,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31061160']
                                    ]
                                ],
                                [
                                    31061200,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31061161']
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                10
                            ]
                        ],
                        [
                            10,
                            [
                                [31061329],
                                [31061330]
                            ]
                        ],
                        [
                            1000,
                            [
                                [
                                    31061424,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31061422']
                                    ]
                                ],
                                [
                                    31061425,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31061423']
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                10
                            ]
                        ],
                        [
                            1,
                            [
                                [31061838],
                                [
                                    31061839,
                                    [[
                                            null,
                                            383474324,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            null,
                            [
                                [31061840],
                                [
                                    31061841,
                                    [[
                                            378290973,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            500,
                            [
                                [31061842],
                                [
                                    31061843,
                                    [[
                                            440,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            50,
                            [
                                [31061963],
                                [
                                    31061964,
                                    [[
                                            382109806,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            null,
                            39
                        ],
                        [
                            50,
                            [
                                [44741898],
                                [
                                    44741899,
                                    [[
                                            474,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    5,
                    [
                        [
                            50,
                            [
                                [
                                    21062785,
                                    [[
                                            23,
                                            null,
                                            null,
                                            []
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['_gmptnl']
                                    ]
                                ],
                                [
                                    21062786,
                                    [[
                                            23,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['_gmptnl']
                                    ]
                                ]
                            ],
                            [
                                12,
                                null,
                                null,
                                null,
                                2,
                                null,
                                'today\\.line\\.me/.+/(main|article)'
                            ]
                        ],
                        [
                            900,
                            [[
                                    21062812,
                                    [[
                                            23,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['_gmptnl']
                                    ]
                                ]],
                            [
                                12,
                                null,
                                null,
                                null,
                                2,
                                null,
                                'today\\.line\\.me/.+/(main|article)'
                            ]
                        ],
                        [
                            50,
                            [
                                [
                                    21063916,
                                    [[
                                            23,
                                            null,
                                            null,
                                            []
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['webkit.messageHandlers._gmptnl']
                                    ]
                                ],
                                [
                                    21063917,
                                    [[
                                            23,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['webkit.messageHandlers._gmptnl']
                                    ]
                                ]
                            ],
                            [
                                12,
                                null,
                                null,
                                null,
                                2,
                                null,
                                'today\\.line\\.me/.+/(main|article)'
                            ]
                        ],
                        [
                            900,
                            [[
                                    21064113,
                                    [[
                                            23,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['webkit.messageHandlers._gmptnl']
                                    ]
                                ]],
                            [
                                12,
                                null,
                                null,
                                null,
                                2,
                                null,
                                'today\\.line\\.me/.+/(main|article)'
                            ]
                        ],
                        [
                            50,
                            [
                                [
                                    31060006,
                                    null,
                                    [
                                        2,
                                        [
                                            [
                                                12,
                                                null,
                                                null,
                                                null,
                                                4,
                                                null,
                                                'Android',
                                                ['navigator.userAgent']
                                            ],
                                            [
                                                12,
                                                null,
                                                null,
                                                null,
                                                4,
                                                null,
                                                'Chrome/(89|9\\d|\\d{3,})',
                                                ['navigator.userAgent']
                                            ],
                                            [
                                                4,
                                                null,
                                                9,
                                                null,
                                                null,
                                                null,
                                                null,
                                                ['window.PeriodicSyncManager']
                                            ]
                                        ]
                                    ]
                                ],
                                [
                                    31060007,
                                    [[
                                            1928,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        2,
                                        [
                                            [
                                                12,
                                                null,
                                                null,
                                                null,
                                                4,
                                                null,
                                                'Android',
                                                ['navigator.userAgent']
                                            ],
                                            [
                                                12,
                                                null,
                                                null,
                                                null,
                                                4,
                                                null,
                                                'Chrome/(89|9\\d|\\d{3,})',
                                                ['navigator.userAgent']
                                            ],
                                            [
                                                4,
                                                null,
                                                9,
                                                null,
                                                null,
                                                null,
                                                null,
                                                ['window.PeriodicSyncManager']
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31060032],
                                [
                                    31060033,
                                    [[
                                            1928,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31060437],
                                [
                                    31060438,
                                    [[
                                            200,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ],
                                [
                                    31060439,
                                    [[
                                            220,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            null,
                            24
                        ],
                        [
                            10,
                            [
                                [31060837],
                                [
                                    31060838,
                                    [
                                        [
                                            368279556,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            366809413,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31060978],
                                [
                                    31060979,
                                    [[
                                            369430,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            50,
                            [
                                [31061160],
                                [
                                    31061161,
                                    [
                                        [
                                            504,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            null,
                                            529,
                                            null,
                                            [
                                                null,
                                                20
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ],
                        [
                            50,
                            [
                                [31061422],
                                [
                                    31061423,
                                    [[
                                            365635966,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            150,
                            [
                                [31061482],
                                [
                                    31061483,
                                    [
                                        [
                                            null,
                                            360245595,
                                            null,
                                            [
                                                null,
                                                200
                                            ],
                                            [[
                                                    [
                                                        12,
                                                        null,
                                                        null,
                                                        null,
                                                        4,
                                                        null,
                                                        'Android',
                                                        ['navigator.userAgent']
                                                    ],
                                                    [
                                                        null,
                                                        500
                                                    ]
                                                ]]
                                        ],
                                        [
                                            360245597,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            null,
                                            517,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            [
                                3,
                                [
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['gmaSdk.getQueryInfo']
                                    ],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['webkit.messageHandlers.getGmaQueryInfo.postMessage']
                                    ],
                                    [
                                        4,
                                        null,
                                        8,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['webkit.messageHandlers.getGmaSig.postMessage']
                                    ]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31061714],
                                [
                                    31061715,
                                    [[
                                            35977,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            100,
                            [
                                [31062030],
                                [
                                    31062031,
                                    [[
                                            35976,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            1000,
                            [
                                [
                                    31062032,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31062032
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31062032
                                            ]
                                        ]
                                    ],
                                    [
                                        6,
                                        null,
                                        null,
                                        4,
                                        null,
                                        2
                                    ]
                                ],
                                [
                                    31062033,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31062033
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31062033
                                            ]
                                        ]
                                    ],
                                    [
                                        6,
                                        null,
                                        null,
                                        4,
                                        null,
                                        3
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                3
                            ],
                            1
                        ],
                        [
                            1000,
                            [
                                [
                                    31062047,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31062047
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31062047
                                            ]
                                        ]
                                    ],
                                    [
                                        6,
                                        null,
                                        null,
                                        4,
                                        null,
                                        4
                                    ]
                                ],
                                [
                                    31062048,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31062048
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31062048
                                            ]
                                        ]
                                    ],
                                    [
                                        6,
                                        null,
                                        null,
                                        4,
                                        null,
                                        5
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                3
                            ],
                            1
                        ],
                        [
                            10,
                            [
                                [31062051],
                                [
                                    31062052,
                                    [[
                                            383432437,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            10,
                            [
                                [31062072],
                                [
                                    31062073,
                                    [[
                                            384974428,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    2,
                    [
                        [
                            10,
                            [[31060888]]
                        ],
                        [
                            10,
                            [
                                [31060889],
                                [31060890]
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            104
                        ],
                        [
                            1000,
                            [
                                [
                                    31061029,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31060978']
                                    ]
                                ],
                                [
                                    31061030,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31060979']
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                12
                            ]
                        ],
                        [
                            10,
                            [
                                [31061165],
                                [
                                    31061166,
                                    [[
                                            null,
                                            363650251,
                                            null,
                                            [
                                                null,
                                                2
                                            ]
                                        ]]
                                ],
                                [
                                    31061167,
                                    [[
                                            null,
                                            363650251,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]]
                                ]
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                            1,
                            null,
                            102
                        ],
                        [
                            10,
                            [
                                [44742767],
                                [44742768]
                            ]
                        ]
                    ]
                ],
                [
                    6,
                    [
                        [
                            50,
                            [
                                [31061791],
                                [
                                    31061792,
                                    [[
                                            501,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            [
                                2,
                                [
                                    [
                                        4,
                                        null,
                                        53
                                    ],
                                    [
                                        12,
                                        null,
                                        null,
                                        null,
                                        4,
                                        null,
                                        'Chrome/9[01]',
                                        ['navigator.userAgent']
                                    ]
                                ]
                            ]
                        ],
                        [
                            50,
                            [
                                [31061793],
                                [
                                    31061794,
                                    [[
                                            501,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            [
                                2,
                                [
                                    [
                                        4,
                                        null,
                                        53
                                    ],
                                    [
                                        12,
                                        null,
                                        null,
                                        null,
                                        4,
                                        null,
                                        'Chrome/(9[23456789]|\\d{3,})',
                                        ['navigator.userAgent']
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    13,
                    [
                        [
                            10,
                            [
                                [
                                    21065726,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21065727,
                                    [[
                                            240,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21065728,
                                    [[
                                            241,
                                            null,
                                            null,
                                            [1]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                9,
                                null,
                                null,
                                null,
                                null,
                                ['LayoutShift']
                            ]
                        ],
                        [
                            100,
                            [
                                [21067087],
                                [
                                    21067088,
                                    [[
                                            78,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ],
                            [
                                2,
                                [[
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['31061691']
                                    ]]
                            ]
                        ],
                        [
                            1000,
                            [[21067496]],
                            [
                                4,
                                null,
                                9,
                                null,
                                null,
                                null,
                                null,
                                ['document.hasTrustToken']
                            ]
                        ],
                        [
                            10,
                            [
                                [
                                    21067664,
                                    null,
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21067665,
                                    [[
                                            null,
                                            1905,
                                            null,
                                            [
                                                null,
                                                30
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21067666,
                                    [[
                                            null,
                                            1905,
                                            null,
                                            [
                                                null,
                                                60
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21067667,
                                    [[
                                            null,
                                            1905,
                                            null,
                                            [
                                                null,
                                                120
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                9,
                                null,
                                null,
                                null,
                                null,
                                ['LayoutShift']
                            ]
                        ],
                        [
                            10,
                            [
                                [
                                    21069888,
                                    [[
                                            null,
                                            1929,
                                            null,
                                            [
                                                null,
                                                50
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21069889,
                                    [[
                                            null,
                                            1929,
                                            null,
                                            [
                                                null,
                                                25
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21069890,
                                    [[
                                            null,
                                            1929,
                                            null,
                                            [
                                                null,
                                                1
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21069891,
                                    [[
                                            null,
                                            1929,
                                            null,
                                            [
                                                null,
                                                75
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ],
                                [
                                    21069892,
                                    [[
                                            null,
                                            1929,
                                            null,
                                            [
                                                null,
                                                100
                                            ]
                                        ]],
                                    [
                                        4,
                                        null,
                                        6,
                                        null,
                                        null,
                                        null,
                                        null,
                                        ['21065725']
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                9,
                                null,
                                null,
                                null,
                                null,
                                ['LayoutShift']
                            ]
                        ],
                        [
                            500,
                            [
                                [31061692],
                                [
                                    31061693,
                                    [
                                        [
                                            77,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            78,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            85,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            80,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            76,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ]
                            ],
                            [
                                4,
                                null,
                                6,
                                null,
                                null,
                                null,
                                null,
                                ['31061691']
                            ]
                        ]
                    ]
                ]
            ],
            null,
            null,
            [
                0.001,
                1000
            ]
        ]));
    }())
}