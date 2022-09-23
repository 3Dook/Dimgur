

import MySymbol from './logo.svg';

function Header() {
  return (
    <div className="header">
            <div className="menu">Hamburger</div>
            <div  className="inner">
                <span className="symbol"><img src={MySymbol} alt="DDD" /></span>
                <span className='title'>DIMGUR</span>
            </div>
    </div>
  );
}

export default Header;
