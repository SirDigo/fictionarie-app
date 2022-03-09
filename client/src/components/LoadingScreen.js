import React from "react";
import { Image, Row, Col } from "react-bootstrap";

import Logo from "../assets/Fictionarie.gif"

function LoadingScreen(){

    return(
        <Row>
            <Col id="textCenter" style={{marginTop: "5%"}}>
                <Image width="350px" src={Logo} alt="Coin Gif"/>
            </Col>
        </Row>
    )
}

export default LoadingScreen;