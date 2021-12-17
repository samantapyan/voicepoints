import { Button, Table } from 'react-bootstrap';
import './style.scss'
import {useEffect, useState, useRef} from "react";
import transitionSound from './../../sounds/points_go.wav'
import nextIcon from './../../media/icons/next.png'
import {Row} from 'react-bootstrap'
import firebase from "./../../services/firebase"
import pointBack from "./../../media/backgrounds/points-back.svg"
import * as speech from "@tensorflow-models/speech-commands";
import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import GalaxyCanvas from './../GalaxyThree/GalaxyThree'

function VotingTable() {
    // const URL = "https://teachablemachine.withgoogle.com/models/3cCfdVsTm/"
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    const [showJuryName, setShowJuryName] = useState(false)
    const [liveColor, setLiveColor] = useState(Math.floor(Math.random()*16777215).toString(16))
    const [speechData, setSpeechData] = useState("")


    const countryLibrary = {
        Albania: ["albania", "albania"],
        Armenia: ["armenia", "amenia"],
        Azerbaijan: ["azerbaijan"],
        Bulgaria: ["bulgaria"],
        France: ["france"],
        Germany: ["germany"],
        Georgia : [ "georgia" ],
        Ireland : ["ireland"],
        Italy : ["italy", "Eataly"],
        Kazakhstan : ["kazakhstan"],
        Malta : ["malta"],
        Netherlands : ["netherlands", "the netherlands"],
        Macedonia : ["north macedonia", "macedonia"],
        Poland : ["poland"],
        Portugal : ["portugal"],
        Russia : ["russia"],
        Serbia : ["serbia", "srbia"],
        Spain : ["spain", "pain"],
        Ukraine: ["ukraine"]
    };


    let pointsData = [
        {
            value:12,
            id:'high'
        },
        {
            value:10,
            id : "middle"
        },
        {
            value:8,
            id: "small"
        }
    ]

    useEffect(()=>{
        console.log("000",transcript);
        // if (speechData === "") {
        //     setSpeechData(transcript)
        //     // resetTranscript();
        // } else {
        //     let old = speechData
        //     let now = transcript
        //     let newData = now.replace(old, "")
        //     console.log("old=", old)
        //     console.log("now=", now)
        //     console.log("newData=", newData)
        //     //
        //     //
        //     setSpeechData(now)
        //     // resetTranscript();
        // }


        setLiveColor(Math.floor(Math.random()*16777215).toString(16))



        if (transcript && transcript.includes("12 points") || transcript.includes("12 point") || transcript.includes("twelve point")) {
            setSelectedPoint("high")
            resetTranscript();
            setIsLive(false)

        }

        if (transcript && transcript.includes("10 points") || transcript.includes("10 point") || transcript.includes("ten point")) {
            console.log("10 points is")
            setSelectedPoint("middle")
            resetTranscript();
            setIsLive(false)

        }


        if (transcript && transcript.includes("8 points") || transcript.includes("8 point") || transcript.includes("eight points") ) {
            console.log("8 points is")
            setSelectedPoint("small")
            resetTranscript();
            setIsLive(false)

        }

        for (let country in countryLibrary) {
            // ["albania", "albania"]

            let c = countryLibrary[country];

            let isMatch = c.find((itm) => transcript.toLowerCase().includes(itm));

            if (isMatch) {
                console.log("is match =", isMatch);
                let selectedPointD =  pointsPositions.find(el => el.id === selectedPoint )
                console.log("sekected point ===", selectedPoint)
                let p = pointsData.find(itm => itm.id === selectedPoint)
                console.log("p =",p);
                if (selectedPointD) {
                    resetTranscript();
                    pointsGive(country, p.value, selectedPointD.id,pointsPositions)
                    setIsLive(false)

                }

            }
        }



    },[ transcript])

    let cs = [
        {
            name: "Albania",
            id: "ab",
            points: 12,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Germany",
            id: "gm",
            points: 11,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Sweden",
            id:"sw",
            points: 4,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Armenia",
            id: "am",
            points: 4,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Greece",
            id:"grc",
            points: 1,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Georgia",
            id: "gr",
            points: 17,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Italy",
            id: "it",
            points: 1,
            position: {
                top: 0,
                left: 0
            }
        }
    ];


    const [haLfSize, setHalfSize] = useState(0)
    const [countries, setCountries] = useState([])
    const [divHeightSize, setDivHeightSize] = useState(0)
    const [sortedCountrties, setSortedCountries] = useState([])
    const [selectedPoint, setSelectedPoint] = useState(false)
    const [secondHalfLeft, setSecondHalfLeft] = useState(0)
    const [selectedCountry, setSelectedCountry] = useState(false)
    const [pointsPositions, setPointsPositions] = useState(false)
    const [isLive, setIsLive] = useState(false)
    const [allJuries, setAllJuries] = useState([])
    const [pointsPositionsOriginal, setPointsPositionsOriginal] =useState(false)
    const [action, setAction] = useState(null)
const [currentJuryId, setCurrentJuryId] = useState('')


    function compareTime(a, b) {
        console.log(a.time > b.time);
        if (
            a.hasOwnProperty("time") &&
            b.hasOwnProperty("time") &&
            a.time < b.time
        ) {
            return -1;
        }
        if (
            a.hasOwnProperty("time") &&
            b.hasOwnProperty("time") &&
            a.time > b.time
        ) {
            return 1;
        }
        return 0;
    }


    function compare(a, b) {
        console.log(a.points > b.points);
        if (
            a.hasOwnProperty("points") &&
            b.hasOwnProperty("points") &&
            a.points > b.points
        ) {
            return -1;
        }
        if (
            a.hasOwnProperty("points") &&
            b.hasOwnProperty("points") &&
            a.points < b.points
        ) {
            return 1;
        }
        return 0;
    }

    useEffect(()=>{
        getAllJuries()
        setTimeout(()=>{

            firebase.getAllCountries((all) => {
                console.log(all);
                let countriesCopy = [...all]
                let sortedArray = []
                countriesCopy.forEach(country => {
                    sortedArray.push({...country})
                })
                let board = document.getElementById('board').getBoundingClientRect()
                // board.bottom board.left
                let pointsLeft = board.left + board.width/3
                let am = {
                    height : 30,
                    width:250
                }
                let margin = 20
                pointsData = pointsData.map(p => {
                    margin += 30
                    return {...p, top: board.height-30, left: board.width/3 + margin}
                })
                console.log(pointsData);
                setPointsPositions(pointsData)
                setPointsPositionsOriginal(pointsData)
                let divHeight = am.height
                // let divHeight = 30
                setDivHeightSize(divHeight)
                let halfSizeNumber = Math.ceil(countriesCopy.length/2);
                setHalfSize(halfSizeNumber)
                sortedArray = sortedArray.sort(compare)
                setSortedCountries(sortedArray)

                let topFirstHalf = 40
                let leftFirstHalf = 50

                let topSecondHalf = 40
                let leftSecondHalf = am.width + 75
                setSecondHalfLeft(leftSecondHalf)

                for (let i = 0 ; i < sortedArray.length ; i++) {
                    let c = sortedArray[i]
                    let pos = {}
                    if (i < halfSizeNumber) {
                        pos = {
                            top: topFirstHalf,
                            left:leftFirstHalf
                        }
                        topFirstHalf += divHeight
                    } else {
                        pos = {
                            top: topSecondHalf,
                            left:leftSecondHalf
                        }
                        topSecondHalf += divHeight
                    }
                    c.position = pos

                    let indexInOriginal = countriesCopy.findIndex(ct => ct.id === c.id)
                    countriesCopy[indexInOriginal].position = {...c.position}
                }
                console.log("sorted", sortedArray);
                console.log("all-no sort", countriesCopy)
                setSortedCountries(sortedArray)
                setCountries(countriesCopy)


            })




        },500)
    },[])



    function startingRecognizatation(){

        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            return (
                <div className="mircophone-container">
                    Browser is not Support Speech Recognition.
                </div>
            );
        }

    }


    function getAllJuries() {
        console.log("our juries --- --- ---");
        firebase.getAllJuries((juries => {
            console.log("our juries are",juries);
            let all = juries.sort(compareTime)
            setAllJuries(all)
            console.log("our juries are", all);
            if (all && all.length) {

                if ( localStorage.getItem('juryTimeId')) {

                    let indexJury  = all.findIndex(j => j.time === Number(localStorage.getItem('juryTimeId')))
                    if (indexJury !== -1) {
                        console.log("index jury =",indexJury);
                         if (indexJury + 1 < all.length) {
                             initPoints(all[indexJury+1].firstName + ' ' + all[indexJury + 1].lastName)
                             localStorage.setItem('juryTimeId', all[indexJury+1].time);
                             setCurrentJuryId(all[indexJury+1].time)
                         }

                    }

                } else {
                    localStorage.setItem('juryTimeId', all[0].time);
                    initPoints(all[0].firstName + ' ' + all[0].lastName)
                    setCurrentJuryId(all[0].time)
                }
            }
        }))
    }



    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };



 function pointsGive(name, p, type,positions){
    console.log("*********",type);
        return new Promise((resolve, reject) => {
            setTimeout( async ()=>{
               let pGrop  = await goTo(name, p, type,positions)
                resolve(pGrop)
            },100)
        })
}

    // async function startVoting(){
    //
    //
    //
    //
    //
    //         console.log("init start--------")
    //         const recognizer = await createModel();
    //     console.log("rec=",recognizer);
    //     const classLabels = recognizer.wordLabels(); // get class labels
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
    //                 // const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
    //                 // labelContainer.childNodes[i].innerHTML = classPrediction;
    //                 if (result.scores[i].toFixed(2) > 0.7) {
    //                     setAction(classLabels[i] )
    //                 }
    //
    //
    //             }
    //         }, {
    //             includeSpectrogram: true, // in case listen should return result.spectrogram
    //             probabilityThreshold: 0.65,
    //             invokeCallbackOnNoiseAndUnknown: true,
    //             overlapFactor: 0.60 // probably want between 0.5 and 0.75. More info in README
    //         });
    //
    //         // Stop the recognition in 5 seconds.
    //         // setTimeout(() => recognizer.stopListening(), 5000);
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
    //     // pointsGive(countries[random_number],p,groupPoinst[i],positions)
    //
    //
    //
    //   //
    //   //   let countries = ["Armenia", "Portugal", "Italy", "Georgia",  "Albania", "France"]
    //   //       let groupPoinst = ["small", "middle", "high"]
    //   // let p = 8
    //   //   let positions = [...pointsPositions]
    //   //   for (let i = 0; i<3; i++) {
    //   //       let random_number = Math.floor(Math.random() * (countries.length-1));
    //   //       console.log("Random number",random_number,countries.length-1, countries);
    //   //       countries = countries.filter(i => i!== countries[random_number])
    //   //
    //   //       console.log("///",groupPoinst[i]);
    //   //       let l = await pointsGive(countries[random_number],p,groupPoinst[i],positions)
    //   //       console.log("why",l);
    //   //       positions = [...l]
    //   //       p+=2
    //   //   }
    // }


