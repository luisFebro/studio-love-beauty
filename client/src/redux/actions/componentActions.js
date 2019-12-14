// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue


export const showComponent = (dispatch, option) => {
    switch(option) {
        case "purchaseValue":
            dispatch({ type: "PURCHASE_VALUE_DISPLAYED" });
            break;
        case "staffConfirmation":
            dispatch({ type: "STAFF_CONFIRMATION_DISPLAYED" });
            break;
        case "clientScoresPanel":
            dispatch({ type: "CLIENT_SCORES_PANEL_DISPLAYED" });
            break;
        default:
            console.log("Something is wrong with your name")
    }
}

export const hideComponent = (dispatch, option) => {
    switch(option) {
        case "login":
            dispatch({ type: "LOGIN_HIDDEN" });
            break;
        case "purchaseValue":
            dispatch({ type: "PURCHASE_VALUE_HIDDEN" });
            break;
        case "staffConfirmation":
            dispatch({ type: "STAFF_CONFIRMATION_HIDDEN" });
            break;
        case "clientScoresPanel":
            dispatch({ type: "CLIENT_SCORES_PANEL_HIDDEN" });
            break;
        default:
            console.log("Something is wrong with your name")
    }
}

export const hideAllComponents = dispatch => {
    dispatch({ type: "ALL_COMPONENTS_CLEARED" })
}


