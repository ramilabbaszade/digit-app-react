import {useEffect, useState} from "react";
import {useAppStore} from "../store/index.js";
import {API_URL, gameStatuses} from "../constants.js";
import {get, post} from "@/lib/utils/api.js";

function Login() {
    const [name,setName] = useState("")
    const [users,setUsers] = useState([])
    const setAuthData = useAppStore((state) => state.setAuthData)
    const setAuth = useAppStore((state) => state.setAuth)
    const setStatus = useAppStore((state) => state.setStatus)

    const getAll = async() => {
        const usersData = await get("/")
        setUsers(usersData)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const user = {name,score:0,level:1}
        if(name){
            const data = await post("/",user)
            setAuthData(data)
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
            <button
                onClick={getAll}
                className="mt-5 flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4  py-1 px-2 rounded"
                type="button">
                Users list
            </button>
            <ul className=" max-h-60 overflow-y-auto mt-2">
                {users.length !== 0 && <li className="bg-blue-500 p-3">Name -- Score -- Level</li>}
                {
                    users?.map(u=>{
                        return <li className="bg-white px-3 py-1">{u.name} -- {u.score} --  {u.level}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default Login;