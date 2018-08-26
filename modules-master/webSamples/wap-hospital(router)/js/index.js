'use strict';
var tab_curr, tab, articles = document.querySelectorAll('#index_section article[data-role]'),
    tabbar = document.querySelector('footer>.tabbar'), isBack = false, noHome = true, hashLoad = true,
    PS = function (a) {
        a.state ? a.state.hash === history.state.hash ? isBack = true : null : (history.replaceState({hash: location.hash.slice(2)}, null, location.pathname + location.hash), isBack = false)
    }, Swiper = function (a, b) {
        var c = a.getElementsByClassName('swiper-pagination')[0];
        this.slider = a, this.opt = b, this.csp = function (g) {
            c.innerHTML = '';
            for (var k, h = 0; h < g; h++)k = document.createElement('span'), c.appendChild(k);
            c.firstChild.className = 'active'
        }, this.fsp = function (g) {
            c.querySelector('.active').className = '', c.children[g].className = 'active'
        }, b.callback || (this.opt.callback = this.fsp);
        var f = new Swipe(a, this.opt);
        return this.csp(f.getNumSlides()), f
    }, nohash = function () {
        if (!document.getElementById('home').classList.contains('active')) {
            var a = document.querySelector('#index_section article[data-role].active');
            closeSection(a, home), tabbar.querySelector('.active').classList.remove('active'), tabbar.firstElementChild.classList.add('active'), disablePointer(tabbar, 500), noHome && Home()
        }
    }, myMsg = function () {
        config.token && Post(config.host + '/v2/ChildCareUser/MessageNotReadNum', {
            token: config.token,
            type: 0
        }, function (a) {
            1 === a.status && (0 < a.data.number && document.getElementsByClassName('btn-msg')[0].classList.add('new'), 0 < a.data.cardNum && (card_n.textContent = a.data.cardNum), 0 < a.data.unusedCount && (coupon_n.textContent = a.data.unusedCount), myMsg = null)
        })
    }, hua = function () {
        var b, a = disease_type_list.children[0], f = function () {
            return document.querySelector('input[name="type"]:checked').value
        }, g = function (m, p, q) {
            return new Promise(function (r, t) {
                Post(config.host + '/v2/ChildCareUser/TopicList', {
                    type: m,
                    diseaseType: p,
                    page: 0,
                    size: 10
                }, function (u) {
                    if (1 === u.status) {
                        q.innerHTML = template('list_topic_template', {d: u.data.list});
                        var v = false;
                        u.data.page < u.data.totalPage - 1 ? q.dataset.page = 1 : (v = true) && (a.dataset.nomore = 1) && b.resetload(true), a.dataset.loaded = 1, r(v)
                    } else alarmToast(u.message), t(u.message)
                })
            })
        }, h = function (m, p, q, r) {
            return new Promise(function (t, u) {
                Post(config.host + '/v2/ChildCareUser/TopicList', {
                    type: p,
                    diseaseType: q,
                    page: m,
                    size: 10
                }, function (v) {
                    1 === v.status ? v.data.list.length ? (r.insertAdjacentHTML('beforeend', template('list_topic_template', {d: v.data.list})), v.data.page < v.data.totalPage - 1 ? (r.dataset.page = v.data.page + 1) && t() : u(Error('nomore'))) : u(Error('nomore')) : (alarmToast(v.message), u(v.message))
                })
            })
        };
        (function () {
            return new Promise(function (m, p) {
                var q = function (t) {
                    disease_type_list.innerHTML = template('disease_type_list_template', t);
                    for (var u = -1, v = t.diseaseTypeList.length; ++u < v;) {
                        var w = document.createElement('div'), x = document.createElement('ul');
                        x.id = 'list_topic' + (u + 1), x.className = 'list-hua', w.tabIndex = u + 1, w.appendChild(x), tab_bd.appendChild(w), x.innerHTML = '<img src="css/svg/jiazaip.svg" class="fw bg-white"><img src="css/svg/jiazaip.svg" class="fw bg-white">'
                    }
                };
                if (localStorage.ExpertFilters) q(JSON.parse(localStorage.ExpertFilters)), m(); else {
                    var r = new Promise(function (t, u) {
                        Post(config.host + '/v2/ChildCareUser/GetExpertFilters', {}, function (v) {
                            1 === v.status ? (localStorage.ExpertFilters = JSON.stringify(v.data), q(v.data), t()) : (alarmToast(v.message), u(Error(v.message)))
                        })
                    });
                    r.then(function () {
                        m()
                    }).catch(function (t) {
                        p(t)
                    })
                }
            })
        })().then(function () {
            g(1, 0, list_topic0).then(function () {
                loadJs('pulltorefresh', 'js/pulldown.js', function () {
                    b = new PullToRefresh({
                        el: '#hua', up: true, down: true, addNew: function () {
                            var m = disease_type_list.querySelector('.active');
                            return g(f(), m.dataset.dt, document.getElementById('list_topic' + m.tabIndex), this)
                        }, addMore: function () {
                            var m = disease_type_list.querySelector('.active'),
                                p = document.getElementById('list_topic' + m.tabIndex);
                            return h(p.dataset.page, f(), m.dataset.dt, p)
                        }
                    })
                })
            })
        }).catch(function (m) {
            alarmToast(m)
        }), function (m) {
            m.addDelegateListener('click', 'DT', function () {
                var q = this, r = q.parentNode.querySelector('.active'), t = r.tabIndex, u = q.tabIndex;
                a = q, q.dataset.nomore ? b.resetload(true) : b.resetload(false), q.dataset.loaded || g(f(), q.dataset.dt, document.getElementById('list_topic' + u)), r.className = '', q.className = 'active', tab_bd.children[t].className = '', tab_bd.children[u].className = 'active'
            })
        }(disease_type_list), document.getElementsByClassName('radio-sel')[0].addEventListener('click', function (m) {
            if ('INPUT' === m.target.tagName) {
                for (var p = disease_type_list.querySelector('.active'),
                         q = disease_type_list.firstElementChild; q;)q.dataset.loaded = '', q = q.nextElementSibling;
                g(f(), p.dataset.dt, document.getElementById('list_topic' + p.tabIndex))
            }
        }), document.getElementsByClassName('btn-sousuo-r')[0].addEventListener('click', function () {
            var m = document.createEvent('HTMLEvents');
            m.initEvent('touchend', true, false), search_hua.getElementsByTagName('input')[0].dispatchEvent(m), this.parentNode.previousElementSibling.className = ''
        }), search_hua.children[0].addEventListener('click', function () {
            search_hua.parentNode.className = 'hidden'
        })
    }, ke = function () {
        var a = [{active: false, load: false}, {active: false, load: false}], b = 0, f = function () {
            var h, g = 1, j = function () {
                return new Promise(function (v, w) {
                    Post(config.host + '/v2/ChildCareUser/NewMiniCourseHome', {token: config.token}, function (x) {
                        1 === x.status ? (banner_ke.innerHTML = template('banner_ke_template', {d: x.data.bannerList}), h = new Swiper(slider_ke, {
                            auto: 5e3,
                            autoRestart: false,
                            disableScroll: true,
                            stopPropagation: true
                        }), ke_disease.innerHTML = template('ke_disease_template', {d: x.data.columnList}), list_weike.innerHTML = template('weike_template', {d: x.data.recommendList}), g = 1, v()) : (alarmToast(x.message), w(x.message))
                    })
                })
            }, k = function (v, w) {
                return new Promise(function (x, y) {
                    Post(config.host + '/v2/ChildCareUser/RecommendMiniCourseList', {page: v, size: w}, function (z) {
                        1 === z.status ? z.data.list.length ? (list_weike.insertAdjacentHTML('beforeend', template('list_weike_template', {d: z.data.list})), z.data.page < z.data.totalPage - 1 ? (g = z.data.page + 1) && x() : y(Error('nomore'))) : y(Error('nomore')) : (alarmToast(z.message), y(z.message))
                    })
                })
            };
            j();
            var m = document.getElementById('weike').children[1], p = m.scrollHeight, q = 0, r = false, u = function () {
                0 === m.firstChild.clientHeight ? search_ke.classList.remove('vbh') : null
            };
            m.addEventListener('scroll', function () {
                q = m.scrollTop, r || window.requestAnimationFrame(function () {
                    q > slider_ke.offsetHeight - search_ke.offsetHeight ? search_ke.classList.add('search-scroll') : search_ke.classList.remove('search-scroll'), r = false
                }), r = true
            }), m.addEventListener('touchmove', function () {
                0 === m.firstChild.clientHeight ? search_ke.classList.remove('vbh') : search_ke.classList.add('vbh')
            }), m.addEventListener('touchend', function () {
                setTimeout(u, 600)
            }), loadJs('pulltorefresh', 'js/pulldown.js', function () {
                new PullToRefresh({
                    el: '#weike', up: true, down: true, addNew: j, addMore: function () {
                        return k(g, 5)
                    }
                })
            }), a[b].load = true, ke_nav.firstChild.addEventListener('touchend', function () {
                search_modal.classList.contains('weike') && search_ke.firstChild.click()
            })
        };
        (function () {
            Post(config.host + '/v2/ChildCareUser/NewCourseHome', {}, function (g) {
                if (1 === g.status) {
                    banner_course.innerHTML = template('banner_course_template', {d: g.data.banners});
                    new Swiper(slider_course, {auto: 5e3, autoRestart: false, disableScroll: true, stopPropagation: true});
                    if (course_cat.innerHTML = template('course_cat_template', {
                            d: g.data.columns,
                            p: Math.ceil(g.data.columns.length / 8)
                        }), 8 < g.data.columns.length) {
                        slider_course_cat.className = 'swipe';
                        new Swiper(slider_course_cat, {continuous: false})
                    }
                    free_list.innerHTML = template('free_list_template', {d: g.data.freeList}), charge_list.innerHTML = template('charge_list_template', {d: g.data.chargeList}), package_list.innerHTML = template('package_list_template', {d: g.data.packageList}), a[b].load = true, localStorage.courseFilters = JSON.stringify(g.data.columns)
                } else alarmToast(g.message)
            })
        })(), ke_nav.addDelegateListener('touchend', 'DT', function () {
            var h = this;
            a[b].active = false, ke_nav.children[b].className = '', ke_tab_bd.children[b].className = '', b = h.tabIndex, a[b].active = true, ke_nav.children[b].className = 'active', ke_tab_bd.children[b].className = 'active', a[b].load || f()
        })
    }, my = function () {
        sessionStorage.projectCode && (myinfo.href = 'signin.html?projectCode=' + sessionStorage.projectCode);
        var a = '', b = '';
        config.token && (Post(config.host + '/v2/auth/getuserinfo', {token: config.token}, function (f) {
            1 === f.status ? (myinfo.href = '/account/myinfo/', myinfo.firstChild.src = f.data.headIcon, b = f.data.userName, user_name.textContent = f.data.userName, a = f.data.userId) : alarmToast(f.message)
        }), myMsg && myMsg());
        var c = {
            self: document.getElementById('share_guide'), show: function () {
                this.self.style.display = 'block', mask.self.onclick = function () {
                    c.hide(), mask.hide()
                }, config.wxTitle = b + '\u9080\u8BF7\u60A8\u7528\u4E00\u6B3E\u80B2\u513F\u8F6F\u4EF6\uFF1A\u80B2\u513F\u5927\u5E08\uFF0C\u8D60\u900110\u5143\u4F18\u60E0\u5238', config.wxDescription = '\u80B2\u513F\u5927\u5E08\uFF0C\u8BA9\u80B2\u513F\u7B80\u5355', config.wxLink = location.protocol + '//' + location.host + '/invitepatients/userreg.html?platform=5&id=' + a, config.wxShareSuccess = function () {
                    c.hide(), mask.hide()
                }, config.wxOnShare()
            }, hide: function () {
                this.self.style.display = 'none', mask.self.onclick = null
            }
        };
        invitation.addEventListener('click', function () {
            if (bs.v.weixin) c.show(), mask.show(); else {
                var g = document.getElementById('share_modal');
                g || mask.self.insertAdjacentHTML('beforebegin', '<div id="share_modal" data-role="modal" class="modal"> <ul class="col-wrap bdsharebuttonbox" data-tag="share_1"> <li><a href="javascript:;" data-cmd="weixin"><img src="css/svg/share_weixin_timeline.svg">\u670B\u53CB\u5708</a></li> <li><a href="javascript:;" data-cmd="sqq"><img src="css/svg/share_qq.svg">QQ</a></li> <li><a href="javascript:;" data-cmd="tsina"><img src="css/svg/share_weibo.svg">\u5FAE\u535A</a></li> <li><a href="javascript:;" data-cmd="weixin"><img src="css/svg/share_qr_code.svg">\u4E8C\u7EF4\u7801</a></li> </ul> </div>'), window._bd_share_config = {
                    snsKey: {tsina: 2042857012},
                    common: {
                        bdText: b + '\u9080\u8BF7\u60A8\u7528\u4E00\u6B3E\u80B2\u513F\u8F6F\u4EF6\uFF1A\u80B2\u513F\u5927\u5E08\uFF0C\u8D60\u900110\u5143\u4F18\u60E0\u5238',
                        bdDesc: '\u80B2\u513F\u5927\u5E08\uFF0C\u8BA9\u80B2\u513F\u7B80\u5355',
                        bdUrl: location.protocol + '//' + location.host + '/invitepatients/userreg.html?platform=5&id=' + a,
                        bdMiniList: false,
                        bdPic: 'http://resource.3uol.com/images/minicourse/share.jpg'
                    },
                    share: {tag: 'share_1'}
                }, (document.head || document.getElementsByTagName('head')[0]).appendChild(document.createElement('script')).src = 'baidu/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date / 36e5), g = document.getElementById('share_modal'), g.classList.add('active'), mask.show(), mask.self.onclick = function () {
                    g.classList.remove('active'), mask.hide()
                }, g.addDelegateListener('touchend', 'IMG', function () {
                    this.parentNode.click()
                })
            }
        })
    }, allroutes = function () {
        var a = location.hash.slice(2), b = document.querySelector('#index_section article[data-role].active') || home,
            c = document.getElementById(a), f = f || tabbar.querySelector('.active');
        if (c) {
            var g = b.querySelector('.search-focusing>div:first-child');
            g && g.click(), isBack ? (tab = tabbar.children[getElementIndex(document.getElementById(history.state.hash))], closeSection(b, c), f.classList.remove('active'), tab.classList.add('active'), disablePointer(tabbar, 500)) : (tab = tabbar.children[getElementIndex(c)], hashLoad && noHome && location.hash ? (home.className = '', c.className = 'active', hashLoad = false) : getElementIndex(tab) < getElementIndex(f) ? (closeSection(b, c), disablePointer(tabbar, 500)) : (openSection(c, b), disablePointer(tabbar, 500)), f.classList.remove('active'), tab.classList.add('active'))
        }
    }, routes = {'/hua': {once: hua}, '/ke': {once: ke}, '/my': {once: my}}, router = Router(routes);
