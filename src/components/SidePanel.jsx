import {useCallback} from "react";
import {useRandomNumberByDigit} from "../hooks/useRandomNumberByDigit.js";
import {useAppStore} from "../store/index.js";
import {gameStatuses} from "../constants.js";

const SidePanel = ({onStart}) => {
    const status = useAppStore((state) => state.status)
    const score = useAppStore((state) => state.score)
    const level = useAppStore((state) => state.level)
    const authData = useAppStore((state) => state.authData)
    const isAuth = useAppStore((state) => state.isAuth)

    return (
        <div className="sidebar bg-cyan-700 w-1/4">
            <div
                className="h-1/4 bg-cyan-600 flex flex-col justify-center items-center text-lg text-white">
                <div>DIGIT</div>
                <div>SPAN</div>
                <div className="bg-red-800">{authData.name}</div>
            </div>
            <div className="h-3/4 bg-cyan-900 flex flex-col justify-around items-center">
                <div
                    className="bg-cyan-300 w-36 h-36 text-2xl font-bold flex flex-col rounded-full justify-center items-center">
                    <div>Level</div>
                    <div>{level}</div>
                </div>
                <div
                    className="bg-cyan-300 w-36 h-36 text-2xl font-bold flex flex-col rounded-full justify-center items-center">
                    <div>Score</div>
                    <div>{score}</div>
                </div>
                <div onClick={isAuth ? onStart: ()=>{}} className={`${status === gameStatuses.READY_TO_START ? "bg-green-500":"bg-slate-500"} rounded p-6`}>
                    <div>{isAuth ? `START | LEVEL:${level}`: "Login"}</div>
                </div>
            </div>

        </div>
    );
};

export default SidePanel;