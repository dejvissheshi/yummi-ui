import React from "react";
import {Row, Col, Menu, Layout} from "antd";
import 'antd/dist/antd.css';

import CustomFooter from "../common/custom/CustomFooter";
import CustomHeader from "../common/custom/CustomHeader";

import LandingBackground from "/Users/crs/WebstormProjects/yummi-ui/src/assets/images/fresh-pizza-vector.jpg"
import CardDescription from "./common/CardDescription";

export const HOME_PAGE_PATH = "/home";

const Home = () => {
    return (
        <Layout style={{background:"white"}}>
            <CustomHeader/>
            <div>
                <Row>
                    <Col offset={4}>
                        <div style={{"margin-top": "200px"}}>
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
            </div>
            <CustomFooter/>
        </Layout>
    );
};

export default Home;
