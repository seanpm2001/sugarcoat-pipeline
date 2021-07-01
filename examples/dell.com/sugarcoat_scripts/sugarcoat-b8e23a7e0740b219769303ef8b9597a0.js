{
    const $___mock_e8c1551ee0ed11f9 = {};
    (exports => {
        'use strict';
        const fetch = async (resource, init = null) => {
            throw new TypeError('Failed to fetch');
        };
        exports.fetch = {
            configurable: true,
            enumerable: true,
            value: fetch,
            writable: true
        };
    })($___mock_e8c1551ee0ed11f9);
    const $___mock_0eb34784d739165d = {};
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
    })($___mock_0eb34784d739165d);
    (function () {
        Marketing.bindDependencyDOMParsed(function () {
            var Bootstrapper = window['Marketing'];
            var ensightenOptions = Marketing.ensightenOptions;
            try {
                var firePixel = function () {
                    if (Marketing.UDO.promoid !== '100') {
                        window._svq = window._svq || [];
                        window._svq.push([
                            '_setAccount',
                            '5496_04572'
                        ]);
                        window._svq.push(['_trackPageView']);
                        Marketing.insertScript('//track.securedvisit.com/js/sv.js');
                    }
                };
                firePixel();
                if (Marketing.scDataObj.cms == 'olr')
                    window.addEventListener('udoReady', function (e) {
                        firePixel();
                    });
            } catch (e) {
                dell_marketing_util.debug(e);
            }
        }, 3449244, [3543579], 671192, [610323]);
        Marketing.bindDependencyDOMParsed(function () {
            var Bootstrapper = window['Marketing'];
            var ensightenOptions = Marketing.ensightenOptions;
            try {
                var firePixel = function () {
                    if (Marketing.UDO.promoid !== '100' && !location.href.includes('thankyou'))
                        Marketing.loadScriptCallback('https://ats.rlcdn.com/ats.js', function () {
                            const $___old_4ab734e76caffa21 = {}.constructor.getOwnPropertyDescriptor(window, 'fetch'), $___old_8e0a05a20da78ed5 = {}.constructor.getOwnPropertyDescriptor(window, 'localStorage');
                            try {
                                if ($___old_4ab734e76caffa21)
                                    ({}.constructor.defineProperty(window, 'fetch', $___mock_e8c1551ee0ed11f9.fetch));
                                if ($___old_8e0a05a20da78ed5)
                                    ({}.constructor.defineProperty(window, 'localStorage', $___mock_0eb34784d739165d.localStorage));
                                return function () {
                                    window.ats.start({
                                        'placementID': '13442',
                                        'storageType': 'localStorage',
                                        'detectionType': 'scrapeAndUrl',
                                        'urlParameter': 'env',
                                        'emailHashes': [Marketing.UDO.emailhash],
                                        'logging': 'error'
                                    });
                                    var domainMap = location.host.includes('delltechnologies') ? 'delltechnologies.com' : 'dell.com';
                                    var promoidMap = {
                                        1: 'main_homepage',
                                        2: 'seg_homepage',
                                        3: 'productcategory',
                                        4: 'deals',
                                        5: 'family',
                                        6: 'features',
                                        7: 'productdetails',
                                        8: 'configurator',
                                        9: 'cart'
                                    };
                                    var pageName = promoidMap[Marketing.UDO.promoid] ? promoidMap[Marketing.UDO.promoid] : domainMap.includes('dell.com') ? 'dell_page' : 'delltech_page';
                                    var envelopValue = localStorage.getItem('_lr_env') ? localStorage.getItem('_lr_env') : '';
                                    var pdataMap = 'country=' + Marketing.UDO.country + ',language=' + Marketing.UDO.language + ',segment=' + Marketing.UDO.segment + ',domain=' + domainMap + ',page=' + pageName;
                                    Marketing.imageRequest('//t.rlcdn.com/api/segment?pid=711394&it=19&iv=' + envelopValue + '&pdata=' + encodeURIComponent(pdataMap));
                                }.apply(this, arguments);
                            } finally {
                                if ($___old_4ab734e76caffa21)
                                    ({}.constructor.defineProperty(window, 'fetch', $___old_4ab734e76caffa21));
                                if ($___old_8e0a05a20da78ed5)
                                    ({}.constructor.defineProperty(window, 'localStorage', $___old_8e0a05a20da78ed5));
                            }
                        });
                };
                firePixel();
                if (Marketing.scDataObj.cms == 'olr')
                    window.addEventListener('udoReady', function (e) {
                        firePixel();
                    });
            } catch (e) {
                dell_marketing_util.debug(e);
            }
        }, 3543578, [3543579], 687149, [610323]);
    }())
}