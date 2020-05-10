import React from "react";
import {useHistory} from "react-router-dom"
import {Row, Col, Menu} from "antd";
import 'antd/dist/antd.css';

import './Home.less'
import {LOGIN_PATH} from "../login";
import {REGISTER_PATH} from "../register";

export const HOME_PAGE_PATH = "/home";

const NavItems = [
    {
        key: "home",
        value: "Home",
        path: "#"
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

const Home = () => {
    const history = useHistory();
    const getNavigationItems = () => (
            <Menu mode="horizontal">
                {
                    NavItems.map(({key, value, path}, index) => (
                        <Menu.Item key={key} onClick={()=>{
                            history.push(`${path}`);
                        }}>
                            {value}
                        </Menu.Item>
                    ))
                }
            </Menu>
        );

    return(
        <Row>
            <Row>
                <Row>
                    <Col offset={4} span={24}>
                        {getNavigationItems()}
                    </Col>
                </Row>
            </Row>
        </Row>
    );
};

export default Home;
