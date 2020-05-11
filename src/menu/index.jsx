import React, {useEffect, useState} from "react";
import {Button, Col, Layout, Menu, notification, Radio} from 'antd';
import CustomFooter from "../common/custom/CustomFooter";
import CustomHeader from "../common/custom/CustomHeader";
import ItemCard from "./itemCard/ItemCard";
import getProductsForMenu, {PriceType, ProductType} from "../server/menu/getProductsForMenu";
import {queryRequest} from "../server/commons/requestUtils";
import ProductContext, {OrderListContext} from "./menuContext";
import CarOutlined from "@ant-design/icons/lib/icons/CarOutlined";
const {Content, Sider}=Layout;
export const MENU_PATH = "/menu";

const MockDataForCard = [
    {"id":14,
        "product_name":"Capricciosa",
        "product_type":"pizza",
        "price":4,
        "description":null,
        "quantity": 4,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"
    },
    {"id":15,
        "product_name":"Chicken & Mushroom",
        "product_type":"pizza",
        "price":4,
        "quantity": 4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"},
    {
        "id":16,
        "product_name":"Diavola",
        "product_type":"pizza",
        "price_euro":4,
        "quantity": 3,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"
}];

const GeneralMenu = () => {
    const [products, setProducts] = useState([]);
    const [priceType, setPriceType] = useState(PriceType.EURO);
    const [productType, setProductType] = useState(null);
    const [orderStates, setOrderStates] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [checkoutData, setCheckoutData] = useState({
        total: 0,
        transport:0,
        products: MockDataForCard
    });

    const fetchData = async () => {
        const result = await queryRequest(() => getProductsForMenu(productType, priceType));
        let data = result.products;
        setProducts([...data]);
        setOrderStates([]);
        data.forEach(({id, product_name, photo, price_euro, price_dollar}, index) => {
            let price = priceType === PriceType.EURO ? price_euro : price_dollar;
            setOrderStates(orderStates => [...orderStates, {id, price, product_name, photo, quantity: 0}])
        });

        if (!result.errors) {
            setProducts(result);
        } else {
            notification.open({
                type: "error",
                message: result.errors[0].message
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [priceType, productType]);

    const addToCard = (prodId) => {
        let newData = orderStates.map(({id, quantity, photo, product_name, price}) => {
            let newQuantity = quantity;
            if (id === prodId) {
                newQuantity++
            }
            return {
                id,
                quantity: newQuantity,
                photo,
                product_name,
                price
            }
        });

        let newList = [];
          newData.forEach(({id, quantity})=>{
              if (quantity > 0){
                  newList.push({id, quantity})
              }
        });

        setOrderStates([...newData]);
        setOrderList([...newList]);
    };

    const removeFromCard = (prodId) => {
        let newData = orderStates.map(({id, quantity, photo, product_name, price}) => {
            let newQuantity = quantity;
            if (id === prodId) {
                newQuantity--
            }
            return {
                id,
                quantity: newQuantity,
                photo,
                product_name,
                price
            }
        });

        let newList = [];
        newData.forEach(({id, quantity})=>{
            if (quantity > 0){
                newList.push({id, quantity})
            }
        });

        setOrderStates([...newData]);
        setOrderList([...newList]);
    };

    const changePriceType = (e) => {
        setPriceType(e.target.value)
    };

    const goToCheckout = () => {
        console.log(orderList);
        setCheckout(true)
    };

    const goToMenu = () => {
        console.log(orderList);
        setCheckout(false)
    };

    const getItems = () => {
        return orderStates.map(({id, quantity, photo, product_name, price}, index) => {
            return <ItemCard type={priceType}
                             index={index}
                             quantity={quantity}
                             photo={photo}
                             price={price}
                             product_name={product_name}
                             id={id}
            />
        })
    };

    const menuComponent = () => (
        <div style={{
            padding: '0 30px',
            minHeight: 180,
            display: "flex",
            flexFlow: "row wrap",
            maxWidth: "85%"
        }}>
            {getItems()}
        </div>
    );

    const listProductInCheckout = () => {
        let data = [];
        data = checkoutData.products;
        return (
            <div>
                {
                    data.map(({photo, product_name, quantity})=>{
                        return <div style={{display:"flex", margin:"16px 24px", background:"white", borderRadius:5, paddingLeft:15}}>
                            <div>
                                <img style={{width:100, borderRadius:5}} src={photo} alt=""/>
                            </div>
                            <div style={{margin:"30px 16px", fontSize:"20px"}}>
                                <h4>{product_name}</h4>
                            </div>
                            <div style={{margin:"30px 16px", fontSize:"20px"}}>
                              <h4>x {quantity}</h4>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    };

    const cartComponent = () => (
        <div style={{margin:"16px 24px", width:"50%", borderRight:"1px solid #505050"}}>
            <div>
                <div>
                    {listProductInCheckout()}
                </div>
            </div>
            <div style={{display:"flex"}}>
                <h4 style={{margin:"16px 48px", fontSize:20}}>
                    {priceType === PriceType.EURO ? `Transport Cost: ${checkoutData.transport} €`
                        : `Transport Cost: $ ${checkoutData.transport}`}
                </h4>
                <CarOutlined style={{fontSize:30, marginTop:"1%"}} />
            </div>
            <h3 style={{margin:"16px 48px", fontSize:24}}>
                {priceType === PriceType.EURO ? `Total: ${checkoutData.total} €`
                    : `Total: $ ${checkoutData.total}`}
            </h3>
        </div>
    );

    return (
        <ProductContext.Provider value={products}>
            <OrderListContext.Provider
                value={{
                    orders: orderStates,
                    addToCard: addToCard,
                    removeFromCard: removeFromCard
                }}>
                <Layout style={{background: 'white'}}>
                    <CustomHeader/>
                    <Content style={{padding: '0 50px'}}>
                        <Layout className="site-layout-background">
                            <Sider className="site-layout-background" width={200} style={{minHeight: "100vh"}}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    onClick={({key}) => {
                                        if (key === "1"){
                                            setProductType(null);
                                            setCheckout(false);
                                        }
                                    else if (key === "2"){
                                            setProductType(ProductType.PIZZA);
                                            setCheckout(false)
                                        }else{
                                            setProductType(ProductType.DRINKS);
                                            setCheckout(false)
                                        }
                                    }}
                                    style={{height: '100%'}}
                                >
                                    <Menu.Item key="1">All Products</Menu.Item>
                                    <Menu.Item key="2">Pizza</Menu.Item>
                                    <Menu.Item key="3">Drinks</Menu.Item>
                                </Menu>
                            </Sider>
                            <div style={{display: "flex", flexDirection: "column", width:"100%", background:"white"}}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div>
                                        <Col>
                                            <Radio.Group value={priceType} onChange={changePriceType}>
                                                <Radio.Button
                                                    style={{width:100, height:35, textAlign:"center", margin:"16px 24px"}}
                                                    value={PriceType.EURO}>EURO</Radio.Button>
                                                <Radio.Button
                                                    style={{width:100, height:35, textAlign:"center", margin:"16px 24px"}}
                                                    value={PriceType.DOLLAR}>USD</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                    </div>
                                    <div>
                                        {
                                        !checkout ? <Button style={{width:100, height:35, textAlign:"center", margin:"16px 24px"}} disabled={orderList.length === 0}
                                            onClick={()=>goToCheckout()}>Order</Button>
                                            :
                                            <Button style={{width:150, height:35, textAlign:"center", margin:"16px 24px"}}
                                                    onClick={()=>goToMenu()}>Back To Menu</Button>
                                        }
                                    </div>
                                </div>
                                <div>
                                    {!checkout ? menuComponent() : cartComponent()}
                                </div>
                            </div>
                        </Layout>
                    </Content>
                    <CustomFooter/>
                </Layout>
            </OrderListContext.Provider>
        </ProductContext.Provider>
    );
};

export default GeneralMenu;
