/* ============================================================
   ZCC Platform — shared chrome: header, footer, interactions
   ============================================================ */
(function () {
  'use strict';

  var NAV = [
    { id: 'index',        label: '概览',      href: 'index.html',        sub: 'Platform overview' },
    { id: 'nav',          label: '功能导航',  href: 'nav.html',          sub: 'Function map' },
    { id: 'architecture', label: '平台架构',  href: 'architecture.html',  sub: 'Architecture',
      menu: [
        { t: '六层功能架构', d: 'Layer 1 – 6', h: 'architecture.html#layers' },
        { t: '数据底座',     d: '统一实体与事件总线', h: 'architecture.html#data' },
        { t: '技术架构',     d: '前端 / 后端 / 集成', h: 'architecture.html#tech' },
        { t: '守恒约束',     d: '不允许超额分配', h: 'architecture.html#invariant' }
      ] },
    { id: 'portals',      label: '门户矩阵',  href: 'portals.html',       sub: 'Portals' },
    { id: 'carbon',       label: '碳权益层',  href: 'carbon.html',        sub: 'Carbon rights',
      menu: [
        { t: '碳资产台账',   d: '注册簿聚合视图', h: 'carbon.html#ledger' },
        { t: 'MRV 状态机',   d: '七步端到端', h: 'carbon.html#mrv' },
        { t: '双重计算防火墙', d: '一吨只能去一处', h: 'carbon.html#firewall' },
        { t: '注销与披露包', d: '不可逆 + 数据准备', h: 'carbon.html#retire' }
      ] },
    { id: 'capital',      label: '资本栈',    href: 'capital.html',       sub: 'Capital stack',
      menu: [
        { t: '孵化层',       d: '可融资化 + 可测量化', h: 'capital.html#incubate' },
        { t: '社区股权众筹', d: 'SPV 集中持股', h: 'capital.html#crowd' },
        { t: '机构与基金',   d: '数据室 / 资本调用', h: 'capital.html#fund' },
        { t: '退出与双收益', d: '股权 + 碳权益', h: 'capital.html#exit' }
      ] },
    { id: 'compliance',   label: '合规风控',  href: 'compliance.html',    sub: 'Compliance' },
    { id: 'roadmap',      label: '路线图',    href: 'roadmap.html',       sub: 'Roadmap' }
  ];

  var current = document.body.getAttribute('data-page') || 'index';

  function navHTML() {
    return NAV.map(function (n) {
      var on = n.id === current ? ' on' : '';
      var caret = n.menu ? '<i class="nav-caret"></i>' : '';
      var dd = '';
      if (n.menu) {
        dd = '<div class="dropdown"><div class="dd-head">' + n.sub + '</div>' +
          n.menu.map(function (m) {
            return '<a href="' + m.h + '">' + m.t + '<span>' + m.d + '</span></a>';
          }).join('') + '</div>';
      }
      return '<div class="nav-item"><a class="nav-link' + on + '" href="' + n.href + '">' +
        n.label + caret + '</a>' + dd + '</div>';
    }).join('');
  }

  function mobileHTML() {
    return NAV.map(function (n) {
      var on = n.id === current ? ' class="on"' : '';
      return '<a' + on + ' href="' + n.href + '">' + n.label +
        ' <span style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.1em;margin-left:6px">' +
        n.sub + '</span></a>';
    }).join('');
  }

  var header = document.getElementById('topbar');
  if (header) {
    header.innerHTML =
      '<a class="brand" href="index.html">' +
        '<span class="brand-mark">ZC</span>' +
        '<span class="brand-txt"><span class="brand-name">ZCC Platform</span>' +
        '<span class="brand-sub">Zero-Carbon Coffee Capital Stack</span></span>' +
      '</a>' +
      '<nav class="nav">' + navHTML() + '</nav>' +
      '<a class="nav-cta" href="roadmap.html">实施路线 <span>→</span></a>' +
      '<button class="burger" id="burger" aria-label="菜单"><span></span><span></span><span></span></button>' +
      '<div class="mobile-menu" id="mobileMenu">' + mobileHTML() + '</div>';

    var burger = document.getElementById('burger');
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      header.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) header.classList.remove('open');
    });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="foot-grid">' +
          '<div class="foot-brand">' +
            '<div class="brand-name">ZCC Platform</div>' +
            '<p>零碳咖啡产业链的分层资本配置与碳权益管理操作系统。股权与碳权益分离计价、耦合呈现；项目从孵化到退出始终携带同一套碳资产身份。</p>' +
          '</div>' +
          '<div class="foot-links">' +
            '<a href="nav.html">功能导航</a>' +
            '<a href="architecture.html">架构</a>' +
            '<a href="portals.html">门户</a>' +
            '<a href="carbon.html">碳权益</a>' +
            '<a href="capital.html">资本栈</a>' +
            '<a href="compliance.html">合规</a>' +
            '<a href="roadmap.html">路线图</a>' +
          '</div>' +
        '</div>' +
        '<div class="foot-meta">' +
          '<span>产品规格 v1.0 · 内部设计文档 · 2026-10</span>' +
          '<span>Not an offer of securities · 不构成任何证券发行或投资建议</span>' +
        '</div>' +
      '</div>';
  }

  /* ---------- scroll state ---------- */
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 12);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal ---------- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var d = en.target.getAttribute('data-delay') || 0;
          en.target.style.transitionDelay = d + 'ms';
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- count up ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var dur = 900, t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(dec);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); io2.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io2.observe(el); });
  }

  /* ---------- smooth anchor offset ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var t = document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    var y = t.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', '#' + id);
  });
})();
