import { useState, useContext } from "react";
import { FaDollarSign } from "react-icons/fa";
import FormInputGroup from "./FormInputGroup";
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import {ShortListingController} from '../controller/ShortListingController';
import { Context } from '../App';
import { UpdateShortListController } from "../controller/UpdateShortListController";

const PropertyInfoPage = (props)=>{

    const currentListing = props.wholeListing;

    const [homeValue, setHomeValue] = useState(currentListing.price);
    const [downPayment, setDownPayment] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const {authUser} = useContext(Context);

    // BUYER STORY - SHORTLIST PROPERTY
    async function shortListProperty()
    {
      const shortLister = new ShortListingController(authUser);
      const response = await shortLister.shortListNow(currentListing);

      // to check if the user had just accessed this page
      if (Object.keys(currentListing).length !==0 && response === false)
      {
        alert("You Already Have That Item saved!");
        
      }

      else if (Object.keys(currentListing).length !==0 && response === true){
        await updateShortListValue(currentListing.name,currentListing.floorRange).then(()=>{
          alert("Item Successfully Saved");
        })
      
      }
    }
 
    // SELLER STORY - UPDATE SHORTLIST VALUE
    async function updateShortListValue(itemName,floorRange)
    {
       const updaterControl = new UpdateShortListController();
       updaterControl.updateShortlistValue(itemName,floorRange);
    }



 


    // CALCULATOR PORTION
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
              <p className="fs-1">{currentListing.name} </p>
              
              <p className="fs-3">{currentListing.bedRooms} <img src={bed} class="me-4" width="25vw" alt="img"></img>
                                  {currentListing.bathRooms} <img src={bath} class="me-2" width="25vw" alt="img"></img></p>
              <p className="fs-3">Property Status: {currentListing.status}</p>
              <p className='fs-3'>Floor Range: #{currentListing.floorRange}</p>
            </div>

            <div className="col-4 mt-3">
              {/*TO CHANGE WHEN PROPERTY AGENT DATA CONFIRMED */}
            <img src={currentListing.image} className="cal-image"></img>
            </div>
            <div className="col-4 text-start mt-3">
            <p className="fs-1">Listed By: Agent {currentListing.agent.userName}</p>
            <p className="fs-4">Reviews And Ratings: 4.7 stars</p>
            {/*if in view listing, show button to save listing */}
            {!props.inSavedGallery && <button className="btn btn-dark btn-md mt-2 mb-3" onClick={shortListProperty}>Shortlist 🤍</button>}
            
            {/*otherwise show remove listing */}
            {/*To be scrapped*/}
            {/* {props.inSavedGallery && <button className="btn btn-dark btn-md mt-2 mb-3" onClick={()=>{props.removeListing(props.propertyIndex)}}>Remove Listing ❌</button>} */}

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

export default PropertyInfoPage;

