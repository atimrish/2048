export const getRandomNumber = (min: number, max: number) => {
    const random  = Math.floor(Math.random() * 10 ** 15)
    return random % (max + 1) + min
}