import React from "react";
import { Card, CardHeader, CardFooter } from "reactstrap";
import { Icon } from "../../Component";
import { faHome, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";


  

const DataCard = ({ title, amount, percentChange, up, chart: ChartComponent, unit, icon, ico, header, text, color, min, max, link }) => {
  const colortext = color;
    const warna = {
      color: colortext
    }
  return (
    <Card className="my-2"
    style={{
      width: '100%',
      // height: '100%'
    }}
  >
    <CardHeader>
          <h5>Status: <FontAwesomeIcon icon={ico} />{'    '}{header}</h5>
      </CardHeader>
      <div className="nk-ecwg nk-ecwg6">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">{title}</h6>
            </div>
            <Link to={link}>
            <div style={{textAlign:'right'}}><FontAwesomeIcon icon={faChartLine} /></div>
            </Link>            
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">{amount}</div>
              <div className="amount">{unit}</div>
            </div>
              <div style={{textAlign:'right'}}>Min: {min} </div>
              <div style={{textAlign:'right'}}>Max: {max} </div>
          </div>
        </div>
      </div>
      <CardFooter>
              <span style={warna}>{title} {text}</span>
      </CardFooter>
    </Card>
  );
};

export default DataCard;
