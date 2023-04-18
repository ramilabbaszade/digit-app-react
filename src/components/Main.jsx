import React, {useState} from 'react';
import {useAppStore} from "../store/index.js";
import {inputNumbers, gameStatuses} from "../constants.js";
import {arraysEqual} from "../helpers/index.js";


const Main = ({index}) => {
    const status = useAppStore((state) => state.status)
    const health = useAppStore((state) => state.health)
    const score = useAppStore((state) => state.score)
    const decreaseHealth = useAppStore((state) => state.decreaseHealth)
    const increaseLevel = useAppStore((state) => state.increaseLevel)
    const digit = useAppStore((state) => state.digit)
    const numbers = useAppStore((state) => state.numbers)
    const increaseDigit = useAppStore((state) => state.increaseDigit)
    const increaseScoreByDigit = useAppStore((state) => state.increaseScoreByDigit)
    const setStatus = useAppStore((state) => state.setStatus)
    const resetAll = useAppStore((state) => state.resetAll)


    const [valueArr, setValueArr] = useState([])


    const handleClickNumberBtn = (num) => {
        if (status === gameStatuses.INPUTS_ON) {
            let newValueArr = valueArr
            newValueArr.push(num)
            setValueArr(newValueArr)
            if(valueArr.length === numbers.length){
                setStatus(gameStatuses.STOP)
                if(arraysEqual(valueArr,numbers)){
                    // Right answer
                    increaseLevel()
                    increaseDigit()
                    increaseScoreByDigit()
                    setValueArr([])
                }else{
                    if(health !== 0){
                        decreaseHealth()
                    }else{
                        resetAll()
                        alert("Your answer is wrong. You lost! Your score: "+score)
                    }
                }
                // Save to db here
            }else{

            }
        }
    }
    return (
        <div className="main bg-cyan-950 w-3/4 flex flex-col justify-between items-center py-5">
            <div>
                <div className="text-white flex">
                    {[...Array(health)].map((a, ind) => <div key={ind}> ❤ </div>)}
                </div>
            </div>


            <div className="main__indicator">
                <div className="text-white text-center text-2xl mb-2">
                    {digit} digits
                </div>
                <div className="bg-cyan-700 text-green-300 p-16 text-7xl rounded-lg font-bold text-center">
                    {numbers[index]}
                </div>
                <div className="text-white text-center text-2xl mb-2">
                    {valueArr}
                    {status}
                </div>
            </div>


            <div className="inputs_container flex grid grid-cols-5   gap-4 mb-5">
                {
                    inputNumbers.map(num => {
                        return <div key={num} onClick={() => handleClickNumberBtn(num)}
                                    className={`${status !== gameStatuses.INPUTS_ON ? "bg-gray-400" : "bg-cyan-700"} w-20 h-20 flex justify-center items-center text-white rounded-full  text-2xl hover:bg-cyan-600 cursor-pointer`}>
                            {num}
                        </div>
                    })
                }
            </div>

        </div>
    );
};

export default Main;