import React from "react";
import {Row, Col} from "antd";

const CardDescription = ({photo, title, content, position}) => {

    const leftCard = () => (
        <Col span={12}>
            <div>
                <p>{title}</p>
                <img style={{width: '200px'}} src={photo}/>
            </div>
            <div>
                <p>
                    {content}
                </p>
            </div>
        </Col>
    );

    const rightCard = () => (
        <Col offset={12} span={12}>
            <div>
                <p>{title}</p>
                <img style={{width: '200px'}} src={photo}/>
            </div>
            <div>
                <p>
                    {content}
                </p>
            </div>
        </Col>
    );

    return (
        <Row>
            {position === 'left' ? leftCard() : rightCard()}
        </Row>
    );
};

export default CardDescription;
