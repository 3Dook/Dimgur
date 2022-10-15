
import "./css/Header.css"
import MySymbol from './logo.svg';
function Header() {
  return (
    <div className="header">
            <div  className="inner">
                <span className="symbol"><img src={MySymbol} alt="DDD" className="symbolImg"/></span>
                <span className='title'>DIMGUR</span>
            </div>
    </div>
  );
}

export default Header;
