import React, {useEffect, useState} from "react";
import {Col, Layout, Menu, notification, Row, Button, Radio } from 'antd';
import CustomFooter from "../common/custom/CustomFooter";
import CustomHeader from "../common/custom/CustomHeader";
import ItemCard from "./itemCard/ItemCard";
import getProductsForMenu, {PriceType, ProductType} from "../server/menu/getProductsForMenu";
import {queryRequest} from "../server/commons/requestUtils";
import {store} from "../server/commons/localStorage";

const {Content, Sider}=Layout;

export const MENU_PATH = "/menu";

const MockData = [
    {
        "id":14,
        "product_name":"Capricciosa",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"},
    {
        "id":15,
        "product_name":"Chicken & Mushroom",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"
    },
    {
        "id":16,
        "product_name":"Capricciosa",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"},
    {
        "id":17,
        "product_name":"Chicken & Mushroom",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"
    },
    {
        "id":18,
        "product_name":"Capricciosa",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"},
    {
        "id":19,
        "product_name":"Chicken & Mushroom",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"
    },
    {
        "id":20,
        "product_name":"Capricciosa",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"},
    {
        "id":21,
        "product_name":"Chicken & Mushroom",
        "product_type":"pizza",
        "price_euro":4,
        "description":null,
        "photo":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/the-yummi-pizza-d5905.appspot.com\/o\/capricciosa-pizza.jpg?alt=media&token=216df53f-f6ce-4593-9a56-881c535e895c"
    }
];


const GeneralMenu = () => {
    const [products, setProducts] = useState([]);
    const [priceType, setPriceType] = useState(PriceType.EURO);
    const [productType, setProductType] = useState(null);
    const [orderStates, setOrderStates] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const fetchData = async () => {
        const result = await queryRequest(()=>getProductsForMenu(productType,priceType));
        console.log(result);
        // if (!result.errors) {
        //     setProducts(result);
        // } else {
        //     notification.open({
        //         type: "error",
        //         message: result.errors[0].message
        //     });
        // }
    };

    const addQuantityProperty = () => {
        MockData.forEach((el)=>{
           el["quantity"] = 0;
            setProducts(products => [...products, el])
        });
    };

    useEffect(()=>{
         addQuantityProperty()
    },[]);

    useEffect(()=> {
        fetchData()
    },[priceType, productType]);

    const defineOrderList = (prodId, productName) => {
        debugger;
        let currentOrderList = [...orderStates];
        let doesProductExist = false;
        if (currentOrderList.length > 0){
            for(let i = 0; i < currentOrderList.length; i++){
                if (currentOrderList[i].id === prodId){
                    currentOrderList[i].quantity++;
                    doesProductExist = true;
                    break;
                }
            }
            if (!doesProductExist){
                currentOrderList.push({
                        id:prodId,
                        product_name: productName,
                        quantity:1,
                    })
            }
        }else{
            currentOrderList = [{
                id:prodId,
                product_name: productName,
                quantity:1,
            }]
        }

        return currentOrderList;
    };

    const addToCard = (prodId, productName) => {
        let newOrderList = defineOrderList(prodId, productName);
        newOrderList.forEach((order)=>{
            setOrderStates([...products, order])
        });

        setOrderList([...orderList, {id:prodId, productName}])
    };

    const changePriceType = (e) =>{
        setPriceType(e.target.value)
    };

    const getOrderList = () => (
        <ul>
            { orderList.map(({productName})=>{
                return <li>+ {productName}</li>
            })}
        </ul>

    );

    const getItems = () => {
        return products.map((product) => {
            return <ItemCard title={product.product_name}
                             price={priceType === PriceType.EURO ? product.price_euro : product.price_dollar}
                             type={priceType}
                             photo={product.photo}
                             initialQuantity={product.quantity}
                             id={product.id}
                             addToCard={(id, product_name)=>addToCard(id, product_name)}
            />
        })
    }
    ;

    return (
        <Layout style={{background:'white'}}>
            <CustomHeader/>
            <Content style={{padding: '0 50px'}}>
                <Layout className="site-layout-background">
                    <Sider className="site-layout-background" width={200} style={{minHeight:"100vh"}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            onClick={({key})=>{
                                if (key === "1")
                                    setProductType(null);
                                else if (key==="2")
                                    setProductType(ProductType.PIZZA);
                                else
                                    setProductType(ProductType.DRINKS)
                            }}
                        >
                            <Menu.Item key="1" >All Products</Menu.Item>
                            <Menu.Item key="2">Pizza</Menu.Item>
                            <Menu.Item key="3">Drinks</Menu.Item>
                        </Menu>
                    </Sider>
                    <div style={{display:"flex"}}>
                    <Row>
                        <Col>
                            <Radio.Group value={priceType} onChange={changePriceType}>
                                <Radio.Button value={PriceType.EURO}>EURO</Radio.Button>
                                <Radio.Button value={PriceType.DOLLAR}>USD</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Content style={{padding: '0 24px', minHeight: 180, display:"flex", flexFlow:"row wrap"}}>
                        <Row>
                        <Col span={20}
                            style={{padding: '0 24px', minHeight: 180, display:"flex", flexFlow:"row wrap"}}>
                            {getItems()}
                        </Col>
                        <Col>
                            {getOrderList()}
                        </Col>
                        </Row>
                    </Content>
                    </Row>
                    </div>
                </Layout>
            </Content>
            <CustomFooter/>
        </Layout>
    );
};

export default GeneralMenu;
