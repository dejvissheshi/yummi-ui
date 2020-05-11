import React, {useContext} from "react";
import {Button, Input} from 'antd';
import {PriceType} from "../../server/menu/getProductsForMenu";
import ProductContext, {OrderListContext} from "../menuContext";


const ItemCard = ({index, id, photo, product_name, price, quantity, type}) => {
    const contextProduct = useContext(ProductContext);
    const {orders, addToCard, removeFromCard} = useContext(OrderListContext);

    const displayContext = () => {
        console.log(index);
    };

    return (
        <div style={{maxWidth:200, minHeight:300, margin:"16px 24px"}}>
            <div>
                <img style={{width: 200}} src={photo} alt=""/>
            </div>
            <div style={{textAlign:"center"}}>
                <h4 style={{marginTop:10}}>{product_name}</h4>
                <p>{
                    type === PriceType.EURO ? `Price: ${price} €`
                        : `Price: $ ${price}`
                }</p>
            </div>
            <div style={{display: "flex"}}>
                <Button
                    style={{width:"40%", textAlign:"center", padding:"0 10px"}}
                    type="primary" size="large" disabled={quantity === 0}
                        onClick={()=>removeFromCard(id)}
                >
                    Remove
                </Button>
                <Input style={{width:"20%", textAlign:"center"}} type="text" value={quantity} disabled/>
                <Button style={{width:"40%", textAlign:"center", padding:"0 10px"}}
                        type="primary" size="large"
                        onClick={() => {
                            addToCard(id);
                            displayContext()
                        }}
                >
                    Add
                </Button>
            </div>
        </div>
    )
};

export default ItemCard;
