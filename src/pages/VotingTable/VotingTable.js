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
            half: "second",
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
            half: "first",
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
            console.log(111,countriesCopy);
            setCountries(countriesCopy)

        },2000)
    },[])


    function goTo(countryName, points) {
        let countriesCopy = [...countries]
        // in same half
        // from one to another
        let sortedArray = [...countriesCopy.sort(compare)]
        console.log("start============",sortedArray);
        let start = 0
        let end = 0
        let index = sortedArray.findIndex(c => c.name === countryName)
        let indexInOriginalSelected = countriesCopy.findIndex(co => co.name === countryName)
    let half = ""

        if (index<=(sortedArray.length-1)/2 ) {
            half = "first"
            start = 0
            end = (sortedArray.length-1)/2
        } else {
            half = "second"
            start = Math.ceil(sortedArray.length/2)
            end = sortedArray.length
        }

        let newCountry = {...sortedArray[index]}
        newCountry.points += points

        let destinationIndex =sortedArray.findIndex(c => c.points <= newCountry.points)
        console.log("destination index ===",destinationIndex);


        console.log("checkcccccc", half === "first" , destinationIndex , Math.ceil((sortedArray.length-1)/2))
        // some half
        console.log(destinationIndex);
        if (sortedArray[destinationIndex].name === countryName ) {
            let indexInOriginal = countriesCopy.findIndex(co => co.name === countryName)
console.log("kkkkkkk", countriesCopy[indexInOriginal].points , points)

             countriesCopy[indexInOriginal].points += points
            setCountries(countriesCopy)
            return

        }
        if (destinationIndex!== -1 && half && ((half === "first" && destinationIndex <= Math.ceil((sortedArray.length-1)/2)) ||
            (half === "second" && destinationIndex >= Math.ceil((sortedArray.length-1)/2 )) )) {
            console.log("same half")
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
        }else {
            console.log("from one to another")
            let c = {...sortedArray[destinationIndex]}
            console.log("C=====",c.position);
            start = destinationIndex
            newCountry.position = {
               top: c.position.top,
               left: c.position.left
            }
            console.log(333,newCountry, indexInOriginalSelected);
            countriesCopy[indexInOriginalSelected] = {...newCountry}
            end = Math.ceil((sortedArray.length-1)/2)
            console.log("interval",start + 1, end );
            for (let i = start ; i< end ; i++) {
                let c = {...sortedArray[i]}
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

            let cc = {...sortedArray[end]}
            console.log(cc, countriesCopy);
            console.log("???????????",sortedArray);
            let indexInOriginalCC = countriesCopy.findIndex(co => co.name === cc.name)
            let newPosition = {
                top: sortedArray[end+1].position.top,
                left: sortedArray[end+1].position.left
            }
            countriesCopy[indexInOriginalCC] = {...countriesCopy[indexInOriginalCC], position: newPosition}
            console.log("sssssssssss",sortedArray);

           let sortedArray2 = [...sortedArray]
            sortedArray2 = sortedArray2.sort(compare)
            for (let i = Math.ceil((sortedArray2.length-1)/2)+1; i< sortedArray2.length ; i++) {

                if (sortedArray2[i].name !== countryName) {
                    let c = sortedArray2[i]

                    console.log("gggggggg", c.name , countryName)

                    let indexInOriginal = countriesCopy.findIndex(co => co.name === c.name)


                    console.log("points***********", c.points);
                    let newPosition = {
                        top: c.position.top + divHeightSize,
                        left: c.position.left
                    }
                    console.log("bug",newPosition);
                    countriesCopy[indexInOriginal] = {...countriesCopy[indexInOriginal], position: newPosition}
                }



            }





        }

        ///different halfs




        console.log("news",countriesCopy);

         setCountries(countriesCopy)
    }


    return (
        <div className={'mt-5 w-75  mx-auto'}>
            <h1>Voting table {haLfSize} | {haLfSize}</h1>
            <h1 onClick={() => goTo("Italy", 12)}>12 to Italy</h1>
            <h1 onClick={() => goTo("Armenia", 12)}>12 to Armenia</h1>
            <h1 onClick={() => goTo("Greece", 12)}>12 to Greece</h1>
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
