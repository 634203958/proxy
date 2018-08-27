import Address from '../../location';
import './util.less';

/**
 * 返回顶部方法封装
 * @display {string} domClass 控制目标按钮的显示隐藏-超出一屏时显示-componentDidMount时调用
 * @top {e} 目标元素的点击事件 返回顶部 点击时触发 e必传 阻止默认时间和阻止冒泡。
 *
 * */

const scrollToTop = {
    display: function (domClass) {
        if (domClass && typeof domClass === 'string') {
            //按钮元素
            let btnTop = document.getElementsByClassName(domClass);
            //屏幕的高度
            let clientHeight = document.documentElement.clientHeight;

            //滚动事件
            window.onscroll = function () {
                //页面滚动的高度
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > clientHeight) {
                    btnTop[0].style.display = 'block';
                } else {
                    btnTop[0].style.display = 'none';
                }
            };
        }
    },
    top: function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            let timer = setInterval(function () {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //做减速运动
                scrollTop -= Math.ceil(scrollTop / 30);
                window.scrollTo(0, scrollTop);
                if (scrollTop === 0) {
                    clearInterval(timer);
                }
            }, 10);
        }
    }
};

export {scrollToTop};

/**
 * 非空验证
 * @params val
 *
 **/
export function verifyEmpty(val) {
    return !!val ? true : false;
}

/**
 * 分享
 *
 **/
export function setShare(shareModel, type = false, index = 1) {
    if (shareModel && shareModel.title) {
        if (browser.parseUA.isApp && type) {
            JSBridge.share(
                shareModel.title || '',
                shareModel.comment || '',
                shareModel.url || '',
                shareModel.image || '',
                {
                    specifiedChannel: [index]
                }
            );
        } else {
            Share.init({
                title: shareModel.title,
                desc: shareModel.comment,
                image: shareModel.image,
                url: shareModel.url,
                options: {
                    channels: shareModel.channels || [1, 2],
                    needCallback: shareModel.needCallback || false
                }
            });
        }
    }
}

/**
 * 禁止页面滚动
 * **/
export function noScroll(isScroll) {
    let $body = $('html,body');
    if (isScroll) {
        $body.addClass('no-scroll');
    } else {
        $body.removeClass('no-scroll');
    }
}

window.noScroll = noScroll;

/**
 * 域名拦截
 * @return boolean
 *
 **/
export function xDomain() {
    let lt = window.location, origin = lt.origin;
    let h5 = 'h5.caibeike.com.cn', cbkbuy = 'm.cbkbuy.cn';

    if (origin.indexOf(h5) > -1 || origin.indexOf(cbkbuy) > -1) {
        location.href = `//m.caibeike.com${lt.pathname + lt.search}`;
        return false;
    } else {
        return true;
    }
}

/**
 * 设置标题
 *
 **/
export function setTitle(name) {
    document.title = name;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none; width: 0; height: 0;';
    iframe.src = '/favicon.ico';
    const listener = () => {
        setTimeout(() => {
            iframe.removeEventListener('load', listener);
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 0);
        }, 0);
    };
    iframe.addEventListener('load', listener);
    document.body.appendChild(iframe);
}

/**
 * 随机字符串
 * @return string
 *
 **/
export function randomString() {
    return Math.ceil(Math.random() * new Date().getTime() * Math.random()).toString();
}

/**
 * 检测ios系统版本号
 * @return 版本号
 *
 **/
export function IosSystemNo() {
    let ua = navigator.userAgent.toLowerCase(), ver = ua.match(/cpu iphone os (.*?) like mac os/);
    return ver[1].replace(/_/g, '.');
}

/**
 * 截取url参数
 * @return value
 *
 **/
export function queryCode(name) {
    if (window.location.href.indexOf('?') <= -1) {
        return null;
    }
    let url = window.location.href.substr(window.location.href.indexOf('?') + 1), pairs = url.split('&');
    let params = {};
    for (let i = 0, len = pairs.length; i < len; i++) {
        let map = pairs[i].split('=');
        map[0] in params ? params[map[0]] = map[1] : params[map[0]] = map[1];
    }
    return params[name];
}

/**
 * 手机号
 * @return boolean
 *
 **/
export function isPhone(mobile) {
    return /^1\d{10}$/.test(mobile);
}

/**
 * 手机号 && 固话
 * @return boolean
 *
 **/
export function isTel(tel) {
    let mobile = /^1\d{10}$/, phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
}

/**
 * 身份证
 * @return boolean
 *
 **/
export function isId(id) {
    return !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id);
}

/**
 * 获取header信息
 * @return object
 *
 **/
export function getHeaderItem(name) {
    if (!window._headers) {
        return {};
    }
    let list = {}, headers = window._headers;
    for (let key of Object.keys(headers)) {
        if (key === name) {
            list = headers[key];
        }
    }
    return list;
}

/**
 * ajax
 *
 **/
