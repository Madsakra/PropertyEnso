
const TopHeader = (props)=>
{
    // props.animal, props.image
    return (


        <div class="container my-5 rounded">
            <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
            <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <h1 className="display-4 fw-bold lh-1" style={props.animal==='Cat'?{color:'aqua'}:{color:'tomato'}}>Welcome To The <br/> {props.animal} Side</h1>
                <p class="fw-bold mt-3">Here Lies Our Greatest {props.animal}s gallery. <br/>Choose wisely for they will be your new family member!
                <br/>Simply Flip Their Card And Click That Adopt Button.</p>
          
            </div>
            <div class="col-lg-4 offset-lg-1 p-0 shadow-lg">
                <img src={props.image} className="rounded w-100 h-25"  ></img>
            </div>
            </div>
        </div>









    )
}

export default TopHeader;