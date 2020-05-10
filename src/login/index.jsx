import React, {useState} from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {Button, Col, Input, Row} from "antd";

export const LOGIN_PATH = "/login";

const formValidator = Yup.object({
    email: Yup.string()
        .email()
        .required("Required"),
    password: Yup.string()
        .trim()
        .required("Required")
});

const Login = () => {
    const [initialValues, setInitialValues] = useState({
        email: "", password:""
    });

    const submitData = (values) => {
        debugger;
        console.log("Values ",values)
    };

    return(
        <div>
            <Formik
            enableReinitialize={true}
            validationSchema={formValidator}
            initialValues={initialValues}
            onSubmit={submitData}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col span={6}>
                                <Input
                                    id="email"
                                    name="email"
                                    title="Email"
                                    placeholder="lorem@ipsum.com"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Input id="password" name="password" title="Password" type="password"
                                       onChange={formik.handleChange}
                                       value={formik.values.password}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Button
                                htmlType="submit"
                                type="primary"
                                onClick={()=>{
                                    submitData(formik.values)
                                }}
                                >
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
