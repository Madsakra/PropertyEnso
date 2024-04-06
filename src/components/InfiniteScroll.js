import React from "react";
import svg1 from '../svg/3m.svg';
import svg2 from '../svg/barstool-store.svg';
import svg3 from '../svg/budweiser.svg';
import svg4 from '../svg/buzzfeed.svg';
import svg5 from '../svg/forbes.svg';
import svg6 from '../svg/macys.svg';
import svg7 from '../svg/menshealth.svg';
import svg8 from '../svg/mrbeast.svg';


function InfiniteScroll()
{
    return(
        
            <div className="logos-slide">
            <img src={svg1} alt="img" />
            <img src={svg2} alt="img"/>
            <img src={svg3} alt="img"/>
            <img src={svg4} alt="img"/>
            <img src={svg5} alt="img"/>
            <img src={svg6} alt="img"/>
            <img src={svg7} alt="img"/>
            <img src={svg8} alt="img"/>
            </div>
        
    )
}

export default InfiniteScroll;