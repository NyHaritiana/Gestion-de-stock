const QRCode = require('qrcode');

let data = {
    "name": "hart",
    "email": "test@gmail.com",
    "id": 1234
};

let stJson = JSON.stringify(data);
QRCode.toString(stJson, { type: "terminal" }, function (err, code) {
    if (err) return console.log("error");
    console.log(code);
});
