import React from "react";

import data from "../data/Telegrams.json";

function PLCTelegrams() {
  return (
    <div className="App">
      <tbody>
        <tr>
          <th>PLC</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>TU-No</th>
          <th>Telegram</th>
        </tr>
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
