import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import FormInputGroup from "./FormInputGroup";
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';

const Calculator = (props)=>{

    const listingProps = props.prevProps;

    const [homeValue, setHomeValue] = useState(listingProps.price);
    const [downPayment, setDownPayment] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);



    function calculateLoanAmount() {
        setLoanAmount(homeValue - downPayment);
        return loanAmount;
      }
    
      function calculateMonthlyPayment() {
        // Percentage conversion
        function percentageToDecimal(percent) {
          return percent / 12 / 100;
        }
    
        // years to month conversion
        function yearsToMonths(year) {
          return year * 12;
        }
    
        setMonthlyPayment(
          (percentageToDecimal(interestRate) * loanAmount) /
            (1 -
              Math.pow(
                1 + percentageToDecimal(interestRate),
                -yearsToMonths(loanDuration)
              ))
        );
    
        return monthlyPayment;
      };

      return (
        <>
        

        <form className="calculator"  onSubmit={(e) => e.preventDefault()}>
            <div className="container-fluid ms-0 ">
           <div className="row">
            <div className="col-4">
              <p className="fs-1">{listingProps.name} </p>
              
              <p className="fs-3">{listingProps.bedRooms} <img src={bed} class="me-4" width="25vw" alt="img"></img>
                                  {listingProps.bathRooms} <img src={bath} class="me-2" width="25vw" alt="img"></img></p>
              <p className="fs-3">Property Status: {listingProps.status}</p>
              <p className='fs-3'>Floor Range: #{listingProps.floorRange}</p>
            </div>

            <div className="col-4 mt-3">
              {/*TO CHANGE WHEN PROPERTY AGENT DATA CONFIRMED */}
            <img src={listingProps.image} className="cal-image"></img>
            </div>
            <div className="col-4 text-start mt-3">
            <p className="fs-1">Listed By: {listingProps.agent.userName}</p>
            <p className="fs-4">Reviews And Ratings: 4.7 stars</p>
            {/*if in view listing, show button to save listing */}
            {!props.inSavedGallery && <button className="btn btn-dark btn-md mt-2 mb-3" onClick={()=>{props.setShortList(!props.shortList)}}>Shortlist 🤍</button>}
            
            {/*otherwise show remove listing */}
            {props.inSavedGallery && <button className="btn btn-dark btn-md mt-2 mb-3" onClick={()=>{props.removeListing(props.propertyIndex)}}>Remove Listing ❌</button>}

            </div>
  
            </div>
            </div>
          <FormInputGroup
            text="Home Value "
            icon={<FaDollarSign />}
            placeholder={"Enter the value of the home"}
            value={homeValue}
            onInput={(e) => setHomeValue(e.target.value)}
            onkeyup={calculateLoanAmount}
            readOnly={true}
          />
          <FormInputGroup
            text="Down payment"
            icon={<FaDollarSign />}
            placeholder={"Enter your funds"}
            value={downPayment}
            onInput={(e) => setDownPayment(e.target.value)}
            onkeyup={calculateLoanAmount}
          />
          <FormInputGroup
            text="Loan amount"
            icon={<FaDollarSign />}
            placeholder={"Enter your funds"}
            value={loanAmount}
          />
          <FormInputGroup
            text="Interest Rate %"
            placeholder={"Enter your interest rate"}
            value={interestRate}
            onInput={(e) => setInterestRate(e.target.value)}
          />
          <FormInputGroup
            text="Loan Duration (years)"
            placeholder={"Enter the duration of your loan"}
            value={loanDuration}
            onInput={(e) => setLoanDuration(e.target.value)}
          />
          <h4 className="alert alert-dark fw-bold">
            Monthly payment: <FaDollarSign />
            {parseFloat(monthlyPayment.toFixed(2))}
          </h4>
    
          <div className="d-flex  justify-content-center">
           
          
          <button className="btn btn-secondary btn-lg w-75 me-5" onClick={()=>props.setCalculator(false)}>Close</button>

      
            <button
              type="submit"
              onClick={calculateMonthlyPayment}
              className="btn btn-dark btn-lg w-75  center ms-5">
              Calculate
            </button>
    
          </div>


     

        </form>
        </>
      );

}

export default Calculator;

