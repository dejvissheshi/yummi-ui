import React from "react";
import {Button, Card} from 'antd';
const { Meta } = Card;

const ItemCard = ({title, price, photo}) => {
    return (
        <div style={{width: 240, margin:"20px"}}>
            <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
            >
                <Meta title={title} description={price}/>
            </Card>
            <Button type="primary" size="large">
                Order
            </Button>
        </div>
    )
};

export default ItemCard;
