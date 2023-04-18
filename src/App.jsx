import {useCallback, useState} from 'react'
import {useRandomNumberByDigit} from "./hooks/useRandomNumberByDigit.js";
import {useAppStore} from "@/store/index.js";
import Main from "@/components/Main.jsx";
import SidePanel from "@/components/SidePanel.jsx";
import {gameStatuses} from "@/constants.js";
import Login from "@/components/Login.jsx";

function App() {
    const status = useAppStore((state) => state.status)
    const digit = useAppStore((state) => state.digit)
    const numbers = useAppStore((state) => state.numbers)
    const setStatus = useAppStore((state) => state.setStatus)
    const setNumbers = useAppStore((state) => state.setNumbers)
    const isAuth = useAppStore((state) => state.isAuth)
    const [index, setIndex] = useState(0);


    const onStart = useCallback(() => {
        setStatus(gameStatuses.STARTED)
        const [num, numArr] = useRandomNumberByDigit(digit)
        setNumbers(numArr)

        const lastIndex = numArr.length - 1;

        const intervalId = setInterval(() => {
            setIndex(prevIndex => {
                if (prevIndex === lastIndex) {
                    clearInterval(intervalId);
                    setStatus(gameStatuses.INPUTS_ON)
                    return -1;
                }
                return (prevIndex + 1) % numArr.length;
            });
        }, 1300);

        return () => clearInterval(intervalId);
    }, [index, numbers, digit, status]);

    return (
        <div className="h-screen flex">
            {isAuth ? <Main index={index} />: <Login/>}

            <SidePanel onStart={onStart} />
        </div>
    )
}

export default App
