import { Button, Table } from 'react-bootstrap';
import './style.scss'
import {useEffect, useState} from "react";
import transitionSound from './../../sounds/points_go.wav'
import {Row} from 'react-bootstrap'
import firebase from "./../../services/firebase"
import pointBack from "./../../media/backgrounds/points-back.svg"
import * as speech from "@tensorflow-models/speech-commands";
import React from "react";

function VotingTable() {
    const URL = "https://teachablemachine.withgoogle.com/models/3cCfdVsTm/"


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
    const [action, setAction] = useState(null)

    useEffect(()=>{

    },[])


    useEffect(()=>{

        console.log("action - ",action)
        if (action === "pointsTwelve") {
            setSelectedPoint("high")
        }
        if (action === "pointsTen") {
            setSelectedPoint("middle")
        }
        if (action === "pointsEight") {
            setSelectedPoint("small")
        }
        if (action === "Armenia" && selectedPoint) {
            console.log("Armenia",pointsPositions)
            let selectedPointD =  pointsPositions.find(el => el.id === selectedPoint )
            if (selectedPointD) {
                pointsGive("Armenia", 12, selectedPointD.id,pointsPositions)
            }

        }
        if (action === "Malta" && selectedPoint) {
            console.log("Malta",pointsPositions)
            let selectedPointD =  pointsPositions.find(el => el.id === selectedPoint )
            if (selectedPointD) {
                pointsGive("Malta", 12, selectedPointD.id,pointsPositions)
            }

        }
        if (action === "Poland" && selectedPoint) {
            console.log("Poland",pointsPositions)
            let selectedPointD =  pointsPositions.find(el => el.id === selectedPoint )
            if (selectedPointD) {
                pointsGive("Poland", 12, selectedPointD.id,pointsPositions)
            }

        }
        if (action === "Germany" && selectedPoint) {
            console.log("Germany",pointsPositions)
            let selectedPointD =  pointsPositions.find(el => el.id === selectedPoint )
            if (selectedPointD) {
                pointsGive("Germany", 12, selectedPointD.id,pointsPositions)
            }

        }

    }, [action])


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

                let divHeight = am.height
                // let divHeight = 30
                setDivHeightSize(divHeight)
                let halfSizeNumber = Math.ceil(countriesCopy.length/2);
                setHalfSize(halfSizeNumber)
                sortedArray = sortedArray.sort(compare)
                setSortedCountries(sortedArray)

                let topFirstHalf = 0
                let leftFirstHalf = 0

                let topSecondHalf = 0
                let leftSecondHalf = am.width + 30
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




        },2000)
    },[])


 function pointsGive(name, p, type,positions){
    console.log("*********",type);
        return new Promise((resolve, reject) => {
            setTimeout( async ()=>{
               let pGrop  = await goTo(name, p, type,positions)
                resolve(pGrop)
            },500)
        })
}

    async function startVoting(){





            console.log("init start--------")
            const recognizer = await createModel();
        console.log("rec=",recognizer);
        const classLabels = recognizer.wordLabels(); // get class labels
            console.log("classes====",classLabels);
            const labelContainer = document.getElementById("label-container");
            console.log("data===",labelContainer);
            for (let i = 0; i < classLabels.length; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }

            // listen() takes two arguments:
            // 1. A callback function that is invoked anytime a word is recognized.
            // 2. A configuration object with adjustable fields
            recognizer.listen(result => {
                console.log("____________",result);
                const scores = result.scores; // probability of prediction for each class
                // render the probability scores per class
                for (let i = 0; i < classLabels.length; i++) {
                    // const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                    // labelContainer.childNodes[i].innerHTML = classPrediction;
                    if (result.scores[i].toFixed(2) > 0.7) {
                        setAction(classLabels[i] )
                    }


                }
            }, {
                includeSpectrogram: true, // in case listen should return result.spectrogram
                probabilityThreshold: 0.65,
                invokeCallbackOnNoiseAndUnknown: true,
                overlapFactor: 0.60 // probably want between 0.5 and 0.75. More info in README
            });

            // Stop the recognition in 5 seconds.
            // setTimeout(() => recognizer.stopListening(), 5000);










        // pointsGive(countries[random_number],p,groupPoinst[i],positions)



      //
      //   let countries = ["Armenia", "Portugal", "Italy", "Georgia",  "Albania", "France"]
      //       let groupPoinst = ["small", "middle", "high"]
      // let p = 8
      //   let positions = [...pointsPositions]
      //   for (let i = 0; i<3; i++) {
      //       let random_number = Math.floor(Math.random() * (countries.length-1));
      //       console.log("Random number",random_number,countries.length-1, countries);
      //       countries = countries.filter(i => i!== countries[random_number])
      //
      //       console.log("///",groupPoinst[i]);
      //       let l = await pointsGive(countries[random_number],p,groupPoinst[i],positions)
      //       console.log("why",l);
      //       positions = [...l]
      //       p+=2
      //   }
    }


    async function createModel() {
        const checkpointURL = URL + "model.json"; // model topology
        const metadataURL = URL + "metadata.json"; // model metadata
console.log("model+++++")
        const recognizer = speech.create(
            "BROWSER_FFT", // fourier transform type, not useful to change
            undefined, // speech commands vocabulary feature, not useful for your models
            checkpointURL,
            metadataURL);

        // check that model and metadata are loaded via HTTPS requests.
        console.log("model+++++2")
        await recognizer.ensureModelLoaded();
        console.log("model+++++3")
        return recognizer;
    }


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
        pointsPositionsCopy[selectedPointIndex] = { ...pointsPositionsCopy[selectedPointIndex],
            top: countryElement.top - board.top ,
            left:countryElement.width
        }
        console.log("bug2",board.top - countryElement.top, board.left - countryElement.left);
        setPointsPositions(pointsPositionsCopy)


        let countriesCopy  = [...countries]
        let sortedCountriesData = [...sortedCountrties]
        let indexInSorted = sortedCountriesData.findIndex(c => c.name === countryName)
        let selectedCountry = {...sortedCountriesData[indexInSorted], position: {...sortedCountriesData[indexInSorted].position}}
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
            let selectedPointIndex  = pointsPositionsCopy.findIndex(pt => pt.id === type)

            pointsPositionsCopy[selectedPointIndex] = { ...pointsPositionsCopy[selectedPointIndex],
                ...sortedCountriesData[indexInSorted].position
            }
            console.log("***",pointsPositionsCopy, type, selectedPointIndex)

            console.log("bug-------------",countryElement.top - board.top ,countryElement.left - board.left, pointsPositionsCopy);
            setPointsPositions(pointsPositionsCopy)




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
            let topSizeFirst = 0
            let topSizeSecond = 0
            let leftSizeFirst = 0
            let leftSizeSecond = secondHalfLeft
            for (let i = 0 ; i < sortedCountriesData.length ; i++) {
                let c = sortedCountriesData[i]
                c.position = {}
                if(i<=Math.floor(sortedCountriesData.length/2)) {
                    c.position.top = topSizeFirst
                    c.position.left = leftSizeFirst
                    topSizeFirst+=30
                }else {
                    c.position.top = topSizeSecond
                    c.position.left = leftSizeSecond
                    topSizeSecond += 30
                }
            }

            let newData = []
            countriesCopy.forEach(itm => {
                let c = sortedCountriesData.find(cItem => cItem.name === itm.name)
                if (c.name === countryName) {

                }
                newData.push({...c})
            })
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

    return (
        <div className={'main-page-voting'}>
            <div className={'main-page-voting-templete position-relative'}>

<Button onClick={startVoting} className={'ml-4'}>Start voting</Button>
                <div className={"board mx-auto"} id={"board"}>
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
                            <div onClick={() => goTo("Italy", 12)}
                                 style={{top:pointsPositions.length && pointsPositions.find(pnt => pnt.id === p.id) && pointsPositions.find(pnt => pnt.id === p.id).top || '0',
                                     left:pointsPositions.length && pointsPositions.find(pnt => pnt.id === p.id) && pointsPositions.find(pnt => pnt.id === p.id).left || '0',
                                 }}
                                 className={`point display-flex d-flex justify-content-center align-items-center position-absolute ${selectedPoint && p.id === selectedPoint ? "selected-point" : ''  }` } >{p.value}</div>
                        </div>
                    ))}
                </div>
                <Row className="points justify-content-center">





                </Row>
                <div id="label-container"></div>
<h1 onClick={test}>test</h1>
                {/*<h1>Voting table {haLfSize} | {haLfSize}</h1>*/}
                {/*<h1 onClick={() => goTo("Albania", 12)}>12 to Albania</h1>*/}
                {/*<h1 onClick={() => goTo("Sweden", 12)}>12 to Sweden</h1>*/}
                {/*<h1 onClick={() => goTo("Germany", 12)}>12 to Germany</h1>*/}
                {/*<h1 onClick={() => goTo("Italy", 12)}>12 to Italy</h1>*/}
                {/*<h1 onClick={() => goTo("Armenia", 12)}>12 to Armenia</h1>*/}
                {/*<h1 onClick={() => goTo("Greece", 12)}>12 to Greece</h1>*/}
                {/*<h1 onClick={() => goTo("Georgia", 12)}>12 to Georgia</h1>*/}

            </div>
        </div>

    );
}

export default VotingTable;
