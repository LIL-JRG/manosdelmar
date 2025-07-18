import { useState, useEffect, useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "@/components/CloseButton";

// --- Tipos y datos ---
type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  creator: string;
  story: string;
  featured?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    title: "Huipil de tortugas con cadenilla azul",
    image: "/img/ProductGrid/Product_1.webp",
    description: "",
    creator: "",
    story: "Juana lleva 20 años tejiendo en San Mateo del Mar. Este diseño representa el mar y la fauna del Istmo.",
    featured: false,
  },
  {
    id: 2,
    title: "Huipil blanco con grecas",
    image: "/img/ProductGrid/Product_2.webp",
    description: "Diseño tradicional ikoots tejido en telar de cintura.",
    creator: "Rosalía Pérez",
    story: "Rosalía aprendió el arte del telar de su madre. Este patrón es usado en ceremonias especiales.",
    featured: false,
  },
  {
    id: 3,
    title: "Huipil con bordado floral",
    image: "/img/ProductGrid/Product_3.webp",
    description: "Coloridos bordados a mano con simbolismo ancestral.",
    creator: "Carmen López",
    story: "Carmen plasma la flora del Istmo en cada puntada, uniendo tradición y modernidad.",
    featured: true,
  },
  {
    id: 4,
    title: "Faja tejida a mano",
    image: "/img/ProductGrid/Product_4.webp",
    description: "Faja tradicional ikoots, ideal para complementar el atuendo diario.",
    creator: "Ana García",
    story: "Ana teje fajas desde pequeña, cada una cuenta una historia de su familia y comunidad.",
    featured: true,
  },
  {
    id: 5,
    title: "Bolso de palma tejida",
    image: "/img/ProductGrid/Product_5.webp",
    description: "Bolso ecológico hecho con palma tejida a mano, resistente y ligero.",
    creator: "Elena Cruz",
    story: "Elena utiliza técnicas ancestrales para crear bolsos únicos que representan la identidad ikoots.",
    featured: false,
  },
  {
    id: 6,
    title: "Cinturón de algodón",
    image: "/img/ProductGrid/Product_6.webp",
    description: "Cinturón tejido con algodón orgánico, perfecto para cualquier ocasión.",
    creator: "Marta Jiménez",
    story: "Marta combina colores vibrantes y patrones tradicionales en sus cinturones, reflejando su herencia cultural.",
    featured: true,
  },
  {
    id: 7,
    title: "Bufanda de lana",
    image: "/img/ProductGrid/Product_7.webp",
    description: "Bufanda tejida a mano con lana local, suave y abrigadora.",
    creator: "Lucía Torres",
    story: "Lucía crea bufandas que no solo abrigan, sino que también cuentan historias de su pueblo.",
    featured: true,
  },
  {
    id: 8,
    title: "Chal tejido con amor",
    image: "/img/ProductGrid/Product_8.webp",
    description: "Chal ligero y elegante, ideal para cualquier temporada.",
    creator: "Isabel Hernández",
    story: "Isabel teje chales que simbolizan la calidez y hospitalidad de la comunidad ikoots.",
    featured: true,
  },
  {
    id: 9,
    title: "Cojín decorativo",
    image: "/img/ProductGrid/Product_9.webp",
    description: "Cojín con bordados tradicionales, perfecto para dar un toque especial a tu hogar.",
    creator: "Teresa Ramírez",
    story: "Teresa utiliza técnicas de bordado que han pasado de generación en generación, creando piezas únicas.",
    featured: true,
  },
  {
    id: 10,
    title: "Manta de algodón",
    image: "/img/ProductGrid/Product_10.webp",
    description: "Manta tejida a mano con algodón orgánico, suave y duradera.",
    creator: "Claudia Morales",
    story: "Claudia crea mantas que no solo son funcionales, sino que también cuentan historias de su cultura.",
    featured: false,
  },
  {
    id: 11,
    title: "Sombrero de palma",
    image: "/img/ProductGrid/Product_11.webp",
    description: "Sombrero tradicional hecho de palma, ideal para protegerse del sol.",
    creator: "Sofía Pérez",
    story: "Sofía teje sombreros que representan la conexión con la naturaleza y la tradición ikoots.",
    featured: false,
  },
  {
    id: 12,
    title: "Pulsera tejida a mano",
    image: "/img/ProductGrid/Product_12.webp",
    description: "Pulsera colorida hecha con hilos de algodón, perfecta para cualquier ocasión.",
    creator: "Ana María López",
    story: "Ana María crea pulseras que simbolizan la amistad y la comunidad, uniendo a las personas a través del arte.",
    featured: false,
  },
  {
    id: 13,
    title: "Collar de semillas",
    image: "/img/ProductGrid/Product_13.webp",
    description: "Collar hecho con semillas locales, un accesorio único y sostenible.",
    creator: "María Elena Cruz",
    story: "María Elena utiliza semillas recolectadas en su comunidad para crear collares que representan la riqueza natural del Istmo.",
    featured: true,
  },
  {
    id: 14,
    title: "Toalla de playa tejida",
    image: "/img/ProductGrid/Product_14.webp",
    description: "Toalla de playa hecha a mano, ideal para disfrutar del sol y el mar.",
    creator: "Gabriela Torres",
    story: "Gabriela teje toallas que combinan funcionalidad y arte, perfectas para un día en la playa.",
    featured: true,
  },
  {
    id: 15,
    title: "Cartera de cuero",
    image: "/img/ProductGrid/Product_15.webp",
    description: "Cartera hecha a mano con cuero local, resistente y elegante.",
    creator: "Laura Jiménez",
    story: "Laura crea carteras que no solo son prácticas, sino que también reflejan la identidad cultural del Istmo.",
    featured: true,
  },
  {
    id: 16,
    title: "Cinturón de cuero",
    image: "/img/ProductGrid/Product_16.webp",
    description: "Cinturón de cuero hecho a mano, ideal para complementar cualquier atuendo.",
    creator: "Patricia Ramírez",
    story: "Patricia utiliza técnicas tradicionales para crear cinturones que son tanto funcionales como artísticos.",
    featured: true,
  },
  {
    id: 17,
    title: "Bolso de tela",
    image: "/img/ProductGrid/Product_17.webp",
    description: "Bolso ligero y resistente, ideal para el uso diario.",
    creator: "Verónica Hernández",
    story: "Verónica diseña bolsos que combinan practicidad y estilo, perfectos para cualquier ocasión.",
    featured: true,
  },
  {
    id: 18,
    title: "Bufanda de seda",
    image: "/img/ProductGrid/Product_18.webp",
    description: "Bufanda elegante hecha de seda local, suave al tacto.",
    creator: "Carolina Morales",
    story: "Carolina crea bufandas que no solo son accesorios, sino también obras de arte que cuentan historias.",
    featured: false,
  },
];

