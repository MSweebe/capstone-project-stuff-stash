import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";


export default function AddStockroom() {
  const [stockRoomName, setStockRoomName] = useState("");
  const orgid = ReactSession.get("orgID");
  let history = useHistory();

  const addStockroom = async (e) => {
    e.preventDefault();
    //const res = await fetch('https://api-dot-techstack-demo-deployment.ue.r.appspot.com/api/v1/addStockroom/', {
    const res = await fetch("http://localhost:3000/api/v1/addStockroom", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: stockRoomName,
        org: orgid
      })
    })

    const data = res.json();
    console.log(res.status);
    if (res.status == 200) {
      alert("Successfully created " + stockRoomName + " under org ID " + orgid + "!");
    }
    history.push("/dashboard");
  }


const handlename = async (e) => {
  await setStockRoomName((e.target.value).trimStart());
  console.log(stockRoomName)
}


return (
  <div className="addCreateStockRoom container">
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <Form onSubmit={addStockroom}>
          <Form.Group size="sm" controlId="stockRoom orgID">
            <Form.Label>Enter Stockroom Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={stockRoomName}
              onChange={handlename}
            />
          </Form.Group>

          <Button
            className="m-3"
            block
            size="sm"
            type="submit"
          // disabled="{!validateForm()}"
          >
            Create Stockroom
          </Button>
        </Form>
      </div>
      <div className="col"></div>
    </div>
  </div>
 )
};