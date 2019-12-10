// MESSAGES
const globalMsgs = { ok: {}, error: {} };
const { ok, error } = globalMsgs;

const msgG = (typeAndMsgName, customized = 'NeedCustomWord', options) => {
    const isOnlyMsg = `${customized}${options}`.includes("onlyMsg");

    const checkIfNotString = typeof customized !== 'string';
    checkIfNotString
    ? customized = JSON.stringify(customized).cap()
    : customized = customized.cap()

    const [type, msgName] = typeAndMsgName.split(".");
    let foundMsg;

    // MESSAGES
    ok.success = "Esta operação foi executada com sucesso";
    ok.added = "Adicionado";
    ok.removed = "Removido";
    ok.removedField = `O campo ${customized} foi removido com sucesso!`;
    error.notRemovedField = `Erro! O campo ${customized} já foi removido.`;
    error.noFields = "Preencha todos os campos";
    error.notFound = `${customized} não foi encontrado`;
    error.systemError = `Ocorreu o seguinte erro: ${customized}`;
    // END MESSAGES

    foundMsg = globalMsgs[type][msgName];
    const needThrowErr = foundMsg.includes('NeedCustomWord');
    if(needThrowErr) throw new Error('It is required a customized string');

    if(isOnlyMsg) return foundMsg;
    return ({ msg: foundMsg });
}

module.exports = {
    msgG
}
