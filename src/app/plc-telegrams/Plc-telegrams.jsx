import React from "react";
import data from "../data/Telegrams.json";

function PLCTelegrams() {
  return (
    <table className="telegrams-table">
      <thead className="telegrams__thead">
        <tr>
          <th>PLC</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>TU-Number</th>
          <th>Telegram</th>
        </tr>
      </thead>
      <tbody className="telegrams__tbody">
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
    </table>
  );
}

export default PLCTelegrams;
