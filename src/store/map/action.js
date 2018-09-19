// import * as pollutionMonitor from "./action-type";

export function loadData (userinfo) {
	return { type: "LOAD_DATA", payload: userinfo } 
}

export function ww(data) {
    return dispath => {
        axios.post("./user/update", data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispath(authSuccess(res.data.data))
                } else {
                    dispath(errorMsg(res.data.msg))
                }
            })
    }
}

export function handleMove(data) { 
    return { type: "move", payload: data }
}