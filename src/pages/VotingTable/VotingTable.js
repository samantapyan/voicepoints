import { Button, Table } from 'react-bootstrap';
import './style.scss'
import {useEffect, useState} from "react";

function VotingTable() {

    let cs = [
        {
            name: "Albania",
            half: "first",
            points: 12,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Germany",
            half: "first",
            points: 11,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Sweden",
            half: "first",
            points: 4,
            position: {
                top: 0,
                left: 0
            }
        },

        {
            name: "Armenia",
            half: "first",
            points: 4,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Greece",
            half: "second",
            points: 1,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Georgia",
            half: "second",
            points: 5,
            position: {
                top: 0,
                left: 0
            }
        },
        {
            name: "Italy",
            half: "second",
            points: 1,
            position: {
                top: 0,
                left: 0
            }
        }
    ];


    const [haLfSize, setHalfSize] = useState(0)
    const [countries, setCountries] = useState(cs)
    const [divHeightSize, setDivHeightSize] = useState(0)

    useEffect(()=>{

    },[])



    function compare(a, b) {
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
            let countriesCopy = [...countries]
            let am = document.getElementById('Armenia').getBoundingClientRect()
            console.log("am=",am);
            let divHeight = am.height
            setDivHeightSize(divHeight)
            let halfSizeNumber = Math.ceil(countries.length/2);
            console.log("halsize",halfSizeNumber);
            setHalfSize(halfSizeNumber)
            let sortedArray = countriesCopy.sort(compare)
            console.log("sorted",sortedArray);
            let topFirstHalf = 0
            let leftFirstHalf = 0

            let topSecondHalf = 0
            let leftSecondHalf = am.width + 30

            for (let i = 0 ; i<sortedArray.length/2 ; i++) {
                let c = sortedArray[i]

                c.position = {
                    top: topFirstHalf,
                    left:leftFirstHalf
                }
                console.log("c=",c);
                let cIndex = countriesCopy.findIndex(ct => ct.name ===c.name)
                countriesCopy[cIndex].position = {...c.position}

                topFirstHalf +=divHeight
            }
            for (let i = Math.ceil(countries.length/2) ; i<sortedArray.length ; i++) {
                let c = sortedArray[i]
                c.position = {
                    top: topSecondHalf,
                    left:leftSecondHalf
                }
                console.log("c=",c);
                let cIndex = countriesCopy.findIndex(ct => ct.name ===c.name)
                countriesCopy[cIndex].position = {...c.position}

                topSecondHalf +=divHeight
            }
            setCountries(countriesCopy)

        },2000)
    },[])


    function goTo(countryName, points) {
        let countriesCopy = [...countries]
        // in same half
        // from one to another
        let sortedArray = countriesCopy.sort(compare)
        let start = 0
        let end = 0
        let index = sortedArray.findIndex(c => c.name === countryName)
        let indexInOriginalSelected = countriesCopy.findIndex(co => co.name === countryName)

        if (index<=sortedArray.length/2 ) {
            start = 0
            end = sortedArray.length/2
        } else {
            start = Math.ceil(sortedArray.length/2)
            end = sortedArray.length
        }

        let newCountry = sortedArray[index]
        newCountry.points += points

        for (let i = start ; i<end ; i++) {
            let c = sortedArray[i]
            let indexInOriginal = countriesCopy.findIndex(co => co.name === c.name)
            console.log("points",c.points);
            if (c.points<= newCountry.points) {
                start = i
                newCountry.position = {
                    top: c.position.top,
                    left: c.position.left
                }
                countriesCopy[indexInOriginalSelected] = {...newCountry}
                break
               let temp = {...countriesCopy[indexInOriginal]}
            }
        }
        console.log("interval",start + 1, end );
        for (let i = start ; i<end-1 ; i++) {
            let c = sortedArray[i]
            let indexInOriginal = countriesCopy.findIndex(co => co.name === c.name)

            if (c.name !== countryName) {
                console.log("points***********", c.points);
                let newPosition = {
                    top: c.position.top + divHeightSize,
                    left: c.position.left
                }
                countriesCopy[indexInOriginal] = {...countriesCopy[indexInOriginal], position: newPosition}

            }
        }


        console.log("news",countriesCopy);

         setCountries(countriesCopy)
    }


    return (
        <div className={'mt-5 w-75  mx-auto'}>
            <h1>Voting table {haLfSize} | {haLfSize}</h1>
            <h1 onClick={() => goTo("Georgia", 12)}>12 to Georgia</h1>
            <div className={"board"}>
                {countries.map(c => (
                    <div
                        style={{
                            top: `${c.position.top}px`,
                            left: `${c.position.left}px`
                        }}
                        className={"country"} id={c.name} key={c.name}>{c.points} ___ {c.name}</div>
                ))}
            </div>
        </div>
    );
}

export default VotingTable;
