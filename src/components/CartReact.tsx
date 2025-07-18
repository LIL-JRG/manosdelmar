import React, { useEffect, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

interface CartItem {
  title: string;
  creator: string;
  image: string;
  quantity: number;
}

function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const CartReact = () => {
  const [cart, setCartState] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    setCartState([...newCart]);
  };

  const handleIncrease = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  const handleDecrease = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
    updateCart(newCart);
  };

  const handleRemove = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 48 48"
          className="mb-6"
          aria-hidden="true"
        >
          <rect x="6" y="14" width="36" height="22" rx="4" fill="#f3e7e1"/>
          <path d="M10 14V10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v4" stroke="#a1583c" strokeWidth="2"/>
          <circle cx="16" cy="38" r="2.5" fill="#a1583c"/>
          <circle cx="32" cy="38" r="2.5" fill="#a1583c"/>
        </svg>
        <h2 className="text-xl font-semibold mb-2 text-[#a1583c]">¡Tu carrito está vacío!</h2>
        <p className="text-[#6b4d42] mb-6 text-center max-w-xs">
          Aún no has agregado productos. Descubre nuestras artesanías únicas y apoya a las manos del mar.
        </p>
        <a
          href="/catalogo"
          className="inline-block bg-[#a1583c] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#8d422c] transition font-semibold"
        >
          Ir al catálogo
        </a>
      </div>
    );
  }

  // Mensaje dinámico para WhatsApp
  const message = encodeURIComponent(
    `¡Hola! Me gustaría cotizar los siguientes productos:\n\n` +
      cart
        .map(
          (item, index) =>
            `${index + 1}. *${item.title}*\n   Cantidad: ${item.quantity}\n   Artesana: ${item.creator}`,
        )
        .join("\n\n") +
      `\n\n¿Me podrías apoyar con la información de precios y tiempos de entrega? Muchas gracias.`
  );

  return (
    <>
      <div className="space-y-6 max-w-4xl mx-auto">
        {cart.map((item, index) => (
          <div
            key={item.title + index}
            className="bg-white rounded-2xl shadow-lg p-4 flex gap-4 items-center group transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="bg-[#f5f5f5] rounded-xl flex items-center justify-center w-24 h-24 min-w-[6rem]">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-20 max-w-full object-contain rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <p className="text-xs text-[#a1583c] mb-2">
                Artesana: <span className="font-medium">{item.creator}</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleDecrease(index)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f3e7e1] text-[#a1583c] hover:bg-[#a1583c] hover:text-white transition cursor-pointer text-lg font-bold"
                  aria-label="Disminuir cantidad"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="9" x2="14" y2="9"/></svg>
                </button>
                <span className="min-w-[24px] text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(index)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f3e7e1] text-[#a1583c] hover:bg-[#a1583c] hover:text-white transition cursor-pointer text-lg font-bold"
                  aria-label="Aumentar cantidad"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="9" x2="14" y2="9"/><line x1="9" y1="4" x2="9" y2="14"/></svg>
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-[#f3e7e1] text-[#a1583c] hover:bg-red-500 hover:text-white transition cursor-pointer"
              aria-label="Eliminar producto"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="5" x2="15" y2="15"/><line x1="15" y1="5" x2="5" y2="15"/></svg>
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <WhatsAppButton content="Cotizar por WhatsApp" message={message} />
      </div>
    </>
  );
};

export default CartReact; 