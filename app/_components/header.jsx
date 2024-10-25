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
          <img src="GKlogo.svg" alt="Logo GK" className="w-[100px] h-[100px]" />
        </div>
        <div>
          <input
            type="text"
            placeholder="O que você está buscando"
            className="p-2 rounded-3xl w-full max-w-xs"
          />
        </div>
        <div>
          <img src="shop-cart.png" alt="shop cart" className="h-[35px]" />
        </div>
      </div>
    </>
  );
};

export default Header;
