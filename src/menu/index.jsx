import React from "react";
import CustomFooter from "../common/custom/CustomFooter";
import { Layout, Menu } from 'antd';
import CustomHeader from "../common/custom/CustomHeader";
import ItemCard from "./itemCard/ItemCard";
const { Content, Sider } = Layout;

export const MENU_PATH = "/menu";

const GeneralMenu = () => {

    const MockProducts = [
        {"product_name":"Capricciosa","product_type":"pizza","price":4,"description":null,"photo":null},

    ];

    const getItems = () => (
        MockProducts.map(({product_name, price,description, photo}, index)=>{
            return <ItemCard title={product_name} price={price} photo={photo}/>
        })
    );

    return (
        <Layout style={{background:'white'}}>
            <CustomHeader/>
            <Content style={{padding: '0 50px'}}>
                <Layout className="site-layout-background">
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                        >
                            <Menu.Item key="1">All Products</Menu.Item>
                            <Menu.Item key="2">Pizza</Menu.Item>
                            <Menu.Item key="3">Drinks</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content  style={{padding: '0 24px', minHeight: 280, display:"flex", flexFlow: "row wrap"}}>
                        {getItems()}
                    </Content>
                </Layout>
            </Content>
            <CustomFooter/>
        </Layout>
    );
};

export default GeneralMenu;