const getHeightClass = (id: number) => {
  const heightsDesktop = [
    "sm:h-[280px]",
    "sm:h-[320px]",
    "sm:h-[360px]",
    "sm:h-[400px]",
    "sm:h-[450px]",
  ];
  const heightsMobile = [
    "h-[180px]",
    "h-[200px]",
    "h-[220px]",
    "h-[240px]",
    "h-[260px]",
  ];
  return `${heightsMobile[id % heightsMobile.length]} ${heightsDesktop[id % heightsDesktop.length]}`;
};

interface ProductGridProps {
  limit?: number;
  title?: string;
  onlyFeatured?: boolean;
}

export default function ProductGrid({ limit, title = "Productos destacados", onlyFeatured = false }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // --- Lógica de productos a mostrar ---
  const filteredProducts = onlyFeatured
    ? products.filter((p) => p.featured).slice(0, limit || products.length)
    : limit
    ? products.slice(0, limit)
    : products;

  // --- Carrito ---
  const updateCartCount = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setCartCount(total);
  }, []);

  const addToCart = () => {
    if (!selectedProduct) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: any) => item.title === selectedProduct.title);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        title: selectedProduct.title,
        creator: selectedProduct.creator,
        image: selectedProduct.image,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    closeModal();
  };

  // --- Modal ---
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
    // Bloquear scroll fondo
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedProduct(null);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }, 300);
  };

  // --- Efectos ---
  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]);

  // Foco automático en botón de cerrar y cerrar con Escape
  useEffect(() => {
    if (isModalVisible && closeBtnRef.current) {
      closeBtnRef.current.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalVisible]);

  // --- Masonry breakpoints ---
  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    0: 2,
  };

  // --- Render ---
  return (
    <section className="py-20 bg-[#fef9f3] px-2 relative" id="catalogo">
      {/* Carrito flotante */}
      <a
        href="/cart"
        className="fixed bottom-6 right-6 z-50 bg-[#a1583c] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        aria-label="Ir al carrito"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16" className="w-6 h-6"><path fill="currentColor" d="M2.5 2a.5.5 0 0 0 0 1h.246a.5.5 0 0 1 .48.363l1.586 5.55A1.5 1.5 0 0 0 6.254 10h4.569a1.5 1.5 0 0 0 1.393-.943l1.474-3.686A1 1 0 0 0 12.762 4H4.448l-.261-.912A1.5 1.5 0 0 0 2.746 2H2.5Zm3.274 6.637L4.734 5h8.027l-1.474 3.686a.5.5 0 0 1-.464.314H6.254a.5.5 0 0 1-.48-.363ZM6.5 14a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm4 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"/></svg>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </a>

      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <h2 className="text-3xl font-semibold text-[#3b2e2a] mb-10 text-center">
          {title}
        </h2>
        <p className="text-lg font-semibold text-[#3b2e2a] mb-10 text-center">Selecciona el producto que deseas ver</p>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`hover:shadow-lg hover:shadow-[#a1583c]/30 rounded-xl overflow-hidden shadow-md bg-white cursor-pointer transform transition-all duration-300 ${getHeightClass(product.id)}`}
              onClick={() => openModal(product)}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles de ${product.title}`}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && openModal(product)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="p-4 text-[#3b2e2a]">
                <h3 className="font-medium text-center">{product.title}</h3>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* Modal de producto con animación slide-up y fade, imagen centrada y elegante */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.18)" }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white max-w-lg w-full rounded-2xl shadow-2xl relative p-0 overflow-hidden"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0.2, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal} ref={closeBtnRef} />
              <div className="flex justify-center items-center bg-white p-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="max-h-[350px] max-w-full rounded-xl shadow-lg border border-[#f0e6e0] object-contain"
                  style={{ background: "#fff" }}
                  draggable={false}
                />
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold mt-2">{selectedProduct.title}</h3>
                <p className="text-sm text-[#6b4d42]">{selectedProduct.description}</p>
                <p className="text-sm">
                  <span className="font-medium">Artesana:</span> {selectedProduct.creator}
                </p>
                <p className="text-sm italic text-[#7a5e4f]">"{selectedProduct.story}"</p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={addToCart}
                    className="bg-[#a1583c] hover:bg-[#8d422c] text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M2.5 2a.5.5 0 0 0 0 1h.246a.5.5 0 0 1 .48.363l1.586 5.55A1.5 1.5 0 0 0 6.254 10h4.569a1.5 1.5 0 0 0 1.393-.943l1.474-3.686A1 1 0 0 0 12.762 4H4.448l-.261-.912A1.5 1.5 0 0 0 2.746 2H2.5Zm3.274 6.637L4.734 5h8.027l-1.474 3.686a.5.5 0 0 1-.464.314H6.254a.5.5 0 0 1-.48-.363ZM6.5 14a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm4 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"/>
                    </svg>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}