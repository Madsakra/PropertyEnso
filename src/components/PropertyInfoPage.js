import { useState, useContext } from "react";
import { FaDollarSign } from "react-icons/fa";
import FormInputGroup from "./FormInputGroup";
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';

import { Context } from '../App';
import { UpdateNewShortListValController } from "../controller/UpdateNewShortListValController";
import { UpdateSoldShortListValController } from "../controller/UpdateSoldShortListValController";

import { ShortlistNewController } from "../controller/ShortListNewController";
import { ShortlistSoldController } from "../controller/ShortListSoldController";

const PropertyInfoPage = (props)=>{

    const currentListing = props.wholeListing;

    const [homeValue, setHomeValue] = useState(currentListing.price);
    const [downPayment, setDownPayment] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const {authUser,userType} = useContext(Context);

    // BUYER STORY - SHORTLIST BUTTON ----- NEW PROPERTY
    async function shortlistNewProperty()
    {
      const shortLister = new ShortlistNewController(authUser);
      const response = await shortLister.shortListNew(currentListing);

      // to check if the user had just accessed this page
      if (Object.keys(currentListing).length !==0 && response === false)
      {
        alert("You Already Have That Item saved!");
        
      }

      else if (Object.keys(currentListing).length !==0 && response === true){
        await updateNewShortListValue(currentListing.name,currentListing.floorRange).then(()=>{
          alert("Item Successfully Saved");
        })
      
      }
    }

  // BUYER STORY - SHORTLIST BUTTON ----- SOLD PROPERTY
    async function shortlistSoldProperty()
    {
      const shortLister = new ShortlistSoldController(authUser);
      const response = await shortLister.shortListSold(currentListing);

      // to check if the user had just accessed this page
      if (Object.keys(currentListing).length !==0 && response === false)
      {
        alert("You Already Have That Item saved!");
        
      }

      else if (Object.keys(currentListing).length !==0 && response === true){
        await updateSoldShortListValue(currentListing.name,currentListing.floorRange).then(()=>{
          alert("Item Successfully Saved");
        })
      
      }
    }





 
    // SELLER STORY - UPDATE SHORTLIST VALUE (NEW PROPERTY)
    async function updateNewShortListValue(itemName,floorRange)
    {
       const updaterControl = new UpdateNewShortListValController();
       updaterControl.updateShortlistValue(itemName,floorRange);
    }


    // SELLER STORY - UPDATE SHORTLIST VALUE (SOLD PROPERTY)
    async function updateSoldShortListValue(itemName,floorRange)
    {
       const updaterControl = new UpdateSoldShortListValController();
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
        <img src={currentListing.image} className="cal-image"></img>
         Posted By (Agent ID): {currentListing.agent.UID} 
          <div className="container d-flex mt-3 align-items-start">
   
              <div className="col-md-6 mt-5">

              <p className="fs-2">
              {currentListing.name}
              <br/>
              {currentListing.bedRooms} <img src={bed} class="me-4" width="25vw" alt="img"></img> 
              {currentListing.bathRooms} <img src={bath} class="me-2" width="25vw" alt="img"></img> 
              <br/>
              Floor Range: #{currentListing.floorRange}<br/>
              Property Status: {currentListing.status}<br/>

            
              </p>
              
            {/*new listing will show white heart button */}
            {(!props.inSavedGallery && userType=== "Buyer" && currentListing.status==="new") && <button className="btn btn-lg btn-dark btn-md mt-2 w-75 mb-3" onClick={shortlistNewProperty}>Shortlist 🤍</button>}
            
            {/*sold listing will show yellow heart button*/}
            {(!props.inSavedGallery && userType=== "Buyer" && currentListing.status==="sold") && <button className="btn btn-lg btn-dark btn-md w-75 mt-2 mb-3" onClick={shortlistSoldProperty}>Shortlist 💛</button>}

              <button className="btn btn-secondary btn-lg w-75 me-5" onClick={()=>props.setCalculator(false)}>Close</button>

              </div>
       
              
  
              <div className="col-md-6">
                
                <div className="inner-cal">
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


                    <button
                    type="submit"
                    onClick={calculateMonthlyPayment}
                    className="btn btn-dark btn-lg w-100 ">
                    Calculate
                  </button>

                </div>


              </div>








            </div>




        


     

        </form>
        </>
      );

}

export default PropertyInfoPage;

