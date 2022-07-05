import { Button, Col, Form, Input, message, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../resourses/auth.css";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/login", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("Login successfull");
        localStorage.setItem("pos-user", JSON.stringify(res.data));
        navigate("/sales");
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("error");
      });
  };

  

  return (
    <div className="auth">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <b>CIMPEX</b>
            </h1>
            <hr />
            <h6 style={{paddingBottom:'20px'}}>Login</h6>

            <Form.Item name="userId" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Yet Registered ? Click Here To Register
              </Link>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
