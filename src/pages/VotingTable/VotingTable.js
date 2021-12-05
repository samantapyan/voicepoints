import { Button, Table } from 'react-bootstrap';
import './style.scss'
import {useEffect, useState} from "react";
import transitionSound from './../../sounds/points_go.wav'
function VotingTable() {

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
            // let am = document.getElementById('Armenia').getBoundingClientRect()
            // console.log("am=",am);
            let am = {
                height : 30,
                width:200
            }
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


    function goTo(countryName, points) {
let sound = new Audio(transitionSound)
        sound.play();
        console.log("sound===",sound);

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
            sortedCountriesData[indexInSorted].points = selectedCountry.points
            sortedCountriesData[indexInSorted].position = {...sortedCountriesData[destinationIndex].position}






            if (destinationIndex === indexInSorted  ) {
                // NO POSITION MOVEMENT // ONLY VALUE
                let indexInOriginal = countriesCopy.findIndex(co => co.name === countryName)
                countriesCopy[indexInOriginal].points += points
                setCountries(countriesCopy)
                setSortedCountries(sortedCountriesData)
                return
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
                newData.push({...c})
            })
            setCountries([...newData])
            setSortedCountries(sortedCountriesData)
        },1000)



    }


    return (
        <div className={'mt-5 w-75  mx-auto'}>
            <h1>Voting table {haLfSize} | {haLfSize}</h1>
            <h1 onClick={() => goTo("Albania", 12)}>12 to Albania</h1>
            <h1 onClick={() => goTo("Sweden", 12)}>12 to Sweden</h1>
            <h1 onClick={() => goTo("Germany", 12)}>12 to Germany</h1>
            <h1 onClick={() => goTo("Italy", 12)}>12 to Italy</h1>
            <h1 onClick={() => goTo("Armenia", 12)}>12 to Armenia</h1>
            <h1 onClick={() => goTo("Greece", 12)}>12 to Greece</h1>
            <h1 onClick={() => goTo("Georgia", 12)}>12 to Georgia</h1>

            <div className={"board"}>
                {countries.map((c) => (
                    <div
                        style={{
                            top: `${c.position.top}px`,
                            left: `${c.position.left}px`,
                            border: (selectedCountry && selectedCountry === c.id) && '2px solid black !important'
                        }}
                        className={"country " + (selectedCountry && selectedCountry === c.id ? "selected-country" : '')} id={c.name} key={c.name}> __ {c.points}_{c.name}</div>
                ))}
            </div>
        </div>
    );
}

export default VotingTable;
