import React, {useEffect, useState} from "react";
import {Button, Col, Layout, Menu, notification, Radio, Skeleton} from 'antd';
import CustomFooter from "../common/custom/CustomFooter";
import CustomHeader from "../common/custom/CustomHeader";
import ItemCard from "./itemCard/ItemCard";
import getProductsForMenu, {PriceType, ProductType} from "../server/menu/getProductsForMenu";
import {queryRequest} from "../server/commons/requestUtils";
import ProductContext, {OrderListContext} from "./menuContext";
import CarOutlined from "@ant-design/icons/lib/icons/CarOutlined";
import getCheckoutInformation from "../server/menu/getCheckoutInformation";
const {Content, Sider}=Layout;
export const MENU_PATH = "/menu";

const GeneralMenu = () => {
    const [products, setProducts] = useState([]);
    const [priceType, setPriceType] = useState(PriceType.EURO);
    const [productType, setProductType] = useState(null);
    const [orderStates, setOrderStates] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [checkoutData, setCheckoutData] = useState({
        products:[],
        total: 0,
        subtotal: 0,
        transport: 0
    });
    const [checkoutLoading, setCheckoutLoading] = useState(true);

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

    const fetchCheckoutData = async () => {
        debugger;
        let data = {
            products: orderList,
            price_type: priceType
        };
        let result = await queryRequest(() => getCheckoutInformation(data));
        if (result) {
            let data = result.data;
            setCheckoutData(data);
        } else {
            notification.open({
                type: "error",
                message: "There was an error processing checkout!"
            });
        }
        setCheckoutLoading(false);
    };

    useEffect(()=>{
        if (checkout) {
            setCheckoutLoading(true);
            fetchCheckoutData();
        }
    },[checkout, priceType]);

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

    const goToCheckout = async () => {
        setCheckout(true)
    };

    const goToMenu = () => {
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
        let data = checkoutData.products;
        return (
            <div>
                {
                    data.map(({photo, product_name, quantity, price}, index) => {
                        console.log(price);
                        return <div key={index} style={{
                            display: "flex",
                            margin: "16px 24px",
                            background: "white",
                            borderRadius: 5,
                            paddingLeft: 15
                        }}>
                            <div>
                                <img style={{width: 100, borderRadius: 5}} src={photo} alt=""/>
                            </div>
                            <div style={{margin: "30px 16px", fontSize: "20px"}}>
                                <h4>{product_name}</h4>
                            </div>
                            <div style={{margin: "30px 16px", fontSize: "20px"}}>
                                <h4><span style={{marginRight:20}}>{priceType === PriceType.EURO ? `Price per unit: ${price.toPrecision(3)} €`
                                    : `Price per unit: $ ${price.toPrecision(3)}`}</span> x {quantity}</h4>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    };

    const cartComponent = () => (
        <Skeleton active loading={checkoutLoading}>
        <div style={{margin:"16px 24px", width:"50%", borderRight:"1px solid #505050"}}>
            <div>
                <div>
                    {listProductInCheckout()}
                </div>
            </div>
            <div style={{display:"flex"}}>
                <h4 style={{margin:"16px 48px", fontSize:20}}>
                    {priceType === PriceType.EURO ? `Transport Cost: ${checkoutData.transport.toPrecision(3)} €`
                        : `Transport Cost: $ ${checkoutData.transport.toPrecision(3)}`}
                </h4>
                <CarOutlined style={{fontSize:30, marginTop:"1%"}} />
            </div>
            <h3 style={{margin:"16px 48px", fontSize:24}}>
                {priceType === PriceType.EURO ? `Total: ${checkoutData.total.toPrecision(3)} €`
                    : `Total: $ ${checkoutData.total.toPrecision(3)}`}
            </h3>
        </div>
        </Skeleton>
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
