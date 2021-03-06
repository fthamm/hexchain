import * as React from "react";
import { Card, Icon, Layout } from "antd";

import "./DataView.scss";

const { Header, Content } = Layout;

const gridHeaderStyle = {
  width: "100%",
  textAlign: "center"
};
const gridPriceStyle = {
  width: "33%",
  textAlign: "center"
};
const gridPriceStyleActive = {
  width: "33%",
  textAlign: "center",
  color: "#1890ff",
  border: "1px solid #1890ff"
};

export default class DataView extends React.PureComponent {
  render() {
    let { activePrice, setActivePrice, prices } = this.props;
    return (
      <div className="dataView">
        <div className="dataView-header">
          <a href="localhost:8080/">
            <img
              style={{
                height: "73px",
                marginRight: "26px",
                display: "inline-block",
                cursor: "pointer"
              }}
              src="../../img/icon.png"
            />
          </a>
          <div style={{ display: "inline-block" }}>Organization</div>
        </div>
        <div className="dataView-container">
          <Card
            title={"Data"}
            actions={[
              <span
                onClick={() => this.props.payForRecords(prices[activePrice])}
              >
                Purchase
                <Icon type="login" onClick={this.props.handlePurchase} />
              </span>
            ]}
          >
            <Card.Grid style={gridHeaderStyle}>
              {this.props.records.filter(v => v).length} Records Available
            </Card.Grid>
            <Card.Grid
              onClick={() => setActivePrice(0)}
              style={activePrice == 0 ? gridPriceStyleActive : gridPriceStyle}
            >
              <div>Demographic Data</div>
              {this.props.prices[0]} Ether / <Icon type="file-text" />
            </Card.Grid>
            <Card.Grid
              onClick={() => setActivePrice(1)}
              style={activePrice == 1 ? gridPriceStyleActive : gridPriceStyle}
            >
              <div> Relavent Data</div>
              {this.props.prices[1]} Ether / <Icon type="file-text" />
            </Card.Grid>
            <Card.Grid
              onClick={() => setActivePrice(2)}
              style={activePrice == 2 ? gridPriceStyleActive : gridPriceStyle}
            >
              <div>Complete Data</div>
              {this.props.prices[2]} Ether / <Icon type="file-text" />
            </Card.Grid>
          </Card>
        </div>
      </div>
    );
  }
}
