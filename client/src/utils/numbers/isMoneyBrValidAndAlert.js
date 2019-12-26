// value string eg "10,60". it can not be dot
export default function isMoneyBrValidAndAlert(string, showSnackbar, dispatch) {
    const endValue = string.slice(-1);
    const commaQuantity = string.match(new RegExp(",",'g'))
    const commaLength = commaQuantity && commaQuantity.length;
    if(commaLength > 1) return showSnackbar(dispatch, "Insira apenas uma vírgula por valor", "error")
    if(endValue === ",") return showSnackbar(dispatch, "Você digitou um número com vírgula sem decimal. Retire a vírgula ou acrescente valor decimal", "error", 8000)
    if(string === "0,0") return showSnackbar(dispatch, "O valor não pode ser zero", "error")
    if(["null", "undefined", "NaN"].includes(string)) return showSnackbar(dispatch, "Campo com erros ou vazio. Digite apenas valor e vírgula", "error");
    return true;
}