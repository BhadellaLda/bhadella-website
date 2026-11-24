document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  // mobile menu
  var btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // hero slider
  var slides = document.querySelectorAll('.hero .slide');
  if (slides.length > 1) {
    var dotsBox = document.querySelector('.dots'), i = 0, timer;
    var dots = Array.prototype.map.call(slides, function (s, n) {
      var b = document.createElement('button');
      var lg = document.documentElement.lang; b.setAttribute('aria-label', (lg === 'pt' ? 'Mostrar imagem ' : lg === 'es' ? 'Mostrar imagen ' : 'Show slide ') + (n + 1));
      b.addEventListener('click', function () { go(n); restart(); });
      dotsBox.appendChild(b); return b;
    });
    function go(n) {
      slides[i].classList.remove('on'); dots[i].classList.remove('on');
      i = n; slides[i].classList.add('on'); dots[i].classList.add('on');
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go((i + 1) % slides.length); }, 5500); }
    dots[0].classList.add('on'); restart();
  }

  // product tabs
  var tabs = document.querySelectorAll('.tabs a');
  if (tabs.length) {
    function show(id) {
      var found = false;
      tabs.forEach(function (t) { var on = t.getAttribute('href') === '#' + id; t.classList.toggle('on', on); if (on) found = true; });
      if (!found) return show(tabs[0].getAttribute('href').slice(1));
      document.querySelectorAll('.brand-products').forEach(function (p) { p.classList.toggle('on', p.id === id); });
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault(); var id = t.getAttribute('href').slice(1);
        show(id); history.replaceState(null, '', '#' + id);
      });
    });
    show(location.hash.slice(1));
  }

  // reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // preselect contact subject from #certificate / #sponsorship
  var topic = document.getElementById('f-topic');
  if (topic) {
    var map = { certificate: 'Halal certificate request', sponsorship: 'Sponsorship' };
    var want = map[location.hash.slice(1)];
    if (want) { topic.value = want; var f = topic.closest('form'); if (f) setTimeout(function () { f.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150); }
  }

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
});
