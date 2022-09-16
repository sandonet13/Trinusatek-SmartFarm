import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SensorChart from "../../../components/charts/SensorDataChart";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import React from "react";
import { Card, CardHeader, CardFooter } from "reactstrap";
import {
  BackTo,
  PreviewCard,
} from "../../../components/Component";

const ChartMisc = ({ title }) => {

  return (
      // <Content page="component">
      //       <BackTo link="/" icon="arrow-left">
      //         Dashboard
      //       </BackTo>
        
      //     <PreviewCard>
      //     <div className="card-head">
      //             <h6 className="title">Humidity Chart</h6>
      //           </div>
      //       <Router>
      //           <Switch>
      //           <Route exact path="/"></Route>
      //               <SensorChart />
      //           </Switch>
      //       </Router>
      //     </PreviewCard>
      // </Content>
      <Card className="my-2"
      style={{
        width: '100%',
        // height: '100%'
      }}
    >
        <div className="nk-ecwg nk-ecwg6">
          <div className="card-inner">
            <div className="card-title-group">
              <div className="card-title">
              </div>
            </div>
            <div className="data">
            <Router>
                  <Switch>
                 <Route exact path="/"></Route>
                     <SensorChart />
                 </Switch>
             </Router>
            </div>
          </div>
        </div>
      </Card>
  );
};

export default ChartMisc;
