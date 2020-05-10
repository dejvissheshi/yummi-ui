import React from "react";
import {useHistory} from "react-router-dom"


import {Layout, Menu} from 'antd';
import {MENU_PATH} from "../../menu";
import {LOGIN_PATH} from "../../login";
import {REGISTER_PATH} from "../../register";
const { Header } = Layout;

const NavItems = [
    {
        key: "home",
        value: "The Yummi Pizza",
        path: "/"
    },
    {
        key: "menu",
        value: "Menu",
        path: MENU_PATH
    },
    {
        key: "login",
        value: "Login",
        path: LOGIN_PATH
    },
    {
        key: "register",
        value: "Register",
        path: REGISTER_PATH
    },
];

const CustomHeader = () => {
    const history = useHistory();
    return (
        <Header style={{background:"white"}}>
            <Menu mode="horizontal">
                {
                    NavItems.map(({key, value, path}, index) => (
                        <Menu.Item key={key} onClick={() => {
                            history.push(`${path}`);
                        }}>
                            {value}
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Header>
    );
};

export default CustomHeader;
