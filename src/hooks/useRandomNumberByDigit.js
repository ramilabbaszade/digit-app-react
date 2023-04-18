export const useRandomNumberByDigit = (numberOfDigits = 3) => {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, numberOfDigits));
    const numberArr = String(randomNumber).split("").map(n => Number(n))
    return [randomNumber, numberArr]
}
