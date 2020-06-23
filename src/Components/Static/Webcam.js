import React from "react";
import Webcam from "react-webcam";

class Capture extends React.Component {

    //Set ref to the webcam
    setRef = webcam => {
        this.webcam = webcam;
    };

    //capture the image in base6 format and push it in a image state array
    capture = (event) => {
        event.preventDefault();
        const imageSrc = this.webcam.getScreenshot();
        // Store maximum 5 images
        if(this.props.image.length < 5)
            this.props.pushImage(imageSrc);
        // console.log(this.props.image.length);
    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };
        return( 
            <>
                <Webcam 
                    audio={false}
                    height={500}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.3} // Value from 0-1
                    width={600}
                    videoConstraints={videoConstraints}
                /><br />
                <button onClick={this.capture}>Capture photo</button>
            </>
        )
    }
}

export default Capture;