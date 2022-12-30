import * as express from "express";
import { defaultURL } from "../../routes";
import moment from "moment";
import * as crypto from "crypto";
import axios from "axios";
import { createIndexFundSession, getIndexesPrice, getSecuroProducts } from "./index-fund.service";

interface IPayload {
    product: string,
    type: string,
    amount: string | number,
    userEmail: string,
    successURL: string,
    cancelURL: string
}
export const indexFundController = (app: express.Application) => {

    app.get(`${defaultURL}/products`,
    async (req, res, next) => {

        try {
            const _products = await getSecuroProducts();
            const { data } = _products;
            const _product = data.data;

            const available_index: any[] = [];

            _product.forEach((item: any) => {
                available_index.push(item.symbol);
            })
            res.status(200).send(available_index)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    })

    app.get(`${defaultURL}/price`,
    async (req, res, next) => {

        try {
           const _products_price = await getIndexesPrice();
            res.status(200).send(_products_price)
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    })

    app.post(`${defaultURL}/create-session`,
    async (req, res, next) => {

        try {

            const payload: IPayload = req.body;
            const body = JSON.stringify({
                "product": payload.product,
                "type": payload.type,
                "amount": payload.amount,
                "userEmail": payload.userEmail,
                "successURL": "http://localhost:3000/complete",
                "cancelURL": "http://localhost:3000/"
            });

            // ;TODO You may change successURL and cancelURL to your destinied location redirect

            const session = await createIndexFundSession(body)
          
            res.status(200).json(session.data)
        } catch (error) {
            console.log(error)
            res.send(error)
        }

    })

    // LTS
}