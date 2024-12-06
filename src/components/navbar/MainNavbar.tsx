import Link from "next/link";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { MdExitToApp } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
import Logo from "../Logo";
import { GrClose } from "react-icons/gr";
import { RxCaretDown } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";

interface AnchorProps {
  title: string; // Título del enlace
  href: string; // URL del enlace
}

interface Links extends AnchorProps {
  children?: AnchorProps[]; // Subenlaces opcionales
}

const links: Links[] = [
  { title: "Inicio", href: "/" },
  {
    title: "Servicios",
    href: "/services",
    children: [
      { title: "Construcción", href: "/services?filter=construction" },
      { title: "Diseño", href: "/services?filter=design" },
      { title: "Consultoría", href: "/services?filter=consulting" },
    ],
  },
  {
    title: "Productos",
    href: "/products",
    children: [
      { title: "Ladrillos y Bloques", href: "/products?filter=bricks" },
      { title: "Cerámica y Acabados", href: "/products?filter=ceramics" },
      { title: "Metales y Herrería", href: "/products?filter=metals" },
    ],
  },
  { title: "Contacto", href: "/contact" },
];

function NavbarPrincipal() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openSearch, setOpenSearch] = useState(false);

  const handleToggleSearch = () => setOpenSearch(!openSearch);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <div className="flex py-3 items-center justify-center px-4 gap-6 lg:px-[15%] shadow-lg">
      {/* Botón de menú móvil */}
      <button
        onClick={toggleMobileMenu}
        className="h-4 py-auto px-4 hover:text-primary min-[900px]:hidden"
      >
        <TiThMenu size={20} />
      </button>

      <Logo />
      {/* Enlaces de navegación */}
      <div className="h-8 w-full flex justify-center max-[900px]:hidden gap-8">
        {links.map((link, index) => (
          <nav
            key={index}
            className="relative flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setOpenDropdown(index)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link href={link.href} className="flex ">
              <span
                className={`${
                  router.pathname === link.href && "text-primary"
                } hover:text-primary pb-1`}
              >
                {link.title}
              </span>
              {link.children && <RxCaretDown size={25} />}
            </Link>

            {router.pathname === link.href && (
              <div className="bg-primary rounded-full w-full h-0.5 absolute bottom-0 mt-1" />
            )}
            {link.children && openDropdown === index && (
              <div className="flex flex-col gap-2 absolute top-full left-0 w-fit text-nowrap py-2 text-sm px-3 bg-white shadow-md z-10">
                {link.children.map((category, i) => (
                  <Link
                    key={i}
                    href={category.href}
                    className="hover:text-primary hover:bg-muted rounded-md py-1 px-2"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        ))}
      </div>

      {/* Barra de búsqueda e ícono de búsqueda */}
      <div className="w-96 h-full">
        {openSearch ? (
          <div className="flex items-center border-b border-gray-300 ">
            <input
              type="text"
              placeholder="Buscar..."
              className="outline-none py-1 w-full bg-transparent "
            />
            <button
              className="text-lg hover:text-primary"
              onClick={handleToggleSearch}
            >
              <GrClose />
            </button>
          </div>
        ) : (
          <button
            className="h-4 text-lg my-auto hover:text-primary flex justify-end w-full"
            onClick={handleToggleSearch}
          >
            <CiSearch />
          </button>
        )}
      </div>

      {/* Ícono del carrito de compras */}
      <button className="h-4 my-auto hover:text-primary">
        <FiShoppingCart />
      </button>

      {/* Botón de inicio de sesión */}
      <Link
        href="/login"
        className="bg-primary rounded-full w-32 md:w-48 lg:w-64 h-8 flex justify-center my-auto items-center text-sm text-white hover:animate-pulse"
      >
        <MdExitToApp />
        <span className="mx-1 font-medium hidden xl:block text-xs">
          Iniciar sesión
        </span>
      </Link>

      {/* Modal de menú para móviles */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-lg p-4">
            <button
              className="text-xl hover:text-primary mb-4"
              onClick={toggleMobileMenu}
            >
              <GrClose />
            </button>
            <nav className="flex flex-col gap-4">
              {links.map((link, index) => (
                <div key={index} className="flex flex-col">
                  <Link
                    href={link.href}
                    className={`${
                      router.pathname === link.href && "text-primary"
                    } hover:text-primary`}
                    onClick={toggleMobileMenu}
                  >
                    {link.title}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-2">
                      {link.children.map((category, i) => (
                        <Link
                          key={i}
                          href={category.href}
                          className="block text-sm hover:text-primary"
                          onClick={toggleMobileMenu}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarPrincipal;
