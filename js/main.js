if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

async function loadFragment(url, containerId) {
  try {
    var res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo cargar: " + url);
    var html = await res.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (err) {
    console.error("Error cargando fragmento:", err);
  }
}

var templateProducts = [
  {
    nombre: "Cappuccino Clásico",
    precio: "$7.000",
    descripcion: "Espresso, leche espumada y una pizca de canela. Un clásico irresistible.",
    img: "https://png.pngtree.com/png-clipart/20250519/original/pngtree-coffee-cup-with-heart-latte-art-beverage-hot-drink-cafe-png-image_21028442.png"
  },
  {
    nombre: "Frappé",
    precio: "$9.500",
    descripcion: "Café batido con hielo y leche cremosa, decorado con granos de café.",
    img: "https://png.pngtree.com/png-clipart/20241114/original/pngtree-frappe-coffee-with-beans-on-white-background-png-image_17060024.png"
  },
  {
    nombre: "Brownie de Chocolate",
    precio: "$7.500",
    descripcion: "Brownie húmedo y denso con chips de chocolate 70% cacao.",
    img: "https://static.vecteezy.com/system/resources/thumbnails/068/779/734/small/stack-of-delicious-chocolate-brownies-with-chocolate-chips-isolated-on-transparent-background-png.png"
  }
];

function renderTemplateProducts(products) {
  var template = document.getElementById("product-template");
  var grid = document.getElementById("template-grid");

  products.forEach(function (product) {
    var clone = template.content.cloneNode(true);

    var img = clone.querySelector(".product-img");
    img.src = product.img;
    img.alt = product.nombre;

    clone.querySelector(".product-name").textContent = product.nombre;
    clone.querySelector(".product-desc").textContent = product.descripcion;
    clone.querySelector(".product-price").textContent = product.precio;

    grid.appendChild(clone);
  });
}

// ─── DATOS EXTERNOS CON FETCH + JSON ──────────/**

async function loadProductsFromJSON() {
  try {
    var res = await fetch("data/products.json");
    if (!res.ok) throw new Error("No se pudo cargar products.json");
    var products = await res.json();

    var grid = document.getElementById("fetch-grid");

    products.forEach(function (product) {
      var card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML =
        '<div class="product-img-wrap">' +
          '<img class="product-img" src="' + product.img + '" alt="' + product.nombre + '" />' +
        '</div>' +
        '<div class="product-info">' +
          '<h4 class="product-name">' + product.nombre + '</h4>' +
          '<p class="product-desc">' + product.descripcion + '</p>' +
          '<span class="product-price">' + product.precio + '</span>' +
        '</div>';
      grid.appendChild(card);
    });

  } catch (err) {
    console.error("Error cargando productos desde JSON:", err);
    document.getElementById("fetch-grid").innerHTML =
      '<p class="error-load">No se pudieron cargar los productos. Usa un servidor local (Live Server).</p>';
  }
}

class CafeProduct extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["nombre", "precio", "descripcion", "img"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    var nombre      = this.getAttribute("nombre")      || "";
    var precio      = this.getAttribute("precio")      || "";
    var descripcion = this.getAttribute("descripcion") || "";
    var img         = this.getAttribute("img")         || "";

    this.shadowRoot.innerHTML =
      "<style>" +
        ":host { display: block; }" +
        ".wc-card {" +
          "background: #fff8f2;" +
          "border: 2px solid #d4a96a;" +
          "border-radius: 16px;" +
          "overflow: hidden;" +
          "font-family: Lato, sans-serif;" +
          "transition: transform 0.25s ease, box-shadow 0.25s ease;" +
        "}" +
        ".wc-card:hover {" +
          "transform: translateY(-6px);" +
          "box-shadow: 0 12px 30px rgba(139,90,43,0.18);" +
        "}" +
        ".wc-img-wrap {" +
          "background: linear-gradient(135deg, #f5e6d0, #ecdbb8);" +
          "padding: 1.2rem;" +
          "height: 160px;" +
          "display: flex;" +
          "align-items: center;" +
          "justify-content: center;" +
        "}" +
        ".wc-img {" +
          "max-height: 130px;" +
          "max-width: 100%;" +
          "object-fit: contain;" +
          "filter: drop-shadow(0 4px 8px rgba(59,30,8,0.15));" +
          "transition: transform 0.25s ease;" +
        "}" +
        ".wc-card:hover .wc-img { transform: scale(1.06); }" +
        ".wc-body { padding: 1rem 1.2rem 1.2rem; text-align: center; }" +
        ".wc-name {" +
          "font-size: 1.1rem;" +
          "font-weight: 700;" +
          "color: #3b1e08;" +
          "margin: 0 0 0.4rem;" +
        "}" +
        ".wc-desc {" +
          "font-size: 0.85rem;" +
          "color: #7a5c3e;" +
          "margin: 0 0 0.75rem;" +
          "line-height: 1.5;" +
        "}" +
        ".wc-badge {" +
          "display: inline-block;" +
          "background: #3b1e08;" +
          "color: #f5e6d0;" +
          "padding: 0.3rem 1rem;" +
          "border-radius: 20px;" +
          "font-weight: 700;" +
          "font-size: 0.9rem;" +
        "}" +
      "</style>" +
      "<div class='wc-card'>" +
        "<div class='wc-img-wrap'>" +
          "<img class='wc-img' src='" + img + "' alt='" + nombre + "' />" +
        "</div>" +
        "<div class='wc-body'>" +
          "<h4 class='wc-name'>" + nombre + "</h4>" +
          "<p class='wc-desc'>" + descripcion + "</p>" +
          "<span class='wc-badge'>" + precio + "</span>" +
        "</div>" +
      "</div>";
  }
}

customElements.define("cafe-product", CafeProduct);

var especialidades = [
  {
    nombre: "Latte Vainilla",
    precio: "$8.500",
    descripcion: "Espresso suave con leche vaporizada y toque de vainilla natural.",
    img: "https://png.pngtree.com/png-clipart/20250417/original/pngtree-velvety-iced-latte-with-a-layer-of-fluffy-cream-png-image_20715353.png"
  },
  {
    nombre: "Americano Doble",
    precio: "$6.000",
    descripcion: "Doble shot de espresso con agua caliente. Intenso y reconfortante.",
    img: "https://png.pngtree.com/png-vector/20241002/ourmid/pngtree-a-cup-of-black-americano-coffee-png-image_14002303.png"
  },
  {
    nombre: "Tarta de Frutos Rojos",
    precio: "$9.000",
    descripcion: "Base de masa quebrada con crema pastelera y frutos del bosque frescos.",
    img: "https://png.pngtree.com/png-clipart/20241117/original/pngtree-a-slice-of-cheesecake-with-berries-on-top-png-image_17165591.png"
  }
];


(async function init() {

  await loadFragment("components/header/header.html",   "header-container");
  await loadFragment("components/sidebar/sidebar.html", "sidebar-container");
  await loadFragment("components/footer/footer.html",   "footer-container");

  var btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }

  renderTemplateProducts(templateProducts);

  await loadProductsFromJSON();

  var wcGrid = document.getElementById("webcomp-grid");
  especialidades.forEach(function (item) {
    var el = document.createElement("cafe-product");
    el.setAttribute("nombre",      item.nombre);
    el.setAttribute("precio",      item.precio);
    el.setAttribute("descripcion", item.descripcion);
    el.setAttribute("img",         item.img);
    wcGrid.appendChild(el);
  });

})();