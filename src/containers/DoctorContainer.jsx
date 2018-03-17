import React from "react";
import DoctorView from "../components/content/DoctorView";
import { AppConsumer } from "../App";
import { setTimeout } from "timers";

export default class DoctorContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      name: ""
    };
  }

  render() {
    return (
      <AppConsumer>
        {context => {
          if (context && !this.state.name) {
            context.doctors(1).then(doc => {
              if (doc[1]) {
                setTimeout(this.setState({ name: doc[1] }), 1);
              }
            });
          }
          return <DoctorView name={this.state.name} />;
        }}
      </AppConsumer>
    );
  }
}
