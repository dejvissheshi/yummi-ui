import React, { ReactNode } from "react";
import { Card as AntCard } from "antd";

const Card = (props) => {
    return <AntCard {...props}>{props.children}</AntCard>;
};

export default Card;
