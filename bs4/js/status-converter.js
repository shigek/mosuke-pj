
const json = require('./contract-status')
module.exports.convert = (docType, status) => {
    let a = ""
    status.forEach((v, i) => {
        if (json[v.key]) {
            if (json[v.key][v.status]) {
                a = a + json[v.key][v.status]
            } else {
                a = a + "0"
            }
        }
    })
    return (json[docType][a]) ? json[docType][a] : "0";
}

console.log(this.convert("po", [
    { key: "po_status", status: "finished" },
    { key: "lc_apply_status", status: "" },
    { key: "lc_status", status: "" }]
))