router.configure({
    on: allroutes,
    notfound: nohash
}), router.init(), window.addEventListener('popstate', PS), tabbar.addEventListener('click', function (a) {
    tab_curr = this.querySelector('.active'), tab = 'A' === a.target.nodeName ? a.target : a.target.parentElement
}), template.helper('diseaseTypeIcon', function (a) {
    return ['', 'erkejibin', 'fukechangke', 'muyingyingyang', 'muyingxinli', 'zaojiaotechang', 'ertaiVIP', 'ertaiVIP'][a]
}), location.hash || Home();
function Home() {
    home.className = 'active';
    var j, a = document.getElementById('slider'), b = document.getElementById('banner'),
        c = document.getElementById('disease'), f = document.getElementById('recommend'),
        g = document.getElementById('yewk'), h = !!localStorage.bannerList && JSON.parse(localStorage.bannerList),
        k = function () {
            return new Promise(function (w, x) {
                Post(config.host + '/v2/ChildCareUser/NewHome', {}, function (y) {
                    1 === y.status ? (!h && (b.innerHTML = template('banner_template', {d: y.data.bannerList}), j = new Swiper(a, {
                        auto: 3e3,
                        autoRestart: false,
                        disableScroll: true,
                        stopPropagation: true
                    })), c.innerHTML = template('disease_template', {d: y.data.sortList}), y.data.IGSStatus && (igs_banner.firstChild.textContent = y.data.IGSNum + '\u4F4D\u5BB6\u4EBA\u53C2\u4E0E') && (igs_banner.className = ''), live.innerHTML = template('live_template', {d: y.data.liveList}), topic.innerHTML = template('topic_template', {d: y.data.topicList}), f.innerHTML = template('recommend_template', {d: y.data.recommendList}), g.innerHTML = template('yewk_template', {d: y.data.miniCourseList}), localStorage.bannerList = JSON.stringify({d: y.data.bannerList}), w()) : (alarmToast(y.message), x(y.message))
                })
            })
        };
    h && (b.innerHTML = template('banner_template', h), j = new Swiper(a, {
        auto: 3e3,
        autoRestart: false,
        disableScroll: true,
        stopPropagation: true
    })), k().then(function () {
        loadJs('pulltorefresh', 'js/pulldown.js', function () {
            new PullToRefresh({el: '#home', down: true, addNew: k})
        })
    }).catch(function () {
    });
    var m = document.getElementsByClassName('scroller')[0], p = m.scrollHeight, q = 0, r = false, u = function () {
        0 === m.firstChild.clientHeight ? search.classList.remove('vbh') : null
    };
    m.addEventListener('scroll', function () {
        q = m.scrollTop, r || window.requestAnimationFrame(function () {
            q > a.offsetHeight - search.offsetHeight ? search.classList.add('search-scroll') : search.classList.remove('search-scroll'), r = false
        }), r = true
    }), m.addEventListener('touchmove', function () {
        0 === m.firstChild.clientHeight ? search.classList.remove('vbh') : search.classList.add('vbh')
    }), m.addEventListener('touchend', function () {
        setTimeout(u, 600)
    });
    var v = function (w) {
        w.addDelegateListener('click', 'DT', function () {
            var y = this, z = y.tabIndex, A = y.parentElement.getElementsByClassName('active')[0];
            A.className = '', y.className = 'active';
            var B = w.children[1];
            B.getElementsByClassName('active')[0].className = '', B.children[z].className = 'active'
        })
    };
    v(f), v(g), myMsg && myMsg(), noHome = false, hashLoad = false
}
(function () {
    var a = document.querySelectorAll('input[type=search]'), b = function () {
        history_article.firstElementChild.innerHTML = template('history_template', JSON.parse(localStorage.searchHistory)), history_article.classList.add('active'), rcm_article.classList.remove('active'), document.querySelector('article[data-role].active input[type=search]').removeEventListener('keydown', b)
    }, c = function (g) {
        var h = g.parentElement.parentElement;
        h.classList.remove('search-focusing', 'search-scroll'), search_modal.classList.remove('active', 'weike'), history_article.classList.remove('active'), rcm_article.classList.add('active')
    }, f = function (g, h) {
        g.addEventListener('touchend', function () {
            var k = this.parentElement.parentElement;
            sessionStorage.ListSearchPrompt ? function (m) {
                rcm_article.innerHTML = template('rcm_template', m)
            }(JSON.parse(sessionStorage.ListSearchPrompt)) : (lt.show(), Post(config.host + '/v2/ChildCareUser/ListSearchPrompt', {}, function (m) {
                lt.hide(), 1 === m.status ? (rcm_article.innerHTML = template('rcm_template', m.data), sessionStorage.ListSearchPrompt = JSON.stringify(m.data)) : alarmToast(m.message)
            })), k.classList.add('search-scroll', 'search-focusing'), h ? search_modal.classList.add('active', 'weike') : search_modal.classList.add('active'), localStorage.searchHistory && g.addEventListener('keydown', b)
        }), g.parentElement.previousElementSibling.addEventListener('click', function () {
            c(g)
        })
    };
    f(a[0]), f(a[1]), f(a[2], true), document.getElementById('rmsh').addEventListener('click', function () {
        localStorage.removeItem('searchHistory'), c(a[0]), c(a[1]), c(a[2])
    })
})();
