import React from "react";
import Webcam from "react-webcam";

class Capture extends React.Component {

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = (event) => {
        event.preventDefault();
        const imageSrc = this.webcam.getScreenshot();
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
                    screenshotQuality={0.3}
                    width={600}
                    videoConstraints={videoConstraints}
                /><br />
                <button onClick={this.capture}>Capture photo</button>
            </>
        )
    }
}

export default Capture;