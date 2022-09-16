import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import {Container } from "react-bootstrap";
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
} from "../../components/Component";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import axios from "axios"



const SensorChart = () => {
  
  const ws = useRef();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:1881/apiaqua`)
  //    .then((response) => response.json())
  //    .then((actualData) => console.log(actualData[0].time))
  //    .catch((err) => {
  //     console.log(err.message);
  //    });
  //  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1881/apiaqua`
        );
        setData1(response.data);
        // console.log(data1);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // const url = "ws://" + window.location.href + ":1881/request";
    // console.log(url);
    //Send request to our websocket server using the "/request" path
    ws.current = new WebSocket("ws://localhost:1881/request");

    ws.current.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      console.log(`Received message :: ${message.hum}`);
      // Upon receiving websocket message then add it to the list of data that we are displaying
      let newDataArray = [
        ...data,
        {
          id: message.date,
          sensorData: message.hum,
        },
      ];

      setData((currentData) => limitData(currentData, message));

    };
    ws.current.onclose = (ev) => {
      console.log("Client socket close!");
    };

    //We limit the number of reads to the last 24 reading and drop the last read
    function limitData(currentData, message) {
      if (currentData.length > 60) {
        console.log("Limit reached, dropping first record!");
        currentData.shift();
      }
      return [
        ...currentData,
        {
          id: message.date,
          sensorData: message.hum,
        },
      ];
    }

    return () => {
      console.log("Cleaning up! ");
      ws.current.close();
    };
  }, []);
  //Display the chart using rechart.js
  return (
    <React.Fragment>
      <Head title="Charts Page"></Head>
      {/* <ChartMisc title="Humidity"/> */}
      <Content>
      <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Humidity Real-time
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
    {/* <Container> */}
      {/* <Row className="justify-content-md-center">
        <h1 className="header">Real time IOT Sensor Data Using Websockets</h1>
      </Row> */}
      <Row className="g-gs">
      <Col xxl="12" sm="12">
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis dataKey="datereal">
                <Label value="Time" offset={0} position="bottom" />
              </XAxis>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="date" /> */}
              <YAxis label={{ value: 'Humidity', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line
                type="monotone"
                dataKey="sensorData"
                stroke="#8884d8"
                activeDot={{ r: 7 }}
                strokeWidth="2"
              />
              <LabelList dataKey="name" position="top" />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
        </Col>
      </Row>

      <Row className="g-gs">
      <BlockHeadContent>
              <BlockTitle page tag="h3">
                Historical Humidity
              </BlockTitle>
            </BlockHeadContent>
      <Col xxl="12" sm="12">
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={data1}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis dataKey="date">
                <Label value="Time" offset={0} position="bottom" />
              </XAxis>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="date" /> */}
              <YAxis label={{ value: 'Humidity', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line
                type="monotone"
                dataKey="hum"
                stroke="#8884d8"
                activeDot={{ r: 7 }}
                strokeWidth="2"
              />
              <LabelList dataKey="name" position="top" />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
        </Col>
      </Row>
    {/* </Container> */}
    </Block>
    </Content>
    </React.Fragment>
  );
};

export default SensorChart;
