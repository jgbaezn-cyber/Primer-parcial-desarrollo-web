(function initSidebar() {
  var sectionIds = ["template-products", "fetch-products", "webcomp-products"];
  var links = document.querySelectorAll(".sidebar-nav a[href^='#']");

  if (!links.length) return;

  function setActiveLink(id) {
    links.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + id) {
        link.classList.add("active");
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sectionIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();