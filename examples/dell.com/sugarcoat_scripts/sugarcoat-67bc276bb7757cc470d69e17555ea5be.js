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
            var Bootstrapper = window['Marketing'];
            var ensightenOptions = Marketing.ensightenOptions;
            try {
                var geo = [
                    'au',
                    'nz',
                    'in',
                    'sg',
                    'my',
                    'jp',
                    'kr'
                ];
                var url = 'v1=&v2=' + Marketing.UDO.deals + '&v3=&s1=' + window.location.href + '&s2=' + document.referrer + '&s3=' + Marketing.UDO.promoid;
                var fullUrl = 's1=' + window.location.href + '&s2=' + document.referrer + '&s3=' + Marketing.UDO.promoid + '&s4=' + Marketing.UDO.revenue + '&s5=' + Marketing.UDO.prodcat + '&s7=' + Marketing.UDO.ordercode + '&s8=' + Marketing.UDO.category + '&s9=' + Marketing.UDO.family + '&s10=' + Marketing.UDO.product + '&v2=' + Marketing.UDO.deals + '&v5=' + Marketing.scDataObj.country + '&v6=' + Marketing.scDataObj.language + '&v7=' + Marketing.UDO.cseg + '&v8=' + Marketing.scDataObj.segment + '&v9=' + Marketing.UDO.platform + '&v10=' + Marketing.UDO.ogid;
                if (geo.indexOf(Dell.Metrics.sc.country) > -1)
                    Marketing.insertScript('//pixel.mathtag.com/event/js?mt_id=1367447&mt_adid=189166&mt_exem=&' + fullUrl);
                if (Marketing.scDataObj.country == 'au' || Marketing.scDataObj.country == 'nz' || Marketing.scDataObj.country == 'in' || Marketing.scDataObj.country == 'jp')
                    Marketing.insertScript('//pixel.mathtag.com/event/js?mt_id=1325365&mt_adid=189166&mt_exem=&' + url);
                if (Marketing.scDataObj.country == 'au' || Marketing.scDataObj.country == 'nz')
                    Marketing.insertScript('//pixel.mathtag.com/event/img?mt_id=1338479&mt_adid=189166&mt_exem=&mt_excl=&' + url + '&ord=%n');
                if (Marketing.scDataObj.country == 'jp')
                    Marketing.insertScript('//pixel.mathtag.com/event/js?mt_id=1338482&mt_adid=189166&mt_exem=&mt_excl=&' + url);
                if (Marketing.scDataObj.country == 'in')
                    Marketing.insertScript('//pixel.mathtag.com/event/js?mt_id=1338481&mt_adid=189166&mt_exem=&mt_excl=&' + url);
            } catch (e) {
                dell_marketing_util.debug(e);
            }
        }, 3138900, [
            3506924,
            3543579
        ], 609820, [
            610310,
            610323
        ]);
        Marketing.bindDependencyDOMParsed(function () {
            var Bootstrapper = window['Marketing'];
            var ensightenOptions = Marketing.ensightenOptions;
            try {
                if (Marketing.UDO.priorconsent) {
                    var marketingscDataObj = Marketing.scDataObj;
                    var marketingUDO = Marketing.UDO;
                    var segID = '';
                    var pixelID = '';
                    if (marketingscDataObj.segment == 'bsd')
                        if (marketingscDataObj.page == 'confirmation') {
                            segID = 'id=1118371&seg=18017873';
                            pixelID = '1118371';
                        } else {
                            segID = 'id=1096951&seg=17552822';
                            pixelID = '1096951';
                        }
                    if (marketingscDataObj.segment == 'dhs')
                        if (marketingscDataObj.page == 'confirmation') {
                            segID = 'id=1020310&seg=14151261';
                            pixelID = '1020310';
                        } else {
                            segID = 'id=1020278&seg=14149195';
                            pixelID = '1020278';
                        }
                    if (marketingscDataObj.segment == 'eep')
                        if (marketingscDataObj.page == 'confirmation') {
                            segID = 'id=1184281&seg=19739814';
                            pixelID = '1184281';
                        } else {
                            segID = 'id=1184275&seg=19739730';
                            pixelID = '1184275';
                        }
                    if (marketingscDataObj.cms == 'dellemc' || marketingscDataObj.cms == 'delltech' || marketingscDataObj.cms == 'olr')
                        if (marketingscDataObj.cms == 'olr') {
                            var firePremierPixel = function () {
                                if (window.location.href.includes('/cart/thankyou') || marketingUDO.promoid == '100') {
                                    var encodeURL = encodeURIComponent('https://pixel.mediaiqdigital.com/pixel?u1=' + marketingUDO.cid + '&u2=' + marketingUDO.type + '&u3=&u4=&u5=' + marketingUDO.discount + '&u6=' + marketingUDO.ogid + '&u7=' + marketingUDO.currency + '&u8=' + marketingUDO.coupon + '&u9=' + marketingUDO.prodcat + '&u10=' + marketingUDO.country + '&u11=' + marketingUDO.language + '&u12=' + marketingUDO.device + '&u13=' + marketingUDO.platform + '&u14=' + marketingUDO.promoid + '&u15=' + encodeURIComponent(marketingUDO.category) + '&u16=' + marketingUDO.deals + '&u17=' + encodeURIComponent(marketingUDO.family) + '&u18=' + encodeURIComponent(marketingUDO.product) + '&u19=' + marketingUDO.ordercode + '&u20=' + marketingUDO.accountid + '&u21=' + JSON.stringify(marketingUDO.productlist) + '&u22=' + marketingUDO.country + '&pixel_id=1184274&uid=${UID}');
                                    Marketing.imageRequest('//secure.adnxs.com/px?id=1184274&seg=19739708&order_id=' + marketingUDO.ogid + '&value=' + marketingUDO.revenue + '&redir=' + encodeURL + '&t=2');
                                }
                            };
                            firePremierPixel();
                            window.addEventListener('hashchange', function (e) {
                                firePremierPixel();
                            });
                        } else {
                            var encodeURL = encodeURIComponent('https://pixel.mediaiqdigital.com/pixel?u1=' + marketingUDO.accountid + '&u2=' + encodeURIComponent(marketingUDO.category) + '&u3=' + marketingUDO.categorypath + '&u4=' + marketingUDO.country + '&u5=' + marketingUDO.cid + '&u6=' + marketingUDO.language + '&u7=' + encodeURIComponent(marketingUDO.family) + '&u8=' + marketingUDO.prodcat + '&u9=' + encodeURIComponent(marketingUDO.product) + '&pixel_id=1184270&uid=${UID}');
                            Marketing.imageRequest('//secure.adnxs.com/px?id=1184270&seg=19739702&order_id=' + marketingUDO.ogid + '&value=' + marketingUDO.revenue + '&redir=' + encodeURL + '&t=2');
                        }
                    if (segID != '' && pixelID != '')
                        if (marketingscDataObj.page == 'confirmation') {
                            var redirectURL = encodeURIComponent('https://pixel.mediaiqdigital.com/pixel?u1=' + marketingUDO.cid + '&u2=' + marketingUDO.type + '&u3=&u4=&u5=' + marketingUDO.discount + '&u6=' + marketingUDO.ogid + '&u7=' + marketingUDO.currency + '&u8=' + marketingUDO.coupon + '&u9=' + marketingUDO.prodcat + '&u10=' + marketingUDO.country + '&u11=' + marketingUDO.language + '&u12=' + marketingUDO.device + '&u13=' + marketingUDO.platform + '&u14=' + marketingUDO.promoid + '&u15=' + encodeURIComponent(marketingUDO.category) + '&u16=' + marketingUDO.deals + '&u17=' + encodeURIComponent(marketingUDO.family) + '&u18=' + encodeURIComponent(marketingUDO.product) + '&u19=' + marketingUDO.ordercode + '&u20=' + marketingUDO.accountid + '&u21=' + JSON.stringify(marketingUDO.productlist) + '&u22=' + marketingUDO.country + '&pixel_id=' + pixelID + '&uid=${UID}');
                            Marketing.imageRequest('//secure.adnxs.com/px?' + segID + '&order_id=' + marketingUDO.ogid + '&value=' + marketingUDO.revenue + '&redir=' + redirectURL + '&t=2');
                        } else {
                            var redirectURL = encodeURIComponent('https://pixel.mediaiqdigital.com/pixel?u1=' + marketingUDO.accountid + '&u2=' + encodeURIComponent(marketingUDO.category) + '&u3=' + marketingUDO.categorypath + '&u4=' + marketingUDO.country + '&u5=' + marketingUDO.cid + '&u6=' + marketingUDO.language + '&u7=' + encodeURIComponent(marketingUDO.family) + '&u8=' + marketingUDO.prodcat + '&u9=' + encodeURIComponent(marketingUDO.product) + '&pixel_id=' + pixelID + '&uid=${UID}');
                            Marketing.imageRequest('//secure.adnxs.com/px?' + segID + '&order_id=' + marketingUDO.ogid + '&value=' + marketingUDO.revenue + '&redir=' + redirectURL + '&t=2');
                        }
                }
            } catch (e) {
                dell_marketing_util.debug(e);
            }
        }, 3237936, [3543579], 631706, [610323]);
        Marketing.bindDependencyDOMParsed(function () {
            const $___old_f8650588c1fcb89c = {}.constructor.getOwnPropertyDescriptor(window, 'sessionStorage');
            try {
                if ($___old_f8650588c1fcb89c)
                    ({}.constructor.defineProperty(window, 'sessionStorage', $___mock_0eb34784d739165d.sessionStorage));
                return function () {
                    var Bootstrapper = window['Marketing'];
                    var ensightenOptions = Marketing.ensightenOptions;
                    try {
                        if (Marketing.UDO.priorconsent) {
                            var buildUrl = function (spotname) {
                                return '//pixel.mathtag.com/event/img?mt_id=1252537&mt_adid=129805&mt_exem=&mt_excl=&v1=&v2=&v3=&s1=' + window.location.href + '&s2=' + window.document.referrer + '&s3=' + spotname;
                            };
                            var mpvUrl = buildUrl('HVE_Multi_3_page_views');
                            Marketing.UDO.hve_mpv(mpvUrl);
                            var socialUrl = buildUrl('HVE_Social_shares');
                            Marketing.UDO.hve_social(socialUrl);
                            var downloadUrl = buildUrl('HVE_Asset_downloads');
                            Marketing.UDO.hve_download(downloadUrl);
                            var videoUrl = buildUrl('HVE_Video_play');
                            Marketing.UDO.hve_ytube(videoUrl);
                            Marketing.UDO.hve_bcove(videoUrl);
                            var chatUrl = buildUrl('HVE_Chat');
                            Marketing.UDO.hve_chat(chatUrl);
                            var contactUrl = buildUrl('HVE_ContactUs');
                            Marketing.UDO.hve_contactUs(contactUrl);
                            var rfqSubmitUrl = buildUrl('HVE_rfq_submit');
                            Marketing.UDO.hve_rfq_submit(rfqSubmitUrl);
                        }
                    } catch (e) {
                        dell_marketing_util.debug(e);
                    }
                }.apply(this, arguments);
            } finally {
                if ($___old_f8650588c1fcb89c)
                    ({}.constructor.defineProperty(window, 'sessionStorage', $___old_f8650588c1fcb89c));
            }
        }, 3535115, [3543579], 634023, [610323]);
    }())
}