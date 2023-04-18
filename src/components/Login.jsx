import {useState} from "react";
import {useAppStore} from "../store/index.js";
import {gameStatuses} from "../constants.js";

function Login() {
    const [name,setName] = useState("")
    const setAuthData = useAppStore((state) => state.setAuthData)
    const setAuth = useAppStore((state) => state.setAuth)
    const setStatus = useAppStore((state) => state.setStatus)

    const onSubmit = (e) => {
        e.preventDefault()
        const user = {name}
        if(name){
            setAuthData(user)
            setAuth(true)
            setStatus(gameStatuses.READY_TO_START)
        }
    }

    return (
        <div className="main bg-cyan-950 w-3/4 flex flex-col justify-center items-center py-5">
            <form className="w-full max-w-sm" onSubmit={onSubmit}>
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text" placeholder="Jane Doe" aria-label="Full name"/>
                        <button
                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4  py-1 px-2 rounded"
                            type="submit">
                            Start
                        </button>
                </div>
            </form>
        </div>
    );
}

export default Login;