export const getColor = (key: number) => {
    const colors: Record<string, string> = {
        0: '#5d5d5d',
        2: '#ffffff',
        4: '#f0ecf6',
        8: '#d1c4e6',
        16: '#d1c6e4',
        32: '#c1b3db',
        64: '#b2a0d2',
        128: '#a28dc8',
        256: '#937abf',
        512: '#8367b6',
        1024: '#7454ad',
        2048: '#6441a4'
    }

    return colors[key] ?? '#5d5d5d'
}