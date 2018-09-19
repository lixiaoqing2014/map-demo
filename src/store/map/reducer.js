
const initState = {
    mapProperties: {
        basemap: "streets",
        ground: "world-elevation"
    },
    viewProperties: {
        center: [116.46, 39.92]
    }
}

export const map = (state = initState, action) => {
    switch (action.type) {
        case "move":
            return {
                ...state, viewProperties: action.payload
            }
        default:
            return state
    }
}