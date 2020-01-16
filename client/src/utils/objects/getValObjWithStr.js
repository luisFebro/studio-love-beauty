export default function getValObjWithStr(obj, path) {
    const paths = path.split('.');
    let curr = obj;

    paths.forEach(path => {
        return curr[path] === undefined
        ? undefined
        : curr = curr[path];
    })
    return curr;
}