import {create} from 'zustand'
import {gameStatuses} from "@/constants.js";

const defaultStates = {
    authData: {},
    isAuth: false,
    index: 0,
    numbers: [],
    level: 1,
    score: 0,
    health: 3,
    digit: 3,
    status: gameStatuses.STOP,
}

export const useAppStore = create((set) => ({
    ...defaultStates,
    setIndex: (index) => set(() => ({index})),
    setNumbers: (numbers) => set(() => ({numbers})),
    increaseDigit: () => set((state) => ({digit: state.digit + 1})),
    increaseLevel: () => set((state) => ({level: state.level + 1})),
    increaseScoreByDigit: () => set((state) => ({score: state.score + state.digit})),
    decreaseHealth: () => set((state) => ({health: state.health - 1})),
    setAuthData: (authData) => set(() => ({authData})),
    setStatus: (status) => set(() => ({status})),
    setAuth: (isAuth) => set(() => ({isAuth})),
    resetAll: () => set((state) => (defaultStates)),

}))
