import React from "react";

interface WhatsAppButtonProps {
  content?: string;
  message?: string;
  category?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  content = "Escríbenos por WhatsApp",
  message,
  category = "productos",
}) => {
  // Si se pasa un mensaje, úsalo; si no, usa el mensaje por defecto
  const defaultMessage = encodeURIComponent(
    `Hola, me interesa conocer más sobre los ${category} de Manos del Mar.`
  );
  const whatsappMessage = message || defaultMessage;
  return (
    <a
      href={`https://wa.me/529711390450?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[#3b2e2a] font-semibold py-3 px-6 rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#a1583c] focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="#25D366"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 .02 5.35 0 11.97c0 2.11.55 4.17 1.59 6.01L0 24l6.19-1.6a12.03 12.03 0 0 0 5.81 1.48h.01c6.63 0 12-5.35 12-11.97a11.9 11.9 0 0 0-3.49-8.43ZM12 22.08c-1.8 0-3.57-.48-5.13-1.4l-.37-.22-3.67.95.98-3.58-.24-.37a9.97 9.97 0 0 1-1.53-5.22C2.03 6.47 6.59 2 12 2c2.63 0 5.1 1.02 6.97 2.88A9.9 9.9 0 0 1 22 11.97c0 5.51-4.47 10.1-10 10.1Zm5.33-7.42c-.29-.14-1.7-.83-1.96-.92-.26-.1-.45-.14-.63.14-.18.29-.72.92-.88 1.11-.16.18-.33.2-.61.07-.29-.14-1.22-.45-2.33-1.42-.86-.76-1.44-1.7-1.61-1.98-.16-.29-.02-.44.12-.58.13-.13.29-.33.44-.49.14-.16.18-.29.28-.48.09-.2.05-.36-.02-.5-.07-.14-.63-1.52-.86-2.08-.23-.56-.46-.48-.63-.49l-.53-.01c-.18 0-.47.07-.72.33s-.95.93-.95 2.26c0 1.33.98 2.62 1.12 2.8.13.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.54.58.65.2 1.24.17 1.71.1.52-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.2-.54-.34Z"
        ></path>
      </svg>
      {content}
    </a>
  );
};

export default WhatsAppButton; 