import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Web3 from "web3";
import TruffleContract from "truffle-contract";

import LoginContainer from "./containers/LoginContainer";
import DoctorContainer from "./containers/DoctorContainer";
import OrgaView from "./components/content/OrgaView";
import Home from "./components/Home";

import Health from "../build/contracts/Health.json";
import "antd/dist/antd.css";

import "./index.scss";
import OrgaSeachFormContainer from "./containers/OrgaSearchFormContainer";
import DataViewContainer from "./containers/DataViewContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      healthInstance: null,
      patients: [],
      records: []
    };
    if (typeof web3 != "undefined") {
      this.web3Provider = web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );
    }

    this.web3 = new Web3(this.web3Provider);

    this.health = TruffleContract(Health);
    this.health.setProvider(this.web3Provider);
    this.getRecords = this.getRecords.bind(this);
    this.payForRecords = this.payForRecords.bind(this);
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account: account });
      this.health.deployed().then(healthInstance => {
        this.healthInstance = healthInstance;
        this.setState({ healthInstance: healthInstance });
        this.healthInstance.patientsCount().then(patientsCount => {
          for (var i = 1; i <= patientsCount; i++) {
            this.healthInstance.patients(i).then(patient => {
              const patients = [...this.state.patients];
              patients.push({
                id: patient[0],
                name: patient[1],
                age: patient[2],
                nationality: patient[3],
                city: patient[4],
                country: patient[5],
                balance: patient[6]
              });
              this.setState({ patients: patients });
              console.log(this.state.patients);
            });
          }
        });
      });
    });
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance
      .votedEvent(
        {},
        {
          fromBlock: 0,
          toBlock: "latest"
        }
      )
      .watch((error, event) => {
        this.setState({ voting: false });
      });
  }
  getRecords(countries, diseases) {
    console.log(countries, diseases);
    this.state.healthInstance.getDataToBuy
      .call(countries[0], diseases[0])
      .then(result => {
        console.log(result);
        this.setState({
          records: result.map(v => v.toNumber()).filter(v => v != 0)
        });
      })
      .catch(() => {
        this.setState({ records: Math.floor(Math.random() * 10) + 20 });
      });
  }
  payForRecords(price) {
    console.log("Tried to pay with price", price);

    this.health.defaults({
      gas: 25000,
      gasPrice: 4000000000
      // value: 45500000000000000
    });

    // this.state.healthInstance
    //   .sendTransaction({ from: this.state.account })
    //   .then(function(result) {
    //     // Same result object as above.
    //     console.log(result);
    //     console.log(
    //       "-------->->->->",
    //       web3.eth.getBalance(this.state.healthInstance.address)
    //     );
    //   });
    this.state.records.map(record => {
      this.healthInstance.buyData(record, 45500000000000000, {
        from: this.state.account,
        gas: 300000,
        value: 45500000000000000
      });
      console.log("record: ", record);
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="top">
          <Switch>
            <Route
              path="/"
              component={() => (
                <Home
                  healthInstance={this.state.healthInstance}
                  account={this.state.account}
                />
              )}
              exact
            />
            <Route
              path="/login"
              component={() => (
                <LoginContainer
                  healthInstance={this.state.healthInstance}
                  account={this.state.account}
                />
              )}
              exact
            />
            <Route
              path="/doctor"
              component={() => (
                <DoctorContainer
                  healthInstance={this.state.healthInstance}
                  account={this.state.account}
                />
              )}
              exact
            />
            <Route
              path="/orga"
              component={() => (
                <OrgaView
                  healthInstance={this.state.healthInstance}
                  account={this.state.account}
                />
              )}
              exact
            />
            <Route
              path="/orgasearch"
              component={() => (
                <OrgaSeachFormContainer
                  healthInstance={this.state.healthInstance}
                  account={this.state.account}
                  getRecords={this.getRecords}
                />
              )}
              exact
            />
            <Route
              path="/orgadata"
              component={() => (
                <DataViewContainer
                  healthInstance={this.state.healthInstance}
                  account={this.state.account}
                  records={this.state.records}
                  payForRecords={this.payForRecords}
                />
              )}
              exact
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
