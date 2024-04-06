import { React, useContext }  from 'react';
import Row from 'react-bootstrap/Row';
import Features from './Features';
import MyFooter from './Footer';


import homeImage from '../images/homeImage.jpg';
import evening from '../images/evening.jpg';
import LocateUs from './LocateUs';
import { Context } from '../App';
import HowToCard from './HowToCard';
import sentosa from '../images/sentosa.jpg';
import altez from '../images/altez.jpg'
import faberHills from '../images/faberHills.jpg';
import InfiniteScroll from './InfiniteScroll';
import HomeHeader from './HomeHeader';
import { Parallax } from 'react-parallax';

import transition from './transition';

const Home=()=>{

  const {loginStatus} = useContext(Context);

return (

    <div className='homeBackground'>
        
  
      <Parallax strength={400} bgImage={homeImage} >
        <div className='home-head'>
        <HomeHeader loginStatus={loginStatus}/>
        </div>
     </Parallax>

      <Parallax strength={600}>
        
        <Row className='features'>
        <Features/>
        </Row>
      </Parallax>


      <Parallax strength={700} bgImage={evening}>
      <div className='endorse-box'>
      <h1 className='text-center mb-5 mt-5 display-2'>Endorsed By :</h1>
      <div class="logos mb-5">
      <InfiniteScroll/>
      <InfiniteScroll/>
      </div>
      </div>
      </Parallax>



      <Parallax strength={600} >
      <h1 className='mt-4 pt-5 pb-3 mb-5 text-center display-3'>Showcasing Our Latest Projects</h1> 
      <Row className='py-5 ps-2 pe-2'>
      <HowToCard Background={sentosa} header={"The Coast"} para={"@Sentosa Cove"} />
      <HowToCard Background={faberHills} header={"Faber Hills"} para={"@Faber Avenue"}/>
      <HowToCard Background={altez} header={"Altez Condo"} para={"@Enggor Street"}/>
       
      </Row>  
      </Parallax>


      <Parallax strength={600}>
      <LocateUs/>
      </Parallax>
   
      <MyFooter/>

      

    </div>
   
  
    
)
}

export default transition(Home);





