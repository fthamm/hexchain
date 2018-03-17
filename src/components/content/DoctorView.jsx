import React from "react";
import { Collapse } from "antd";
import DoctorAddEntry from "../../containers/DoctorAddEntry";
import "./DoctorView.scss";

const { Panel } = Collapse;
const WELCOME = "Welcome ";
const ADD = "Add a Patient";

const DoctorView = () => {
  return (
    <div className="doctor">
      <div className="doctor-header">{WELCOME} Dr. Prop </div>
      <div className="doctor-content">
        <Collapse accordion defaultActiveKey={["1"]} style={{ width: "800px" }}>
          <Panel header="Add a patient" key="1">
            <DoctorAddEntry />
            <i className="fas fa-plus" />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default DoctorView;
