import moment from "moment";
import * as crypto from "crypto";
import axios from "axios";

interface IPayload {
    product: string,
    type: string,
    amount: string | number,
    userEmail: string,
    successURL: string,
    cancelURL: string
}

export const getSecuroProducts = async () => {
    try {
        const url = 'https://sandbox.securo.dev/api/v1/product/get-products';

        const config = configGeneration("GET", url);
        
        return await axios(config)

    } catch (error) {
        console.log('[Error getSecuroProducts]:', error);
    }
}

export const createIndexFundSession = async (body: any) => {
    try {
        const url = 'https://sandbox.securo.dev/api/v1/sessions';

        const config = configGeneration("POST", url, body);
        
        return await axios(config)

    } catch (error) {
        console.log('[Error createIndexFundSession]:', error);
    }
}

const configGeneration = (method: string, url: string, body?: string) => {
    const apiKey = process.env.SECURO_API;
    const secretKey = process.env.SECURO_SECRET;

    const timeStamp = moment().unix();
    let baseString: string = `${url}&method=${method}&timestamp=${timeStamp}`;

    if(body) {
        baseString += `&body=${JSON.stringify(JSON.parse(body))}`;
    }
    const hash = crypto.createHmac('sha256', secretKey).update(baseString).digest('hex');

    let config: any = {
        method: method,
        url,
        headers: {
            'x-sec-key': apiKey,
            'x-sec-ts': timeStamp,
            'x-sec-sign': hash,
            'Content-Type': 'application/json',
        }
    };

    if(body) {
        config = {
            ...config,
            data: body
        }
    }

    return config;
}

export const getIndexesPrice = async () => {
    const timeStamp = moment().unix();

    const symbols = ["MWI", "LCI", "BNI"];
    const mergedData: any = [];

    for await (let item of symbols) {
        const url = `https://sandbox.securo.dev/api/v1/product/price?symbol=${item}`;
        const baseString = `${url}&method=GET&timestamp=${timeStamp}`;
        
        const apiKey = process.env.SECURO_API;
        const secretKey = process.env.SECURO_SECRET;

        const hash = crypto.createHmac('sha256', secretKey).update(baseString).digest('hex');

        const { data } = await axios.get(url, { 
            headers: {
                'x-sec-key': apiKey,
                'x-sec-ts': timeStamp,
                'x-sec-sign': hash,
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

        mergedData.push({
            symbol: item,
            price: data.price
        })
    }

    return mergedData;
}