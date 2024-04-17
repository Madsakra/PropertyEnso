import Col from 'react-bootstrap/Col';


import React from 'react';



const HowToCard = (props)=>
{
    return (

        <Col md={4} className='d-flex justify-content-center mb-5 pb-5 howToContainer '>
        <div class="d-flex w-75 text-white howToCard rounded-5  shadow-lg" style={{backgroundImage:`url(${props.Background})`}}>
        </div>
    </Col>
    )

}

export default HowToCard;