import { Box } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Block } from "../../../assets/imgs/block-inclined.svg";
import { ReactComponent as OffGrid } from "../../../assets/imgs/off-grid.svg";

import "./one.scss";

export default function Trilogy() {
    const navigate = useNavigate();
    return (
        <Box className="one">
            <Box className="flex-text-1-2">
                <div className="text-1">Decentralized</div>
                <div className="text-2">Meets</div>
            </Box>
            <div className="text-3">Finance</div>
            <Box className="chapter-block">
                <div className="chapter-text">Chapter 1:</div>
                <div className="chapter-text-block">
                    <Block/>
                    <div className="true-text">_Index_Fund</div>
                </div>
            </Box>
            <Box className="getting-started">
                <div style={{cursor: "pointer"}} onClick={() => navigate('/ep-1')}>Getting Started</div>
            </Box>
            <div className="absolute-black"></div>
        </Box>
    )
}