import {useEffect, useContext,useState} from 'react';
import {Context} from '../App';
import buyer from '../svg/buyer.svg';
import seller from '../svg/seller.svg';
import propertyAgent from '../svg/propertyAgent.svg';


const CreateUserProfile = ()=>{
 
    const {setUserName,setUserType, passInfoOver} = useContext(Context);

        const [openUserNameSelection,setOpenUserSelection] = useState(true);
        const [openTypeSelection,setTypeSelection] = useState(false);
       

        const nextSelection = (event)=>{
            event.preventDefault();
            setOpenUserSelection(false);
            setTypeSelection(true);
        }


        return (
            <div>
                <div className='create-userForm'>

                <form onSubmit={nextSelection}>
                {openUserNameSelection &&
                <div>
                <h1 class="h3 mb-3 fw-normal">Hey! We See it's your first time here!</h1>
                <p class="lead">Please Type In Your Username below</p>
                <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" 
                placeholder="Your User Name" 
                onChange={(e)=>setUserName(e.target.value)}/>
                <label for="floatingInput">Your UserName</label>
                </div>

                <button class="btn btn-dark w-100 py-2" 
                  type="submit" 
                  
                 >Confirm UserName</button>
                </div>
                }
                </form>

                    
                {
                    openTypeSelection && 
                    <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                    <div class="list-group list-group-checkable d-grid gap-2 border-0">
                    <form onSubmit={passInfoOver}>
                    <input class="list-group-item-check pe-none " 
                    type="radio" name="listGroupCheckableRadios"
                     id="listGroupCheckableRadios2" value="Buyer"
                   
                     onChange={(e)=>setUserType(e.target.value)}/>
                    <label class="list-group-item rounded-3 py-3 display-4" for="listGroupCheckableRadios2">
                    Buyer

                    <img src={buyer} class="m-3" height='75vh' alt="img"></img>
                    <span class="d-block small opacity-50">Looking For A Home I see.... </span>
                    </label>

                    <input class="list-group-item-check pe-none" type="radio" 
                    name="listGroupCheckableRadios" id="listGroupCheckableRadios3" 
                    value="Seller"
                    onChange={(e)=>setUserType(e.target.value)}/>
                    <label class="list-group-item rounded-3 py-3 display-4" for="listGroupCheckableRadios3">
                    Seller

                    <img src={seller} class="m-3" height='75vh' alt="img"></img>
                    <span class="d-block small opacity-50">Sell And Earn Big Buck$$$</span>
                    </label>

                    <input class="list-group-item-check pe-none" type="radio" 
                    name="listGroupCheckableRadios" id="listGroupCheckableRadios4" 
                    value="Real Estate Agent"  onChange={(e)=>setUserType(e.target.value)}/>
                    <label class="list-group-item rounded-3 py-3 display-4" for="listGroupCheckableRadios4">
                    Real Estate Agent 

                    <img src={propertyAgent} class="m-3" height='75vh' alt="img"></img>
                    <span class="d-block small opacity-50">Big Bucks For Those With Big Brains</span>
                    </label>
                    
                    
                    <button class="btn btn-dark w-100 mt-3 py-2" 
                        type="submit">
                            Proceed</button>
                    </form>
                    </div>

                    </div>
                      
        
                }




                </div>
            </div>
        )

};



export default CreateUserProfile;