import React from "react";
import { Image, Row, Col } from "react-bootstrap";

import CoinGif from "../Coin.gif"

function LoadingScreen(){

    return(
        <Row>
            <Col style={{marginTop: "5%"}}>
                <Image width="350px" src={CoinGif} alt="Coin Gif"/>
            </Col>
        </Row>
    )
}

export default LoadingScreen;