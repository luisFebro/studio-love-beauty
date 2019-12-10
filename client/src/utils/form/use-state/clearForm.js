// clear object in a react state using hooks
// this prevents data to be keep from data and if to reload, user will user them again.
export default function clearForm(setObj, objHook, newAssignedVal = '') {
    const tempForm = objHook;
    let key;
    for (key in tempForm) {
        tempForm[key] = newAssignedVal;
    }
    setObj(tempForm);
}