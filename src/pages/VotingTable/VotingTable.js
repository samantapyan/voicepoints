import { Button, Table } from 'react-bootstrap';
import './style.scss'
import {useEffect, useState} from "react";
import transitionSound from './../../sounds/points_go.wav'
import {Row} from 'react-bootstrap'
function VotingTable() {


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
    const [secondHalfLeft, setSecondHalfLeft] = useState(0)
    const [selectedCountry, setSelectedCountry] = useState(false)
    const [pointsPositions, setPointsPositions] = useState(false)

    useEffect(()=>{

    },[])



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

            let countriesCopy = [...cs]
            let sortedArray = []
            countriesCopy.forEach(country => {
                sortedArray.push({...country})
            })
            let board = document.getElementById('board').getBoundingClientRect()
          // board.bottom board.left
            let pointsLeft = board.left + board.width/3
                let am = {
                height : 30,
                width:200
            }
            let margin = 0
            pointsData = pointsData.map(p => {
                margin += 30
                return {...p, top: board.height, left: board.width/3 + margin}

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
            setSortedCountries(sortedArray)
            setCountries(countriesCopy)

        },2000)
    },[])


 function pointsGive(name, p, type,positions){
    console.log("*********",type);
        return new Promise((resolve, reject) => {
            setTimeout( async ()=>{
               let pGrop  = await goTo(name, p, type,positions)
                resolve(pGrop)
            },2000)
        })
}

    async function startVoting(){


        let countries = ["Armenia", "Albania", "Italy", "Greece",  "Georgia", "Germany"]
            let groupPoinst = ["small", "middle", "high"]
      let p = 8
        let positions = [...pointsPositions]
        for (let i = 0; i<3; i++) {
            let random_number = Math.floor(Math.random() * (countries.length-1));
            console.log("Random number",random_number,countries.length-1, countries);
            countries = countries.filter(i => i!== countries[random_number])

            console.log("///",groupPoinst[i]);
            let l = await pointsGive(countries[random_number],p,groupPoinst[i],positions)
            console.log("why",l);
            positions = [...l]
            p+=2
        }
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
            left:countryElement.left - board.left
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

        },1000)

console.log("end ----- goTo")
    })
    }


    return (
        <div className={'main-page-voting'}>
            <div className={'main-page-voting-templete position-relative'}>

<button onClick={startVoting}>start voting</button>
                <div className={"board mx-auto"} id={"board"}>
                    {countries.map((c) => (
                        <div
                            style={{
                                top: `${c.position.top}px`,
                                left: `${c.position.left}px`,
                                border: (selectedCountry && selectedCountry === c.id) && '2px solid black !important'
                            }}
                            className={"position-absolute country " + (selectedCountry && selectedCountry === c.id ? "selected-country" : '')} id={c.name} key={c.name}> __ {c.points}_{c.name}</div>
                    ))}
                    {pointsData.map(p => (
                        <div className={'mr-2'}>
                            <div onClick={() => goTo("Italy", 12)}
                                 style={{top:pointsPositions.length && pointsPositions.find(pnt => pnt.id === p.id) && pointsPositions.find(pnt => pnt.id === p.id).top || '0',
                                     left:pointsPositions.length && pointsPositions.find(pnt => pnt.id === p.id) && pointsPositions.find(pnt => pnt.id === p.id).left || '0',
                                 }}
                                 className={"point display-flex d-flex justify-content-center align-items-center position-absolute" } >{p.value}</div>
                        </div>
                    ))}
                </div>
                <Row className="points justify-content-center">





                </Row>

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
