"use strict";

const source = {
    indata: {
        "key": "key",
        "sc": {
            "firstname": "shigeyoshi",
            "lastname": "kishida",
            "id": "12345",
            "age":"200"
        }
    }
}

function go() {
    var salesContractSchema = {
        "description": "SalesContract",
        "type": "object",
        "properties": {
            "key": {"type": "string"}
        },
        "properties": {
            "sc": {
                "type": "object",
                "properties": {
                    "firstname": { "type": "string" },
                    "lastname": { "type": "string" },
                    "id": { "type": "string" }
                },
                "required": ["firstname", "lastname", "id"]
            },
        },
        "required": ["key","sc"]
    }
   
    let result = {};
    let valid = new (require('jsonschema').Validator);
    let vresult = valid.validate(source.indata, salesContractSchema);
    if (vresult.errors.length > 0) {
        result.status = "VALID";
        result.errors = vresult.errors;
    } else {
        result.status = "SUCCESS";
        result.errors = vresult.errors;
    }
    return result;
}

console.log(go());
