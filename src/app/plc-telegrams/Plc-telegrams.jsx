import React from "react";

import "./Plc-telegrams.css";
import data from "../data/Telegrams.json";

function PLCTelegrams() {
  return (
    <div className="plc-telegrams">
      <thead className="plc-telegrams__thead">
        <tr>
          <th>PLC</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>TU-Number</th>
          <th>Telegram</th>
        </tr>
      </thead>
      <tbody className="plc-telegrams__tbody">
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.PLC}</td>
            <td>{item.TelegramSender}</td>
            <td>{item.Receiver}</td>
            <td>{item.TUNo}</td>
            <td>{item.Telegram}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default PLCTelegrams;