//     async function createModel() {
//         const checkpointURL = URL + "model.json"; // model topology
//         const metadataURL = URL + "metadata.json"; // model metadata
// console.log("model+++++")
//         const recognizer = speech.create(
//             "BROWSER_FFT", // fourier transform type, not useful to change
//             undefined, // speech commands vocabulary feature, not useful for your models
//             checkpointURL,
//             metadataURL);
//
//         // check that model and metadata are loaded via HTTPS requests.
//         console.log("model+++++2")
//         await recognizer.ensureModelLoaded();
//         console.log("model+++++3")
//         return recognizer;
//     }


    async function goTo(countryName, points, type, pgroup) {
        return new Promise((resolve, reject)=>{




        console.log("params===", countryName, points, type, pgroup);
        let pointsPositionsCopy = [...pgroup]
let sound = new Audio(transitionSound)
        sound.play();
        console.log("sound===",sound);

        let board = document.getElementById('board').getBoundingClientRect()
        console.log("board========",board);
        let countryElement = document.getElementById(countryName).getBoundingClientRect()


        console.log("am========",countryElement);
        let selectedPointIndex  = pointsPositionsCopy.findIndex(pt => pt.id === type)





        console.log("bug2",board.top - countryElement.top, board.left - countryElement.left);



        let countriesCopy  = [...countries]
        let sortedCountriesData = [...sortedCountrties]
        let indexInSorted = sortedCountriesData.findIndex(c => c.name === countryName)
        let selectedCountry = {...sortedCountriesData[indexInSorted], position: {...sortedCountriesData[indexInSorted].position}}

            pointsPositionsCopy[selectedPointIndex] = { ...pointsPositionsCopy[selectedPointIndex],
                top: countryElement.top - board.top ,
                left: (countryElement.left - board.left) + countryElement.width,
                currentCountryId:selectedCountry.id
            }
            setPointsPositions(pointsPositionsCopy)



        setSelectedCountry(selectedCountry.id)
      setTimeout(()=>{
            console.log("timeout ----")
            setSelectedCountry(false)
        },1000)

        setTimeout(()=>{
            // some half

            selectedCountry.points += points
            let destinationIndex = sortedCountriesData.findIndex(c => c.points <= selectedCountry.points)
            let item = sortedCountriesData.find(c => c.points <= selectedCountry.points)
            sortedCountriesData[indexInSorted].points = selectedCountry.points
            sortedCountriesData[indexInSorted].position = {...sortedCountriesData[destinationIndex].position}

             countryElement = document.getElementById(countryName).getBoundingClientRect()
            board = document.getElementById('board').getBoundingClientRect()


            let newPositionForPoint =   sortedCountriesData[indexInSorted].position

            console.log("pgroup==================",pointsPositionsCopy);
            let selectedPointIndex  = pointsPositionsCopy.findIndex(pt => pt.id === type)
            pointsPositionsCopy[selectedPointIndex] = { ...pointsPositionsCopy[selectedPointIndex],
              top: newPositionForPoint.top, left: newPositionForPoint.left+countryElement.width
            }
            console.log("***",pointsPositionsCopy, type, selectedPointIndex)

            console.log("bug-------------",countryElement.top - board.top ,countryElement.left - board.left, pointsPositionsCopy);





            if (destinationIndex === indexInSorted  ) {
                // NO POSITION MOVEMENT // ONLY VALUE
                let indexInOriginal = countriesCopy.findIndex(co => co.name === countryName)
                countriesCopy[indexInOriginal].points += points
                setCountries(countriesCopy)
                setSortedCountries(sortedCountriesData)
                console.log("???????????????????   2",pointsPositionsCopy);
                resolve(pointsPositionsCopy)
            }
            sortedCountriesData = sortedCountriesData.sort(compare)
            let b = [...sortedCountriesData]
             let selectedCountryAfterSort = sortedCountriesData.findIndex(cNt => cNt.id === selectedCountry.id)

            console.log("___norm",sortedCountriesData, selectedCountryAfterSort, b);

            // normalize

            for (let i = 0; i < selectedCountryAfterSort; i++ ) {
                if (sortedCountriesData[i].points === selectedCountry.points ) {
                    let temp = {...sortedCountriesData[i]}
                    console.log("_____________",temp);
                    sortedCountriesData[i] = {...selectedCountry,
                        position: {
                        top: temp.position.top,
                            left: temp.position.left
                    }

                    }

                    sortedCountriesData[selectedCountryAfterSort] = {...temp, position: {...selectedCountry.position}}
               break;
                }
            }
            //
            // let topFirstHalf = 20
            // let leftFirstHalf = 50
            //
            // let topSecondHalf = 20
            // let leftSecondHalf = am.width + 75

            let topSizeFirst = 40
            let topSizeSecond = 40
            let leftSizeFirst = 50
            let leftSizeSecond = secondHalfLeft
            for (let i = 0 ; i < sortedCountriesData.length ; i++) {
                let c = sortedCountriesData[i]
                c.position = {}
                let currentTop = 0
                let currentLeft = 0
                if(i<=Math.floor(sortedCountriesData.length/2)) {
                    c.position.top = topSizeFirst
                    c.position.left = leftSizeFirst
                     currentTop = topSizeFirst
                    currentLeft = leftSizeFirst
                    topSizeFirst+=30
                }else {
                    c.position.top = topSizeSecond
                    c.position.left = leftSizeSecond
                    topSizeSecond += 30

                    currentTop = topSizeSecond
                    currentLeft = leftSizeSecond
                }





                let selectedPointIndex  = pointsPositionsCopy.findIndex(pt => pt.currentCountryId === c.id)
                pointsPositionsCopy[selectedPointIndex] = { ...pointsPositionsCopy[selectedPointIndex],
                    top: currentTop, left: currentLeft + countryElement.width
                }
            }

            let newData = []
            countriesCopy.forEach(itm => {
                console.log("current name",itm.name);
                let c = sortedCountriesData.find(cItem => cItem.name === itm.name)
                console.log("c===bug",c,sortedCountriesData)
                if (c.name === countryName) {

                }
                newData.push({...c})
            })

            setPointsPositions(pointsPositionsCopy)
            setCountries([...newData])
            setSortedCountries(sortedCountriesData)
            console.log("???????????????????",pointsPositionsCopy);
            resolve(pointsPositionsCopy)
setSelectedCountry('')
            setSelectedPoint('')
        },1000)

console.log("end ----- goTo")
    })
    }


    function test() {
        let selectedPointD =  pointsPositions.find(el => el.id === "high" )
        if (selectedPointD) {
            pointsGive("Armenia", 12, selectedPointD.id,pointsPositions)
        }

    }


    function initPoints(nameFull = '') {
        let  allJuriesData = [...allJuries]
        let currentJuryIdData = currentJuryId
if (allJuriesData.length === 0) {
    return
}

     if (currentJuryIdData) {
         let itemJuryIndex = allJuriesData.findIndex(jury => jury.time === currentJuryIdData)


        if (itemJuryIndex !== -1  && allJuriesData.length-1 === itemJuryIndex) {
            console.log("LAST -----")
            //VOTING IS END
            return
        } else if (allJuriesData.length > 2 && Math.ceil((allJuriesData.length-1) / 2 ) === itemJuryIndex+1){
            //half voring
            console.log("HALF -----")
        }
     }



       if (currentJuryIdData) {
           let nextJuryIndex = allJuriesData.findIndex(j => j.time === currentJuryIdData)

           console.log("current jury item",currentJuryId);
           console.log("next jury index =",nextJuryIndex, allJuriesData);
           if (nextJuryIndex !== -1  && (nextJuryIndex+1) < allJuriesData.length){
               nameFull = allJuriesData[nextJuryIndex+1].firstName + ' ' +allJuriesData[nextJuryIndex+1].lastName
               localStorage.setItem('juryTimeId', allJuriesData[nextJuryIndex+1].time);
               setCurrentJuryId(allJuriesData[nextJuryIndex+1].time)
           }
       }


        console.log("name___full",nameFull);
        if (nameFull) {
            setTimeout(()=>{
                setShowJuryName(nameFull)
            },100)
            setTimeout(()=>{
                setShowJuryName(false)
            },2000)
        }



       setPointsPositions(pointsPositionsOriginal)
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }

    return (
        <div className={'main-page-voting'}>

            {showJuryName && <div className={'next-jury'}>Jury is {showJuryName}</div>}
            <div className={'main-page-voting-templete position-relative'}>
                <GalaxyCanvas> </GalaxyCanvas>
<div  className={'ml-4'}      ref={microphoneRef}
     onClick={handleListing}>Start voting</div>
                <div className={"board mx-auto"} id={"board"}>
                    <div className={'d-flex justify-content-end'} >
                        <div className={'text-right next-country cursor-pointer'} onClick={initPoints}>
                            Next<span className={"next-icon"}><img src={nextIcon} alt=""/></span>
                        </div>
                    </div>
                    {countries.map((c) => (
                        <div
                            style={{
                                top: `${c && c?.position && c.position?.top && c.position.top}px`,
                                left: `${c && c?.position && c.position?.left && c.position.left}px`,
                                border: (selectedCountry && selectedCountry === c.id) && '2px solid black !important'
                            }}
                            className={"position-absolute country " + (selectedCountry && selectedCountry === c.id ? "selected-country" : '')} id={c.name} key={c.name}>
                            <div className={"country-content d-flex align-items-center justify-content-between"}>
                               <div className={"country-content-left d-flex align-items-center"}>
                                   <div className={'flag mr-3'}>
                                       <img src={c.icon} alt=""/>
                                   </div>
                                   <div className={'mr-2'}>
                                       {c.name}
                                   </div>
                               </div>

                                <div className={'mr-2'}>
                                    {c.points}
                                </div>
                            </div>

                        </div>
                    ))}
                    {pointsData.map(p => (
                        <div className={'mr-2'}>
                            <div
                                 style={{top:pointsPositions.length && pointsPositions.find(pnt => pnt.id === p.id) && pointsPositions.find(pnt => pnt.id === p.id).top || '0',
                                     left:pointsPositions.length && pointsPositions.find(pnt => pnt.id === p.id) && pointsPositions.find(pnt => pnt.id === p.id).left || '0',
                                 }}
                                 className={`point display-flex d-flex justify-content-center align-items-center position-absolute ${selectedPoint && p.id === selectedPoint ? "selected-point" : ''  }` } >{p.value}</div>
                        </div>
                    ))}



                </div>
                <Row className="points justify-content-center">





                </Row>




            </div>
            <div style={{color: `#${liveColor}`}} className={'text-right m-4'}>Live </div>
        </div>

    );
}

export default VotingTable;
