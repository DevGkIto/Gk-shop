import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="bg-[#331D1D] flex justify-center">
        <p className="text-white font-semibold">
          Promoção de 25% acaba em 23:59:59
        </p>
      </div>
      <div className="bg-[#9F3434] flex h-[71px] items-center justify-between">
        <div>
          <Link href="/">
            <img src="/GKlogo.svg" className="w-[70px] h-[60px]" />
          </Link>
        </div>
        <div className="relative">
          <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <img src="/search.png" alt="Search" className="h-[20px] w-[20px]" />
          </button>
          <input
            type="text"
            placeholder="O que você está buscando?"
            className="pl-10 p-2 rounded-3xl border-none focus:outline-none placeholder:text-sm"
          />
        </div>
        <div className="flex gap-3 mr-2">
          <img src="shop-cart.png" alt="shop cart" className="h-[35px]" />
          <img
            src="hamburguer-menu.png"
            alt="menu button"
            className="h-[35px]"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
