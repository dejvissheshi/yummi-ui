import React, {useState} from "react";
import {Button, Card, Input} from 'antd';
import {PriceType} from "../../server/menu/getProductsForMenu";
import {store} from "../../server/commons/localStorage";
const { Meta } = Card;


const ItemCard = ({id, title, price, photo, type, initialQuantity, addToCard}) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const removeFromCard = (id) => {
        debugger;
        let productQuantity = store.get(id);
        if(productQuantity > 0){
            productQuantity--;
            store.set(id,productQuantity);
        }
    };

    return (
        <div style={{width: 240, height: 140, margin: "20px"}}>
            <Card
                hoverable
                cover={<img style={{width: 200, paddingLeft: "30px"}} alt="example" src={photo}/>}
            >
                {
                    type === PriceType.EURO ?
                        <Meta title={title} description={`Price: € ${price}`}/>
                        :
                        <Meta title={title} description={`Price: ${price} $`}/>
                }

            </Card>
            <div style={{display:"flex"}}>
                <Button type="primary" size="large" disabled={initialQuantity === 0}>
                    Remove
                </Button>
                <Input type="text" value={initialQuantity} disabled/>
                <Button type="primary" size="large"
                        onClick={()=>{
                            addToCard(id, title);
                            setQuantity(initialQuantity++)
                        }}
                >
                    Add
                </Button>
            </div>

        </div>
    )
};

export default ItemCard;
