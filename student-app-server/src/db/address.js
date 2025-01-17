import { getConnection } from "./db.js";

export function getAddressById(id, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`SELECT * FROM ADDRESS WHERE ID=${id}`, function (error, results, fields) {
        if (error) throw error;
        connection.end();
        callbackFn(results[0] ? results[0] : {message: "Address not found"});
    });
}

export function getAddressByParams(address, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`SELECT * FROM ADDRESS WHERE HOUSENO='${address.houseNo}' AND STREET='${address.street}' AND TOWN='${address.town}' AND DISTRICT='${address.district}' AND STATE='${address.state}'`, function (error, results, fields) {
        console.log(results)
        if (error) throw error;
        connection.end();
        callbackFn(results[0] ? results[0] : null);
    });
}

export function createAddress(address, callbackFn) {
    const connection = getConnection();
    connection.connect();

    connection.query(`INSERT INTO ADDRESS (HOUSENO, STREET, TOWN, DISTRICT, STATE, COUNTRY, IS_SCHOOL_ADDR) VALUES ('${address.houseNo}', '${address.street}', '${address.town}', '${address.district}', '${address.state}', '${address.country}', 'Y')`, (error, result, fields) => {
        // console.log(result, error);
        connection.end();
        if (error) callbackFn(null)
        getAddressByParams(address, (addr)=>{
            callbackFn(addr)
        })        
    });
}
