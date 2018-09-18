
const initState = {
	mapProperties: { 
        basemap: "satellite",
        ground: "world-elevation"
    },
    viewProperties: {
        center: [-122.4443, 47.2529],
        zoom: 1,
        scale: 500000000
    }
}

export const map = (state = initState, action) => {
    switch (action.type) {
      case "CREATE_MAP":
        return {
         
        }
      default:
        return state
    }
  }