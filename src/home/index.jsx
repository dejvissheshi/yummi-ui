import React from "react";
import {useHistory} from "react-router-dom"
import {Row, Col, Menu} from "antd";
import 'antd/dist/antd.css';

import LandingBackground from "/Users/crs/WebstormProjects/yummi-ui/src/assets/images/fresh-pizza-vector.jpg"

import {LOGIN_PATH} from "../login";
import {REGISTER_PATH} from "../register";
import {MENU_PATH} from "../menu";
import CardDescription from "./CardDescription";
import CustomFooter from "../common/custom/Footer";

export const HOME_PAGE_PATH = "/home";

const NavItems = [
    {
        key: "home",
        value: "The Yummi Pizza",
        path: "#"
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

const Home = () => {
    const history = useHistory();
    const getNavigationItems = () => (
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
    );

    return (
       <div>
            <Row>
                <Col offset={1} className="flex" span={6}>
                    {getNavigationItems()}
                </Col>
            </Row>
           <Row>
               <Col offset={4}>
                   <div style={{"margin-top":"200px"}}>
                       The yummi pizza
                   </div>
               </Col>
               <Col offset={6} span={8}>
                    <img src={LandingBackground}/>
               </Col>
           </Row>
           <Row>
                <CardDescription
                    title="Lorem ipsum"
                    content="lorem ipsum dolorum"
                    photo={LandingBackground}
                    position="left"
                />
           </Row>
           <CustomFooter/>
       </div>

    );
};

export default Home;
