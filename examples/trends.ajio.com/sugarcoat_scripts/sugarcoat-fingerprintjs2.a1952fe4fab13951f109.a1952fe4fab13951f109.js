{
    const $___mock_19fe278673006086 = {};
    (exports => {
        'use strict';
        let isSealed = false;
        class Storage {
            constructor() {
                if (isSealed) {
                    throw new TypeError('Illegal constructor');
                }
            }
            get length() {
                return Object.keys(this).length;
            }
            key(index) {
                const keys = Object.keys(this);
                if (index < 0 || index >= keys.length) {
                    return null;
                }
                return keys[index];
            }
            getItem(key) {
                return Object.prototype.hasOwnProperty.call(this, key) ? this[key] : null;
            }
            setItem(key, value) {
                this[key] = String(value);
            }
            removeItem(key) {
                delete this[key];
            }
            clear() {
                const keys = Object.keys(this);
                for (const key of keys) {
                    delete this[key];
                }
            }
        }
        exports.Storage = {
            configurable: true,
            enumerable: true,
            value: Storage,
            writable: true
        };
        const localStorage = new Storage();
        exports.localStorage = {
            configurable: true,
            enumerable: true,
            get() {
                return localStorage;
            }
        };
        const sessionStorage = new Storage();
        exports.sessionStorage = {
            configurable: true,
            enumerable: true,
            get() {
                return sessionStorage;
            }
        };
        isSealed = true;
    })($___mock_19fe278673006086);
    (function () {
        (window.webpackJsonp = window.webpackJsonp || []).push([
            [124],
            {
                '3AcF': function (e, t, n) {
                    !function (t, n, i) {
                        'use strict';
                        'function' == typeof window.define && window.define.amd ? window.define(i) : e.exports ? e.exports = i() : n.exports ? n.exports = i() : n.Fingerprint2 = i();
                    }(0, this, function () {
                        'use strict';
                        var e = function (t) {
                            if (!(this instanceof e))
                                return new e(t);
                            this.options = this.extend(t, {
                                swfContainerId: 'fingerprintjs2',
                                swfPath: 'flash/compiled/FontList.swf',
                                detectScreenOrientation: !0,
                                sortPluginsFor: [/palemoon/i],
                                userDefinedFonts: [],
                                excludeDoNotTrack: !0,
                                excludePixelRatio: !0
                            }), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map;
                        };
                        return e.prototype = {
                            extend: function (e, t) {
                                if (null == e)
                                    return t;
                                for (var n in e)
                                    null != e[n] && t[n] !== e[n] && (t[n] = e[n]);
                                return t;
                            },
                            get: function (e) {
                                var t = this, n = {
                                        data: [],
                                        addPreprocessedComponent: function (e) {
                                            var i = e.value;
                                            'function' == typeof t.options.preprocessor && (i = t.options.preprocessor(e.key, i)), n.data.push({
                                                key: e.key,
                                                value: i
                                            });
                                        }
                                    };
                                n = this.userAgentKey(n), n = this.languageKey(n), n = this.colorDepthKey(n), n = this.deviceMemoryKey(n), n = this.pixelRatioKey(n), n = this.hardwareConcurrencyKey(n), n = this.screenResolutionKey(n), n = this.availableScreenResolutionKey(n), n = this.timezoneOffsetKey(n), n = this.sessionStorageKey(n), n = this.localStorageKey(n), n = this.indexedDbKey(n), n = this.addBehaviorKey(n), n = this.openDatabaseKey(n), n = this.cpuClassKey(n), n = this.platformKey(n), n = this.doNotTrackKey(n), n = this.pluginsKey(n), n = this.canvasKey(n), n = this.webglKey(n), n = this.webglVendorAndRendererKey(n), n = this.adBlockKey(n), n = this.hasLiedLanguagesKey(n), n = this.hasLiedResolutionKey(n), n = this.hasLiedOsKey(n), n = this.hasLiedBrowserKey(n), n = this.touchSupportKey(n), n = this.customEntropyFunction(n), this.fontsKey(n, function (n) {
                                    t.audioKey(n, function (n) {
                                        const $___old_8a3f6e2e6036657d = {}.constructor.getOwnPropertyDescriptor(window, 'localStorage');
                                        try {
                                            if ($___old_8a3f6e2e6036657d)
                                                ({}.constructor.defineProperty(window, 'localStorage', $___mock_19fe278673006086.localStorage));
                                            return function () {
                                                var i = [];
                                                t.each(n.data, function (e) {
                                                    var t = e.value;
                                                    t && 'function' == typeof t.join ? i.push(t.join(';')) : i.push(t);
                                                });
                                                var a = t.x64hash128(i.join('~~~'), 31);
                                                return e(a, n.data);
                                            }.apply(this, arguments);
                                        } finally {
                                            if ($___old_8a3f6e2e6036657d)
                                                ({}.constructor.defineProperty(window, 'localStorage', $___old_8a3f6e2e6036657d));
                                        }
                                    });
                                });
                            },
                            audioKey: function (e, t) {
                                if (this.options.excludeAudioFP)
                                    return t(e);
                                var n = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                                if (null == n)
                                    return e.addPreprocessedComponent({
                                        key: 'audio_fp',
                                        value: null
                                    }), t(e);
                                var i = new n(1, 44100, 44100), a = i.createOscillator();
                                a.type = 'triangle', a.frequency.setValueAtTime(10000, i.currentTime);
                                var r = i.createDynamicsCompressor();
                                this.each([
                                    [
                                        'threshold',
                                        -50
                                    ],
                                    [
                                        'knee',
                                        40
                                    ],
                                    [
                                        'ratio',
                                        12
                                    ],
                                    [
                                        'reduction',
                                        -20
                                    ],
                                    [
                                        'attack',
                                        0
                                    ],
                                    [
                                        'release',
                                        0.25
                                    ]
                                ], function (e) {
                                    void 0 !== r[e[0]] && 'function' == typeof r[e[0]].setValueAtTime && r[e[0]].setValueAtTime(e[1], i.currentTime);
                                }), i.oncomplete = function (n) {
                                    var i = n.renderedBuffer.getChannelData(0).slice(4500, 5000).reduce(function (e, t) {
                                        return e + Math.abs(t);
                                    }, 0).toString();
                                    return a.disconnect(), r.disconnect(), e.addPreprocessedComponent({
                                        key: 'audio_fp',
                                        value: i
                                    }), t(e);
                                }, a.connect(r), r.connect(i.destination), a.start(0), i.startRendering();
                            },
                            customEntropyFunction: function (e) {
                                return 'function' == typeof this.options.customFunction && e.addPreprocessedComponent({
                                    key: 'custom',
                                    value: this.options.customFunction()
                                }), e;
                            },
                            userAgentKey: function (e) {
                                return this.options.excludeUserAgent || e.addPreprocessedComponent({
                                    key: 'user_agent',
                                    value: this.getUserAgent()
                                }), e;
                            },
                            getUserAgent: function () {
                                return navigator.userAgent;
                            },
                            languageKey: function (e) {
                                return this.options.excludeLanguage || e.addPreprocessedComponent({
                                    key: 'language',
                                    value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ''
                                }), e;
                            },
                            colorDepthKey: function (e) {
                                return this.options.excludeColorDepth || e.addPreprocessedComponent({
                                    key: 'color_depth',
                                    value: window.screen.colorDepth || -1
                                }), e;
                            },
                            deviceMemoryKey: function (e) {
                                return this.options.excludeDeviceMemory || e.addPreprocessedComponent({
                                    key: 'device_memory',
                                    value: this.getDeviceMemory()
                                }), e;
                            },
                            getDeviceMemory: function () {
                                return navigator.deviceMemory || -1;
                            },
                            pixelRatioKey: function (e) {
                                return this.options.excludePixelRatio || e.addPreprocessedComponent({
                                    key: 'pixel_ratio',
                                    value: this.getPixelRatio()
                                }), e;
                            },
                            getPixelRatio: function () {
                                return window.devicePixelRatio || '';
                            },
                            screenResolutionKey: function (e) {
                                return this.options.excludeScreenResolution ? e : this.getScreenResolution(e);
                            },
                            getScreenResolution: function (e) {
                                var t;
                                return t = this.options.detectScreenOrientation && window.screen.height > window.screen.width ? [
                                    window.screen.height,
                                    window.screen.width
                                ] : [
                                    window.screen.width,
                                    window.screen.height
                                ], e.addPreprocessedComponent({
                                    key: 'resolution',
                                    value: t
                                }), e;
                            },
                            availableScreenResolutionKey: function (e) {
                                return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e);
                            },
                            getAvailableScreenResolution: function (e) {
                                var t;
                                return window.screen.availWidth && window.screen.availHeight && (t = this.options.detectScreenOrientation ? window.screen.availHeight > window.screen.availWidth ? [
                                    window.screen.availHeight,
                                    window.screen.availWidth
                                ] : [
                                    window.screen.availWidth,
                                    window.screen.availHeight
                                ] : [
                                    window.screen.availHeight,
                                    window.screen.availWidth
                                ]), void 0 !== t && e.addPreprocessedComponent({
                                    key: 'available_resolution',
                                    value: t
                                }), e;
                            },
                            timezoneOffsetKey: function (e) {
                                return this.options.excludeTimezoneOffset || e.addPreprocessedComponent({
                                    key: 'timezone_offset',
                                    value: new Date().getTimezoneOffset()
                                }), e;
                            },
                            sessionStorageKey: function (e) {
                                return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.addPreprocessedComponent({
                                    key: 'session_storage',
                                    value: 1
                                }), e;
                            },
                            localStorageKey: function (e) {
                                return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.addPreprocessedComponent({
                                    key: 'local_storage',
                                    value: 1
                                }), e;
                            },
                            indexedDbKey: function (e) {
                                return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.addPreprocessedComponent({
                                    key: 'indexed_db',
                                    value: 1
                                }), e;
                            },
                            addBehaviorKey: function (e) {
                                return !this.options.excludeAddBehavior && document.body && document.body.addBehavior && e.addPreprocessedComponent({
                                    key: 'add_behavior',
                                    value: 1
                                }), e;
                            },
                            openDatabaseKey: function (e) {
                                return !this.options.excludeOpenDatabase && window.openDatabase && e.addPreprocessedComponent({
                                    key: 'open_database',
                                    value: 1
                                }), e;
                            },
                            cpuClassKey: function (e) {
                                return this.options.excludeCpuClass || e.addPreprocessedComponent({
                                    key: 'cpu_class',
                                    value: this.getNavigatorCpuClass()
                                }), e;
                            },
                            platformKey: function (e) {
                                return this.options.excludePlatform || e.addPreprocessedComponent({
                                    key: 'navigator_platform',
                                    value: this.getNavigatorPlatform()
                                }), e;
                            },
                            doNotTrackKey: function (e) {
                                return this.options.excludeDoNotTrack || e.addPreprocessedComponent({
                                    key: 'do_not_track',
                                    value: this.getDoNotTrack()
                                }), e;
                            },
                            canvasKey: function (e) {
                                return !this.options.excludeCanvas && this.isCanvasSupported() && e.addPreprocessedComponent({
                                    key: 'canvas',
                                    value: this.getCanvasFp()
                                }), e;
                            },
                            webglKey: function (e) {
                                return !this.options.excludeWebGL && this.isWebGlSupported() && e.addPreprocessedComponent({
                                    key: 'webgl',
                                    value: this.getWebglFp()
                                }), e;
                            },
                            webglVendorAndRendererKey: function (e) {
                                return !this.options.excludeWebGLVendorAndRenderer && this.isWebGlSupported() && e.addPreprocessedComponent({
                                    key: 'webgl_vendor',
                                    value: this.getWebglVendorAndRenderer()
                                }), e;
                            },
                            adBlockKey: function (e) {
                                return this.options.excludeAdBlock || e.addPreprocessedComponent({
                                    key: 'adblock',
                                    value: this.getAdBlock()
                                }), e;
                            },
                            hasLiedLanguagesKey: function (e) {
                                return this.options.excludeHasLiedLanguages || e.addPreprocessedComponent({
                                    key: 'has_lied_languages',
                                    value: this.getHasLiedLanguages()
                                }), e;
                            },
                            hasLiedResolutionKey: function (e) {
                                return this.options.excludeHasLiedResolution || e.addPreprocessedComponent({
                                    key: 'has_lied_resolution',
                                    value: this.getHasLiedResolution()
                                }), e;
                            },
                            hasLiedOsKey: function (e) {
                                return this.options.excludeHasLiedOs || e.addPreprocessedComponent({
                                    key: 'has_lied_os',
                                    value: this.getHasLiedOs()
                                }), e;
                            },
                            hasLiedBrowserKey: function (e) {
                                return this.options.excludeHasLiedBrowser || e.addPreprocessedComponent({
                                    key: 'has_lied_browser',
                                    value: this.getHasLiedBrowser()
                                }), e;
                            },
                            fontsKey: function (e, t) {
                                return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t);
                            },
                            flashFontsKey: function (e, t) {
                                return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? void 0 === this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function (n) {
                                    e.addPreprocessedComponent({
                                        key: 'swf_fonts',
                                        value: n.join(';')
                                    }), t(e);
                                }) : t(e);
                            },
                            jsFontsKey: function (e, t) {
                                var n = this;
                                return setTimeout(function () {
                                    var i = [
                                            'monospace',
                                            'sans-serif',
                                            'serif'
                                        ], a = [
                                            'Andale Mono',
                                            'Arial',
                                            'Arial Black',
                                            'Arial Hebrew',
                                            'Arial MT',
                                            'Arial Narrow',
                                            'Arial Rounded MT Bold',
                                            'Arial Unicode MS',
                                            'Bitstream Vera Sans Mono',
                                            'Book Antiqua',
                                            'Bookman Old Style',
                                            'Calibri',
                                            'Cambria',
                                            'Cambria Math',
                                            'Century',
                                            'Century Gothic',
                                            'Century Schoolbook',
                                            'Comic Sans',
                                            'Comic Sans MS',
                                            'Consolas',
                                            'Courier',
                                            'Courier New',
                                            'Geneva',
                                            'Georgia',
                                            'Helvetica',
                                            'Helvetica Neue',
                                            'Impact',
                                            'Lucida Bright',
                                            'Lucida Calligraphy',
                                            'Lucida Console',
                                            'Lucida Fax',
                                            'LUCIDA GRANDE',
                                            'Lucida Handwriting',
                                            'Lucida Sans',
                                            'Lucida Sans Typewriter',
                                            'Lucida Sans Unicode',
                                            'Microsoft Sans Serif',
                                            'Monaco',
                                            'Monotype Corsiva',
                                            'MS Gothic',
                                            'MS Outlook',
                                            'MS PGothic',
                                            'MS Reference Sans Serif',
                                            'MS Sans Serif',
                                            'MS Serif',
                                            'MYRIAD',
                                            'MYRIAD PRO',
                                            'Palatino',
                                            'Palatino Linotype',
                                            'Segoe Print',
                                            'Segoe Script',
                                            'Segoe UI',
                                            'Segoe UI Light',
                                            'Segoe UI Semibold',
                                            'Segoe UI Symbol',
                                            'Tahoma',
                                            'Times',
                                            'Times New Roman',
                                            'Times New Roman PS',
                                            'Trebuchet MS',
                                            'Verdana',
                                            'Wingdings',
                                            'Wingdings 2',
                                            'Wingdings 3'
                                        ];
                                    n.options.extendedJsFonts && (a = a.concat([
                                        'Abadi MT Condensed Light',
                                        'Academy Engraved LET',
                                        'ADOBE CASLON PRO',
                                        'Adobe Garamond',
                                        'ADOBE GARAMOND PRO',
                                        'Agency FB',
                                        'Aharoni',
                                        'Albertus Extra Bold',
                                        'Albertus Medium',
                                        'Algerian',
                                        'Amazone BT',
                                        'American Typewriter',
                                        'American Typewriter Condensed',
                                        'AmerType Md BT',
                                        'Andalus',
                                        'Angsana New',
                                        'AngsanaUPC',
                                        'Antique Olive',
                                        'Aparajita',
                                        'Apple Chancery',
                                        'Apple Color Emoji',
                                        'Apple SD Gothic Neo',
                                        'Arabic Typesetting',
                                        'ARCHER',
                                        'ARNO PRO',
                                        'Arrus BT',
                                        'Aurora Cn BT',
                                        'AvantGarde Bk BT',
                                        'AvantGarde Md BT',
                                        'AVENIR',
                                        'Ayuthaya',
                                        'Bandy',
                                        'Bangla Sangam MN',
                                        'Bank Gothic',
                                        'BankGothic Md BT',
                                        'Baskerville',
                                        'Baskerville Old Face',
                                        'Batang',
                                        'BatangChe',
                                        'Bauer Bodoni',
                                        'Bauhaus 93',
                                        'Bazooka',
                                        'Bell MT',
                                        'Bembo',
                                        'Benguiat Bk BT',
                                        'Berlin Sans FB',
                                        'Berlin Sans FB Demi',
                                        'Bernard MT Condensed',
                                        'BernhardFashion BT',
                                        'BernhardMod BT',
                                        'Big Caslon',
                                        'BinnerD',
                                        'Blackadder ITC',
                                        'BlairMdITC TT',
                                        'Bodoni 72',
                                        'Bodoni 72 Oldstyle',
                                        'Bodoni 72 Smallcaps',
                                        'Bodoni MT',
                                        'Bodoni MT Black',
                                        'Bodoni MT Condensed',
                                        'Bodoni MT Poster Compressed',
                                        'Bookshelf Symbol 7',
                                        'Boulder',
                                        'Bradley Hand',
                                        'Bradley Hand ITC',
                                        'Bremen Bd BT',
                                        'Britannic Bold',
                                        'Broadway',
                                        'Browallia New',
                                        'BrowalliaUPC',
                                        'Brush Script MT',
                                        'Californian FB',
                                        'Calisto MT',
                                        'Calligrapher',
                                        'Candara',
                                        'CaslonOpnface BT',
                                        'Castellar',
                                        'Centaur',
                                        'Cezanne',
                                        'CG Omega',
                                        'CG Times',
                                        'Chalkboard',
                                        'Chalkboard SE',
                                        'Chalkduster',
                                        'Charlesworth',
                                        'Charter Bd BT',
                                        'Charter BT',
                                        'Chaucer',
                                        'ChelthmITC Bk BT',
                                        'Chiller',
                                        'Clarendon',
                                        'Clarendon Condensed',
                                        'CloisterBlack BT',
                                        'Cochin',
                                        'Colonna MT',
                                        'Constantia',
                                        'Cooper Black',
                                        'Copperplate',
                                        'Copperplate Gothic',
                                        'Copperplate Gothic Bold',
                                        'Copperplate Gothic Light',
                                        'CopperplGoth Bd BT',
                                        'Corbel',
                                        'Cordia New',
                                        'CordiaUPC',
                                        'Cornerstone',
                                        'Coronet',
                                        'Cuckoo',
                                        'Curlz MT',
                                        'DaunPenh',
                                        'Dauphin',
                                        'David',
                                        'DB LCD Temp',
                                        'DELICIOUS',
                                        'Denmark',
                                        'DFKai-SB',
                                        'Didot',
                                        'DilleniaUPC',
                                        'DIN',
                                        'DokChampa',
                                        'Dotum',
                                        'DotumChe',
                                        'Ebrima',
                                        'Edwardian Script ITC',
                                        'Elephant',
                                        'English 111 Vivace BT',
                                        'Engravers MT',
                                        'EngraversGothic BT',
                                        'Eras Bold ITC',
                                        'Eras Demi ITC',
                                        'Eras Light ITC',
                                        'Eras Medium ITC',
                                        'EucrosiaUPC',
                                        'Euphemia',
                                        'Euphemia UCAS',
                                        'EUROSTILE',
                                        'Exotc350 Bd BT',
                                        'FangSong',
                                        'Felix Titling',
                                        'Fixedsys',
                                        'FONTIN',
                                        'Footlight MT Light',
                                        'Forte',
                                        'FrankRuehl',
                                        'Fransiscan',
                                        'Freefrm721 Blk BT',
                                        'FreesiaUPC',
                                        'Freestyle Script',
                                        'French Script MT',
                                        'FrnkGothITC Bk BT',
                                        'Fruitger',
                                        'FRUTIGER',
                                        'Futura',
                                        'Futura Bk BT',
                                        'Futura Lt BT',
                                        'Futura Md BT',
                                        'Futura ZBlk BT',
                                        'FuturaBlack BT',
                                        'Gabriola',
                                        'Galliard BT',
                                        'Gautami',
                                        'Geeza Pro',
                                        'Geometr231 BT',
                                        'Geometr231 Hv BT',
                                        'Geometr231 Lt BT',
                                        'GeoSlab 703 Lt BT',
                                        'GeoSlab 703 XBd BT',
                                        'Gigi',
                                        'Gill Sans',
                                        'Gill Sans MT',
                                        'Gill Sans MT Condensed',
                                        'Gill Sans MT Ext Condensed Bold',
                                        'Gill Sans Ultra Bold',
                                        'Gill Sans Ultra Bold Condensed',
                                        'Gisha',
                                        'Gloucester MT Extra Condensed',
                                        'GOTHAM',
                                        'GOTHAM BOLD',
                                        'Goudy Old Style',
                                        'Goudy Stout',
                                        'GoudyHandtooled BT',
                                        'GoudyOLSt BT',
                                        'Gujarati Sangam MN',
                                        'Gulim',
                                        'GulimChe',
                                        'Gungsuh',
                                        'GungsuhChe',
                                        'Gurmukhi MN',
                                        'Haettenschweiler',
                                        'Harlow Solid Italic',
                                        'Harrington',
                                        'Heather',
                                        'Heiti SC',
                                        'Heiti TC',
                                        'HELV',
                                        'Herald',
                                        'High Tower Text',
                                        'Hiragino Kaku Gothic ProN',
                                        'Hiragino Mincho ProN',
                                        'Hoefler Text',
                                        'Humanst 521 Cn BT',
                                        'Humanst521 BT',
                                        'Humanst521 Lt BT',
                                        'Imprint MT Shadow',
                                        'Incised901 Bd BT',
                                        'Incised901 BT',
                                        'Incised901 Lt BT',
                                        'INCONSOLATA',
                                        'Informal Roman',
                                        'Informal011 BT',
                                        'INTERSTATE',
                                        'IrisUPC',
                                        'Iskoola Pota',
                                        'JasmineUPC',
                                        'Jazz LET',
                                        'Jenson',
                                        'Jester',
                                        'Jokerman',
                                        'Juice ITC',
                                        'Kabel Bk BT',
                                        'Kabel Ult BT',
                                        'Kailasa',
                                        'KaiTi',
                                        'Kalinga',
                                        'Kannada Sangam MN',
                                        'Kartika',
                                        'Kaufmann Bd BT',
                                        'Kaufmann BT',
                                        'Khmer UI',
                                        'KodchiangUPC',
                                        'Kokila',
                                        'Korinna BT',
                                        'Kristen ITC',
                                        'Krungthep',
                                        'Kunstler Script',
                                        'Lao UI',
                                        'Latha',
                                        'Leelawadee',
                                        'Letter Gothic',
                                        'Levenim MT',
                                        'LilyUPC',
                                        'Lithograph',
                                        'Lithograph Light',
                                        'Long Island',
                                        'Lydian BT',
                                        'Magneto',
                                        'Maiandra GD',
                                        'Malayalam Sangam MN',
                                        'Malgun Gothic',
                                        'Mangal',
                                        'Marigold',
                                        'Marion',
                                        'Marker Felt',
                                        'Market',
                                        'Marlett',
                                        'Matisse ITC',
                                        'Matura MT Script Capitals',
                                        'Meiryo',
                                        'Meiryo UI',
                                        'Microsoft Himalaya',
                                        'Microsoft JhengHei',
                                        'Microsoft New Tai Lue',
                                        'Microsoft PhagsPa',
                                        'Microsoft Tai Le',
                                        'Microsoft Uighur',
                                        'Microsoft YaHei',
                                        'Microsoft Yi Baiti',
                                        'MingLiU',
                                        'MingLiU_HKSCS',
                                        'MingLiU_HKSCS-ExtB',
                                        'MingLiU-ExtB',
                                        'Minion',
                                        'Minion Pro',
                                        'Miriam',
                                        'Miriam Fixed',
                                        'Mistral',
                                        'Modern',
                                        'Modern No. 20',
                                        'Mona Lisa Solid ITC TT',
                                        'Mongolian Baiti',
                                        'MONO',
                                        'MoolBoran',
                                        'Mrs Eaves',
                                        'MS LineDraw',
                                        'MS Mincho',
                                        'MS PMincho',
                                        'MS Reference Specialty',
                                        'MS UI Gothic',
                                        'MT Extra',
                                        'MUSEO',
                                        'MV Boli',
                                        'Nadeem',
                                        'Narkisim',
                                        'NEVIS',
                                        'News Gothic',
                                        'News GothicMT',
                                        'NewsGoth BT',
                                        'Niagara Engraved',
                                        'Niagara Solid',
                                        'Noteworthy',
                                        'NSimSun',
                                        'Nyala',
                                        'OCR A Extended',
                                        'Old Century',
                                        'Old English Text MT',
                                        'Onyx',
                                        'Onyx BT',
                                        'OPTIMA',
                                        'Oriya Sangam MN',
                                        'OSAKA',
                                        'OzHandicraft BT',
                                        'Palace Script MT',
                                        'Papyrus',
                                        'Parchment',
                                        'Party LET',
                                        'Pegasus',
                                        'Perpetua',
                                        'Perpetua Titling MT',
                                        'PetitaBold',
                                        'Pickwick',
                                        'Plantagenet Cherokee',
                                        'Playbill',
                                        'PMingLiU',
                                        'PMingLiU-ExtB',
                                        'Poor Richard',
                                        'Poster',
                                        'PosterBodoni BT',
                                        'PRINCETOWN LET',
                                        'Pristina',
                                        'PTBarnum BT',
                                        'Pythagoras',
                                        'Raavi',
                                        'Rage Italic',
                                        'Ravie',
                                        'Ribbon131 Bd BT',
                                        'Rockwell',
                                        'Rockwell Condensed',
                                        'Rockwell Extra Bold',
                                        'Rod',
                                        'Roman',
                                        'Sakkal Majalla',
                                        'Santa Fe LET',
                                        'Savoye LET',
                                        'Sceptre',
                                        'Script',
                                        'Script MT Bold',
                                        'SCRIPTINA',
                                        'Serifa',
                                        'Serifa BT',
                                        'Serifa Th BT',
                                        'ShelleyVolante BT',
                                        'Sherwood',
                                        'Shonar Bangla',
                                        'Showcard Gothic',
                                        'Shruti',
                                        'Signboard',
                                        'SILKSCREEN',
                                        'SimHei',
                                        'Simplified Arabic',
                                        'Simplified Arabic Fixed',
                                        'SimSun',
                                        'SimSun-ExtB',
                                        'Sinhala Sangam MN',
                                        'Sketch Rockwell',
                                        'Skia',
                                        'Small Fonts',
                                        'Snap ITC',
                                        'Snell Roundhand',
                                        'Socket',
                                        'Souvenir Lt BT',
                                        'Staccato222 BT',
                                        'Steamer',
                                        'Stencil',
                                        'Storybook',
                                        'Styllo',
                                        'Subway',
                                        'Swis721 BlkEx BT',
                                        'Swiss911 XCm BT',
                                        'Sylfaen',
                                        'Synchro LET',
                                        'System',
                                        'Tamil Sangam MN',
                                        'Technical',
                                        'Teletype',
                                        'Telugu Sangam MN',
                                        'Tempus Sans ITC',
                                        'Terminal',
                                        'Thonburi',
                                        'Traditional Arabic',
                                        'Trajan',
                                        'TRAJAN PRO',
                                        'Tristan',
                                        'Tubular',
                                        'Tunga',
                                        'Tw Cen MT',
                                        'Tw Cen MT Condensed',
                                        'Tw Cen MT Condensed Extra Bold',
                                        'TypoUpright BT',
                                        'Unicorn',
                                        'Univers',
                                        'Univers CE 55 Medium',
                                        'Univers Condensed',
                                        'Utsaah',
                                        'Vagabond',
                                        'Vani',
                                        'Vijaya',
                                        'Viner Hand ITC',
                                        'VisualUI',
                                        'Vivaldi',
                                        'Vladimir Script',
                                        'Vrinda',
                                        'Westminster',
                                        'WHITNEY',
                                        'Wide Latin',
                                        'ZapfEllipt BT',
                                        'ZapfHumnst BT',
                                        'ZapfHumnst Dm BT',
                                        'Zapfino',
                                        'Zurich BlkEx BT',
                                        'Zurich Ex BT',
                                        'ZWAdobeF'
                                    ])), a = (a = a.concat(n.options.userDefinedFonts)).filter(function (e, t) {
                                        return a.indexOf(e) === t;
                                    });
                                    var r = document.getElementsByTagName('body')[0], o = document.createElement('div'), s = document.createElement('div'), l = {}, d = {}, u = function () {
                                            var e = document.createElement('span');
                                            return e.style.position = 'absolute', e.style.left = '-9999px', e.style.fontSize = '72px', e.style.fontStyle = 'normal', e.style.fontWeight = 'normal', e.style.letterSpacing = 'normal', e.style.lineBreak = 'auto', e.style.lineHeight = 'normal', e.style.textTransform = 'none', e.style.textAlign = 'left', e.style.textDecoration = 'none', e.style.textShadow = 'none', e.style.whiteSpace = 'normal', e.style.wordBreak = 'normal', e.style.wordSpacing = 'normal', e.innerHTML = 'mmmmmmmmmmlli', e;
                                        }, c = function (e) {
                                            for (var t = !1, n = 0; n < i.length; n++)
                                                if (t = e[n].offsetWidth !== l[i[n]] || e[n].offsetHeight !== d[i[n]])
                                                    return t;
                                            return t;
                                        }, h = function () {
                                            for (var e = [], t = 0, n = i.length; t < n; t++) {
                                                var a = u();
                                                a.style.fontFamily = i[t], o.appendChild(a), e.push(a);
                                            }
                                            return e;
                                        }();
                                    r.appendChild(o);
                                    for (var g = 0, p = i.length; g < p; g++)
                                        l[i[g]] = h[g].offsetWidth, d[i[g]] = h[g].offsetHeight;
                                    var f = function () {
                                        for (var e, t, n, r = {}, o = 0, l = a.length; o < l; o++) {
                                            for (var d = [], c = 0, h = i.length; c < h; c++) {
                                                var g = (e = a[o], t = i[c], n = void 0, (n = u()).style.fontFamily = '\'' + e + '\',' + t, n);
                                                s.appendChild(g), d.push(g);
                                            }
                                            r[a[o]] = d;
                                        }
                                        return r;
                                    }();
                                    r.appendChild(s);
                                    for (var m = [], v = 0, C = a.length; v < C; v++)
                                        c(f[a[v]]) && m.push(a[v]);
                                    r.removeChild(s), r.removeChild(o), e.addPreprocessedComponent({
                                        key: 'js_fonts',
                                        value: m
                                    }), t(e);
                                }, 1);
                            },
                            pluginsKey: function (e) {
                                return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.addPreprocessedComponent({
                                    key: 'ie_plugins',
                                    value: this.getIEPlugins()
                                }) : e.addPreprocessedComponent({
                                    key: 'regular_plugins',
                                    value: this.getRegularPlugins()
                                })), e;
                            },
                            getRegularPlugins: function () {
                                var e = [];
                                if (navigator.plugins)
                                    for (var t = 0, n = navigator.plugins.length; t < n; t++)
                                        navigator.plugins[t] && e.push(navigator.plugins[t]);
                                return this.pluginsShouldBeSorted() && (e = e.sort(function (e, t) {
                                    return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
                                })), this.map(e, function (e) {
                                    var t = this.map(e, function (e) {
                                        return [
                                            e.type,
                                            e.suffixes
                                        ].join('~');
                                    }).join(',');
                                    return [
                                        e.name,
                                        e.description,
                                        t
                                    ].join('::');
                                }, this);
                            },
                            getIEPlugins: function () {
                                var e = [];
                                return (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject') || 'ActiveXObject' in window) && (e = this.map([
                                    'AcroPDF.PDF',
                                    'Adodb.Stream',
                                    'AgControl.AgControl',
                                    'DevalVRXCtrl.DevalVRXCtrl.1',
                                    'MacromediaFlashPaper.MacromediaFlashPaper',
                                    'Msxml2.DOMDocument',
                                    'Msxml2.XMLHTTP',
                                    'PDF.PdfCtrl',
                                    'QuickTime.QuickTime',
                                    'QuickTimeCheckObject.QuickTimeCheck.1',
                                    'RealPlayer',
                                    'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
                                    'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
                                    'Scripting.Dictionary',
                                    'SWCtl.SWCtl',
                                    'Shell.UIHelper',
                                    'ShockwaveFlash.ShockwaveFlash',
                                    'Skype.Detection',
                                    'TDCCtl.TDCCtl',
                                    'WMPlayer.OCX',
                                    'rmocx.RealPlayer G2 Control',
                                    'rmocx.RealPlayer G2 Control.1'
                                ], function (e) {
                                    try {
                                        return new window.ActiveXObject(e), e;
                                    } catch (e) {
                                        return null;
                                    }
                                })), navigator.plugins && (e = e.concat(this.getRegularPlugins())), e;
                            },
                            pluginsShouldBeSorted: function () {
                                for (var e = !1, t = 0, n = this.options.sortPluginsFor.length; t < n; t++) {
                                    var i = this.options.sortPluginsFor[t];
                                    if (navigator.userAgent.match(i)) {
                                        e = !0;
                                        break;
                                    }
                                }
                                return e;
                            },
                            touchSupportKey: function (e) {
                                return this.options.excludeTouchSupport || e.addPreprocessedComponent({
                                    key: 'touch_support',
                                    value: this.getTouchSupport()
                                }), e;
                            },
                            hardwareConcurrencyKey: function (e) {
                                return this.options.excludeHardwareConcurrency || e.addPreprocessedComponent({
                                    key: 'hardware_concurrency',
                                    value: this.getHardwareConcurrency()
                                }), e;
                            },
                            hasSessionStorage: function () {
                                const $___old_465a4437637a044e = {}.constructor.getOwnPropertyDescriptor(window, 'sessionStorage');
                                try {
                                    if ($___old_465a4437637a044e)
                                        ({}.constructor.defineProperty(window, 'sessionStorage', $___mock_19fe278673006086.sessionStorage));
                                    return function () {
                                        try {
                                            return !!window.sessionStorage;
                                        } catch (e) {
                                            return !0;
                                        }
                                    }.apply(this, arguments);
                                } finally {
                                    if ($___old_465a4437637a044e)
                                        ({}.constructor.defineProperty(window, 'sessionStorage', $___old_465a4437637a044e));
                                }
                            },
                            hasLocalStorage: function () {
                                const $___old_e8f69f762c44fafe = {}.constructor.getOwnPropertyDescriptor(window, 'localStorage');
                                try {
                                    if ($___old_e8f69f762c44fafe)
                                        ({}.constructor.defineProperty(window, 'localStorage', $___mock_19fe278673006086.localStorage));
                                    return function () {
                                        try {
                                            return !!window.localStorage;
                                        } catch (e) {
                                            return !0;
                                        }
                                    }.apply(this, arguments);
                                } finally {
                                    if ($___old_e8f69f762c44fafe)
                                        ({}.constructor.defineProperty(window, 'localStorage', $___old_e8f69f762c44fafe));
                                }
                            },
                            hasIndexedDB: function () {
                                try {
                                    return !!window.indexedDB;
                                } catch (e) {
                                    return !0;
                                }
                            },
                            getHardwareConcurrency: function () {
                                return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 'unknown';
                            },
                            getNavigatorCpuClass: function () {
                                return navigator.cpuClass ? navigator.cpuClass : 'unknown';
                            },
                            getNavigatorPlatform: function () {
                                return navigator.platform ? navigator.platform : 'unknown';
                            },
                            getDoNotTrack: function () {
                                return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : 'unknown';
                            },
                            getTouchSupport: function () {
                                var e = 0, t = !1;
                                void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
                                try {
                                    document.createEvent('TouchEvent'), t = !0;
                                } catch (e) {
                                }
                                return [
                                    e,
                                    t,
                                    'ontouchstart' in window
                                ];
                            },
                            getCanvasFp: function () {
                                var e = [], t = document.createElement('canvas');
                                t.width = 2000, t.height = 200, t.style.display = 'inline';
                                var n = t.getContext('2d');
                                return n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6), e.push('canvas winding:' + (!1 === n.isPointInPath(5, 5, 'evenodd') ? 'yes' : 'no')), n.textBaseline = 'alphabetic', n.fillStyle = '#f60', n.fillRect(125, 1, 62, 20), n.fillStyle = '#069', this.options.dontUseFakeFontInCanvas ? n.font = '11pt Arial' : n.font = '11pt no-real-font-123', n.fillText('Cwm fjordbank glyphs vext quiz, \uD83D\uDE03', 2, 15), n.fillStyle = 'rgba(102, 204, 0, 0.2)', n.font = '18pt Arial', n.fillText('Cwm fjordbank glyphs vext quiz, \uD83D\uDE03', 4, 45), n.globalCompositeOperation = 'multiply', n.fillStyle = 'rgb(255,0,255)', n.beginPath(), n.arc(50, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = 'rgb(0,255,255)', n.beginPath(), n.arc(100, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = 'rgb(255,255,0)', n.beginPath(), n.arc(75, 100, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = 'rgb(255,0,255)', n.arc(75, 75, 75, 0, 2 * Math.PI, !0), n.arc(75, 75, 25, 0, 2 * Math.PI, !0), n.fill('evenodd'), t.toDataURL && e.push('canvas fp:' + t.toDataURL()), e.join('~');
                            },
                            getWebglFp: function () {
                                var e, t = function (t) {
                                        return e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), '[' + t[0] + ', ' + t[1] + ']';
                                    };
                                if (!(e = this.getWebglCanvas()))
                                    return null;
                                var n = [], i = e.createBuffer();
                                e.bindBuffer(e.ARRAY_BUFFER, i);
                                var a = new Float32Array([
                                    -0.2,
                                    -0.9,
                                    0,
                                    0.4,
                                    -0.26,
                                    0,
                                    0,
                                    0.732134444,
                                    0
                                ]);
                                e.bufferData(e.ARRAY_BUFFER, a, e.STATIC_DRAW), i.itemSize = 3, i.numItems = 3;
                                var r = e.createProgram(), o = e.createShader(e.VERTEX_SHADER);
                                e.shaderSource(o, 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'), e.compileShader(o);
                                var s = e.createShader(e.FRAGMENT_SHADER);
                                e.shaderSource(s, 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'), e.compileShader(s), e.attachShader(r, o), e.attachShader(r, s), e.linkProgram(r), e.useProgram(r), r.vertexPosAttrib = e.getAttribLocation(r, 'attrVertex'), r.offsetUniform = e.getUniformLocation(r, 'uniformOffset'), e.enableVertexAttribArray(r.vertexPosArray), e.vertexAttribPointer(r.vertexPosAttrib, i.itemSize, e.FLOAT, !1, 0, 0), e.uniform2f(r.offsetUniform, 1, 1), e.drawArrays(e.TRIANGLE_STRIP, 0, i.numItems);
                                try {
                                    n.push(e.canvas.toDataURL());
                                } catch (t) {
                                }
                                n.push('extensions:' + (e.getSupportedExtensions() || []).join(';')), n.push('webgl aliased line width range:' + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))), n.push('webgl aliased point size range:' + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))), n.push('webgl alpha bits:' + e.getParameter(e.ALPHA_BITS)), n.push('webgl antialiasing:' + (e.getContextAttributes().antialias ? 'yes' : 'no')), n.push('webgl blue bits:' + e.getParameter(e.BLUE_BITS)), n.push('webgl depth bits:' + e.getParameter(e.DEPTH_BITS)), n.push('webgl green bits:' + e.getParameter(e.GREEN_BITS)), n.push('webgl max anisotropy:' + function (e) {
                                    var t = e.getExtension('EXT_texture_filter_anisotropic') || e.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || e.getExtension('MOZ_EXT_texture_filter_anisotropic');
                                    if (t) {
                                        var n = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                                        return 0 === n && (n = 2), n;
                                    }
                                    return null;
                                }(e)), n.push('webgl max combined texture image units:' + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), n.push('webgl max cube map texture size:' + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)), n.push('webgl max fragment uniform vectors:' + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)), n.push('webgl max render buffer size:' + e.getParameter(e.MAX_RENDERBUFFER_SIZE)), n.push('webgl max texture image units:' + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)), n.push('webgl max texture size:' + e.getParameter(e.MAX_TEXTURE_SIZE)), n.push('webgl max varying vectors:' + e.getParameter(e.MAX_VARYING_VECTORS)), n.push('webgl max vertex attribs:' + e.getParameter(e.MAX_VERTEX_ATTRIBS)), n.push('webgl max vertex texture image units:' + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), n.push('webgl max vertex uniform vectors:' + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)), n.push('webgl max viewport dims:' + t(e.getParameter(e.MAX_VIEWPORT_DIMS))), n.push('webgl red bits:' + e.getParameter(e.RED_BITS)), n.push('webgl renderer:' + e.getParameter(e.RENDERER)), n.push('webgl shading language version:' + e.getParameter(e.SHADING_LANGUAGE_VERSION)), n.push('webgl stencil bits:' + e.getParameter(e.STENCIL_BITS)), n.push('webgl vendor:' + e.getParameter(e.VENDOR)), n.push('webgl version:' + e.getParameter(e.VERSION));
                                try {
                                    var l = e.getExtension('WEBGL_debug_renderer_info');
                                    l && (n.push('webgl unmasked vendor:' + e.getParameter(l.UNMASKED_VENDOR_WEBGL)), n.push('webgl unmasked renderer:' + e.getParameter(l.UNMASKED_RENDERER_WEBGL)));
                                } catch (t) {
                                }
                                if (!e.getShaderPrecisionFormat)
                                    return n.join('~');
                                var d = this;
                                return d.each([
                                    'FLOAT',
                                    'INT'
                                ], function (t) {
                                    d.each([
                                        'VERTEX',
                                        'FRAGMENT'
                                    ], function (i) {
                                        d.each([
                                            'HIGH',
                                            'MEDIUM',
                                            'LOW'
                                        ], function (a) {
                                            d.each([
                                                'precision',
                                                'rangeMin',
                                                'rangeMax'
                                            ], function (r) {
                                                var o = e.getShaderPrecisionFormat(e[i + '_SHADER'], e[a + '_' + t])[r];
                                                'precision' !== r && (r = 'precision ' + r);
                                                var s = [
                                                    'webgl ',
                                                    i.toLowerCase(),
                                                    ' shader ',
                                                    a.toLowerCase(),
                                                    ' ',
                                                    t.toLowerCase(),
                                                    ' ',
                                                    r,
                                                    ':',
                                                    o
                                                ];
                                                n.push(s.join(''));
                                            });
                                        });
                                    });
                                }), n.join('~');
                            },
                            getWebglVendorAndRenderer: function () {
                                try {
                                    var e = this.getWebglCanvas(), t = e.getExtension('WEBGL_debug_renderer_info');
                                    return e.getParameter(t.UNMASKED_VENDOR_WEBGL) + '~' + e.getParameter(t.UNMASKED_RENDERER_WEBGL);
                                } catch (e) {
                                    return null;
                                }
                            },
                            getAdBlock: function () {
                                var e = document.createElement('div');
                                e.innerHTML = '&nbsp;';
                                var t = !(e.className = 'adsbox');
                                try {
                                    document.body.appendChild(e), t = 0 === document.getElementsByClassName('adsbox')[0].offsetHeight, document.body.removeChild(e);
                                } catch (e) {
                                    t = !1;
                                }
                                return t;
                            },
                            getHasLiedLanguages: function () {
                                if (void 0 !== navigator.languages)
                                    try {
                                        if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2))
                                            return !0;
                                    } catch (e) {
                                        return !0;
                                    }
                                return !1;
                            },
                            getHasLiedResolution: function () {
                                return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
                            },
                            getHasLiedOs: function () {
                                var e, t = navigator.userAgent.toLowerCase(), n = navigator.oscpu, i = navigator.platform.toLowerCase();
                                if (e = 0 <= t.indexOf('windows phone') ? 'Windows Phone' : 0 <= t.indexOf('win') ? 'Windows' : 0 <= t.indexOf('android') ? 'Android' : 0 <= t.indexOf('linux') ? 'Linux' : 0 <= t.indexOf('iphone') || 0 <= t.indexOf('ipad') ? 'iOS' : 0 <= t.indexOf('mac') ? 'Mac' : 'Other', ('ontouchstart' in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && 'Windows Phone' !== e && 'Android' !== e && 'iOS' !== e && 'Other' !== e)
                                    return !0;
                                if (void 0 !== n) {
                                    if (0 <= (n = n.toLowerCase()).indexOf('win') && 'Windows' !== e && 'Windows Phone' !== e)
                                        return !0;
                                    if (0 <= n.indexOf('linux') && 'Linux' !== e && 'Android' !== e)
                                        return !0;
                                    if (0 <= n.indexOf('mac') && 'Mac' !== e && 'iOS' !== e)
                                        return !0;
                                    if ((-1 === n.indexOf('win') && -1 === n.indexOf('linux') && -1 === n.indexOf('mac')) != ('Other' === e))
                                        return !0;
                                }
                                return 0 <= i.indexOf('win') && 'Windows' !== e && 'Windows Phone' !== e || (0 <= i.indexOf('linux') || 0 <= i.indexOf('android') || 0 <= i.indexOf('pike')) && 'Linux' !== e && 'Android' !== e || (0 <= i.indexOf('mac') || 0 <= i.indexOf('ipad') || 0 <= i.indexOf('ipod') || 0 <= i.indexOf('iphone')) && 'Mac' !== e && 'iOS' !== e || (-1 === i.indexOf('win') && -1 === i.indexOf('linux') && -1 === i.indexOf('mac')) != ('Other' === e) || void 0 === navigator.plugins && 'Windows' !== e && 'Windows Phone' !== e;
                            },
                            getHasLiedBrowser: function () {
                                var e, t = navigator.userAgent.toLowerCase(), n = navigator.productSub;
                                if (('Chrome' == (e = 0 <= t.indexOf('firefox') ? 'Firefox' : 0 <= t.indexOf('opera') || 0 <= t.indexOf('opr') ? 'Opera' : 0 <= t.indexOf('chrome') ? 'Chrome' : 0 <= t.indexOf('safari') ? 'Safari' : 0 <= t.indexOf('trident') ? 'Internet Explorer' : 'Other') || 'Safari' === e || 'Opera' === e) && '20030107' !== n)
                                    return !0;
                                var i, a = eval.toString().length;
                                if (37 === a && 'Safari' !== e && 'Firefox' !== e && 'Other' !== e)
                                    return !0;
                                if (39 === a && 'Internet Explorer' !== e && 'Other' !== e)
                                    return !0;
                                if (33 === a && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e)
                                    return !0;
                                try {
                                    throw 'a';
                                } catch (e) {
                                    try {
                                        e.toSource(), i = !0;
                                    } catch (e) {
                                        i = !1;
                                    }
                                }
                                return !(!i || 'Firefox' === e || 'Other' === e);
                            },
                            isCanvasSupported: function () {
                                var e = document.createElement('canvas');
                                return !(!e.getContext || !e.getContext('2d'));
                            },
                            isWebGlSupported: function () {
                                if (!this.isCanvasSupported())
                                    return !1;
                                var e = this.getWebglCanvas();
                                return !!window.WebGLRenderingContext && !!e;
                            },
                            isIE: function () {
                                return 'Microsoft Internet Explorer' === navigator.appName || !('Netscape' !== navigator.appName || !/Trident/.test(navigator.userAgent));
                            },
                            hasSwfObjectLoaded: function () {
                                return void 0 !== window.swfobject;
                            },
                            hasMinFlashInstalled: function () {
                                return window.swfobject.hasFlashPlayerVersion('9.0.0');
                            },
                            addFlashDivNode: function () {
                                var e = document.createElement('div');
                                e.setAttribute('id', this.options.swfContainerId), document.body.appendChild(e);
                            },
                            loadSwfAndDetectFonts: function (e) {
                                var t = '___fp_swf_loaded';
                                window[t] = function (t) {
                                    e(t);
                                };
                                var n = this.options.swfContainerId;
                                this.addFlashDivNode();
                                var i = { onReady: t };
                                window.swfobject.embedSWF(this.options.swfPath, n, '1', '1', '9.0.0', !1, i, {
                                    allowScriptAccess: 'always',
                                    menu: 'false'
                                }, {});
                            },
                            getWebglCanvas: function () {
                                var e = document.createElement('canvas'), t = null;
                                try {
                                    t = e.getContext('webgl') || e.getContext('experimental-webgl');
                                } catch (e) {
                                }
                                return t || (t = null), t;
                            },
                            each: function (e, t, n) {
                                if (null !== e)
                                    if (this.nativeForEach && e.forEach === this.nativeForEach)
                                        e.forEach(t, n);
                                    else if (e.length === +e.length) {
                                        for (var i = 0, a = e.length; i < a; i++)
                                            if (t.call(n, e[i], i, e) === {})
                                                return;
                                    } else
                                        for (var r in e)
                                            if (e.hasOwnProperty(r) && t.call(n, e[r], r, e) === {})
                                                return;
                            },
                            map: function (e, t, n) {
                                var i = [];
                                return null == e ? i : this.nativeMap && e.map === this.nativeMap ? e.map(t, n) : (this.each(e, function (e, a, r) {
                                    i[i.length] = t.call(n, e, a, r);
                                }), i);
                            },
                            x64Add: function (e, t) {
                                e = [
                                    e[0] >>> 16,
                                    65535 & e[0],
                                    e[1] >>> 16,
                                    65535 & e[1]
                                ], t = [
                                    t[0] >>> 16,
                                    65535 & t[0],
                                    t[1] >>> 16,
                                    65535 & t[1]
                                ];
                                var n = [
                                    0,
                                    0,
                                    0,
                                    0
                                ];
                                return n[3] += e[3] + t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] + t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] + t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] + t[0], n[0] &= 65535, [
                                    n[0] << 16 | n[1],
                                    n[2] << 16 | n[3]
                                ];
                            },
                            x64Multiply: function (e, t) {
                                e = [
                                    e[0] >>> 16,
                                    65535 & e[0],
                                    e[1] >>> 16,
                                    65535 & e[1]
                                ], t = [
                                    t[0] >>> 16,
                                    65535 & t[0],
                                    t[1] >>> 16,
                                    65535 & t[1]
                                ];
                                var n = [
                                    0,
                                    0,
                                    0,
                                    0
                                ];
                                return n[3] += e[3] * t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * t[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += e[3] * t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * t[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[2] * t[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], n[0] &= 65535, [
                                    n[0] << 16 | n[1],
                                    n[2] << 16 | n[3]
                                ];
                            },
                            x64Rotl: function (e, t) {
                                return 32 == (t %= 64) ? [
                                    e[1],
                                    e[0]
                                ] : t < 32 ? [
                                    e[0] << t | e[1] >>> 32 - t,
                                    e[1] << t | e[0] >>> 32 - t
                                ] : (t -= 32, [
                                    e[1] << t | e[0] >>> 32 - t,
                                    e[0] << t | e[1] >>> 32 - t
                                ]);
                            },
                            x64LeftShift: function (e, t) {
                                return 0 == (t %= 64) ? e : t < 32 ? [
                                    e[0] << t | e[1] >>> 32 - t,
                                    e[1] << t
                                ] : [
                                    e[1] << t - 32,
                                    0
                                ];
                            },
                            x64Xor: function (e, t) {
                                return [
                                    e[0] ^ t[0],
                                    e[1] ^ t[1]
                                ];
                            },
                            x64Fmix: function (e) {
                                return e = this.x64Xor(e, [
                                    0,
                                    e[0] >>> 1
                                ]), e = this.x64Multiply(e, [
                                    4283543511,
                                    3981806797
                                ]), e = this.x64Xor(e, [
                                    0,
                                    e[0] >>> 1
                                ]), e = this.x64Multiply(e, [
                                    3301882366,
                                    444984403
                                ]), this.x64Xor(e, [
                                    0,
                                    e[0] >>> 1
                                ]);
                            },
                            x64hash128: function (e, t) {
                                t = t || 0;
                                for (var n = (e = e || '').length % 16, i = e.length - n, a = [
                                            0,
                                            t
                                        ], r = [
                                            0,
                                            t
                                        ], o = [
                                            0,
                                            0
                                        ], s = [
                                            0,
                                            0
                                        ], l = [
                                            2277735313,
                                            289559509
                                        ], d = [
                                            1291169091,
                                            658871167
                                        ], u = 0; u < i; u += 16)
                                    o = [
                                        255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24,
                                        255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24
                                    ], s = [
                                        255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24,
                                        255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24
                                    ], o = this.x64Multiply(o, l), o = this.x64Rotl(o, 31), o = this.x64Multiply(o, d), a = this.x64Xor(a, o), a = this.x64Rotl(a, 27), a = this.x64Add(a, r), a = this.x64Add(this.x64Multiply(a, [
                                        0,
                                        5
                                    ]), [
                                        0,
                                        1390208809
                                    ]), s = this.x64Multiply(s, d), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, l), r = this.x64Xor(r, s), r = this.x64Rotl(r, 31), r = this.x64Add(r, a), r = this.x64Add(this.x64Multiply(r, [
                                        0,
                                        5
                                    ]), [
                                        0,
                                        944331445
                                    ]);
                                switch (o = [
                                        0,
                                        0
                                    ], s = [
                                        0,
                                        0
                                    ], n) {
                                case 15:
                                    s = this.x64Xor(s, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 14)
                                    ], 48));
                                case 14:
                                    s = this.x64Xor(s, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 13)
                                    ], 40));
                                case 13:
                                    s = this.x64Xor(s, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 12)
                                    ], 32));
                                case 12:
                                    s = this.x64Xor(s, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 11)
                                    ], 24));
                                case 11:
                                    s = this.x64Xor(s, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 10)
                                    ], 16));
                                case 10:
                                    s = this.x64Xor(s, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 9)
                                    ], 8));
                                case 9:
                                    s = this.x64Xor(s, [
                                        0,
                                        e.charCodeAt(u + 8)
                                    ]), s = this.x64Multiply(s, d), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, l), r = this.x64Xor(r, s);
                                case 8:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 7)
                                    ], 56));
                                case 7:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 6)
                                    ], 48));
                                case 6:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 5)
                                    ], 40));
                                case 5:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 4)
                                    ], 32));
                                case 4:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 3)
                                    ], 24));
                                case 3:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 2)
                                    ], 16));
                                case 2:
                                    o = this.x64Xor(o, this.x64LeftShift([
                                        0,
                                        e.charCodeAt(u + 1)
                                    ], 8));
                                case 1:
                                    o = this.x64Xor(o, [
                                        0,
                                        e.charCodeAt(u)
                                    ]), o = this.x64Multiply(o, l), o = this.x64Rotl(o, 31), o = this.x64Multiply(o, d), a = this.x64Xor(a, o);
                                }
                                return a = this.x64Xor(a, [
                                    0,
                                    e.length
                                ]), r = this.x64Xor(r, [
                                    0,
                                    e.length
                                ]), a = this.x64Add(a, r), r = this.x64Add(r, a), a = this.x64Fmix(a), r = this.x64Fmix(r), a = this.x64Add(a, r), r = this.x64Add(r, a), ('00000000' + (a[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (a[1] >>> 0).toString(16)).slice(-8) + ('00000000' + (r[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (r[1] >>> 0).toString(16)).slice(-8);
                            }
                        }, e.VERSION = '1.8.0', e;
                    });
                }
            }
        ]);
    }())
}