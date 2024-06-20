const util = function () {
    const state = {}
    const mutation = {}
    const action = {
        generateUUID: () => {
            return 'uu-xxx-xxx-xxx-xxx-xxx'.replace(/[xy]/g,
                (c) => {
                    const r = (Math.random() * 16) | 0
                    const v = c === 'x' ? r : (r & 0x3) | 0x8
                    return v.toString(16)
                })
        }
    }
    return { ...action }
}