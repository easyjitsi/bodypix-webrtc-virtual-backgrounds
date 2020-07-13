import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import {Animated} from "react-animated-css";
import Webcam from "react-webcam";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BodyPix from  '@tensorflow-models/body-pix';


class StartPage extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            currentPage: "page1",
            shouldApplyFeature: false
        }
    }

    webcamRef =  null;

   

    componentDidMount() {
        console.dir(this.webcamRef)
    }

    handleChange(val){
        console.log("Its changing ");
        console.dir(val.target.checked);
        this.setState({
            ...this.state,
            shouldApplyFeature: val.target.checked
        });
    }

    localStorageExample(e){
        e.preventDefault();
        reactLocalStorage.setObject('userObj', {});
        var userObj = reactLocalStorage.getObject('userObj');
    } 

    render() {
        return (    
        <div className="App">
            <div className="p-overlay"></div>
            {
                this.state.currentPage == "page1"
                &&
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.currentPage == "page1"}>
                   <div className="full-contain">
                       <div className="topbar">
                            <div className="title">Bodypix + WebRTC = Virtual Backgrounds (Video Enabled)</div>
                       </div>
                       <div className="main-contain">
                            <div className="lhs">
                                <div className="c-title">Default Camera Source</div>
                                <div className="camera-zone">
                                    <Webcam
                                            audio={false}
                                            height={400}
                                            ref={ (rfid) => { this.webcamRef = rfid}}
                                            screenshotFormat="image/jpeg"
                                            width={532}
                                    />
                                </div>
                                <canvas id="personCanvas">

                            </canvas>
                                <div className="more-details">
                                    <div className="mr-title">More Info</div>
                                    <div className="explanation">
                                        This is a Full demo built with Bodypix from TensorFlow in conjunction with WebRTC and some basic HTML5 Canvas masking to remove your active background from a WebCAM feed and replace it with a "Virtual Background" as seen on Zoom.
                                    </div>
                                </div>
                            </div>
                            <div className="rhs">
                                <div className="checking-area">
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.shouldApplyFeature}
                                        onChange={ (e) =>  {this.handleChange(e) }}
                                        name="checkedB"
                                        color="primary"
                                    />
                                    }
                                    label="Enable Virtual Background"
                                />
                                </div>
                                <div className="choose-an-image">
                                    <div className="title-b">Choose an Image</div>
                                    <div className="mgrid">
                                        <div className="selectable selected you">
                                            <div className="selected-bar">Currently Selected</div>
                                            <img src="/img/backgrounds/bg1.jpg" alt="Windows XP Background"/>
                                        </div>
                                        <div className="selectable">
                                            <img src="/img/backgrounds/bg2.jpg" alt="Windows XP Background ALT"/>
                                        </div>
                                        <div className="selectable">
                                            <img src="/img/backgrounds/bg3.jpg" alt="Windows XP Background ALT"/>
                                        </div>
                                        <div className="selectable">
                                            <img src="/img/backgrounds/bg4.jpg" alt="Windows XP Background ALT"/>
                                        </div>
                                        <div className="selectable">
                                            <img src="/img/backgrounds/bg5.jpg" alt="Windows XP Background ALT"/>
                                        </div>
                                        <div className="selectable">
                                            <img src="/img/backgrounds/bg6.jpg" alt="Windows XP Background ALT"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="choose-a-video">
                                    <div className="title-b video-up">Choose a Video</div>
                                    <div className="mgrid">
                                        <div className="selectable selected you">
                                            <video class="video media" alt="Spring Grass Field Video Background. Nature Video Background. Spring Video Background Spring Forest Sakura Video Background Sakura Tree Nature Video Background HD Grass Field Grass Free Video Background HD Cherry blossom tree Cherry Blossom Forest GIF" autoplay="" playsinline="" preload="auto" poster="https://thumbs.gfycat.com/AlarmingGreedyAndeancondor-mobile.jpg" loop>
                                                <source src="https://thumbs.gfycat.com/AlarmingGreedyAndeancondor-mobile.mp4" type="video/mp4" />
                                                <source src="https://giant.gfycat.com/AlarmingGreedyAndeancondor.webm" type="video/webm" />
                                                <source src="https://giant.gfycat.com/AlarmingGreedyAndeancondor.mp4" type="video/mp4" />
                                                <source src="https://thumbs.gfycat.com/AlarmingGreedyAndeancondor-mobile.mp4" type="video/mp4" />
                                            </video>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div className="footer-final">
                            <div className="brand">
                                <img src="/svg/logo.svg" alt=""/>
                                <div className="cpr">© 2020 EasyJitsi</div>
                            </div>
                       </div>
                   </div>
                </Animated>
            }
        </div>
    );
    }
}

export default StartPage;