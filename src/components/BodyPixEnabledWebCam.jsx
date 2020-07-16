import React from 'react';
import ReactDOM from 'react-dom';
import * as bodyPix from '@tensorflow-models/body-pix';
import * as tf from '@tensorflow/tfjs';
import { NonMaxSuppressionV3 } from '@tensorflow/tfjs';


class BodyPixEnabledWebCam extends React.Component
{
  constructor(props) {
    super(props);
    this.state={
      net:null,
      style:{
        display:'none',
      }
    }
    this.videoTag = React.createRef();
    this.canvasTag= React.createRef();
    this.drawBody= this.drawBody.bind(this);
    this.detectBody = this.detectBody.bind(this);
}

componentDidMount() {
    
    // getting access to webcam
    navigator.mediaDevices
    .getUserMedia({video: true})
    .then(stream => {this.videoTag.current.srcObject = stream
        if (this.state.net==null)
        {
            bodyPix.load({
                architecture: 'MobileNetV1',
                outputStride: 16,
                multiplier: 0.75,
                quantBytes: 2
            })
            .catch(error => {
                console.log(error);
            })
            .then(objNet => {
                this.setState({net:objNet});  
                this.detectBody(); 
            });
        }
    })
    .catch((error)=>{console.log(error)});
}


detectBody()
{
  if (this.state.net!=null)
  {
   
    this.state.net.segmentPerson(this.videoTag.current,{
        flipHorizontal:true,
        internalResolution:'low',
        segmentationThreshold:0.3
    }).catch(err=>{console.log(err)}).then(personsegmentation=>{
            this.drawBody(personsegmentation);
    });
  }
  requestAnimationFrame(this.detectBody);
}

drawBody(personSegmentation)
{
    this.canvasTag.current.getContext('2d').drawImage(this.videoTag.current, 0, 0, this.props.width, this.props.height);
    var imageData= this.canvasTag.current.getContext('2d').getImageData(0,0,this.props.width,this.props.height);
    var pixel = imageData.data;
    for (var p = 0; p<pixel.length; p+=4)
    {
        if (personSegmentation.data[p/4] == 0) {
            pixel[p+3] = 0;
        }
    }
    
    this.canvasTag.current.getContext('2d').imageSmoothingEnabled = true;
    this.canvasTag.current.getContext('2d').putImageData(imageData,0,0);
}

render() {
    return (<div style={{position: "relative"}}>
        <video 
            id={this.props.id}
            ref={this.videoTag}
            width={this.props.width}
            height={this.props.height}
            autoPlay
            title={this.props.title}
            style={this.state.style}>
        </video>
        <canvas className="person" ref={this.canvasTag}  width={this.props.width} height={this.props.height}></canvas> 
    </div>)
}

}

export default BodyPixEnabledWebCam;