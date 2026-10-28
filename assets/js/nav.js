/* ============================================================
   ZCC Platform — shared chrome: header, footer, interactions
   Portal-first navigation; supports subfolder pages via data-base
   ============================================================ */
(function () {
  'use strict';

  var NAV = [
    { id: 'nav', label: '功能导航', href: 'nav.html', sub: 'Function map' },

    { id: 'project', label: '项目方', href: 'project/dashboard.html', sub: 'Project portal', menu: [
      { t: '项目仪表盘', d: 'KPI · 待办 · 时间线', h: 'project/dashboard.html' },
      { t: '注册与孵化', d: '六步诊断 + 六项里程碑', h: 'project/setup.html' },
      { t: '碳基线与预评估', d: 'CarbonProfile 草稿 · 不可交易', h: 'project/baseline.html' },
      { t: '融资材料与 IR', d: '版本化文档 · 投资人关系', h: 'project/materials.html' },
      { t: 'MRV 任务', d: '数据上传 · IoT · 整改回复', h: 'project/mrv.html' }
    ] },

    { id: 'retail', label: '社区投资者', href: 'retail/discover.html', sub: 'Retail portal', menu: [
      { t: '项目发现', d: '筛选 · 排序 · 减排潜力评分', h: 'retail/discover.html' },
      { t: '发行页', d: '故事 · 目标 · 风险披露', h: 'retail/offer.html' },
      { t: '认购流程', d: '状态机 · 托管 · 冷静期', h: 'retail/subscribe.html' },
      { t: '我的投资', d: '组合 · 碳权益穿透 · 通知', h: 'retail/portfolio.html' }
    ] },

    { id: 'institution', label: '机构企业', href: 'institution/dataroom.html', sub: 'Institution portal', menu: [
      { t: '机构数据室', d: '文件夹级权限 · 水印 · 日志', h: 'institution/dataroom.html' },
      { t: '碳权益台账', d: '按 vintage / 标准筛选导出', h: 'institution/ledger.html' },
      { t: '远期合同管理', d: '价格公式 · 优先购买权窗口', h: 'institution/contracts.html' },
      { t: '注销指令', d: '用途声明 · 双重校验 · 证书', h: 'institution/retire.html' },
      { t: '披露支持包', d: '范围三 / 抵消 / 移除字段', h: 'institution/disclosure.html' }
    ] },

    { id: 'fund', label: '基金管理', href: 'fund/overview.html', sub: 'Fund portal', menu: [
      { t: 'AUM 与投资组合', d: '承诺 / 已投 / 碳权益双栏', h: 'fund/overview.html' },
      { t: '资本调用与 NAV', d: 'call notice · 分摊 · 季度估值', h: 'fund/capital-call.html' },
      { t: 'carry 瀑布', d: '双口径 · 分配顺序', h: 'fund/carry.html' },
      { t: '退出管理', d: '退出登记 · 对价拆分 · 分配', h: 'fund/exit.html' }
    ] },

    { id: 'verifier', label: '核证方', href: 'verifier/queue.html', sub: 'Verifier portal', menu: [
      { t: '任务队列与历史', d: '待接单 / 审核中 / 已签发', h: 'verifier/queue.html' },
      { t: '审核与签发', d: '三栏对照 · 守恒预检 · 驳回', h: 'verifier/review.html' }
    ] },

    { id: 'admin', label: '运营后台', href: 'admin/review.html', sub: 'Admin portal', menu: [
      { t: '项目审核与费率', d: '入驻队列 · 费率配置', h: 'admin/review.html' },
      { t: '合规配置器', d: '发行模板 · KYC 等级 · VASP', h: 'admin/compliance.html' },
      { t: '分配与风控', d: '守恒事务 · 对账日报 · 争议', h: 'admin/ops.html' }
    ] },

    { id: 'platform', label: '平台层', href: 'architecture.html', sub: 'Platform spec', menu: [
      { t: '平台总览', d: '定位 · 四原则 · 双轨图', h: 'index.html' },
      { t: '平台架构', d: '六层 · 数据底座 · 守恒', h: 'architecture.html' },
      { t: '门户矩阵', d: '权限矩阵 · 互盲设计', h: 'portals.html' },
      { t: '碳权益层', d: '台账 · MRV · 防火墙 · 注销', h: 'carbon.html' },
      { t: '资本栈', d: '孵化 · 众筹 · 基金 · 退出', h: 'capital.html' },
      { t: '合规风控', d: '三实体 · VASP · 红线', h: 'compliance.html' },
      { t: '实施路线图', d: '四阶段 · 阶段门 · KPI', h: 'roadmap.html' }
    ] }
  ];

  var ALIAS = { index: 'platform', architecture: 'platform', portals: 'platform',
                carbon: 'platform', capital: 'platform', compliance: 'platform', roadmap: 'platform' };
  var current = document.body.getAttribute('data-page') || 'index';
  current = ALIAS[current] || current;
  var BASE = document.body.getAttribute('data-base') || '';

  function navHTML() {
    return NAV.map(function (n) {
      var on = n.id === current ? ' on' : '';
      var caret = n.menu ? '<i class="nav-caret"></i>' : '';
      var dd = '';
      if (n.menu) {
        dd = '<div class="dropdown"><div class="dd-head">' + n.sub + '</div>' +
          n.menu.map(function (m) {
            return '<a href="' + BASE + m.h + '">' + m.t + '<span>' + m.d + '</span></a>';
          }).join('') + '</div>';
      }
      return '<div class="nav-item"><a class="nav-link' + on + '" href="' + BASE + n.href + '">' +
        n.label + caret + '</a>' + dd + '</div>';
    }).join('');
  }

  function mobileHTML() {
    var out = [];
    NAV.forEach(function (n) {
      var on = n.id === current ? ' class="on"' : '';
      out.push('<a' + on + ' href="' + BASE + n.href + '">' + n.label +
        ' <span style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.1em;margin-left:6px">' +
        n.sub + '</span></a>');
      (n.menu || []).forEach(function (m) {
        out.push('<a href="' + BASE + m.h + '" style="padding-left:28px;font-size:12.5px;color:var(--txt-2)">· ' + m.t + '</a>');
      });
    });
    return out.join('');
  }

  var header = document.getElementById('topbar');
  if (header) {
    header.innerHTML =
      '<a class="brand" href="' + BASE + 'index.html">' +
        '<span class="brand-mark">ZC</span>' +
        '<span class="brand-txt"><span class="brand-name">ZCC Platform</span>' +
        '<span class="brand-sub">Zero-Carbon Coffee Capital Stack</span></span>' +
      '</a>' +
      '<nav class="nav">' + navHTML() + '</nav>' +
      '<a class="nav-cta" href="' + BASE + 'roadmap.html">实施路线 <span>→</span></a>' +
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
            '<a href="' + BASE + 'nav.html">功能导航</a>' +
            '<a href="' + BASE + 'portals.html">门户矩阵</a>' +
            '<a href="' + BASE + 'carbon.html">碳权益</a>' +
            '<a href="' + BASE + 'capital.html">资本栈</a>' +
            '<a href="' + BASE + 'compliance.html">合规</a>' +
            '<a href="' + BASE + 'roadmap.html">路线图</a>' +
          '</div>' +
        '</div>' +
        '<div class="foot-meta">' +
          '<span>产品规格 v1.1 · 内部设计文档 · 2026-10</span>' +
          '<span>Not an offer of securities · 不构成任何证券发行或投资建议</span>' +
        '</div>' +
      '</div>';
  }

  /* ---------- scroll state ---------- */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 12);
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
