export const requestAnimationTimeout = (callback: () => void, ms: number) => {
    const timeCall = performance.now()

    const animate = () => {
        if (performance.now() - timeCall >= ms) {
            callback()
        } else {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}