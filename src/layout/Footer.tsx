import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="h-16 bg-col bg-gray-900 flex items-center justify-center p-6">
      <span className="text-white">
        By Javier Ponte
        <a
          href="https://www.linkedin.com/in/javier-ponte-gonz%C3%A1lez-67a6a7147/"
          target="_blank"
          className="ml-2" // Agregar margen izquierdo de 2 espacios
        >
          Linkedin
        </a>
      </span>
    </div>
  );
};

export default Footer;
