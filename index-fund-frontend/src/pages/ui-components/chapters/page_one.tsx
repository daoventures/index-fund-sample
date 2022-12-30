import { Box, Button, Select, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import * as crypto from "crypto";
import moment from "moment";
import { ReactComponent as Block } from "../../../assets/imgs/block-inclined-small.svg";
import { ReactComponent as OffGrid } from "../../../assets/imgs/off-grid.svg";
import { createSession, getAvailableProducts } from "../../apis/index-fund";
import { SessionCTX } from "../../root";
import "./one.scss";

export default function POne() {
    const [product, setProduct] = useState([]);
    const [message, setMessage]: [message: any, setMessage: any] = useContext(SessionCTX);
    const form = useForm({
        initialValues: {
            product: '',
            transactionType: '',
            amount: '',
            userEmail: '',
            successUrl: '',
            cancelUrl: ''
        },
    
        validate: {
            userEmail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
    
    const availableProducts = async () => {
        const result = await getAvailableProducts();

        setProduct(result.data)
        console.log(result)
    }
    useEffect(() => {
        availableProducts();
    }, [])
    const transactionType = ['deposit', 'withdraw'];

    const onSubmitHandler = async () => {
        const payload = {
            "product": form.values.product,
            "type": form.values.transactionType,
            "amount": form.values.amount,
            "userEmail": form.values.userEmail
        };

        try {
            const { data } = await createSession(payload);
            setMessage(<>{message}<div style={{color: 'greenyellow'}}>{'>'}_ {data.statusCode} {data.message} <div>Click link below to pay: </div><div style={{color: "yellow", cursor: "pointer"}} onClick={() => window.open(data.data.url)}>{data.data.url}</div></div></>);
        } catch (error) {
            const { data } = error;
            console.log('err', data)
            setMessage(<>{message}<div style={{color: 'red'}}>{'>'}_ {data.statusCode} {data.message}</div></>);
        }
    }
    return (
        <Box className="one">
            <Box className="page-one">
                <div className="title">_INDEX_FUND</div>
                <form onSubmit={form.onSubmit((v) => onSubmitHandler())}>
                <Box className="fields-group">
                    <Box className="fields-1">
                        <Select {...form.getInputProps('product')} placeholder="Select a product" data={product}/>
                        <Select {...form.getInputProps('transactionType')} placeholder="Select a transaction type" data={transactionType}/>
                        <TextInput {...form.getInputProps('amount')} type={'number'} placeholder="Input amount"/>
                        <TextInput {...form.getInputProps('userEmail')} placeholder="User email"/>
                    </Box>
                    <Box className="fields-2">
                        {/* <TextInput {...form.getInputProps('successUrl')} placeholder="Success Url"/>
                        <TextInput {...form.getInputProps('cancelUrl')} placeholder="Cancel Url"/> */}
                    </Box>
                    <Button type="submit" className="submit">Submit</Button>
                </Box>
                </form>
            </Box>
            <Box className="chapter-block">
                {/* <div className="chapter-text">Chapter 1:</div> */}
                <div className="just-block">
                    <Block/>
                    {/* <div className="true-text">_Index_Fund</div> */}
                </div>
            </Box>
            <Box className="getting-started">
                <div>Begin to invest in index fund</div>
            </Box>
            <div className="absolute-black"></div>
        </Box>
    )
}