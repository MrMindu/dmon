"use client";

import "./Chart.css";

import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";

import LineChart from "../components/LineChart";
import Toolbar from "../components/Toolbar";
import ChartDataJson from "../data/ChartData.json";

export default function Charts() {
  const [chartData, setChartData] = useState([]);
  const [toolbarIndex, setToolbarIndex] = useState(0);
  const [array, setArray] = useState([]);

  const prepareChartData = (dateFrom, dateTo, timeFrom, timeTo) => {
    if (!dateFrom || !dateTo || !timeFrom || !timeTo) {
      return null;
    }

    const fromTimestamp =
      moment(dateFrom).format(`YYYYMMDD`) + timeFrom.replace(`:`, ``) + `00`;
    const toTimestamp =
      moment(dateTo).format(`YYYYMMDD`) + timeTo.replace(`:`, ``) + `00`;
    const usedData = ChartDataJson.filter(
      (item) =>
        item.Timestamp >= fromTimestamp &&
        item.Timestamp <= toTimestamp &&
        item,
    );

    setChartData([
      ...chartData,
      {
        labels: usedData.map(
          (data) =>
            String(data.Timestamp).substring(8, 10) +
            `:` +
            String(data.Timestamp).substring(10, 12),
        ),
        datasets: [
          {
            label: `Picks`,
            data: usedData.map((data) => data.PicksPerMin),
            borderColor: `yellow`,
            borderWidth: 2,
          },
          {
            label: `Total picks`,
            data: usedData.map((data) => data.TotalPicks),
            borderColor: `rgb(127, 255, 0)`,
            borderWidth: 2,
          },
          {
            label: `Threshold`,
            data: usedData.map((data) => data.Threshold),
            borderColor: `red`,
            borderWidth: 2,
          },
        ],
      },
    ]);
    console.log(`prepareChartData:`);
    console.log(chartData);
  };

  useEffect(() => {
    const dateFrom = new Date(document.getElementById(`dateFrom`).value);
    const dateTo = new Date(document.getElementById(`dateTo`).value);
    const timeFrom = document.getElementById(`timeFrom`).value;
    const timeTo = document.getElementById(`timeTo`).value;

    prepareChartData(dateFrom, dateTo, timeFrom, timeTo);
  }, []);

  const reloadCharts = (toolbarArray) => {
    let newState = [...chartData];

    toolbarArray.forEach((element, index) => {
      const fromTimestamp =
        moment(element[0])?.format(`YYYYMMDD`) +
        element[2]?.replace(`:`, ``) +
        `00`;
      const toTimestamp =
        moment(element[1])?.format(`YYYYMMDD`) +
        element[3]?.replace(`:`, ``) +
        `00`;
      const usedData = ChartDataJson.filter(
        (item) =>
          item.Timestamp >= fromTimestamp && item.Timestamp <= toTimestamp,
      );

      newState = newState.map((obj, i) => {
        if (i === index) {
          return {
            labels: usedData.map(
              (data) =>
                String(data.Timestamp).substring(8, 10) +
                `:` +
                String(data.Timestamp).substring(10, 12),
            ),
            datasets: [
              {
                label: `Picks`,
                data: usedData.map((data) => data.PicksPerMin),
                borderColor: `yellow`,
                borderWidth: 2,
              },
              {
                label: `Total picks`,
                data: usedData.map((data) => data.TotalPicks),
                borderColor: `rgb(127, 255, 0)`,
                borderWidth: 2,
              },
              {
                label: `Threshold`,
                data: usedData.map((data) => data.Threshold),
                borderColor: `red`,
                borderWidth: 2,
              },
            ],
          };
        }
        return obj;
      });
    });
    console.log(`reloadCharts:`);
    console.log(newState);
    setChartData(newState);
  };

  const setToolbarData = (dateFrom, dateTo, timeFrom, timeTo) => {
    const dateFromEle = document.getElementById(`dateFrom`);
    const dateToEle = document.getElementById(`dateTo`);
    const timeFromEle = document.getElementById(`timeFrom`);
    const timeToEle = document.getElementById(`timeTo`);

    dateFromEle.value = dateFrom;
    dateToEle.value = dateTo;
    timeFromEle.value = timeFrom;
    timeToEle.value = timeTo;
  };

  const handleClick = (data, i) => {
    setToolbarIndex(i);
    setToolbarData(...data);
  };

  function handleCallback(toolbarArray) {
    setArray(toolbarArray);
    console.log(chartData);
  }

  return (
    <div className="Chart">
      <Toolbar
        prepareChartData={prepareChartData}
        reloadCharts={reloadCharts}
        handleCallback={handleCallback}
        toolbarIndex={toolbarIndex}
      />
      {array &&
        array.map((data, index) => (
          <div
            key={index}
            className={`charts`}
            onClick={() => handleClick(data, index)}
          >
            <LineChart chartData={chartData[index]} />
          </div>
        ))}
    </div>
  );
}
