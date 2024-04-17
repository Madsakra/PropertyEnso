import { React, useContext }  from 'react';
import Row from 'react-bootstrap/Row';
import Features from './Features';
import MyFooter from './Footer';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import homeImage from '../images/homeImage.jpg';
import evening from '../images/evening.jpg';
import LocateUs from './LocateUs';
import { Context } from '../App';
import HowToCard from './HowToCard';
import sentosa from '../images/sentosa.jpg';
import sentosa2 from '../images/sentosa2.jpg';
import altez from '../images/altez.jpg'
import faberHills from '../images/faberHills.jpg';
import faberHills2 from '../images/faberHills2.jpg';
import InfiniteScroll from './InfiniteScroll';
import HomeHeader from './HomeHeader';
import { Parallax } from 'react-parallax';
import altez2 from '../images/altez2.jpg';
import billy from '../images/billy.png';

import marie from '../images/marie.png';
import kate from '../images/kate.png';



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
      <h1 className='mt-4 pt-5 pb-3 mb-5 text-center display-3'>Our Best Agents</h1> 
      <Row className='py-5 ps-2 pe-2'>
      <HowToCard Background={billy} />
      <HowToCard Background={marie}/>
      <HowToCard Background={kate} />
       
      </Row>  
      </Parallax>




      <Parallax strength={600}>
      <LocateUs/>
      </Parallax>
      
      <Parallax strength={600}>
     
     <h1 className='mt-3 pt-5 pt-2 pb-3  text-center display-4'>Showcasing Our Best</h1>
     <div className='container mb-5 pb-5'>
     <Carousel  fade>
           <Carousel.Item>
           <Image src={sentosa} className='caro-imgs' fluid/>
           </Carousel.Item>

           <Carousel.Item>
           <Image src={sentosa2} className='caro-imgs' fluid/>
           </Carousel.Item>


           <Carousel.Item>
               <Image src={faberHills} className='caro-imgs' fluid/>
           </Carousel.Item>
           <Carousel.Item>
               <Image src={faberHills2} className='caro-imgs' fluid/>
           </Carousel.Item>

           <Carousel.Item>
               <Image src={altez} className='caro-imgs' fluid />
           </Carousel.Item>

           <Carousel.Item>
               <Image src={altez2} className='caro-imgs rounded' fluid />
           </Carousel.Item>
       </Carousel> 
       </div>
     </Parallax>



      <MyFooter/>

      

    </div>
   
  
    
)
}

export default Home;





