import React from 'react';

function UserHome(props){
    return(
        <>
            <h2>
                Welcome { props.userDetails.name }
            </h2>
            <p>
                <b>Usename: </b> { props.userDetails.username } 
            </p>
            <p>
                <b>Email: </b> { props.userDetails.email }
            </p>
            <p>
                <b>Gender: </b> { props.userDetails.gender }
            </p>
            <p>
                <b>DOB: </b> { props.userDetails.dob}
            </p>
            <div>
                {
                    props.images.map((image, x)=>{
                        return(
                            <img key={x} src={image} alt={"Image "+x} width="180px" height="100px" />
                        )
                    })
                }
            </div>
        </>
    )
}

export default UserHome;