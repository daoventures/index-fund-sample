import React, { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Box } from "@mantine/core";
import { ReactComponent as OffGrid } from "../../assets/imgs/off-grid.svg";
import "./index.scss";
import POne from "../ui-components/chapters/page_one";
import Trilogy from "../ui-components/chapters/trilogy";
import { getAllPrices } from "../apis/index-fund";

export const SessionCTX: any = createContext<any>("");

export default function Root() {
    const [message, setMessage] = useState("");
    const [currentPrice, setCurrentPrice] = useState<any[]>([{
        symbol: "MWI",
        price: 0
    }, {
        symbol: "LCI",
        price: 0
    }, {
        symbol: "BNI",
        price: 0
    }]);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Trilogy/>
        },
        {
            path: "/ep-1",
            element: <SessionCTX.Provider value={[message, setMessage]}><POne/></SessionCTX.Provider>
        }
    ])

    const getAllPricesAPI = async () => {
        const test = await getAllPrices()
        setCurrentPrice(test.data)
    }

    useEffect(() => {
        getAllPricesAPI();
    }, [])

    return (
        <div className="view-port">
            <div className="root-block">
                <div className="body-block">
                    <div className="panel-block">
                        <div className="inner-panel">
                            <div style={{position: "absolute", top: "0", right: "0", color: "greenyellow", margin: "0.4vw"}}>
                                Current Price:
                                {currentPrice && currentPrice.map(item => 
                                    <span style={{paddingLeft: "1vw"}}>{item.symbol} - ${parseFloat(item.price).toFixed(2)}</span>    
                                )}
                            </div>
                            <React.StrictMode>
                                <RouterProvider router={router} />
                            </React.StrictMode>
                        </div>
                    </div>
                    <div className="off-grid-holder">
                        <div className="event-logs">
                            Event Logs
                            <div className="event-block">
                                <div className="message">{'>'}_ message:</div>
                                <div>{message}</div>
                            </div>
                        </div>
                        <div className="off-grid">
                            <OffGrid/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot-absolute">
                <Box className="foot-holder">
                    <div className="disclaimer">Disclaimer: This is only a test api of Securo.</div>
                    <div className="epi">Episode 1: <span className="title">Index Fund</span></div>
                </Box>
            </div>
        </div>
    )
}