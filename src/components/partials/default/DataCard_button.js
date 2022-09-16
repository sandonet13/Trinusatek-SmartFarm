import React, { useEffect, useRef, useState } from "react";
import { Card, CardLink, CardFooter, CardHeader  } from "reactstrap";
import { Icon } from "../../Component";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@mui/material/Button';
import Switch from "react-switch";




const DataCard_button = ({ title, amount, percentChange, up, chart: ChartComponent, unit, ico, backgroundColor, header, switchOnOff, handleChange }) => {

    const background = backgroundColor;
    const back = {
      backgroundColor: background
    }
    // const ico_get = faHome;
    // console.log(ico_get);

  return (
    <Card className="my-2" style={back}>
      <CardHeader>
          <h5 style={{color:'white', justifyContent:'center', alignItems:'center'}}><FontAwesomeIcon icon={ico} />{'    '}{header}</h5>
      </CardHeader>
      <div className="nk-ecwg nk-ecwg6" >
        <div className="card-inner">
          <div className="card-title-group" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="card-title">
              <h6 className="title" style={{color:"white"}}>{title}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="amount" style={{color:"white"}}>{amount}</div>
            {/* <div className="amount" style={mystyle_pump}><FormControlLabel
                  control={
                    <Switch
                      checked={status1}
                      onChange={handleChange}
                      color="primary"
                      name="status"
                    />
                  }
                />
            </div> */}
              <div className="amount">{unit}</div>
              
              {/* <div className="nk-ecwg6-ck">{ChartComponent}</div> */}
            </div>
            <div className="info">
              {/* <span className={`change ${up ? "up text-success" : "down text-danger"}`}>
                <Icon name={`arrow-long-${up ? "up" : "down"}`}></Icon>
                {percentChange}%
              </span> */}
              {/* <span style={mystyle}><Button variant="contained" style={mystyle_button} color={status1 == true ? "error" : "success" }>{status1 == true ? "OFF" : "ON" }</Button></span> */}
            </div>
          </div>
        </div>
      </div>
      <CardFooter>
      <Switch
          onChange={handleChange}
          checked={switchOnOff}
          className="react-switch"
        />
      </CardFooter>
    </Card>
  );
};


export default DataCard_button;
