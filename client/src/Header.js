// import "./css/Header.css";
import MySymbol from "./logo.svg";
function Header() {
  return (
    <div className="flex h-[25vh] justify-center items-center">
      <div className="symbol left-4">
        <img src={MySymbol} alt="DDD" className="symbolImg w-16" />
      </div>
      <div className="title font-bold text-5xl">DIMGUR</div>
    </div>
  );
}

export default Header;
