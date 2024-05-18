import { useState,useContext } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Context } from "../App";
import { CreatePropertyController } from "../controller/CreatePropertyController";


const CreatePropertyPage = ()=>{
    

     const {authUser} = useContext(Context);

   
     const [sellerEmail,setSellerEmail] = useState("");
 
     //------------------------------------------------------------

     // PART 2 STATES--------- COLLECTING PROPERTY INFORMATION FROM USER
    const [propertyNameInput,setPropertyNameInput] = useState("");
    const [streetNameInput,setStreetNameInput] = useState("OCEAN DRIVE");
    const [areaInput,setAreaInput] = useState("");
    const [districtInput,setDistrictInput] = useState("");
    const [floorRangeInput,setFloorRangeInput] = useState("");
    const [bedRoomsInput,setBedRoomsInput] = useState("");
    const [bathRoomsInput,setBathRoomsInput] = useState("");
    const [priceInput,setPriceInput] = useState("");
    const [imageContainer,setImageContainer] = useState(null);
    const [imageContainerError,setImageContainerError] = useState(false);
    const [emailError,setEmailError] = useState(false);


    function CheckAllFields()
    {
        let check = false;
        if (propertyNameInput !== "" && areaInput !== "" && districtInput !== "" && floorRangeInput!==""
            && bedRoomsInput !== "" && bathRoomsInput !== "" && priceInput !== "" && imageContainer !==null
            && sellerEmail !== "")
        {
            check = true;
        }

        // check for errors --- if errors, flip the boolean 
        if (floorRangeInput === "error" && imageContainerError === true && emailError === true)
        {
            check = false;
        }

        return check;

    }

    async function CreateProperty()
    {
        const checkResult = CheckAllFields();
        if (checkResult===true)
        {
       
            const myPackage = {agent:{UID:authUser.uid,
                                      email:authUser.email},

                                area:areaInput,
                                bathRooms:bathRoomsInput,
                                bedRooms:bedRoomsInput,
                                district:districtInput,
                                floorRange:floorRangeInput,
                                name:propertyNameInput,
                                price:priceInput,

                              }
            
            const myCreatorControl = new CreatePropertyController();
            const result = await myCreatorControl.pushCreation(myPackage,imageContainer,streetNameInput,sellerEmail)
            if (result===true)
            {
                alert("property created");
       

            }
            else{
                alert("Either the account doesn't exist, or the account is not a seller.")
            }

        }

        
        else{
            alert("you might have missed out/filled up some fields wrongly. Please check again")
        }
    }
   

    return (
        <>

        
        <div class="p-5 mb-2 creation-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5 listings-head-words text-center">
          <h1 class="display-5 fw-bold">Create Listings</h1>
          <p class="fs-4">Help Your Client To List The Property</p>
          </div>
        </div>




        <div className="container creation-form">
            <Form>
            
            <div>
            <h1 className="pt-4">Property Information</h1>            
            <Row className="mb-3 ">
            <Form.Group controlId="formGridProperty">
                <Form.Label>Property Name</Form.Label>
                <Form.Control type="text" placeholder="Property Name" onChange={e=>{
                    // prevent user from typing in numbers of weird characters
                    const{ value } = e.target;
                    const lowerCaseAll = value.toLowerCase();
                    const replaceAll = lowerCaseAll.charAt(0).toUpperCase() + lowerCaseAll.slice(1);
                    e.target.value = replaceAll.replace(/[^a-zA-ZşŞıİçÇöÖüÜĞğ\- ]/g, '');
                    setPropertyNameInput(e.target.value);
                }}  />
            </Form.Group>
            </Row>

            <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridStreet" onChange={e=>setStreetNameInput(e.target.value)}>
                <Form.Label>Street</Form.Label>
                <Form.Select defaultValue="OCEAN DRIVE"  >
                    <option value={"OCEAN DRIVE"}>OCEAN DRIVE</option>
                    <option value={"FABER AVENUE"}>FABER AVENUE</option>
                    <option value={"ENGGOR STREET"}>ENGGOR STREET</option>
                    <option value={"PRINCE CHARLES CRESCENT"}>PRINCE CHARLES CRESCENT</option>
                </Form.Select>
                </Form.Group>

            <Form.Group as={Col} controlId="formGridArea">
                <Form.Label>Area</Form.Label>
                <Form.Control type="number" placeholder="area number" onChange={e=>setAreaInput(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDistrict">
                <Form.Label>District</Form.Label>
                <Form.Control type="number" placeholder="0" onChange={e=>setDistrictInput(e.target.value)}/>
            </Form.Group>

            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFloorRange">
                    <Form.Label>Floor Range #</Form.Label>
                    <Form.Control type="text" placeholder="00-00" onChange={e=>{
                        const inputVal = e.target.value;
                        const pattern = /^\d{2}-\d{3}$/;
                        if (pattern.test(inputVal))
                        {
                            setFloorRangeInput(inputVal)
                        }
                        
                        else{
                            setFloorRangeInput("error");
                        }
                    }}/>

                    {floorRangeInput==="error" && <p className="text-danger fw-bold">Please Enter The Floor Range Correctly in this manner: e.g 00-000</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBedRooms">
                    <Form.Label>BedRooms</Form.Label>
                    <Form.Control type="number" placeholder="Number of BedRooms" onChange={e=>setBedRoomsInput(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDBathRooms">
                    <Form.Label>BathRooms</Form.Label>
                    <Form.Control type="number" placeholder="Number of BathRooms" onChange={e=>setBathRoomsInput(e.target.value)}/>
                </Form.Group>
            </Row>
            
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProperty">
                <Form.Label>Price $(SGD)</Form.Label>
                <Form.Control type="number" placeholder="Price" onChange={e=>setPriceInput(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" onChange={e=>
                    {   
                        try{
                        const currentFile = e.target.files[0];
                        if (currentFile.type === "image/jpeg" || currentFile.type === "image/jpg" || currentFile.type === "image/png" )
                        {
                            setImageContainer(e.target.files[0])
                            console.log(currentFile);
                            setImageContainerError(false);
                        }
                        
                        else{
                            setImageContainerError(true);
                        }
                    }
                    catch(err)
                    {
                        setImageContainer(null);
                    }
                    } }/>
                    {imageContainerError===true && <p className="text-danger">Please upload images that are of jpg/png</p>}

            </Form.Group>
            </Row>
            <hr/>

            <h1>Seller's Information</h1>
            <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Seller's Email</Form.Label>
                <Form.Control type="email" onChange={(e)=>
                
                    {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emailRegex.test(e.target.value))
                    {
                      
                        setSellerEmail(e.target.value);
                        setEmailError(false);
                    }
                    else{
                        setEmailError(true); 
                    }
                    }}/>
                {emailError===true && <p className="text-danger fw-bold">Please Enter an email here</p>}
            </Form.Group>

            </Row>




            <Button variant="dark" type="button" onClick={CreateProperty}>
            Submit
            </Button>
            </div>
            


        </Form>
        </div>
        </>
    



)








}



export default CreatePropertyPage;