export function ajax(options) {
    options.url = options.url || '';
    options.type = options.type || 'POST';
    options.data = options.data || {};
    options.dataType = options.dataType || 'json';

    // 异步
    options.async === false ? options.async = false : options.async = true;
    let headers = {}, headersType = options.headers || true;
    // 设置headers信息
    if (headersType && browser.parseUA.isApp) {
        headers = getHeaderItem('x-app-', true);
    }

    // add x-app-referer
    if (headersType && browser.versions.wechat) {
        headers = Object.assign({}, headers, {'x-app-referer': location.href});
    }

    if (headersType) {
        headers = Object.assign({}, headers, options.headers);
    }

    $.ajax({
        url: options.url,
        type: options.type,
        data: options.data,
        dataType: options.dataType,
        async: options.async,
        headers: headers,
        beforeSend: function () {
            if (!options.unload) {
                loadStart();
            }
            if (options && typeof options.beforeSend === 'function') {
                options.beforeSend();
            }
        },
        success: function (data) {
            // 未登录
            if (data.code === 201) {
                if (browser.parseUA.isApp) {
                    location.href = location.href.indexOf('?') < 0 ? location.href + '?auth=1' : location.href + '&auth=1';
                } else {
                    let url = encodeURIComponent(location.href.replace(/.com.cn/, '.com').replace(/h5.caibeike.com/, 'm.caibeike.com'));
                    location.href = Address.url('/ms/user/login?url=' + url);
                }
            } else {
                if (options && typeof options.success === 'function') {
                    options.success(data);
                }
            }
        },
        error: function (error) {
            if (options && typeof options.error === 'function') {
                options.error(error);
            }
        },
        complete: function () {
            if (!options.unload) {
                loadEnd();
            }
            if (options && typeof options.complete === 'function') {
                options.complete();
            }
        }
    });
}

/**
 * 加载load
 *
 **/
export function loadStart() {
    if ($('.f-load').length <= 0) {
        showLoad();
    }

    function showLoad() {
        $('body').append('<div class="f-position f-load"><div class="f-center"><div class="indicator"></div></div></div>');
        $('.f-load').addClass('f-show');
    }
}

/**
 * 隐藏load
 *
 **/
export function loadEnd() {
    let load = $('.f-load'), timer = null;
    if (load && load.length > 0) {
        load.addClass('f-hide');
        timer = setTimeout(function () {
            load.remove();
            clearTimeout(timer);
        }, 120);
    }
}

/**
 * toast
 * @info
 * @success
 * @warn
 *
 **/
const toast = {
    info(title = '', duration) {
        if (title === '') return;
        this.append(title, duration, 'toast-info');
    },
    success(title, duration) {
        if (title === '') return;
        this.append(title, duration, 'toast-success');
    },
    warn(title, duration) {
        if (title === '') return;
        this.append(title, duration, 'toast-warn');
    },
    append(title, duration = 1.85, className) {
        let toast = $('<div>', {class: 'Atoast'});
        if (className !== 'toast-info') {
            let content = $('<div>', {class: className}), text = $('<div>', {class: 'toast-text', text: title});
            $('body').append(toast.append(content.append(text)));
        } else {
            let content = $('<div>', {class: className, text: title});
            $('body').append(toast.append(content));
        }
        setTimeout(function () {
            toast.remove();
        }, duration * 1000);
    }
};
export {toast};

/**
 * Modal
 * @title string
 * @content string
 * @cancel boolean
 * @onOk fn
 * @onCancel fn
 *
 **/
export function Modal({title = '提示', content = '', cancel = false, onOk, onCancel}) {
    if (title === '' && content === '') return;
    let ModalWrapper = $('<div>', {class: 'Amodal-wrap',}),// 蒙版

        Modal = $('<div>', {class: 'modal'}),// Modal弹层
        titleDiv = (title ? $('<div>', {class: 'title', text: title,}) : ''),// 标题
        contentDiv = (content ? $('<div>', {class: 'content', text: content}) : ''),// 内容
        operateDiv = $('<div>', {class: 'operate'}),// 操作区域
        cancelBtn = (cancel ? $('<div>', {class: 'cancel', text: '取消',}) : ''),// 取消按钮
        confirmBtn = $('<div>', {class: 'confirm', text: '确认',});// 确认按钮
    if (!!cancelBtn) {
        cancelBtn.on('click', function () {
            ModalWrapper.remove();
            if (Object.prototype.toString.call(onCancel) === '[object Function]') {
                onCancel();
            }
        });
    }

    confirmBtn.on('click', function () {
        ModalWrapper.remove();
        if (Object.prototype.toString.call(onOk) === '[object Function]') {
            onOk();
        }
    });

    $('body').append(ModalWrapper.append(Modal.append(titleDiv).append(contentDiv).append(operateDiv.append(cancelBtn).append(confirmBtn))));
}

/**
 * 是否下载app
 *
 **/
