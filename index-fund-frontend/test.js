const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const timestamp = moment().unix();
const apiKey = '5122edd4-7a46-4351-b0ef-f3071b93c9a6'; 
const secretKey = '1c7b33ce9a640ae3a94352edd4804b8684ecc5586847755f054b0a5e12b008d3'; 
const url = 'https://sandbox.securo.dev/api/v1/sessions';
const method = 'POST';

async function main () {
  
const data = JSON.stringify({
  "product": "LCI", // 'LCI', 'MWI'
  "type": "deposit", // 'deposit', 'withdraw', 'query'
  "amount": 1,
  "userEmail": "jjmah93@gmail.com"
});

let baseString = `${url}&method=${method}&timestamp=${timestamp}`;
if (data) baseString += `&body=${JSON.stringify(JSON.parse(data))}`

const hash = crypto.createHmac('sha256', secretKey).update(baseString).digest('hex');
const headers = { 
  'x-sec-key': apiKey, 
  'x-sec-ts': timestamp, 
  'x-sec-sign': hash, 
  'Content-Type': 'application/json'
};
const config = {
  method,
  url,
  headers: { 
    'x-sec-key': apiKey, 
    'x-sec-ts': timestamp, 
    'x-sec-sign': hash, 
    'Content-Type': 'application/json'
  },
  data
};

const test = await axios.post('https://sandbox.securo.dev/api/v1/sessions', data, {
  headers: { 
    'x-sec-key': apiKey, 
    'x-sec-ts': timestamp, 
    'x-sec-sign': hash, 
    'Content-Type': 'application/json'
  }
});

console.log(test)

}

main()