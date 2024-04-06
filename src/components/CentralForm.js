import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import { useState,useContext } from "react";
import SuccessMsg from './SuccessMsg';
import { Context } from '../App';
import FormInput from './FormInput';

const CentralForm =(props)=>{
    
    const [date, setDate] = useState(new Date());
    const [success,setSuccess] = useState(false);
    const {setPets} = useContext(Context);



    function submitPlaceHolder(event)
    {
        if (props.heading==='Adopt')
        {
        setSuccess(true);
        setTimeout(()=>{
            props.setAdoptForm(false);
            setSuccess(false);
            setPets([]);
            
        }, 5000);
        event.preventDefault();
        }

        else{
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false); }, 5000);
            event.preventDefault();
        }
    }

    return (
        <div className='text-center adoptionForm' style={{position:props.position}}>
            {success && <SuccessMsg keyword={props.heading}/>}
        <form onSubmit={submitPlaceHolder}>
            
            <h1 class="h3 mb-3 fw-bolder">Pet {props.heading}</h1>
            <p className='lead'>Please Enter Your Details For Processing Purposes</p>
            <Row>

            <FormInput type={'text'} name={'name'}
            placeholder={'name'} label={"Full Name"} 
            errorMessage={"Please enter your full name"} colSize={6}/>

            <FormInput type={'text'} name={'idNum'}
            placeholder={'idNum'} label={"Identification Number"} 
            errorMessage={"Please enter your ID Number"} colSize={6}/>

            </Row>


            <Row>

            <FormInput type={'text'} name={'nationality'}
            placeholder={'nationality'} label={"Nationality"} 
            errorMessage={"Please enter your Nationality"} colSize={6} />

            <FormInput type={'email'} name={'email'}
            placeholder={'email'} label={"Email"} 
            errorMessage={"Please enter your Email"} colSize={6}/>

            </Row>

            <Row>

            <FormInput type={'text'} name={'mobile'}
            placeholder={'mobile'} label={"Mobile"} 
            errorMessage={"Please enter your Mobile Number"} colSize={6} />
        
  

            <FormInput type={'text'} name={'address'}
            placeholder={'Address'} label={"Address"} 
            errorMessage={"Please enter your Address"} colSize={6} />


            </Row>

            <Row>
            
                <Col sm={6}>
                
                <p className='ms-2 mb-1 text-start'>Date Of Birth:</p>
                <Form.Control
                type="date"
                name="datepic"
                placeholder="DateRange"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required />

                </Col>

                <Col sm={6} className='text-start'>
                <p className='ms-2 mb-1'>Gender:</p>
                
                
                <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="maleRadio" required/>
                <label class="form-check-label" for="flexRadioDefault1">Male</label>
                </div>
                
     
                <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="femaleRadio" required/>
                <label class="form-check-label" for="flexRadioDefault1">Female</label>
                </div>

                <div class="form-check-inline">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="otherRadio" required/>
                <label class="form-check-label" for="flexRadioDefault1">Others</label>
                </div>

                </Col>

            </Row>
           

            {props.heading==='Release Pet' &&  
            <div className='pet-particulars mt-5'> 
            <h3>Pet Particulars</h3>
            <p className='lead'>Please Fill In Your The Particulars Of Your Pet</p>
            <Row>
            <Col sm={6}>
            <FormInput type={'text'} name={'Pet Name'}
            placeholder={'Pet Name'} label={"Pet Name"} 
            errorMessage={"Please enter your Pet Name"} colSize={12} /> 
            </Col> 

            <Col sm={6}>
            <FormInput type={'text'} name={'Breed'}
            placeholder={'Breed'} label={"Breed"} 
            errorMessage={"Please enter your Pet Breed"} colSize={12} /> 
            </Col> 
            </Row>

            <Row>
            <Col sm={6}>
            <FormInput type={'text'} name={'Pet Age'}
            placeholder={'Pet Age'} label={"Pet Age"} 
            errorMessage={"Please enter your Pet Age"} colSize={12} /> 
            </Col> 

            <Col sm={6}>
            <FormInput type={'text'} name={'Sterilization Status'}
            placeholder={'Sterilization Status'} label={"Sterilization Status"} 
            errorMessage={"Please enter your Pet's Sterilization Status"} colSize={12} /> 
            </Col> 
            </Row>


            </div> }

          
 

            <div className='d-flex flex-row justify-content-center mt-5'>
                {props.heading==='Adoption'? <button class=" btn btn-lg btn-primary me-3" onClick={()=>{props.setAdoptForm(!props.openAdoptForm)}}>Cancel</button>:null}
                <button class=" btn btn-lg btn-primary" type="submit" >{props.heading}</button>
            </div>
                <p class="mt-5 mb-3 text-muted">© Pet Heaven 2023</p>
           
        </form>
        
    </div>
    )
}

export default CentralForm;