export function handleDownloadApp(txt) {
    if (!browser.parseUA.isApp) {
        Modal({
            content: txt || '是否跳转下载App',
            cancel: true,
            onOk: function () {
                let link = /micromessenger/i.test(navigator.userAgent) ? 'https://a.app.qq.com/o/simple.jsp?pkgname=com.caibeike.android' : 'https://m.caibeike.com';
                window.location.href = link;
            }
        });
    }
}

/**
 * 下载条
 * @params position
 * @params title
 * @params subtitle
 * @params href
 *
 **/
export function download(position, title, subtitle, href) {
    // 判断当前界面是否包含下载条
    if ($('._download-container').length > 0) {
        $('._download-container').remove();
        $('._download-content-placeholder').remove();
    }

    let t = title || '彩贝壳，精选周末好趣处', d = subtitle || '给宝贝一个闪闪发光的童年', p = position || 'top',
        h = href || 'https://m.caibeike.com';
    let html = $('<div class="_download-container"> ' +
        '<a href=' + h + '> ' +
        '<div class="download-content"> ' +
        '<img class="download-content-logo" src="https://cdn.caibeike.com/static/images/download_icon@2x.png"/> ' +
        '<p class="download-content-title">' + t + '</p> ' +
        '<p class="download-content-detail">' + d + '</p> ' +
        '<span class="download-content-go">去看看</span></div> </a> </div><div class="_download-content-placeholder"></div>');

    if (p && p === 'top') {
        $(html[0]).addClass('_download-container_top');
        $('body').prepend(html);
    } else if (p && p === 'bottom') {
        $(html[0]).addClass('_download-container_bottom');
        $('body').append(html);
    }
}

/**
 * 微信分享提示
 **/
export function shareTips() {
    let tips = $('.f-tips'), body = $('body');
    if (tips && tips.length > 0) {
        tips.remove();
    } else {
        body.append('<div class="f-position f-show f-tips"><div class="tips-image"></div></div>');
        $('.f-tips').on('touchend', function (e) {
            e.preventDefault();
            $(this).remove();
        });
    }
}

/**
 * 图片加载
 * @imgAry name
 * @params options
 *
 **/
export function lazyImage(imgAry, options) {
    let idx = 0;
    if (!Array.isArray(imgAry)) {
        console.error('图片类型错误 type Array');
        return false;
    } else if (imgAry.length > 0) {
        if (options && !options.unload) {
            loadStart();
        }
        if (options && typeof options.before === 'function') {
            options.before();
        }

        // 执行加载完最后一张图片执行success方法（无论图片加载成功 / 失败）
        let loadImage = function (idx) {
            if (idx === imgAry.length) {
                if (options && typeof options.success === 'function') {
                    options.success(idx);
                }
                if (options && !options.unload) {
                    loadEnd();
                }
            }
        };

        for (let i = 0; i < imgAry.length; i++) {
            (function (i) {
                let newImage = new Image();
                newImage.src = imgAry[i];
                newImage.onload = function () {
                    loadImage(++idx);
                };

                newImage.onerror = function () {
                    loadImage(++idx);
                    console.error('图片:' + imgAry[i] + '加载失败');
                };
            })(i);
        }
    }
}

/**
 * timer
 * @timestamp
 * @timeString
 * @getTs
 *
 **/
const timer = {
    timestamp: function () {
        let date = new Date();
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds(),
            week: date.getDay()
        };
    }(),
    timeString: function () {   // 获取当前年月日格式化时间
        return `${timer.timestamp.year}-${timer.timestamp.month}-${timer.timestamp.day}`;
    },
    getTs: function (data) {   // 获取指定时间毫秒数 data = '2017-06-06 24:00'
        if (data) {
            return new Date(data).getTime();
        } else {
            return new Date().getTime();
        }
    }
};
export {timer};

/**
 * browser
 * @parseUA
 * @versions
 * @language
 *
 **/
const browser = {
    parseUA: function () {
        let match = /^caibeike.+\(com\.caibeike\.(\w+)\s+(\d+(\.\d+)*);.*\).*$/i.exec(navigator.userAgent);
        return {
            isIphoneX: window.devicePixelRatio && window.devicePixelRatio === 3 && document.documentElement.clientWidth === 375 && (navigator.userAgent.indexOf('Safari') > -1),
            isApp: !!match,
            platform: match && (match[1] === 'caibeike' ? 'ios' : (match[1] === 'android' ? 'android' : 'other')),
            version: match && match[2]
        };
    }(),
    versions: function () {
        let u = navigator.userAgent, app = navigator.appVersion, ua = u.toLowerCase();
        return {
            wechat: ua.match(/MicroMessenger/i) === 'micromessenger',
            trident: u.indexOf('Trident') > -1,                             // IE内核
            webKit: u.indexOf('AppleWebKit') > -1,                          // 苹果、谷歌内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),                     // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  // android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1,                               // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,                                   // 是否iPad
            webApp: u.indexOf('Safari') === -1,                             // 是否web应该程序，没有头部与底部
            appVersion: app                                                 // 完整的版本信息
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

export {browser};
