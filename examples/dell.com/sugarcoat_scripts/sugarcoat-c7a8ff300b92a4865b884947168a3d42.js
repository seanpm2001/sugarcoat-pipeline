{
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
            const $___old_a7d2326f09e76f91 = {}.constructor.getOwnPropertyDescriptor(window, 'sessionStorage');
            try {
                if ($___old_a7d2326f09e76f91)
                    ({}.constructor.defineProperty(window, 'sessionStorage', $___mock_0eb34784d739165d.sessionStorage));
                return function () {
                    var Bootstrapper = window['Marketing'];
                    var ensightenOptions = Marketing.ensightenOptions;
                    try {
                        var marketingscDataObj = Marketing.scDataObj, marketingUDO = Marketing.UDO, cachebuster = new Date().getTime(), pixelID = '', hvePixelID = '';
                        var pixelFire = function (pixelid) {
                            Marketing.imageRequest('//t.myvisualiq.net/activity_pixel?pt=i&et=a&r=' + cachebuster + '&ago=212&ao=871&px=' + pixelid + '&ord=' + marketingUDO.ogid + '&revenue=' + marketingUDO.revenue);
                        };
                        Marketing.on('click', '.OoyalaVideo', function () {
                            pixelid = '1001';
                            pixelFire(pixelid);
                            if (marketingscDataObj.page.includes('alienware') || marketingscDataObj.categoryid.includes('alienware') || marketingUDO.category.includes('alienware') || marketingUDO.family.toLowerCase().includes('alienware')) {
                                pixelid = '1002';
                                pixelFire(pixelid);
                            }
                            if (marketingUDO.segment == 'bsd') {
                                pixelid = '1003';
                                pixelFire(pixelid);
                            }
                            if (marketingUDO.segment == 'dhs') {
                                pixelid = '1004';
                                pixelFire(pixelid);
                            }
                            if (marketingUDO.segment == 'eep') {
                                pixelid = '1005';
                                pixelFire(pixelid);
                            }
                        });
                        if (window.location.pathname == '/en/small-business-central') {
                            pixelid = '1006';
                            pixelFire(pixelid);
                        }
                        if (window.location.pathname.includes('/en/small-business-central/contact-dell/thank-you')) {
                            pixelid = '1007';
                            pixelFire(pixelid);
                        }
                        marketingUDO.hve_mpv('//t.myvisualiq.net/activity_pixel?pt=i&et=a&r=' + cachebuster + '&ago=212&ao=871&px=878&ord=' + marketingUDO.ogid + '&revenue=' + marketingUDO.revenue);
                        if (marketingUDO.segment == 'bsd')
                            hvePixelID = '880';
                        if (marketingUDO.segment == 'dhs')
                            hvePixelID = '881';
                        if (marketingUDO.segment == 'eep')
                            hvePixelID = '882';
                        if (marketingscDataObj.page.includes('alienware') || marketingscDataObj.categoryid.includes('alienware') || marketingUDO.category.includes('alienware') || marketingUDO.family.toLowerCase().includes('alienware'))
                            hvePixelID = '879';
                        if (hvePixelID !== '')
                            marketingUDO.hve_mpv('//t.myvisualiq.net/activity_pixel?pt=i&et=a&r=' + cachebuster + '&ago=212&ao=871&px=' + hvePixelID + '&ord=' + marketingUDO.ogid + '&revenue=' + marketingUDO.revenue);
                    } catch (e) {
                        dell_marketing_util.debug(e);
                    }
                }.apply(this, arguments);
            } finally {
                if ($___old_a7d2326f09e76f91)
                    ({}.constructor.defineProperty(window, 'sessionStorage', $___old_a7d2326f09e76f91));
            }
        }, 3206938, [3543579], 638020, [610323]);
    }())
}