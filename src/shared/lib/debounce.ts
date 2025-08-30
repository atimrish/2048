export const debounce = (cb: Function, ms: number) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => cb(...args), ms)
    }
}