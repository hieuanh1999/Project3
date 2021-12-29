import React, { Component } from "react";
import { Button, Drawer, Space } from "antd";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { ContactFormDataSource } from "../data/home.data";
import ContactForm from "./Home/ContactForm";

export class Header2 extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <header style={{ height: 56, width: "100%", background: "#FFFFFF" }}>
        <div className="header-wrapper">
          <div style={{ lineHeight: 4 }}>
            <OutboundLink
              href="https://www.hust.edu.vn/web/vi/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="text" style={{ fontSize: 13, color: "red" }}>
                <img
                  src="globe-outline.svg "
                  alt="image"
                  style={{ marginRight: 10 }}
                />
                www.hust.edu.vn
              </Button>
            </OutboundLink>
          </div>
          <div style={{ lineHeight: 4 }}>
            <Button
              type="default"
              style={{
                height: 36,
                fontSize: 12,
                borderColor: "red",
                color: "red",
                marginRight: 20
              }}
              onClick={this.showDrawer}
            >
              LIÊN HỆ 
            </Button>
            <Drawer
              title="Liên hệ dùng thử"
              width={572}
              onClose={this.onClose}
              visible={this.state.visible}
              //   bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={this.onClose}>Cancel</Button>
                  <Button onClick={this.onClose} type="primary">
                    Submit
                  </Button>
                </Space>
              }
            >
              <div style={{ marginBottom: 20, marginLeft: 24 }}>
                <OutboundLink
                  href="tel:+84886625220"
                  target="_blank"
                  style={{ color: "#EC1C2A" }}
                  rel="noopener noreferrer"
                >
                  024 3869 4242
                </OutboundLink>
              </div>
              <div style={{ marginBottom: 20, marginLeft: 24 }}>
                <OutboundLink
                  href="mailto:hcth@hust.edu.vn"
                  target="_blank"
                  style={{ color: "#EC1C2A" }}
                  rel="noopener noreferrer"
                >
                  hcth@hust.edu.vn
                </OutboundLink>
              </div>
              <ContactForm
                id="ContactForm"
                key="ContactForm"
                dataSource={ContactFormDataSource}
                isMobile={this.state.isMobile}
              />
            </Drawer>
          </div>
        </div>
      </header>
    );
  }
}

export default Header2;
