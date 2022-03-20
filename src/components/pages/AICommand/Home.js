// import React, {useEffect, useState, useRef} from 'react';
// import logo from './logo192.png';
// // import './App.css';
// // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
//
// // 0. Import depdendencies
// import * as tf from "@tensorflow/tfjs"
// import * as speech from "@tensorflow-models/speech-commands"
//
// // 4. Draw Ball
// import {drawBall} from "./../../utilities";
//
// // const URL = "https://teachablemachine.withgoogle.com/models/VUjpQjZEy/";
// // const URL = "https://teachablemachine.withgoogle.com/models/IORShzmSr/"
// const URL = "https://teachablemachine.withgoogle.com/models/3cCfdVsTm/"
//
// const Home = () => {
// // 1. Create model and action states
//     const [model, setModel] = useState(null)
//     const [action, setAction] = useState(null)
//     const [labels, setLabels] = useState(null)
//
// // 6. Create Canvas Ref and x,y,r


//     const canvasRef = useRef(null);
//     const [x, setX] = useState(300)
//     const [y, setY] = useState(300)
//     const [r, setR] = useState(10)
//     const [color, setColor] = useState("")
//
//
//
//
//     async function createModel() {
//         const checkpointURL = URL + "model.json"; // model topology
//         const metadataURL = URL + "metadata.json"; // model metadata
//
//         const recognizer = speech.create(
//             "BROWSER_FFT", // fourier transform type, not useful to change
//             undefined, // speech commands vocabulary feature, not useful for your models
//             checkpointURL,
//             metadataURL);
//
//         // check that model and metadata are loaded via HTTPS requests.
//         await recognizer.ensureModelLoaded();
//
//         return recognizer;
//     }
//
//     async function recognizeCommands() {
//         console.log("init start--------")
//         const recognizer = await createModel();
//         const classLabels = recognizer.wordLabels(); // get class labels
//         console.log("classes====",classLabels);
//         const labelContainer = document.getElementById("label-container");
//         console.log("data===",labelContainer);
//         for (let i = 0; i < classLabels.length; i++) {
//             labelContainer.appendChild(document.createElement("div"));
//         }
//
//         // listen() takes two arguments:
//         // 1. A callback function that is invoked anytime a word is recognized.
//         // 2. A configuration object with adjustable fields
//         recognizer.listen(result => {
//             console.log("____________",result);
//             const scores = result.scores; // probability of prediction for each class
//             // render the probability scores per class
//             for (let i = 0; i < classLabels.length; i++) {
//                 const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
//                 labelContainer.childNodes[i].innerHTML = classPrediction;
//                 if (result.scores[i].toFixed(2) > 0.6) {
//                     setAction(classLabels[i] )
//                 }
//
//
//             }
//         }, {
//             includeSpectrogram: true, // in case listen should return result.spectrogram
//             probabilityThreshold: 0.65,
//             invokeCallbackOnNoiseAndUnknown: true,
//             overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
//         });
//
//         // Stop the recognition in 5 seconds.
//         // setTimeout(() => recognizer.stopListening(), 5000);
//     }
//
//
//
//
//
//
//
//
//
//
//
//
//
// // 2. Create Recognizer
//     const loadModel = async () =>{
//         const recognizer = await speech.create("BROWSER_FFT")
//         console.log('Model Loaded')
//         await recognizer.ensureModelLoaded();
//         console.log(recognizer.wordLabels())
//         setModel(recognizer)
//         setLabels(recognizer.wordLabels())
//     }
//
//     // useEffect(()=>{loadModel()}, []);
//
// // 7. Update ball state
//     const numberMap = {
//         "zero":0,
//         "one":1,
//         "two":2,
//         "three":3,
//         "four":4,
//         "five":5,
//         "six":6,
//         "seven":7,
//         "eight":8,
//         "nine":9
//     }
//
//     useEffect(()=>{
//         console.log("action ====",action);
//         if (action === "greenLight") {
//             setColor("#2cff00")
//         }
//         if (action === "redLight") {
//             setColor("#d40006")
//         }
//
//
//         // // Update position x,y
//         // console.log("action ===",action);
//         // const update = action === 'up' ? setY(y-10) : action==="down" ? setY(y+10) : action==="left" ? setX(x-10) : action==="right"? setX(x+10) : ""
//         // // Update size r
//         // if(Object.keys(numberMap).includes(action)){
//         //     setR(10*numberMap[action])
//         // }
//         //
//         // canvasRef.current.width = 600;
//         // canvasRef.current.height = 600;
//         // const ctx = canvasRef.current.getContext('2d')
//         // console.log(x,y,r)
//         // drawBall(ctx,x,y,r)
//         // setAction('base')
//     }, [action])
//
// // 3. Listen for Actions
//     function argMax(arr){
//         return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
//     }
//
//     // const recognizeCommands = async () =>{
//     //     // console.log('Listening for commands')
//     //     // model.listen(result=>{
//     //     //     // console.log(labels[argMax(Object.values(result.scores))])
//     //     //     setAction(labels[argMax(Object.values(result.scores))])
//     //     //
//     //     // }, {includeSpectrogram:true, probabilityThreshold:0.9})
//     //     // setTimeout(()=>model.stopListening(), 10e3)
//     // }
//
//     return (
//         <div className="App" style={{backgroundColor:color}}>
// <h1>color is {color}</h1>
//             <div id="label-container"></div>
//             <header className="App-header">
//                 {/* 5. Setup Canvas */}
//                 <canvas
//                     ref={canvasRef}
//                     style={{
//                         marginLeft: "auto",
//                         marginRight: "auto",
//                         left: 0,
//                         right: 0,
//                         textAlign: "center",
//                         zindex: 9,
//                         width: 640,
//                         height: 640,
//                     }}
//                 />
//                 {/* <img src={logo} className="App-logo" alt="logo" /> */}
//                 {/* <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p> */}
//
//                 <button onClick={recognizeCommands}>Command</button>
//                 {action ? <div>{action}</div>:<div>No Action Detected</div> }
//             </header>
//         </div>
//     );
// }
//
// export default Home;