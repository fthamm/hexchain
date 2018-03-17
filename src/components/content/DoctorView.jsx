import React from "react";
import { Collapse } from "antd";
import DoctorAddEntry from "../../containers/DoctorAddEntry";
import DoctorSearchContainer from "../../containers/DoctorSearchContainer";
import "./DoctorView.scss";

const { Panel } = Collapse;
const WELCOME = "Welcome ";
const ADD = "Add a Patient";

const DoctorView = props => {
  return (
    <div className="doctor">
      <div className="doctor-header">
        {WELCOME} Dr. {props.name}{" "}
      </div>
      <div className="doctor-content">
        <div className="doctor-wrapper">
          <Collapse
            accordion
            defaultActiveKey={["1"]}
            style={{ width: "800px" }}
          >
            <Panel header="Add a patient" key="1">
              <DoctorAddEntry
                healthInstance={props.healthInstance}
                docname={props.name}
              />
            </Panel>
          </Collapse>
          <DoctorSearchContainer />
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
