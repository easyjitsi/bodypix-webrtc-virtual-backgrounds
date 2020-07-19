import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BodyPixEnabledWebCam from "./BodyPixEnabledWebCam";
import CircularProgress from '@material-ui/core/CircularProgress';
import FPSStats from "react-fps-stats";

class StartPage extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            currentPage: "page1",
            shouldApplyFeature: false,
            isLoading: true,
            net:null,
            fastConfig: {
                architecture: 'MobileNetV1',
                outputStride: 8,
                multiplier: 0.75,
                quantBytes: 2
            },
            slowConfig: {
                architecture: 'ResNet50',
                outputStride: 16,
                multiplier: 1,
                quantBytes: 2
            },
            selected_resource: {
                url: "/img/backgrounds/bg1.jpg",
                selected: true
            },
            selected_resource_type: "image",
            images: [
                {
                    url: "/img/backgrounds/bg1.jpg",
                    selected: true
                },
                {
                    url: "/img/backgrounds/bg2.jpg",
                    selected: false
                },
                {
                    url: "/img/backgrounds/bg3.jpg",
                    selected: false
                },
                {
                    url: "/img/backgrounds/bg4.jpg",
                    selected: false
                },
                {
                    url: "/img/backgrounds/bg5.jpg",
                    selected: false
                },
                {
                    url: "/img/backgrounds/bg6.jpg",
                    selected: false
                }

            ],
            videos: [
                {
                    url: "/videos/video1.mp4",
                    selected: false
                }
            ]
        }
    }

    webcamRef =  null;

    selectImage(image, index){
        this.deselectAllImages();
        this.deselectAllVideos();
        let images = this.state.images;
        images[index].selected = true;
        this.setState({
            ...this.state,
            images: images,
            selected_resource: image,
            selected_resource_type: "image"
        })
    }

    selectVideo(video, index){
        this.deselectAllVideos();
        this.deselectAllImages();
        let videos = this.state.videos;
        videos[index].selected = true;
        this.setState({
            ...this.state,
            videos: videos,
            selected_resource: video,
            selected_resource_type: "video"
        })
    }

    deselectAllVideos(){
        let videos = this.state.videos;
        for (let index = 0; index < videos.length; index++) {
            videos[index].selected = false;
        }
        this.setState({
            ...this.state,
            videos: videos
        })
    }

    deselectAllImages(){
        let images = this.state.images;
        for (let index = 0; index < images.length; index++) {
            images[index].selected = false;
        }
        this.setState({
            ...this.state,
            images: images
        })
    }

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

    render() {
        return ( 
          
        <div className="App">
            <div className="p-overlay"></div>
            {
                this.state.currentPage == "page1"
                &&

                   <div className="full-contain">
                       <div className="topbar">
                            <div className="title">Bodypix + WebRTC = Virtual Backgrounds (Video Enabled)</div>
                       </div>
                       <div className="main-contain">
                            <div className="lhs">
                                <div className="c-title">Default Camera Source</div>
                                <div className="camera-zone">
                                    <FPSStats style={{position: "absolute"}} />
                                    <div class="background-replacement">
                                        {
                                            this.state.selected_resource_type == "image" && 
                                            <img src={this.state.selected_resource.url} />
                                        }
                                        {
                                            this.state.selected_resource_type == "video" && 
                                            <video class="video media" autoplay="" playsinline="" preload="auto" loop>
                                                <source src={this.state.selected_resource.url} type="video/mp4" />
                                            </video>
                                        }
                                    </div>
                                    {
                                        this.state.isLoading == true && 
                                        <div className="loading-area">
                                            <CircularProgress color="inherit" />
                                            <div className="message-loading">Loading BodyPix Model</div>
                                        </div>
                                    }
                                    <BodyPixEnabledWebCam
                                        onLoaded={ (config) => {
                                            console.log("Config loaded is ")
                                            console.dir(config);
                                            this.setState({
                                                ...this.state,
                                                isLoading: false
                                            });
                                        }}
                                        onError={() => {
                                            this.setState({
                                                ...this.state,
                                                isLoading: false
                                            });
                                        }}
                                        width={532}
                                        height={400}
                                        bodypixConfig={this.state.slowConfig}
                                        id={"bodycam"}
                                        title={"bodypix_tensorflow"}
                                    >
                                    </BodyPixEnabledWebCam>
                                </div>
                                <div className="more-details">
                                    <div className="mr-title">More Info</div>
                                    <div className="explanation">
                                        This is a Full demo built with Bodypix from TensorFlow in conjunction with WebRTC and some basic HTML5 Canvas masking to remove your active background from a WebCAM feed and replace it with a "Virtual Background" as seen on Zoom.
                                    </div>
                                    <div className="join-part">
                                        <a href="https://t.me/easyjitsisuppport">Join our Jitsi Support Group to Comment</a>
                                    </div>
                                </div>
                            </div>
                            <div className="rhs">
                                {/* <div className="checking-area">
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
                                </div> */}
                                <div className="choose-an-image">
                                    <div>
                                        <a class="clean-link" href="https://jibrisondemand.com/">
                                            <div class="carbon-example flex-wrapper" style={{marginBottom: "15px"}}>
                                            <img src="https://jibrisondemand.com/assets/images/logo-white.svg" alt="JibrisOnDemand" style={{height: "128px", background: "#000"}} />
                                            <div class="inner-wrapper">
                                                <p>Get Jibris for your Jitsi instances when you need it for a call.</p>
                                                <p class="fine-print">Click to read more</p>
                                            </div>
                                        </div>
                                        </a>
                                    </div>
                                    <div className="title-b">Choose an Image</div>
                                    <div className="mgrid">
                                        {
                                            this.state.images.map ((item, index) => {
                                                if(item.selected == true){
                                                    return (
                                                        <div className="selectable selected you" onClick={() => { this.selectImage(item, index)}}>
                                                            <div className="selected-bar">Currently Selected</div>
                                                            <img src={item.url} />
                                                        </div>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <div className="selectable you" onClick={() => { this.selectImage(item, index)}}>
                                                            <img src={item.url} />
                                                        </div>
                                                    );
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="choose-a-video">
                                    <div className="title-b video-up">Choose a Video</div>
                                    <div className="mgrid">
                                    {
                                            this.state.videos.map ((item, index) => {
                                                if(item.selected == true){
                                                    return (
                                                        <div className="selectable selected you" onClick={() => { this.selectVideo(item, index)}}>
                                                            <div className="selected-bar">Currently Selected</div>
                                                            <video class="video media" autoplay="" playsinline="" preload="auto" loop>
                                                                <source src={item.url} type="video/mp4" />
                                                            </video>
                                                        </div>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <div className="selectable you" onClick={() => { this.selectVideo(item, index)}}>
                                                            <video class="video media" autoplay="" playsinline="" preload="auto" loop>
                                                                <source src={item.url} type="video/mp4" />
                                                            </video>
                                                        </div>
                                                    );
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div className="footer-final">
                            <a className="brand" href="http://easyjitsi.com/">
                                <img src="/svg/logo.svg" alt=""/>
                                <div className="cpr">© 2020 EasyJitsi</div>
                            </a>
                       </div>
                   </div>
            }
        </div>
    );
    }
}

export default StartPage;