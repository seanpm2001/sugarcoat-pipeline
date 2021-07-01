{
    const $___mock_5de28d8956bfc0f9 = {};
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
    })($___mock_5de28d8956bfc0f9);
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
                }, p = function (a, b, c) {
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
            p('Symbol', function (a) {
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
            p('Symbol.iterator', function (a) {
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
                    var na = { a: !0 }, oa = {};
                    try {
                        oa.__proto__ = na;
                        la = oa.a;
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
            var pa = ka, u = function (a, b) {
                    a.prototype = ja(b.prototype);
                    a.prototype.constructor = a;
                    if (pa)
                        pa(a, b);
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
            p('WeakMap', function (a) {
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
            p('Map', function (a) {
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
                            var l = k.entries(), q = l.next();
                            if (q.done || q.value[0] != h || 's' != q.value[1])
                                return !1;
                            q = l.next();
                            return q.done || 4 != q.value[0].x || 't' != q.value[1] || !l.next().done ? !1 : !0;
                        } catch (ma) {
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
                    for (var l = this.entries(), q; !(q = l.next()).done;)
                        q = q.value, h.call(k, q[1], q[0], this);
                };
                c.prototype[n(m.Symbol, 'iterator')] = c.prototype.entries;
                var d = function (h, k) {
                        var l = k && typeof k;
                        'object' == l || 'function' == l ? b.has(k) ? l = b.get(k) : (l = '' + ++g, b.set(k, l)) : l = 'p_' + k;
                        var q = h.h[l];
                        if (q && v(h.h, l))
                            for (h = 0; h < q.length; h++) {
                                var ma = q[h];
                                if (k !== k && ma.key !== ma.key || k === ma.key)
                                    return {
                                        id: l,
                                        list: q,
                                        index: h,
                                        m: ma
                                    };
                            }
                        return {
                            id: l,
                            list: q,
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
            var qa = function (a, b, c) {
                if (null == a)
                    throw new TypeError('The \'this\' value for String.prototype.' + c + ' must not be null or undefined');
                if (b instanceof RegExp)
                    throw new TypeError('First argument to String.prototype.' + c + ' must not be a regular expression');
                return a + '';
            };
            p('Array.prototype.find', function (a) {
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
            p('String.prototype.startsWith', function (a) {
                return a ? a : function (b, c) {
                    var d = qa(this, b, 'startsWith'), e = d.length, f = b.length;
                    c = Math.max(0, Math.min(c | 0, d.length));
                    for (var g = 0; g < f && c < e;)
                        if (d[c++] != b[g++])
                            return !1;
                    return g >= f;
                };
            }, 'es6');
            p('String.prototype.repeat', function (a) {
                return a ? a : function (b) {
                    var c = qa(this, null, 'repeat');
                    if (0 > b || 1342177279 < b)
                        throw new RangeError('Invalid count value');
                    b |= 0;
                    for (var d = ''; b;)
                        if (b & 1 && (d += c), b >>>= 1)
                            c += c;
                    return d;
                };
            }, 'es6');
            var ra = function (a, b) {
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
            p('String.prototype.padStart', function (a) {
                return a ? a : function (b, c) {
                    var d = qa(this, null, 'padStart');
                    b -= d.length;
                    c = void 0 !== c ? String(c) : ' ';
                    return (0 < b && c ? n(c, 'repeat').call(c, Math.ceil(b / c.length)).substring(0, b) : '') + d;
                };
            }, 'es8');
            p('Array.prototype.keys', function (a) {
                return a ? a : function () {
                    return ra(this, function (b) {
                        return b;
                    });
                };
            }, 'es6');
            p('Array.prototype.values', function (a) {
                return a ? a : function () {
                    return ra(this, function (b, c) {
                        return c;
                    });
                };
            }, 'es8');
            p('Set', function (a) {
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
            p('Object.is', function (a) {
                return a ? a : function (b, c) {
                    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
                };
            }, 'es6');
            p('Array.prototype.includes', function (a) {
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
            p('String.prototype.includes', function (a) {
                return a ? a : function (b, c) {
                    return -1 !== qa(this, b, 'includes').indexOf(b, c || 0);
                };
            }, 'es6');
            var w = this || self, sa = function (a) {
                    a = a.split('.');
                    for (var b = w, c = 0; c < a.length; c++)
                        if (b = b[a[c]], null == b)
                            return null;
                    return b;
                }, va = function (a) {
                    return Object.prototype.hasOwnProperty.call(a, ta) && a[ta] || (a[ta] = ++ua);
                }, ta = 'closure_uid_' + (1000000000 * Math.random() >>> 0), ua = 0, wa = function (a, b) {
                    for (var c in b)
                        a[c] = b[c];
                }, xa = function (a, b) {
                    a = a.split('.');
                    var c = w;
                    a[0] in c || 'undefined' == typeof c.execScript || c.execScript('var ' + a[0]);
                    for (var d; a.length && (d = a.shift());)
                        a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
                };
            var ya;
            var za = function (a) {
                var b = !1, c;
                return function () {
                    b || (c = a(), b = !0);
                    return c;
                };
            };
            var Aa = function (a, b) {
                    Array.prototype.forEach.call(a, b, void 0);
                }, Ba = function (a, b) {
                    return Array.prototype.filter.call(a, b, void 0);
                }, Ca = function (a, b) {
                    return Array.prototype.map.call(a, b, void 0);
                };
            function Da(a, b) {
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
            function Ea(a, b) {
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
            function Fa(a, b) {
                return 0 <= Array.prototype.indexOf.call(a, b, void 0);
            }
            ;
            function Ga(a) {
                var b = [], c = 0, d;
                for (d in a)
                    b[c++] = a[d];
                return b;
            }
            ;
            var Ha = {
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
            var Ka = function (a, b) {
                this.h = a === Ia && b || '';
                this.i = Ja;
            };
            Ka.prototype.u = !0;
            Ka.prototype.g = function () {
                return this.h;
            };
            var La = function (a) {
                    return a instanceof Ka && a.constructor === Ka && a.i === Ja ? a.h : 'type_error:Const';
                }, x = function (a) {
                    return new Ka(Ia, a);
                }, Ja = {}, Ia = {};
            var y = function (a, b) {
                this.i = b === Ma ? a : '';
            };
            y.prototype.u = !0;
            y.prototype.g = function () {
                return this.i.toString();
            };
            y.prototype.j = !0;
            y.prototype.h = function () {
                return 1;
            };
            var Qa = function (a, b, c) {
                a = Na.exec(Oa(a).toString());
                var d = a[3] || '';
                return new y(a[1] + Pa('?', a[2] || '', b) + Pa('#', d, c), Ma);
            };
            y.prototype.toString = function () {
                return this.i + '';
            };
            var Oa = function (a) {
                    return a instanceof y && a.constructor === y ? a.i : 'type_error:TrustedResourceUrl';
                }, Ta = function (a, b) {
                    var c = La(a);
                    if (!Ra.test(c))
                        throw Error('Invalid TrustedResourceUrl format: ' + c);
                    a = c.replace(Sa, function (d, e) {
                        if (!Object.prototype.hasOwnProperty.call(b, e))
                            throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
                        d = b[e];
                        return d instanceof Ka ? La(d) : encodeURIComponent(String(d));
                    });
                    return new y(a, Ma);
                }, Sa = /%{(\w+)}/g, Ra = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i, Na = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/, Ua = function (a) {
                    for (var b = '', c = 0; c < a.length; c++)
                        b += La(a[c]);
                    return new y(b, Ma);
                }, Ma = {}, Pa = function (a, b, c) {
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
            var Va = function (a) {
                    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
                }, cb = function (a) {
                    if (!Wa.test(a))
                        return a;
                    -1 != a.indexOf('&') && (a = a.replace(Xa, '&amp;'));
                    -1 != a.indexOf('<') && (a = a.replace(Ya, '&lt;'));
                    -1 != a.indexOf('>') && (a = a.replace(Za, '&gt;'));
                    -1 != a.indexOf('"') && (a = a.replace($a, '&quot;'));
                    -1 != a.indexOf('\'') && (a = a.replace(ab, '&#39;'));
                    -1 != a.indexOf('\0') && (a = a.replace(bb, '&#0;'));
                    return a;
                }, Xa = /&/g, Ya = /</g, Za = />/g, $a = /"/g, ab = /'/g, bb = /\x00/g, Wa = /[\x00&<>"']/, eb = function (a, b) {
                    var c = 0;
                    a = Va(String(a)).split('.');
                    b = Va(String(b)).split('.');
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
                            c = db(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || db(0 == f[2].length, 0 == g[2].length) || db(f[2], g[2]);
                            f = f[3];
                            g = g[3];
                        } while (0 == c);
                    }
                    return c;
                }, db = function (a, b) {
                    return a < b ? -1 : a > b ? 1 : 0;
                };
            var z = function (a, b) {
                this.i = b === fb ? a : '';
            };
            z.prototype.u = !0;
            z.prototype.g = function () {
                return this.i.toString();
            };
            z.prototype.j = !0;
            z.prototype.h = function () {
                return 1;
            };
            z.prototype.toString = function () {
                return this.i.toString();
            };
            var gb = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font\/\w+|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i, hb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i, ib = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i, fb = {}, jb = new z('about:invalid#zClosurez', fb);
            var A;
            a: {
                var kb = w.navigator;
                if (kb) {
                    var lb = kb.userAgent;
                    if (lb) {
                        A = lb;
                        break a;
                    }
                }
                A = '';
            }
            ;
            var B = function (a, b, c) {
                this.i = c === mb ? a : '';
                this.l = b;
            };
            B.prototype.j = !0;
            B.prototype.h = function () {
                return this.l;
            };
            B.prototype.u = !0;
            B.prototype.g = function () {
                return this.i.toString();
            };
            B.prototype.toString = function () {
                return this.i.toString();
            };
            var nb = function (a) {
                    return a instanceof B && a.constructor === B ? a.i : 'type_error:SafeHtml';
                }, ob = function (a) {
                    if (a instanceof B)
                        return a;
                    var b = 'object' == typeof a, c = null;
                    b && a.j && (c = a.h());
                    a = cb(b && a.u ? a.g() : String(a));
                    return new B(a, c, mb);
                }, pb = /^[a-zA-Z0-9-]+$/, qb = {
                    action: !0,
                    cite: !0,
                    data: !0,
                    formaction: !0,
                    href: !0,
                    manifest: !0,
                    poster: !0,
                    src: !0
                }, sb = function (a, b) {
                    var c = { src: a }, d = {};
                    a = {};
                    for (var e in c)
                        Object.prototype.hasOwnProperty.call(c, e) && (a[e] = c[e]);
                    for (e in d)
                        Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
                    if (b)
                        for (e in b)
                            if (Object.prototype.hasOwnProperty.call(b, e)) {
                                var f = e.toLowerCase();
                                if (f in c)
                                    throw Error('');
                                f in d && delete a[f];
                                a[e] = b[e];
                            }
                    b = null;
                    e = '';
                    if (a)
                        for (g in a)
                            if (Object.prototype.hasOwnProperty.call(a, g)) {
                                if (!pb.test(g))
                                    throw Error('');
                                d = a[g];
                                if (null != d) {
                                    c = g;
                                    if (d instanceof Ka)
                                        d = La(d);
                                    else {
                                        if ('style' == c.toLowerCase())
                                            throw Error('');
                                        if (/^on/i.test(c))
                                            throw Error('');
                                        if (c.toLowerCase() in qb)
                                            if (d instanceof y)
                                                d = Oa(d).toString();
                                            else if (d instanceof z)
                                                d = d instanceof z && d.constructor === z ? d.i : 'type_error:SafeUrl';
                                            else if ('string' === typeof d)
                                                d instanceof z || (d = 'object' == typeof d && d.u ? d.g() : String(d), ib.test(d) ? d = new z(d, fb) : (d = String(d), d = d.replace(/(%0A|%0D)/g, ''), d = (f = d.match(hb)) && gb.test(f[1]) ? new z(d, fb) : null)), d = (d || jb).g();
                                            else
                                                throw Error('');
                                    }
                                    d.u && (d = d.g());
                                    c = c + '="' + cb(String(d)) + '"';
                                    e += ' ' + c;
                                }
                            }
                    var g = '<script' + e;
                    e = void 0;
                    null == e ? e = [] : Array.isArray(e) || (e = [e]);
                    !0 === Ha.script ? g += '>' : (b = rb(e), g += '>' + nb(b).toString() + '</script>', b = b.h());
                    (a = a && a.dir) && (/^(ltr|rtl|auto)$/i.test(a) ? b = 0 : b = null);
                    return new B(g, b, mb);
                }, ub = function (a) {
                    var b = ob(tb), c = b.h(), d = [], e = function (f) {
                            Array.isArray(f) ? f.forEach(e) : (f = ob(f), d.push(nb(f).toString()), f = f.h(), 0 == c ? c = f : 0 != f && c != f && (c = null));
                        };
                    a.forEach(e);
                    return new B(d.join(nb(b).toString()), c, mb);
                }, rb = function (a) {
                    return ub(Array.prototype.slice.call(arguments));
                }, mb = {}, tb = new B(w.trustedTypes && w.trustedTypes.emptyHTML || '', 0, mb);
            var vb = function (a, b) {
                    a.write(nb(b));
                }, xb = function () {
                    a: {
                        var a = w.document;
                        if (a.querySelector && (a = a.querySelector('script[nonce]')) && (a = a.nonce || a.getAttribute('nonce')) && wb.test(a))
                            break a;
                        a = '';
                    }
                    return a;
                }, wb = /^[\w+/_-]+[=]{0,2}$/;
            var yb = {}, zb = null, Bb = function (a) {
                    var b;
                    void 0 === b && (b = 0);
                    Ab();
                    b = yb[b];
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
                }, Db = function (a) {
                    var b = [];
                    Cb(a, function (c) {
                        b.push(c);
                    });
                    return b;
                }, Cb = function (a, b) {
                    function c(k) {
                        for (; d < a.length;) {
                            var l = a.charAt(d++), q = zb[l];
                            if (null != q)
                                return q;
                            if (!/^[\s\xa0]*$/.test(l))
                                throw Error('Unknown base64 encoding at char: ' + l);
                        }
                        return k;
                    }
                    Ab();
                    for (var d = 0;;) {
                        var e = c(-1), f = c(0), g = c(64), h = c(64);
                        if (64 === h && -1 === e)
                            break;
                        b(e << 2 | f >> 4);
                        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
                    }
                }, Ab = function () {
                    if (!zb) {
                        zb = {};
                        for (var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''), b = [
                                    '+/=',
                                    '+/',
                                    '-_=',
                                    '-_.',
                                    '-_'
                                ], c = 0; 5 > c; c++) {
                            var d = a.concat(b[c].split(''));
                            yb[c] = d;
                            for (var e = 0; e < d.length; e++) {
                                var f = d[e];
                                void 0 === zb[f] && (zb[f] = e);
                            }
                        }
                    }
                };
            var Eb = 'function' === typeof Uint8Array;
            function Fb(a, b, c) {
                return 'object' === typeof a ? Eb && !Array.isArray(a) && a instanceof Uint8Array ? c(a) : Gb(a, b, c) : b(a);
            }
            function Gb(a, b, c) {
                if (Array.isArray(a)) {
                    for (var d = Array(a.length), e = 0; e < a.length; e++) {
                        var f = a[e];
                        null != f && (d[e] = Fb(f, b, c));
                    }
                    Array.isArray(a) && a.da && Hb(d);
                    return d;
                }
                d = {};
                for (e in a)
                    Object.prototype.hasOwnProperty.call(a, e) && (f = a[e], null != f && (d[e] = Fb(f, b, c)));
                return d;
            }
            function Ib(a) {
                return Gb(a, function (b) {
                    return 'number' === typeof b ? isNaN(b) || Infinity === b || -Infinity === b ? String(b) : b : b;
                }, function (b) {
                    return Bb(b);
                });
            }
            var Jb = {
                    da: {
                        value: !0,
                        configurable: !0
                    }
                }, Hb = function (a) {
                    Array.isArray(a) && !Object.isFrozen(a) && Object.defineProperties(a, Jb);
                    return a;
                };
            var C = function () {
                }, Kb, D = function (a, b, c, d) {
                    a.g = null;
                    Kb && (b || (b = Kb), Kb = null);
                    var e = a.constructor.messageId;
                    b || (b = e ? [e] : []);
                    a.i = e ? 0 : -1;
                    a.h = b;
                    a: {
                        if (b = a.h.length)
                            if (--b, e = a.h[b], !(null === e || 'object' != typeof e || Array.isArray(e) || Eb && e instanceof Uint8Array)) {
                                a.l = b - a.i;
                                a.j = e;
                                break a;
                            }
                        a.l = Number.MAX_VALUE;
                    }
                    a.o = {};
                    if (c)
                        for (b = 0; b < c.length; b++)
                            if (e = c[b], e < a.l) {
                                e += a.i;
                                var f = a.h[e];
                                f ? Hb(f) : a.h[e] = Lb;
                            } else
                                Mb(a), (f = a.j[e]) ? Hb(f) : a.j[e] = Lb;
                    if (d && d.length)
                        for (c = 0; c < d.length; c++)
                            Nb(a, d[c]);
                }, Lb = Object.freeze(Hb([])), Mb = function (a) {
                    var b = a.l + a.i;
                    a.h[b] || (a.j = a.h[b] = {});
                }, F = function (a, b) {
                    if (b < a.l) {
                        b += a.i;
                        var c = a.h[b];
                        return c !== Lb ? c : a.h[b] = Hb([]);
                    }
                    if (a.j)
                        return c = a.j[b], c !== Lb ? c : a.j[b] = Hb([]);
                }, G = function (a, b, c) {
                    a = F(a, b);
                    return null == a ? c : a;
                }, Ob = function (a, b) {
                    var c = void 0 === c ? 0 : c;
                    a = F(a, b);
                    a = null == a ? a : +a;
                    return null == a ? c : a;
                }, H = function (a, b, c) {
                    b < a.l ? a.h[b + a.i] = c : (Mb(a), a.j[b] = c);
                    return a;
                }, Nb = function (a, b) {
                    for (var c, d, e = 0; e < b.length; e++) {
                        var f = b[e], g = F(a, f);
                        null != g && (c = f, d = g, H(a, f, void 0));
                    }
                    return c ? (H(a, c, d), c) : 0;
                }, I = function (a, b, c) {
                    a.g || (a.g = {});
                    if (!a.g[c]) {
                        var d = F(a, c);
                        d && (a.g[c] = new b(d));
                    }
                    return a.g[c];
                }, J = function (a, b, c) {
                    a.g || (a.g = {});
                    if (!a.g[c]) {
                        for (var d = F(a, c), e = [], f = 0; f < d.length; f++)
                            e[f] = new b(d[f]);
                        a.g[c] = e;
                    }
                    b = a.g[c];
                    b == Lb && (b = a.g[c] = []);
                    return b;
                }, Qb = function (a, b, c) {
                    a.g || (a.g = {});
                    c = c || [];
                    for (var d = Hb([]), e = 0; e < c.length; e++)
                        d[e] = Pb(c[e]);
                    a.g[b] = c;
                    H(a, b, d);
                }, Rb = function (a) {
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
                }, Pb = function (a) {
                    Rb(a);
                    return a.h;
                }, Sb = function (a) {
                    Rb(a);
                    return Ib(a.h);
                }, Tb = function (a, b) {
                    switch (typeof b) {
                    case 'number':
                        return isNaN(b) || Infinity === b || -Infinity === b ? String(b) : b;
                    case 'object':
                        if (Eb && null != b && b instanceof Uint8Array)
                            return Bb(b);
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
                }, cc = za(function () {
                    return Array.prototype.some.call([
                        'Google Web Preview',
                        'Mediapartners-Google',
                        'Google-Read-Aloud',
                        'Google-Adwords'
                    ], gc, void 0) || 0.0001 > Math.random();
                }), bc = za(function () {
                    return gc('MSIE');
                }), gc = function (a) {
                    return -1 != A.indexOf(a);
                }, hc = /^(-?[0-9.]{1,30})$/, ic = function (a, b) {
                    return hc.test(a) && (a = Number(a), !isNaN(a)) ? a : void 0 == b ? null : b;
                }, jc = function (a) {
                    return /^true$/.test(a);
                }, kc = za(function () {
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
                };
            var oc = function (a, b) {
                    var c = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=' + b;
                    fc(a, function (d, e) {
                        d && (c += '&' + e + '=' + encodeURIComponent(d));
                    });
                    nc(c);
                }, nc = function (a) {
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
            var pc = 'a'.charCodeAt(), qc = Ga({
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
                }), rc = Ga({
                    qa: 0,
                    ra: 1,
                    pa: 2
                });
            var sc = function (a) {
                    if (/[^01]/.test(a))
                        throw Error('Input bitstring ' + a + ' is malformed!');
                    this.h = a;
                    this.g = 0;
                }, vc = function (a) {
                    var b = K(a, 16);
                    return !0 === !!K(a, 1) ? (a = tc(a), a.forEach(function (c) {
                        if (c > b)
                            throw Error('ID ' + c + ' is past MaxVendorId ' + b + '!');
                    }), a) : uc(a, b);
                }, tc = function (a) {
                    for (var b = K(a, 12), c = []; b--;) {
                        var d = !0 === !!K(a, 1), e = K(a, 16);
                        if (d)
                            for (d = K(a, 16); e <= d; e++)
                                c.push(e);
                        else
                            c.push(e);
                    }
                    c.sort(function (f, g) {
                        return f - g;
                    });
                    return c;
                }, uc = function (a, b, c) {
                    for (var d = [], e = 0; e < b; e++)
                        if (K(a, 1)) {
                            var f = e + 1;
                            if (c && -1 === c.indexOf(f))
                                throw Error('ID: ' + f + ' is outside of allowed values!');
                            d.push(f);
                        }
                    return d;
                }, K = function (a, b) {
                    if (a.g + b > a.h.length)
                        throw Error('Requested length ' + b + ' is past end of string.');
                    var c = a.h.substring(a.g, a.g + b);
                    a.g += b;
                    return parseInt(c, 2);
                };
            var xc = function (a, b) {
                    try {
                        var c = Db(a.split('.')[0]).map(function (e) {
                                return n(e.toString(2), 'padStart').call(e.toString(2), 8, '0');
                            }).join(''), d = new sc(c);
                        c = {};
                        c.tcString = a;
                        c.gdprApplies = !0;
                        d.g += 78;
                        c.cmpId = K(d, 12);
                        c.cmpVersion = K(d, 12);
                        d.g += 30;
                        c.tcfPolicyVersion = K(d, 6);
                        c.isServiceSpecific = !!K(d, 1);
                        c.useNonStandardStacks = !!K(d, 1);
                        c.specialFeatureOptins = wc(uc(d, 12, rc), rc);
                        c.purpose = {
                            consents: wc(uc(d, 24, qc), qc),
                            legitimateInterests: wc(uc(d, 24, qc), qc)
                        };
                        c.purposeOneTreatment = !!K(d, 1);
                        c.publisherCC = String.fromCharCode(pc + K(d, 6)) + String.fromCharCode(pc + K(d, 6));
                        c.vendor = {
                            consents: wc(vc(d), b),
                            legitimateInterests: wc(vc(d), b)
                        };
                        return c;
                    } catch (e) {
                        return null;
                    }
                }, wc = function (a, b) {
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
            var L = function (a, b) {
                    this.g = a;
                    this.defaultValue = void 0 === b ? !1 : b;
                }, yc = function (a, b) {
                    this.g = a;
                    this.defaultValue = void 0 === b ? 0 : b;
                };
            var zc = new L(374201268, !0), Ac = new L(530, !0), Bc = new L(378896074), Cc = new function (a, b) {
                    this.g = a;
                    this.defaultValue = void 0 === b ? '' : b;
                }(531), Dc = new yc(532), Ec = new L(371364212, !0), Fc = new yc(24), Gc = new L(203), Hc = new L(241), Ic = new yc(1929, 50), Jc = new yc(1905), Kc = new L(240), Lc = new L(1928), Mc = new L(1941), Nc = new L(370946349), Oc = new L(374326588), Pc = new L(379841917), Qc = new L(377105258), Rc = new yc(1935), Sc = new L(1942);
            var Uc = function (a) {
                D(this, a, Tc, null);
            };
            u(Uc, C);
            var Tc = [6];
            var Vc = function (a) {
                D(this, a, null, null);
            };
            u(Vc, C);
            var Wc = function (a) {
                D(this, a, null, null);
            };
            u(Wc, C);
            var Xc = function (a) {
                D(this, a, null, null);
            };
            u(Xc, C);
            var Yc = function (a) {
                this.g = a || { cookie: '' };
            };
            Yc.prototype.set = function (a, b, c) {
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
            Yc.prototype.get = function (a, b) {
                for (var c = a + '=', d = (this.g.cookie || '').split(';'), e = 0, f; e < d.length; e++) {
                    f = Va(d[e]);
                    if (0 == f.lastIndexOf(c, 0))
                        return f.substr(c.length);
                    if (f == a)
                        return '';
                }
                return b;
            };
            var Zc = function (a) {
                    a = (a = new Yc(a).get('FCCDCF', '')) ? a : null;
                    try {
                        if (a) {
                            var b = a ? JSON.parse(a) : null;
                            Kb = b;
                            var c = new Vc(b);
                            Kb = null;
                            var d = c;
                        } else
                            d = null;
                        return d;
                    } catch (e) {
                        return null;
                    }
                }, $c = function (a) {
                    return (a = Zc(a)) ? I(a, Wc, 4) : null;
                };
            var ad = function (a, b, c, d, e, f) {
                    try {
                        var g = a.g, h = a.createElement('SCRIPT');
                        h.async = !0;
                        h.src = Oa(b);
                        Ub(h);
                        g.head.appendChild(h);
                        h.addEventListener('load', function () {
                            e();
                            d && g.head.removeChild(h);
                        });
                        h.addEventListener('error', function () {
                            0 < c ? ad(a, b, c - 1, d, e, f) : (d && g.head.removeChild(h), f());
                        });
                    } catch (k) {
                        f();
                    }
                }, bd = function (a, b, c, d) {
                    ad(a ? new Wb(9 == a.nodeType ? a : a.ownerDocument || a.document) : ya || (ya = new Wb()), b, 0, !1, void 0 === c ? function () {
                    } : c, void 0 === d ? function () {
                    } : d);
                };
            var cd = function (a) {
                    this.g = a;
                    this.h = null;
                }, ed = function (a) {
                    a.__tcfapiPostMessageReady || dd(new cd(a));
                }, dd = function (a) {
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
            var fd = function (a, b) {
                var c = a.document, d = a ? new Wb(9 == a.nodeType ? a : a.ownerDocument || a.document) : ya || (ya = new Wb()), e = function () {
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
            var gd = function (a) {
                    this.g = a;
                    this.h = a.document;
                    this.l = (a = (a = Zc(this.h)) ? I(a, Xc, 5) || null : null) ? F(a, 2) : null;
                    this.j = (a = $c(this.h)) && null != F(a, 1) ? F(a, 1) : null;
                    this.i = (a = $c(this.h)) && null != F(a, 2) ? F(a, 2) : null;
                }, jd = function (a) {
                    a.__uspapi || a.frames.__uspapiLocator || (a = new gd(a), hd(a), id(a));
                }, hd = function (a) {
                    !a.l || a.g.__uspapi || a.g.frames.__uspapiLocator || (a.g.__uspapiManager = 'fc', fd(a.g, '__uspapiLocator'), xa('__uspapi', function (b) {
                        for (var c = [], d = 0; d < arguments.length; ++d)
                            c[d] = arguments[d];
                        return a.A.apply(a, t(c));
                    }));
                };
            gd.prototype.A = function (a, b, c) {
                'function' === typeof c && 'getUSPData' === a && c({
                    version: 1,
                    uspString: this.l
                }, !0);
            };
            var id = function (a) {
                !a.j || a.g.__tcfapi || a.g.frames.__tcfapiLocator || (a.g.__tcfapiManager = 'fc', fd(a.g, '__tcfapiLocator'), a.g.__tcfapiEventListeners = a.g.__tcfapiEventListeners || [], xa('__tcfapi', function (b) {
                    for (var c = [], d = 0; d < arguments.length; ++d)
                        c[d] = arguments[d];
                    return a.o.apply(a, t(c));
                }), ed(a.g));
            };
            gd.prototype.o = function (a, b, c, d) {
                d = void 0 === d ? null : d;
                if ('function' === typeof c)
                    if (b && 2 !== b)
                        c(null, !1);
                    else
                        switch (b = this.g.__tcfapiEventListeners, a) {
                        case 'getTCData':
                            !d || Array.isArray(d) && d.every(function (e) {
                                return 'number' === typeof e;
                            }) ? c(kd(this, d, null), !0) : c(null, !1);
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
                            c(kd(this, null, a - 1), !0);
                            break;
                        case 'removeEventListener':
                            b[d] ? (b[d] = null, c(!0)) : c(!1);
                            break;
                        case 'getInAppTCData':
                        case 'getVendorList':
                            c(null, !1);
                        }
            };
            var kd = function (a, b, c) {
                if (!a.j)
                    return null;
                b = xc(a.j, b);
                b.addtlConsent = null != a.i ? a.i : void 0;
                b.cmpStatus = 'loaded';
                b.eventStatus = 'tcloaded';
                null != c && (b.listenerId = c);
                return b;
            };
            var M = function (a) {
                if (a.I && a.hasOwnProperty('I'))
                    return a.I;
                var b = new a();
                return a.I = b;
            };
            var ld = function () {
                    var a = {};
                    this.g = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.h = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.j = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.l = function (b, c) {
                        return null != a[b] ? a[b] : c;
                    };
                    this.i = function () {
                    };
                }, N = function (a) {
                    return M(ld).g(a.g, a.defaultValue);
                }, md = function (a) {
                    return M(ld).h(a.g, a.defaultValue);
                };
            var nd = function () {
                this.j = this.j;
                this.i = this.i;
            };
            nd.prototype.j = !1;
            nd.prototype.J = function () {
                if (this.i)
                    for (; this.i.length;)
                        this.i.shift()();
            };
            var od = function (a, b) {
                this.g = a;
                this.h = b;
            };
            od.prototype.start = function () {
                try {
                    fd(this.g, 'googlefcPresent'), pd(this);
                } catch (a) {
                }
            };
            var pd = function (a) {
                var b = Ta(x('https://fundingchoicesmessages.google.com/i/%{id}?ers=%{ers}'), {
                    id: a.h,
                    ers: 5
                });
                bd(a.g, b, function () {
                }, function () {
                });
            };
            var qd = null, rd = function () {
                    if (null === qd) {
                        qd = '';
                        try {
                            var a = '';
                            try {
                                a = w.top.location.hash;
                            } catch (c) {
                                a = w.location.hash;
                            }
                            if (a) {
                                var b = a.match(/\bdeid=([\d,]+)/);
                                qd = b ? b[1] : '';
                            }
                        } catch (c) {
                        }
                    }
                    return qd;
                };
            var ud = function (a) {
                D(this, a, sd, td);
            };
            u(ud, C);
            var sd = [
                    2,
                    8
                ], td = [
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
            var vd;
            vd = {
                sa: 0,
                aa: 3,
                ba: 4,
                ca: 5
            };
            var wd = vd.aa, O = vd.ba, P = vd.ca, xd = function (a) {
                    return null != a ? !a : a;
                }, yd = function (a, b) {
                    for (var c = !1, d = 0; d < a.length; d++) {
                        var e = a[d]();
                        if (e === b)
                            return e;
                        null == e && (c = !0);
                    }
                    if (!c)
                        return !b;
                }, Ad = function (a, b) {
                    var c = J(a, ud, 2);
                    if (!c.length)
                        return zd(a, b);
                    a = G(a, 1, 0);
                    if (1 === a)
                        return xd(Ad(c[0], b));
                    c = Ca(c, function (d) {
                        return function () {
                            return Ad(d, b);
                        };
                    });
                    switch (a) {
                    case 2:
                        return yd(c, !1);
                    case 3:
                        return yd(c, !0);
                    }
                }, zd = function (a, b) {
                    var c = Nb(a, td[0]);
                    a: {
                        switch (c) {
                        case wd:
                            var d = G(a, 3, 0);
                            break a;
                        case O:
                            d = G(a, 4, 0);
                            break a;
                        case P:
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
                                case O:
                                    a = Ob(a, 6);
                                    break a;
                                case P:
                                    a = G(a, 7, '');
                                    break a;
                                }
                                a = void 0;
                            }
                        if (null != a) {
                            if (6 === b)
                                return e === a;
                            if (9 === b)
                                return null != e && 0 === eb(String(e), a);
                            if (d)
                                switch (b) {
                                case 7:
                                    return e < a;
                                case 8:
                                    return e > a;
                                case 12:
                                    return 'string' === typeof a && 'string' === typeof e && new RegExp(a).test(e);
                                case 10:
                                    return null != e && -1 === eb(String(e), a);
                                case 11:
                                    return null != e && 1 === eb(String(e), a);
                                }
                        }
                    }
                }, Bd = function (a, b) {
                    return !a || !(!b || !Ad(a, b));
                };
            var Dd = function (a) {
                D(this, a, Cd, null);
            };
            u(Dd, C);
            var Cd = [4];
            var Ed = function (a) {
                D(this, a, null, null);
            };
            u(Ed, C);
            var Q = function (a) {
                D(this, a, Fd, Gd);
            };
            u(Q, C);
            var Fd = [5], Gd = [[
                        1,
                        2,
                        3,
                        6,
                        7
                    ]];
            var R = function () {
                var a = {};
                this.g = (a[wd] = {}, a[O] = {}, a[P] = {}, a);
            };
            var Hd = jc('false');
            var Id = Hd, Jd = function (a, b) {
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
                }, Kd = function (a, b) {
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
                        return Ob(a, 2);
                    case 3:
                        return G(a, 3, '');
                    case 6:
                        return F(a, 4);
                    default:
                        return null;
                    }
                }, Ld = za(function () {
                    if (!Id)
                        return {};
                    try {
                        var a = window.sessionStorage && window.sessionStorage.getItem('GGDFSSK');
                        if (a)
                            return JSON.parse(a);
                    } catch (b) {
                    }
                    return {};
                }), Od = function (a, b, c, d) {
                    d = void 0 === d ? 0 : d;
                    var e = Ld();
                    if (null != e[b])
                        return e[b];
                    b = Md(d)[b];
                    if (!b)
                        return c;
                    b = new Q(b);
                    b = Nd(b);
                    a = Kd(b, a);
                    return null != a ? a : c;
                }, Nd = function (a) {
                    var b = M(R).g;
                    if (b) {
                        var c = Ea(J(a, Ed, 5), function (d) {
                            return Bd(I(d, ud, 1), b);
                        });
                        if (c)
                            return I(c, Dd, 2);
                    }
                    return I(a, Dd, 4);
                }, Pd = function () {
                    this.g = {};
                    this.h = [];
                }, Qd = function (a, b, c) {
                    return !!Od(1, a, void 0 === b ? !1 : b, c);
                }, Rd = function (a, b, c) {
                    b = void 0 === b ? 0 : b;
                    a = Number(Od(2, a, b, c));
                    return isNaN(a) ? b : a;
                }, Sd = function (a, b, c) {
                    return Od(3, a, void 0 === b ? '' : b, c);
                }, Td = function (a, b, c) {
                    b = void 0 === b ? [] : b;
                    return Od(6, a, b, c);
                }, Md = function (a) {
                    return M(Pd).g[a] || (M(Pd).g[a] = {});
                }, Ud = function (a, b) {
                    var c = Md(b);
                    fc(a, function (d, e) {
                        return c[e] = d;
                    });
                }, Vd = function (a, b) {
                    var c = Md(b);
                    Aa(a, function (d) {
                        var e = Nb(d, Gd[0]);
                        (e = Jd(d, e)) && (c[e] = Sb(d));
                    });
                }, Wd = function (a, b) {
                    var c = Md(b);
                    Aa(a, function (d) {
                        var e = new Q(d), f = Nb(e, Gd[0]);
                        (e = Jd(e, f)) && (c[e] || (c[e] = d));
                    });
                }, Xd = function () {
                    return Ca(n(Object, 'keys').call(Object, M(Pd).g), function (a) {
                        return Number(a);
                    });
                }, Yd = function (a) {
                    Fa(M(Pd).h, a) || Ud(Md(4), a);
                };
            var S = function (a) {
                    this.methodName = a;
                }, Zd = new S(1), $d = new S(15), ae = new S(2), be = new S(3), ce = new S(4), de = new S(5), ee = new S(6), fe = new S(7), ge = new S(8), he = new S(9), ie = new S(10), je = new S(11), ke = new S(12), le = new S(13), me = new S(14), T = function (a, b, c) {
                    c.hasOwnProperty(a.methodName) || Object.defineProperty(c, String(a.methodName), { value: b });
                }, U = function (a, b, c) {
                    return b[a.methodName] || c || function () {
                    };
                }, ne = function (a) {
                    T(de, Qd, a);
                    T(ee, Rd, a);
                    T(fe, Sd, a);
                    T(ge, Td, a);
                    T(le, Wd, a);
                    T($d, Yd, a);
                }, oe = function (a) {
                    T(ce, function (b) {
                        M(R).g = b;
                    }, a);
                    T(he, function (b, c) {
                        var d = M(R);
                        d.g[wd][b] || (d.g[wd][b] = c);
                    }, a);
                    T(ie, function (b, c) {
                        var d = M(R);
                        d.g[O][b] || (d.g[O][b] = c);
                    }, a);
                    T(je, function (b, c) {
                        var d = M(R);
                        d.g[P][b] || (d.g[P][b] = c);
                    }, a);
                    T(me, function (b) {
                        for (var c = M(R), d = r([
                                    wd,
                                    O,
                                    P
                                ]), e = d.next(); !e.done; e = d.next())
                            e = e.value, wa(c.g[e], b[e]);
                    }, a);
                }, pe = function (a) {
                    a.hasOwnProperty('init-done') || Object.defineProperty(a, 'init-done', { value: !0 });
                };
            var qe = function () {
                    this.g = function () {
                    };
                    this.h = function () {
                        return [];
                    };
                }, re = function (a, b, c) {
                    a.g = function (d) {
                        U(ae, b, function () {
                            return [];
                        })(d, c);
                    };
                    a.h = function () {
                        return U(be, b, function () {
                            return [];
                        })(c);
                    };
                };
            var se = function (a, b) {
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
                }, te = function () {
                    var a = {};
                    this[wd] = (a[8] = function (b) {
                        try {
                            return null != sa(b);
                        } catch (c) {
                        }
                    }, a[9] = function (b) {
                        try {
                            var c = sa(b);
                        } catch (d) {
                            return;
                        }
                        if (b = 'function' === typeof c)
                            c = c && c.toString && c.toString(), b = 'string' === typeof c && -1 != c.indexOf('[native code]');
                        return b;
                    }, a[10] = function () {
                        return window == window.top;
                    }, a[6] = function (b) {
                        return Fa(M(qe).h(), parseInt(b, 10));
                    }, a[27] = function (b) {
                        b = se(b, 'boolean');
                        return void 0 !== b ? b : void 0;
                    }, a);
                    a = {};
                    this[O] = (a[3] = function () {
                        return kc();
                    }, a[6] = function (b) {
                        b = se(b, 'number');
                        return void 0 !== b ? b : void 0;
                    }, a[11] = function (b) {
                        b = lc(void 0 === b ? '' : b, w);
                        return null == b ? void 0 : b % 1000;
                    }, a);
                    a = {};
                    this[P] = (a[2] = function () {
                        return window.location.href;
                    }, a[3] = function () {
                        try {
                            return window.top.location.hash;
                        } catch (b) {
                            return '';
                        }
                    }, a[4] = function (b) {
                        b = se(b, 'string');
                        return void 0 !== b ? b : void 0;
                    }, a);
                };
            var ue = function () {
                var a = void 0 === a ? w : a;
                return a.ggeac || (a.ggeac = {});
            };
            var we = function (a) {
                D(this, a, ve, null);
            };
            u(we, C);
            we.prototype.getId = function () {
                return G(this, 1, 0);
            };
            we.prototype.B = function () {
                return G(this, 7, 0);
            };
            var ve = [2];
            var ye = function (a) {
                D(this, a, xe, null);
            };
            u(ye, C);
            ye.prototype.B = function () {
                return G(this, 5, 0);
            };
            var xe = [2];
            var Ae = function (a) {
                D(this, a, ze, null);
            };
            u(Ae, C);
            var V = function (a) {
                D(this, a, Be, null);
            };
            u(V, C);
            V.prototype.B = function () {
                return G(this, 1, 0);
            };
            var ze = [
                    1,
                    4,
                    2,
                    3
                ], Be = [2];
            var Ce = [
                    12,
                    13,
                    20
                ], De = function () {
                }, Ee = function (a, b, c, d) {
                    d = void 0 === d ? {} : d;
                    var e = void 0 === d.Y ? !1 : d.Y, f = void 0 === d.Z ? {} : d.Z;
                    d = void 0 === d.$ ? [] : d.$;
                    a.j = b;
                    a.l = {};
                    a.o = e;
                    a.i = f;
                    b = {};
                    a.g = (b[c] = [], b[4] = [], b);
                    a.h = {};
                    (c = rd()) && Aa(c.split(',') || [], function (g) {
                        (g = parseInt(g, 10)) && (a.h[g] = !0);
                    });
                    Aa(d, function (g) {
                        a.h[g] = !0;
                    });
                    return a;
                }, Fe = function (a, b, c) {
                    if (a.l[b])
                        return 0.001 >= Math.random() && oc({
                            b: c,
                            dp: b
                        }, 'tagging_dupdiv'), !0;
                    a.l[b] = !0;
                    return !1;
                }, Je = function (a, b, c) {
                    var d = [], e = Ge(a.j, b);
                    if (9 !== b && Fe(a, b, c) || !e.length)
                        return d;
                    var f = Fa(Ce, b);
                    Aa(e, function (g) {
                        if (g = He(a, g, c)) {
                            var h = g.getId();
                            d.push(h);
                            Ie(a, h, f ? 4 : c);
                            var k = J(g, Q, 2);
                            k && (f ? Aa(Xd(), function (l) {
                                return Vd(k, l);
                            }) : Vd(k, c));
                        }
                    });
                    return d;
                }, Ie = function (a, b, c) {
                    a.g[c] || (a.g[c] = []);
                    a = a.g[c];
                    Fa(a, b) ? oc({
                        eids: JSON.stringify(a),
                        dup: b
                    }, 'gpt_dupeid') : a.push(b);
                }, Ke = function (a, b) {
                    a.j.push.apply(a.j, t(Ba(Ca(b, function (c) {
                        return new V(c);
                    }), function (c) {
                        return !Fa(Ce, c.B());
                    })));
                }, He = function (a, b, c) {
                    var d = M(R).g;
                    if (!Bd(I(b, ud, 3), d))
                        return null;
                    var e = J(b, we, 2), f = e.length * G(b, 1, 0), g = G(b, 6, 0);
                    if (g) {
                        f = d[O];
                        switch (c) {
                        case 2:
                            var h = f[8];
                            break;
                        case 1:
                            h = f[7];
                        }
                        c = void 0;
                        if (h)
                            try {
                                c = h(g);
                            } catch (k) {
                            }
                        return (b = Le(b, c)) ? Me(a, [b], 1) : null;
                    }
                    if (g = G(b, 10, 0)) {
                        f = null;
                        switch (c) {
                        case 1:
                            f = d[O][9];
                            break;
                        case 2:
                            f = d[O][10];
                            break;
                        default:
                            return null;
                        }
                        c = f ? f(String(g)) : void 0;
                        return void 0 === c && 1 === G(b, 11, 0) ? null : (b = Le(b, c)) ? Me(a, [b], 1) : null;
                    }
                    c = d ? Ba(e, function (k) {
                        return Bd(I(k, ud, 3), d);
                    }) : e;
                    return c.length ? (b = G(b, 4, 0)) ? Ne(a, b, f, c) : Me(a, c, f / 1000) : null;
                }, Ne = function (a, b, c, d) {
                    var e = null != a.i[b] ? a.i[b] : 1000;
                    if (0 >= e)
                        return null;
                    d = Me(a, d, c / e);
                    a.i[b] = d ? 0 : e - c;
                    return d;
                }, Me = function (a, b, c) {
                    var d = a.h, e = Da(b, function (f) {
                            return !!d[f.getId()];
                        });
                    return e ? e : a.o ? null : ec(b, c);
                }, Oe = function (a, b) {
                    T(Zd, function (c) {
                        a.h[c] = !0;
                    }, b);
                    T(ae, function (c, d) {
                        return Je(a, c, d);
                    }, b);
                    T(be, function (c) {
                        return (a.g[c] || []).concat(a.g[4]);
                    }, b);
                    T(ke, function (c) {
                        return Ke(a, c);
                    }, b);
                }, Ge = function (a, b) {
                    return (a = Da(a, function (c) {
                        return c.B() == b;
                    })) && J(a, ye, 2) || [];
                }, Le = function (a, b) {
                    var c = J(a, we, 2), d = c.length, e = G(a, 1, 0);
                    a = G(a, 8, 0);
                    b = void 0 !== b ? b : Math.floor(1000 * dc(window));
                    var f = (b - a) % d;
                    if (b < a || b - a - f >= d * e - 1)
                        return null;
                    c = c[f];
                    d = M(R).g;
                    return !c || d && !Bd(I(c, ud, 3), d) ? null : c;
                };
            var Pe = function () {
                    this.g = function () {
                    };
                }, Qe = function (a) {
                    M(Pe).g(a);
                };
            var Te = function (a) {
                    var b = M(Re), c = {
                            Y: M(W)[211],
                            Z: M(W)[227],
                            $: M(W)[226]
                        }, d = void 0, e = 2;
                    d = void 0 === d ? ue() : d;
                    e = void 0 === e ? 0 : e;
                    d.hasOwnProperty('init-done') ? (U(ke, d)(Ca(J(a, V, 2), function (f) {
                        return Sb(f);
                    })), U(le, d)(Ca(J(a, Q, 1), function (f) {
                        return Sb(f);
                    }), e), b && U(me, d)(b), Se(d, e)) : (Oe(Ee(M(De), J(a, V, 2), e, c), d), ne(d), oe(d), pe(d), Se(d, e), Vd(J(a, Q, 1), e), Id = Id || !(!c || !c.ta), Qe(M(te)), b && Qe(b));
                }, Se = function (a, b) {
                    a = void 0 === a ? ue() : a;
                    b = void 0 === b ? 0 : b;
                    var c = a, d = b;
                    d = void 0 === d ? 0 : d;
                    re(M(qe), c, d);
                    Ue(a, b);
                    M(Pe).g = U(me, a);
                    M(ld).i();
                }, Ue = function (a, b) {
                    b = void 0 === b ? 0 : b;
                    var c = M(ld);
                    c.g = function (d, e) {
                        return U(de, a, function () {
                            return !1;
                        })(d, e, b);
                    };
                    c.h = function (d, e) {
                        return U(ee, a, function () {
                            return 0;
                        })(d, e, b);
                    };
                    c.j = function (d, e) {
                        return U(fe, a, function () {
                            return '';
                        })(d, e, b);
                    };
                    c.l = function (d, e) {
                        return U(ge, a, function () {
                            return [];
                        })(d, e, b);
                    };
                    c.i = function () {
                        U($d, a)(b);
                    };
                };
            var Ve = [
                'AwfG8hAcHnPa/kJ1Co0EvG/K0F9l1s2JZGiDLt2mhC3QI5Fh4qmsmSwrWObZFbRC9ieDaSLU6lHRxhGUF/i9sgoAAACBeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiSW50ZXJlc3RDb2hvcnRBUEkiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                'AwQ7dCmHkvR6FuOFxAuNnktYSQrGbL4dF+eBkrwNLALc69Wr//PnO1yzns3pjUoCaYbKHtVcnng2hU+8OUm0PAYAAACHeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiSW50ZXJlc3RDb2hvcnRBUEkiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                'AysVDPGQTLD/Scn78x4mLwB1tMfje5jwUpAAzGRpWsr1NzoN7MTFhT3ClmImi2svDZA7V6nWGIV8YTPsSRTe0wYAAACHeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiSW50ZXJlc3RDb2hvcnRBUEkiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9'
            ];
            function We(a) {
                a = void 0 === a ? window.document : a;
                mc(Ve, a);
            }
            ;
            var Xe = function (a) {
                a = void 0 === a ? w : a;
                return (a = a.performance) && a.now ? a.now() : null;
            };
            var Ye = w.performance, Ze = !!(Ye && Ye.mark && Ye.measure && Ye.clearMarks), $e = za(function () {
                    var a;
                    if (a = Ze)
                        a = rd(), a = !!a.indexOf && 0 <= a.indexOf('1337');
                    return a;
                });
            var af = function (a, b, c) {
                    this.g = void 0 === a ? null : a;
                    this.i = void 0 === b ? 'jserror' : b;
                    this.h = null;
                    this.j = void 0 === c ? 0.01 : c;
                    this.o = this.l;
                }, bf = function (a, b) {
                    a.h = b;
                };
            af.prototype.l = function (a, b, c, d, e) {
                c = void 0 === c ? this.j : c;
                e = void 0 === e ? this.i : e;
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
                w.error_rep_loaded || (b = w.document, a = b.createElement('script'), a.src = Oa(new y(w.location.protocol + '//pagead2.googlesyndication.com/pagead/js/err_rep.js', Ma)), Ub(a), (b = b.getElementsByTagName('script')[0]) && b.parentNode && b.parentNode.insertBefore(a, b), w.error_rep_loaded = !0);
                return !1;
            };
            var cf = function (a, b) {
                try {
                    var c = a.g && a.g.start('420', 3);
                    b();
                    a.g && c && a.g.end(c);
                } catch (d) {
                    if (a.g && c && (b = c) && Ye && $e() && (Ye.clearMarks('goog_' + b.label + '_' + b.uniqueId + '_start'), Ye.clearMarks('goog_' + b.label + '_' + b.uniqueId + '_end')), !a.o(420, d, a.j, void 0, a.i))
                        throw d;
                }
            };
            var df = [
                'A3HucHUo1oW9s+9kIKz8mLkbcmdaj5lxt3eiIMp1Nh49dkkBlg1Fhg4Fd/r0vL69mRRA36YutI9P/lJUfL8csQoAAACFeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==',
                'A0OysezhLoCRYomumeYlubLurZTCmsjTb087OvtCy95jNM65cfEsbajrJnhaGwiTxhz38ZZbm+UhUwQuXfVPTg0AAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==',
                'AxoOxdZQmIoA1WeAPDixRAeWDdgs7ZtVFfH2y19ziTgD1iaHE5ZGz2UdSjubkWvob9C5PrjUfkWi4ZSLgWk3Xg8AAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ==',
                'A7+rMYR5onPnACrz+niKSeFdH3xw1IyHo2AZSHmxrofRk9w4HcQPMYcpBUKu6OQ6zsdxf4m/vqa6tG6Na4OLpAQAAAB4eyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1RoaXJkUGFydHkiOnRydWV9'
            ];
            function ef(a) {
                a = void 0 === a ? window.document : a;
                mc(df, a);
            }
            ;
            var ff = x('gpt/pubads_impl_'), gf = x('https://securepubads.g.doubleclick.net/');
            var hf = function (a, b) {
                    var c = Xe(b);
                    c && (a = {
                        label: a,
                        type: 9,
                        value: c
                    }, b = b.google_js_reporting_queue = b.google_js_reporting_queue || [], 2048 > b.length && b.push(a));
                }, jf = function (a, b, c) {
                    var d = window;
                    return function () {
                        var e = Xe(), f = 3;
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
                                duration: (Xe() || 0) - e,
                                type: f
                            }, f = d.google_js_reporting_queue = d.google_js_reporting_queue || [], 2048 > f.length && f.push(e));
                        }
                        return g;
                    };
                }, kf = function (a, b) {
                    return jf(a, b, function (c, d) {
                        new af().l(c, d);
                    });
                };
            function X(a, b) {
                return null == b ? '&' + a + '=null' : '&' + a + '=' + Math.floor(b);
            }
            function lf(a, b) {
                return '&' + a + '=' + b.toFixed(3);
            }
            function mf() {
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
            function nf(a) {
                a = a.id;
                return null != a && (mf().has(a) || n(a, 'startsWith').call(a, 'google_ads_iframe_') || n(a, 'startsWith').call(a, 'aswift'));
            }
            function of(a, b, c) {
                if (!a.sources)
                    return !1;
                var d = md(Ic);
                switch (pf(a)) {
                case 2:
                    var e = qf(a);
                    if (e)
                        return c.some(function (g) {
                            return rf(e, g, d);
                        });
                case 1:
                    var f = sf(a);
                    if (f)
                        return b.some(function (g) {
                            return rf(f, g, d);
                        });
                }
                return !1;
            }
            function pf(a) {
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
            function sf(a) {
                return tf(a, function (b) {
                    return b.currentRect;
                });
            }
            function qf(a) {
                return tf(a, function (b) {
                    return b.previousRect;
                });
            }
            function tf(a, b) {
                return a.sources.reduce(function (c, d) {
                    d = b(d);
                    return c ? d && 0 !== d.width * d.height ? d.top < c.top ? d : c : c : d;
                }, null);
            }
            var uf = function () {
                nd.call(this);
                this.h = this.g = this.D = this.C = this.A = 0;
                this.U = this.R = Number.NEGATIVE_INFINITY;
                this.M = this.O = this.P = this.S = this.X = this.l = this.W = this.H = 0;
                this.N = !1;
                this.F = this.K = this.o = 0;
                var a = document.querySelector('[data-google-query-id]');
                this.V = a ? a.getAttribute('data-google-query-id') : null;
                this.G = null;
                this.T = !1;
                this.L = function () {
                };
            };
            u(uf, nd);
            var xf = function () {
                    var a = new uf();
                    if (N(Gc) && !window.google_plmetrics && window.PerformanceObserver) {
                        window.google_plmetrics = !0;
                        for (var b = r([
                                    'layout-shift',
                                    'largest-contentful-paint',
                                    'first-input',
                                    'longtask'
                                ]), c = b.next(); !c.done; c = b.next())
                            c = c.value, vf(a).observe({
                                type: c,
                                buffered: !N(Kc)
                            });
                        wf(a);
                    }
                }, vf = function (a) {
                    a.G || (a.G = new PerformanceObserver(kf(640, function (b) {
                        var c = yf !== window.scrollX || zf !== window.scrollY ? [] : Af, d = Bf();
                        b = r(b.getEntries());
                        for (var e = b.next(); !e.done; e = b.next())
                            switch (e = e.value, e.entryType) {
                            case 'layout-shift':
                                var f = a;
                                if (!e.hadRecentInput && (!N(Hc) || 0.01 < e.value)) {
                                    f.A += Number(e.value);
                                    Number(e.value) > f.C && (f.C = Number(e.value));
                                    f.D += 1;
                                    var g = of(e, c, d);
                                    g && (f.l += e.value, f.S++);
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
                                e = Math.max(0, e.duration - 50), a.o += e, a.K = Math.max(a.K, e), a.F += 1;
                            }
                    })));
                    return a.G;
                }, wf = function (a) {
                    var b = kf(641, function () {
                            var f = document;
                            2 == ({
                                visible: 1,
                                hidden: 2,
                                prerender: 3,
                                preview: 4,
                                unloaded: 5
                            }[f.visibilityState || f.webkitVisibilityState || f.mozVisibilityState || ''] || 0) && Cf(a);
                        }), c = kf(641, function () {
                            return void Cf(a);
                        });
                    document.addEventListener('visibilitychange', b);
                    document.addEventListener('unload', c);
                    var d = md(Jc), e;
                    0 < d && (e = setTimeout(c, 1000 * d));
                    a.L = function () {
                        document.removeEventListener('visibilitychange', b);
                        document.removeEventListener('unload', c);
                        vf(a).disconnect();
                        e && clearTimeout(e);
                    };
                };
            uf.prototype.J = function () {
                nd.prototype.J.call(this);
                this.L();
            };
            var Cf = function (a) {
                    if (!a.T) {
                        a.T = !0;
                        vf(a).takeRecords();
                        var b = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics';
                        window.LayoutShift && (b += lf('cls', a.A), b += lf('mls', a.C), b += X('nls', a.D), window.LayoutShiftAttribution && (b += lf('cas', a.l), b += X('nas', a.S)), b += lf('wls', a.H), b += lf('tls', a.W), window.LayoutShiftAttribution && (b += lf('was', a.X)));
                        window.LargestContentfulPaint && (b += X('lcp', a.P), b += X('lcps', a.O));
                        window.PerformanceEventTiming && a.N && (b += X('fid', a.M));
                        window.PerformanceLongTaskTiming && (b += X('cbt', a.o), b += X('mbt', a.K), b += X('nlt', a.F));
                        for (var c = 0, d = r(document.getElementsByTagName('iframe')), e = d.next(); !e.done; e = d.next())
                            nf(e.value) && c++;
                        b += X('nif', c);
                        c = window.google_unique_id;
                        b += X('ifi', 'number' === typeof c ? c : 0);
                        c = M(qe).h();
                        b += '&eid=' + encodeURIComponent(c.join());
                        b += '&top=' + (w === w.top ? 1 : 0);
                        if (a.V)
                            c = '&qqid=' + encodeURIComponent(a.V);
                        else {
                            if ('number' !== typeof w.goog_pvsid)
                                try {
                                    Object.defineProperty(w, 'goog_pvsid', {
                                        value: Math.floor(Math.random() * Math.pow(2, 52)),
                                        configurable: !1
                                    });
                                } catch (f) {
                                }
                            c = X('pvsid', Number(w.goog_pvsid) || -1);
                        }
                        b += c;
                        window.googletag && (b += '&gpt=1');
                        window.fetch(b, {
                            keepalive: !0,
                            credentials: 'include',
                            redirect: 'follow',
                            method: 'get',
                            mode: 'no-cors'
                        });
                        a.j || (a.j = !0, a.J());
                    }
                }, rf = function (a, b, c) {
                    if (0 === c)
                        return !0;
                    var d = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                    a = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                    return 0 >= d || 0 >= a ? !1 : 100 * d * a / ((b.right - b.left) * (b.bottom - b.top)) >= c;
                }, Bf = function () {
                    var a = [].concat(t(document.getElementsByTagName('iframe'))).filter(nf), b = [].concat(t(mf())).map(function (c) {
                            return document.getElementById(c);
                        }).filter(function (c) {
                            return null !== c;
                        });
                    yf = window.scrollX;
                    zf = window.scrollY;
                    return Af = [].concat(t(a), t(b)).map(function (c) {
                        return c.getBoundingClientRect();
                    });
                }, yf = void 0, zf = void 0, Af = [];
            var Df = function (a) {
                    a = void 0 === a ? window : a;
                    return !a.PeriodicSyncManager;
                }, Ef = {
                    issuerOrigin: 'https://adservice.google.com',
                    issuancePath: '/tt/i',
                    redemptionPath: '/tt/r',
                    shouldRedeemToken: function () {
                        var a = void 0 === a ? window : a;
                        return !Df(a) || N(Sc) ? !0 : !1;
                    },
                    shouldRequestToken: function () {
                        return !1;
                    }
                }, Ff = function () {
                    var a = void 0 === a ? window : a;
                    if (!Df(a) && N(Lc) || Df(a) && N(Mc)) {
                        a = a.navigator.userAgent;
                        var b = /Chrome/.test(a);
                        return /Android/.test(a) && b;
                    }
                    return !1;
                }, Gf = {
                    issuerOrigin: 'https://attestation.android.com',
                    issuancePath: '/att/i',
                    redemptionPath: '/att/r',
                    shouldRedeemToken: function () {
                        return Ff();
                    },
                    shouldRequestToken: function () {
                        return Ff();
                    }
                };
            var Hf = [
                    'A+b/H0b8RPXNaJgaNFpO0YOFuGK6myDQXlwnJB3SwzvNMfcndat4DZYMrP4ClJIzYWo3/yP2S+8FTZ/lpqbPAAEAAABueyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzVGhpcmRQYXJ0eSI6dHJ1ZX0=',
                    'A9ZgbRtm4pU3oZiuNzOsKcC8ppFSZdcjP2qYcdQrFKVzkmiWH1kdYY1Mi9x7G8+PS8HV9Ha9Cz0gaMdKsiVZIgMAAAB7eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                    'AxL6oBxcpn5rQDPKSAs+d0oxNyJYq2/4esBUh3Yx5z8QfcLu+AU8iFCXYRcr/CEEfDnkxxLTsvXPJFQBxHfvkgMAAACBeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                    'A9KPtG5kl3oLTk21xqynDPGQ5t18bSOpwt0w6kGa6dEWbuwjpffmdUpR3W+faZDubGT+KIk2do0BX2ca16x8qAcAAACBeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiVHJ1c3RUb2tlbnMiLCJleHBpcnkiOjE2MjYyMjA3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9',
                    'AookgM0K6zABiuRTZwpn+R95G2CKmUH/2+zf2kS/QpMlVZ6HTI6QekeLkrJyxeIi62p2ejcQTF464pkdlx0Nwg0AAABmeyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGUuY29tOjQ0MyIsImZlYXR1cmUiOiJUcnVzdFRva2VucyIsImV4cGlyeSI6MTYzNDA4MzE5OSwiaXNTdWJkb21haW4iOnRydWV9'
                ], Kf = function (a, b, c) {
                    a = void 0 === a ? function () {
                    } : a;
                    b = void 0 === b ? null : b;
                    c = void 0 === c ? !1 : c;
                    nd.call(this);
                    If();
                    this.o = b || N(Oc) ? [Gf] : [
                        Ef,
                        Gf
                    ];
                    this.h = c;
                    this.l = a;
                    if (document.hasTrustToken && !N(Nc))
                        if (N(Qc)) {
                            if (!Array.isArray(window.goog_tt_state)) {
                                var d = Jf(this);
                                Object.defineProperty(window, 'goog_tt_state', {
                                    configurable: !1,
                                    get: function () {
                                        return d.slice();
                                    }
                                });
                            }
                        } else
                            this.g = Jf(this);
                };
            u(Kf, nd);
            var If = function () {
                    var a = void 0 === a ? window.document : a;
                    mc(Hf, a);
                }, Jf = function (a) {
                    var b = a.o.map(function (c) {
                        return {
                            issuerOrigin: c.issuerOrigin,
                            state: N(Pc) && !a.h ? 12 : 1
                        };
                    });
                    N(Qc) || a.l(b);
                    return b;
                }, Y = function (a, b, c) {
                    if (N(Qc)) {
                        if (a = n(window.goog_tt_state, 'find').call(window.goog_tt_state, function (e) {
                                return e.issuerOrigin === b;
                            }))
                            a.state = c;
                    } else {
                        var d = n(a.g, 'find').call(a.g, function (e) {
                            return e.issuerOrigin === b;
                        });
                        d && (d.state = c, a.l(a.g));
                    }
                }, Lf = function () {
                    var a = window.goog_tt_state;
                    return Array.isArray(a) && a.some(function (b) {
                        return 1 != b.state;
                    });
                }, Mf = function (a, b) {
                    var c = b.issuerOrigin + b.redemptionPath, d = {
                            keepalive: !0,
                            redirect: 'follow',
                            method: 'get',
                            trustToken: {
                                type: 'token-redemption',
                                issuer: b.issuerOrigin,
                                refreshPolicy: 'none'
                            }
                        };
                    Y(a, b.issuerOrigin, 2);
                    return window.fetch(c, d).then(function (e) {
                        if (!e.ok)
                            throw Error(e.status + ': Network response was not ok!');
                        Y(a, b.issuerOrigin, 6);
                    }).catch(function (e) {
                        e && 'NoModificationAllowedError' === e.name ? Y(a, b.issuerOrigin, 6) : Y(a, b.issuerOrigin, 5);
                    });
                }, Nf = function (a, b, c) {
                    var d = b.issuerOrigin + b.issuancePath;
                    Y(a, b.issuerOrigin, 8);
                    return window.fetch(d, { trustToken: { type: 'token-request' } }).then(function (e) {
                        if (!e.ok)
                            throw Error(e.status + ': Network response was not ok!');
                        Y(a, b.issuerOrigin, 10);
                        if (c)
                            return Mf(a, b);
                    }).catch(function (e) {
                        if (e && 'NoModificationAllowedError' === e.name) {
                            if (Y(a, b.issuerOrigin, 10), c)
                                return Mf(a, b);
                        } else
                            Y(a, b.issuerOrigin, 9);
                    });
                }, Of = function (a) {
                    if (!(!document.hasTrustToken || N(Nc) || N(Pc) && !a.h || N(Qc) && Lf())) {
                        var b = [];
                        a.o.forEach(function (c) {
                            var d = c.shouldRedeemToken(), e = c.shouldRequestToken();
                            if (d || e) {
                                var f = document.hasTrustToken(c.issuerOrigin).then(function (g) {
                                    if (g) {
                                        if (d)
                                            return Mf(a, c);
                                    } else {
                                        if (e)
                                            return Nf(a, c, d);
                                        Y(a, c.issuerOrigin, 3);
                                    }
                                });
                                b.push(f);
                            } else
                                Y(a, c.issuerOrigin, 7);
                        });
                        if (window.Promise && window.Promise.all)
                            return window.Promise.all(b);
                    }
                };
            var Pf = 'platform platformVersion architecture model uaFullVersion bitness'.split(' '), Qf = function (a) {
                    return a.navigator && a.navigator.userAgentData && 'function' === typeof a.navigator.userAgentData.getHighEntropyValues ? a.navigator.userAgentData.getHighEntropyValues(Pf).then(function (b) {
                        var c = new Uc();
                        c = H(c, 1, b.platform);
                        c = H(c, 2, b.platformVersion);
                        c = H(c, 3, b.architecture);
                        c = H(c, 4, b.model);
                        c = H(c, 5, b.uaFullVersion);
                        return H(c, 9, b.bitness);
                    }) : null;
                };
            var Rf = function () {
                    return w.googletag || (w.googletag = {});
                }, Sf = function (a, b) {
                    var c = Rf();
                    c.hasOwnProperty(a) || (c[a] = b);
                }, Tf = function (a, b) {
                    a.addEventListener ? a.addEventListener('load', b, !1) : a.attachEvent && a.attachEvent('onload', b);
                };
            var Z = {
                247: 'https://securepubads.g.doubleclick.net',
                7: 0.02,
                13: 1500,
                23: 0.001,
                38: 0.001,
                58: 1,
                150: '',
                211: !1,
                253: !1,
                172: null,
                245: {},
                180: null,
                246: [],
                227: {},
                226: [],
                248: 0,
                228: '//www.googletagservices.com/pubconsole/',
                261: '//console.googletagservices.com/pubconsole/',
                250: null,
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
            Z[148] = Hd;
            Z[221] = jc('');
            Z[254] = jc('true');
            Z[204] = ic('{{MOD}}', -1);
            Z[257] = jc('false');
            Z[260] = void 0;
            var W = function () {
                    wa(this, Z);
                }, Uf = function (a, b) {
                    M(W)[a] = b;
                }, Vf = Rf(), Wf = M(W);
            wa(Wf, Vf._vars_);
            Vf._vars_ = Wf;
            var Xf = new m.WeakMap(), Yf = function (a, b) {
                    a = [a];
                    for (var c = b.length - 1; 0 <= c; --c)
                        a.push(typeof b[c], b[c]);
                    return a.join('\x0B');
                };
            var Zf = function (a, b) {
                b = void 0 === b ? Yf : b;
                var c = va(a), d = function (e) {
                        e = r(e);
                        e.next();
                        e = ia(e);
                        return b(c, e);
                    };
                return function (e) {
                    for (var f = [], g = 0; g < arguments.length; ++g)
                        f[g] = arguments[g];
                    g = this || w;
                    var h = Xf.get(g);
                    h || (h = {}, Xf.set(g, h));
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
            function $f() {
                return 0 === Zf(M(W)[172]);
            }
            ;
            function ag() {
                return ic('1') || 0;
            }
            function bg() {
                var a = Number('2021070101');
                1 > a || Math.floor(a) !== a ? (oc({ v: '2021070101' }, 'gpt_inv_ver'), a = '1') : a = '2021070101';
                return a;
            }
            ;
            var Re = function () {
                var a = {};
                this[wd] = (a[3] = $f, a[2] = M(W)[36], a[17] = function (b) {
                    for (var c = [], d = 0; d < arguments.length; ++d)
                        c[d] = arguments[d];
                    return n(c, 'includes').call(c, String(lc()));
                }, a[21] = function () {
                    return M(W)[148];
                }, a[50] = function () {
                    return 1 === Math.floor(new Date().getTime() / 24 / 60 / 60 / 1000) % 2;
                }, a[54] = function () {
                    return M(W)[259];
                }, a);
                a = {};
                this[O] = (a[1] = function () {
                    return M(W)[204];
                }, a[4] = ag, a);
                this[P] = {};
            };
            var cg = [], dg = function (a) {
                    var b = new Ae(M(W)[246]);
                    a = new Ae(a || cg);
                    if (!J(b, Q, 1).length && J(a, Q, 1).length) {
                        var c = J(a, Q, 1);
                        Qb(b, 1, c);
                    }
                    !J(b, V, 2).length && J(a, V, 2).length && (a = J(a, V, 2), Qb(b, 2, a));
                    Te(b);
                };
            var eg = function (a) {
                    if (a = a.scripts)
                        for (var b = 0; b < a.length; b++) {
                            var c = a[b];
                            if (-1 < c.src.indexOf('/tag/js/gpt'))
                                return c;
                        }
                    return null;
                }, fg, gg, hg = function (a) {
                    a = (null != (gg = null == (fg = a) ? void 0 : fg.src) ? gg : '').match(Yb)[3] || null;
                    return 'pagead2.googlesyndication.com' === Zb(a);
                }, ig = function (a) {
                    var b = a.currentScript;
                    return 'complete' === a.readyState || 'loaded' === a.readyState || !(null == b || !b.async);
                }, jg = function (a) {
                    a = hg(a) ? x('https://pagead2.googlesyndication.com/') : gf;
                    a = Ua([
                        a,
                        ff,
                        x('2021070101'),
                        x('.js')
                    ]);
                    var b = md(Fc);
                    return b ? Qa(a, String(b)) : a;
                }, kg = function () {
                    this.j = [];
                    this.h = this.g = void 0;
                }, lg = function (a, b, c) {
                    a.g = b;
                    a.h = c;
                    for (var d = r(a.j), e = d.next(); !e.done; e = d.next())
                        e = e.value, e(b, c);
                    a.j.length = 0;
                }, mg = function (a, b, c) {
                    var d = a.location.host;
                    if (N(Ec)) {
                        var e = b && ac(b.src, 'domain'), f = b && ac(b.src, 'network-code');
                        if (!d && !e && !f)
                            return lg(c, void 0, new a.Error('no provided or inferred data')), null;
                        a = hg(b) ? x('https://pagead2.googlesyndication.com') : x('https://securepubads.g.doubleclick.net');
                        return Qa(Ua([
                            a,
                            x('/pagead/ppub_config')
                        ]), {
                            ippd: d,
                            pppd: e,
                            pppnc: f
                        });
                    }
                    d = hg(b) ? x('https://pagead2.googlesyndication.com/pagead/managed/js/config_%{sz}__%{ttl}.json') : x('https://securepubads.g.doubleclick.net/pagead/managed/js/config_%{sz}__%{ttl}.json');
                    e = {
                        sz: M(ld).j(Cc.g, Cc.defaultValue),
                        ttl: md(Dc)
                    };
                    a = { domain: a.location.host };
                    return Qa(Ta(d, e), a, void 0);
                }, ng = function (a, b) {
                    const $___old_5b6c6c2e2592b2b4 = {}.constructor.getOwnPropertyDescriptor(window, 'XMLHttpRequest');
                    try {
                        if ($___old_5b6c6c2e2592b2b4)
                            ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___mock_5de28d8956bfc0f9.XMLHttpRequest));
                        return function () {
                            var c = new a.XMLHttpRequest(), d = new kg();
                            b = mg(a, b, d);
                            Uf(260, function (e) {
                                void 0 !== d.g || d.h ? e(d.g, d.h) : d.j.push(e);
                            });
                            b && (c.open('GET', b.toString(), !0), c.withCredentials = !1, c.onload = function () {
                                300 > c.status ? (hf('13', a), lg(d, 204 == c.status ? '' : c.responseText)) : lg(d, void 0, new a.Error('resp:' + c.status));
                            }, c.onerror = function () {
                                return lg(d, void 0, new a.Error('s:' + c.status + ' rs:' + c.readyState));
                            }, c.send());
                        }.apply(this, arguments);
                    } finally {
                        if ($___old_5b6c6c2e2592b2b4)
                            ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___old_5b6c6c2e2592b2b4));
                    }
                }, og = function (a, b, c, d) {
                    Uf(172, d);
                    Uf(259, ig(a));
                    new dg(b);
                    M(qe).g(12);
                    M(qe).g(5);
                    N(Pc) || (a = N(Qc) ? new Kf() : new Kf(function (e) {
                        Uf(250, e);
                    }), 0 < md(Rc) ? Uf(258, Of(a)) : Of(a));
                    (a = Qf(c)) && a.then(function (e) {
                        return Uf(251, JSON.stringify(e.h && Pb(e), Tb));
                    });
                    ef(c.document);
                    We(c.document);
                    N(zc) || (a = '', d && d.hasAttribute('data-load-fc') && (a = ac(d.src, 'network-code')) && new od(c, a).start());
                }, pg = function (a, b, c) {
                    var d = Rf();
                    a = a || d.fifWin || window;
                    b = b || a.document;
                    var e = d.fifWin ? window : a;
                    Sf('_loaded_', !0);
                    Sf('getVersion', bg);
                    Sf('cmd', []);
                    var f = b.currentScript || eg(b);
                    og(b, c, a, f);
                    try {
                        xf();
                    } catch (l) {
                    }
                    hf('1', a);
                    a = jg(f);
                    if (!M(W)[259]) {
                        c = 'gpt-impl-' + Math.random();
                        try {
                            vb(b, sb(a, {
                                id: c,
                                nonce: xb()
                            }));
                        } catch (l) {
                        }
                        b.getElementById(c) && (d._loadStarted_ = !0);
                    }
                    if (!d._loadStarted_) {
                        c = d.fifWin ? e.document : b;
                        var g = c.createElement('script');
                        g.src = Oa(a);
                        Ub(g);
                        g.async = !0;
                        var h = c.head || c.body || c.documentElement;
                        'complete' !== e.document.readyState && d.fifWin ? Tf(e, function () {
                            return void h.appendChild(g);
                        }) : h.appendChild(g);
                        d._loadStarted_ = !0;
                    }
                    var k;
                    N(Ac) && e === e.top && (M(W)[259] || !b.currentScript && (null == (k = eg(b)) ? 0 : k.async)) && (N(Bc) && jd(e), ng(e, f));
                };
            var qg;
            a: {
                try {
                    if (Array.isArray(E)) {
                        qg = E;
                        break a;
                    }
                } catch (a) {
                }
                qg = [];
            }
            (function (a, b, c) {
                var d = new af(null, 'gpt_exception', 0.01);
                bf(d, function (e) {
                    e.methodId = 420;
                });
                cf(d, function () {
                    return pg(a, b, c);
                });
            }(void 0, void 0, qg));
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
                    494,
                    null,
                    [
                        null,
                        5000
                    ]
                ],
                [
                    375971837,
                    null,
                    null,
                    [1]
                ],
                [
                    372611448,
                    null,
                    null,
                    [1]
                ],
                [
                    377558073,
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
                    370723759,
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
                    364295992,
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
                    446,
                    null,
                    null,
                    [1]
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
                    373810106,
                    null,
                    null,
                    [1]
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
                        -1
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
                    1931,
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
                    null,
                    null,
                    null,
                    [
                        null,
                        null,
                        null,
                        [
                            'facebook[.]com',
                            'whatsapp[.]com',
                            'youtube[.]com',
                            'google[.]com',
                            '\\/ads?\\/'
                        ]
                    ],
                    null,
                    9
                ]
            ],
            [
                [
                    13,
                    [
                        [
                            50,
                            [
                                [31061420],
                                [
                                    31061421,
                                    [[
                                            377914450,
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
                ],
                [
                    20,
                    [[
                            1,
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
                    [
                        [
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
                        ],
                        [
                            null,
                            [
                                [
                                    31061322,
                                    [[
                                            497,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ],
                                [
                                    31061733,
                                    [[
                                            497,
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
                            1000,
                            [[21067497]],
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
                            10,
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
                            10,
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
                            null,
                            [
                                [31060735],
                                [
                                    31060736,
                                    [[
                                            521,
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
                            10,
                            [
                                [31060976],
                                [
                                    31060977,
                                    [[
                                            371390390,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
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
                            300,
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
                            50,
                            [
                                [31061414],
                                [
                                    31061415,
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
                            50,
                            [
                                [31061498],
                                [
                                    31061499,
                                    [[
                                            373056377,
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
                                [31061701],
                                [
                                    31061702,
                                    [
                                        [
                                            440,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            378410763,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
                                ]
                            ]
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
                            100,
                            [
                                [31061649],
                                [
                                    31061650,
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
                            10,
                            [
                                [31061736],
                                [
                                    31061737,
                                    [[
                                            null,
                                            377289019,
                                            null,
                                            [
                                                null,
                                                10000
                                            ]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            100,
                            [
                                [31061738],
                                [
                                    31061739,
                                    [[
                                            373821891,
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
                                    31061756,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31061756
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31061756
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
                                    31061757,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31061757
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31061757
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
                            10,
                            [
                                [31061758],
                                [
                                    31061759,
                                    [[
                                            381277148,
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
                                    31061764,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31061764
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31061764
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
                                    31061765,
                                    [
                                        [
                                            null,
                                            24,
                                            null,
                                            [
                                                null,
                                                31061765
                                            ]
                                        ],
                                        [
                                            null,
                                            25,
                                            null,
                                            [
                                                null,
                                                31061765
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
                            50,
                            [
                                [31061716],
                                [
                                    31061717,
                                    [[
                                            374665379,
                                            null,
                                            null,
                                            []
                                        ]]
                                ]
                            ],
                            null,
                            null,
                            null,
                            null,
                            null,
                            101,
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
                    [[
                            50,
                            [
                                [31061395],
                                [
                                    31061396,
                                    [
                                        [
                                            363658173,
                                            null,
                                            null,
                                            [1]
                                        ],
                                        [
                                            501,
                                            null,
                                            null,
                                            [1]
                                        ]
                                    ]
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
                                        'Chrome/(9\\d|\\d{3,})',
                                        ['navigator.userAgent']
                                    ]
                                ]
                            ]
                        ]]
                ],
                [
                    12,
                    [
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
                            50,
                            [
                                [31061217],
                                [
                                    31061218,
                                    [[
                                            374326588,
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
                                [31061382],
                                [
                                    31061383,
                                    [[
                                            377105258,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ]
                            ]
                        ],
                        [
                            1,
                            [
                                [31061487],
                                [
                                    31061488,
                                    [[
                                            379841917,
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
                                [31061661],
                                [
                                    31061662,
                                    [[
                                            377431981,
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
                            50,
                            [[44740386]]
                        ],
                        [
                            10,
                            [
                                [
                                    44743203,
                                    [[
                                            1940,
                                            null,
                                            null,
                                            [1]
                                        ]]
                                ],
                                [
                                    44743204,
                                    [[
                                            1940,
                                            null,
                                            null,
                                            []
                                        ]]
                                ],
                                [44744170]
                            ]
                        ]
                    ]
                ]
            ]
        ]));
    }())
}