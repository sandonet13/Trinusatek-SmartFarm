import React, { useEffect, useRef, useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import DataCard from "../components/partials/default/DataCard";
import charts from "../components/charts/Chart"
import DataCard_button from "../components/partials/default/DataCard_button";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";
import { faArrowUp, faArrowDown, faWater, faSeedling, faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import toggle from "react-switch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {LineChartExample} from "../components/charts/Chart";



export default function App() {
  const [price, setPrice] = useState("No Data");
  const [air_temp, setAir] = useState("No Data");
  const [water_temp, setWater] = useState("No Data");
  const [tds, setTds] = useState("No Data");
  const [ph, setPh] = useState("No Data");
  const [phpumpup, setPhpumpup] = useState(false);
  const handleChangephpumpup = nextChecked => {
    setPhpumpup(nextChecked);
  };

  const [phpumpdown, setPhpumpdown] = useState(false);
  const [nutri, setPumpNutri] = useState(false);
  const [water, setPumpWater] = useState(false);
  const [date, setDate] = useState("");
  const [sm, updateSm] = useState(false);
  const ws = useRef();
  const [data, setData] = useState([]);
  const [show, hide] = useState(true);

  

  const subscription = { topic: "subscribe", to: "EURUSD:CUR" };

  useEffect(() => {
    const ws = new WebSocket(
      "ws://localhost:1881/request"
    );
    ws.onopen = () => {
      console.log("Connection Established!");
      ws.send(JSON.stringify(subscription));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      // console.log(response);

        setPrice(response.hum);
        setAir(response.air_temp);
        setWater(response.water_temp);
        setTds(response.tds);
        setPh(response.ph);
        // setPhpumpup(response.phpumpup);
        // setPhpumpdown(response.phpumpdown);
        // setPumpNutri(response.nutri);
        // setPumpWater(response.water);
        // let today = new Date(response.date * 1);
        // const options = {
        //   year: "numeric",
        //   month: "long",
        //   day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   second: "numeric"
        // };
        // let date = today.toLocaleDateString("en-EN", options);
        // console.log(date);
        // setDate(date);
      //ws.close();
    };
    ws.onclose = () => {
      console.log("Connection Closed!");
      //initWebsocket();
    };

    ws.onerror = () => {
      console.log("WS Error");
    };

    return () => {
      ws.close();
    };
  }, []);



  // useEffect(() => {
  //   setTimeout(initWebsocket(), 10000);
  // }, []);

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                {/* <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button> */}
                {/* <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div> */}
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
        {/* {price > 45 ? <UncontrolledAlert className="alert-icon" color="danger" fade={false}>
                  <Icon name="cross-circle" />
                  <strong>Humidy too high</strong>! Please check ASAP.
                </UncontrolledAlert> : "" } */}
          <Row className="g-gs">
            <Col xxl="4" sm="4">
              <DataCard
                title="Humidity"
                // percentChange={"4.63"}
                // up={true}
                // chart={<DefaultOrderChart />}
                amount={price}
                unit="%"
                ico={(price < 40 || price > 70) ? faWarning : faCheck }
                text={price < 40 ? "is too low!" : price > 70 ? "is too high!" : "is normal"}
                color={price < 40 ? "red" : price > 70 ? "red" : "green"}
                min="12%"
                max="75%"
                link={process.env.PUBLIC_URL + "/charts/charthum"}
                
              />
            </Col>
            <Col xxl="4" sm="4">
              <DataCard
                title="Ambient Temperature"
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={air_temp}
                unit="°C"
                ico={(air_temp < 16 || air_temp > 32) ? faWarning : faCheck }
                text={air_temp < 16 ? "is too low!" : air_temp > 32 ? "is too high!" : "is normal"}
                color={air_temp < 16 ? "red" : air_temp > 32 ? "red" : "green"}
                min="20°C"
                max="31°C"
              />
            </Col>
            <Col xxl="4" sm="4">
              <DataCard
                title="Water Temperature"
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={water_temp}
                unit="°C"
                ico={(water_temp < 18 || water_temp > 26) ? faWarning : faCheck }
                text={water_temp < 18 ? "is too low!" : water_temp > 26 ? "is too high!" : "is normal"}
                color={water_temp < 18 ? "red" : water_temp > 26 ? "red" : "green"}
                min="21°C"
                max="29°C"
              />
            </Col>
            <Col xxl="6" sm="6">
              <DataCard
                title="TDS"
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={tds}
                unit="ppm"
                ico={(tds < 800 || tds > 1200) ? faWarning : faCheck }
                text={tds < 800 ? "is too low!" : tds > 1200 ? "is too high!" : "is normal"}
                color={tds < 800 ? "red" : tds > 1200 ? "red" : "green"}
                min="560 ppm"
                max="1826 ppm"
              />
            </Col>
            <Col xxl="6" sm="6">
              <DataCard
                title="Acidity"
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={ph}
                unit="pH"
                ico={(ph <= 6 || tds >= 6.5) ? faWarning : faCheck }
                text={ph <= 6 ? "is too low!" : ph >= 6.5 ? "is too high!" : "is normal"}
                color={ph <= 6 ? "red" : ph >= 6.5 ? "red" : "green"}
                min="5.7 pH"
                max="6.2 pH"
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard_button
                header="pH Up"
                ico={faArrowUp}
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={phpumpup == true ? "ON" : "OFF" }
                backgroundColor={phpumpup == true ? "#1fa356" : "#bf2626" }
                switchOnOff={phpumpup}
                handleChange={setPhpumpup}
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard_button
                header="pH Down"
                ico={faArrowDown}
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={phpumpdown == true ? "ON" : "OFF" }
                backgroundColor={phpumpdown == true ? "#1fa356" : "#bf2626" }
                switchOnOff={phpumpdown}
                handleChange={setPhpumpdown}
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard_button
                header="Nutrition"
                ico={faSeedling}
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={nutri == true ? "ON" : "OFF" }
                backgroundColor={nutri == true ? "#1fa356" : "#bf2626" }
                switchOnOff={nutri}
                handleChange={setPumpNutri}
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard_button
                header="Water"
                ico={faWater}
                // percentChange={"2.63"}
                // up={false}
                // chart={<DefaultRevenueChart />}
                amount={water == true ? "ON" : "OFF" }
                backgroundColor={water == true ? "#1fa356" : "#bf2626" }
                switchOnOff={water}
                handleChange={setPumpWater}
              />
            </Col>
            {/* <Col xxl="6">
              <SalesStatistics />
            </Col>
            <Col xxl="3" md="6">
              <OrderStatistics />
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics />
            </Col>
            <Col xxl="8">
              <RecentOrders />
            </Col>
            <Col xxl="4" md="8" lg="6">
              <TopProducts />
            </Col> */}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
}
