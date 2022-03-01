import React, { Component } from "react";
import axios from "axios";
import Adlogo from "./Images/Adlogo.png";
import { Spin, Space } from "antd";
import "antd/dist/antd.css";

import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  getData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        console.log(this.state.isLoading);
        axios.get(`https://reqres.in/api/users?page=1`).then((response) => {
          console.log(response.data.data);
          this.setState({
            data: response.data.data,
            isLoading: false,
          });
        });
      }
    );
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light navBarMain">
          <div className="container-fluid logoContainer">
            <img src={Adlogo} alt="advertyzement logo" className="logo"></img>
            <button
              className="btn btn-outline-success"
              value="Submit"
              onClick={this.getData}
            >
              Get Users
            </button>
          </div>
        </nav>
        <div>
          {this.state.isLoading ? (
            <center>
              <div>
                <Space size="middle" className="spinner">
                  <Spin size="large" />
                </Space>
                <Space size="middle" className="spinner">
                  <Spin size="large" />
                </Space>
                <Space size="middle" className="spinner">
                  <Spin size="large" />
                </Space>
              </div>
            </center>
          ) : (
            this.state.data.map((x) => (
              <div className="card cardDiv">
                <img
                  className="card-img-top cardImage"
                  src={x.avatar}
                  alt="Card image cap"
                />
                <div className="card-body cardBody">
                  <h4 className="card-text">
                    {x.first_name} {x.last_name}
                  </h4>
                  <h4>{x.email}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
