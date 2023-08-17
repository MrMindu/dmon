import "./Toolbar.css";

import exportFromJSON from "export-from-json";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

import {
  TIMESTAMP_HOUR,
  TIMESTAMP_MINUTE,
} from "../../constants/timestampValues";
import ChartData from "../../data/ChartData.json";
import { calculateTime } from "../../utils/calculateTime";

const Toolbar = ({
  reloadCharts,
  toolbarIndex,
  handleCallback,
  prepareChartData,
}) => {
  const [values, setValues] = useState([]);
  const dateFromInputRef = useRef(null);
  const dateToInputRef = useRef(null);
  const timeFromInputRef = useRef(null);
  const timeToInputRef = useRef(null);

  const dateFromInputValue = dateFromInputRef.current?.value || 0;
  const dateToInputValue = dateToInputRef.current?.value || 0;
  const timeFromInputValue = timeFromInputRef.current?.value || 0;
  const timeToInputValue = timeToInputRef.current?.value || 0;

  useEffect(() => {
    setDate(`dateFrom`, new Date(`2023/07/18 15:10:00`));
    setDate(`dateTo`, new Date(`2023/07/18 15:10:00`));
    setTime(`timeFrom`, new Date(`2023/07/18 15:10:00`));
    setTime(`timeTo`, new Date(`2023/07/18 15:10:00`));

    setValues([
      [
        dateFromInputRef.current?.value,
        dateToInputRef.current?.value,
        timeFromInputRef.current?.value,
        timeToInputRef.current?.value,
      ],
    ]);
  }, []);

  useEffect(() => {
    handleCallback(values);
    reloadCharts(values);
  }, [values]);

  function getNewTime(tag, time, sign, miliseconds) {
    const dateElement = document.getElementById(tag);

    if (!dateElement) {
      return null;
    }

    const timestamp = new Date(dateElement.value + ` ` + time).getTime();
    const newTime = calculateTime(sign, timestamp, miliseconds);

    dateElement.value = moment(new Date(newTime)).format(`YYYY-MM-DD`);

    let hours = new Date(newTime).toLocaleTimeString([], {
      hour: `2-digit`,
      hour12: false,
    });

    let mins = new Date(newTime).toLocaleTimeString([], {
      minute: `2-digit`,
      hour12: false,
    });
    hours = hours === `24` ? `00` : hours;
    mins = mins < 10 ? `0` + mins : mins;

    return hours + `:` + mins;
  }

  function changeDateTime(sign) {
    const dateFrom = new Date(dateFromInputValue);
    const dateTo = new Date(dateToInputValue);
    const timeFromElement = timeFromInputRef?.current;
    const timeToElement = timeToInputRef?.current;

    switch (document.getElementById(`unitType`).value) {
      case `D`:
        eval(`dateTo.setDate(dateTo.getDate()` + sign + `1);`);
        setDate(`dateTo`, dateTo);
        eval(`dateFrom.setDate(dateFrom.getDate()` + sign + `1);`);
        setDate(`dateFrom`, dateFrom);
        break;
      case `H`:
        timeFromElement.value = getNewTime(
          `dateFrom`,
          timeFromInputValue,
          sign,
          TIMESTAMP_HOUR,
        );
        timeToElement.value = getNewTime(
          `dateTo`,
          timeToInputValue,
          sign,
          TIMESTAMP_HOUR,
        );
        break;
      case `M`:
        timeFromElement.value = getNewTime(
          `dateFrom`,
          timeFromInputValue,
          sign,
          TIMESTAMP_MINUTE,
        );
        timeToElement.value = getNewTime(
          `dateTo`,
          timeToInputValue,
          sign,
          TIMESTAMP_MINUTE,
        );
        break;
      default:
        break;
    }
  }

  const reload = () => {
    const newState = values.map((obj, i) => {
      // update if index matches
      if (i === toolbarIndex) {
        return [
          dateFromInputRef.current?.value,
          dateToInputRef.current?.value,
          timeFromInputRef.current?.value,
          timeToInputRef.current?.value,
        ];
      }

      // otherwise return the object as is
      return obj;
    });

    setValues(newState);
  };

  const handleBackClick = () => {
    changeDateTime(`-`);
    reload();
  };
  const handleForwardClick = () => {
    changeDateTime(`+`);
    reload();
  };

  function setDate(tag, date) {
    const dateElement = document.getElementById(tag);
    const dateString = moment(date).format(`YYYY-MM-DD`);
    dateElement.value = dateString;
  }

  function setTime(tag, date) {
    const timeElement = document.getElementById(tag);
    let timeString = ``;
    timeString = tag.includes(`To`)
      ? moment(date).format(`HH:mm`)
      : moment(date).subtract(1, `hour`).format(`HH:mm`);
    timeElement.value = timeString;
  }

  const onExportLocal = () => {
    const fileName = `testing`;
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data: ChartData, fileName, exportType });
  };

  const handleAdd = () => {
    setValues([
      ...values,
      [
        dateFromInputValue,
        dateToInputValue,
        timeFromInputValue,
        timeToInputValue,
      ],
    ]);
    prepareChartData(
      dateFromInputValue,
      dateToInputValue,
      timeFromInputValue,
      timeToInputValue,
    );
  };

  const handleDelete = () => {
    const deletVal = [...values];
    values.length > 1 && deletVal.splice(values.length - 1, 1);
    setValues(deletVal);
  };

  return (
    <>
      <div className="wrap">
        <table className="styledTable" onChange={reload}>
          <tbody>
            <tr className="tableBorder">
              <th className="tableBorder">
                Date from:
                <input
                  ref={dateFromInputRef}
                  type="date"
                  size="10"
                  id="dateFrom"
                  name="dateFrom"
                />
              </th>
              <th className="tableBorder" id="timeFromContainer">
                Time from:
                <input
                  ref={timeFromInputRef}
                  type="time"
                  size="10"
                  id="timeFrom"
                  name="timeFrom"
                />
              </th>
              <th className="tableBorder">
                Date to:
                <input
                  ref={dateToInputRef}
                  type="date"
                  size="10"
                  id="dateTo"
                  name="dateTo"
                />
              </th>
              <th className="tableBorder" id="timeToContainer">
                Time to:
                <input
                  ref={timeToInputRef}
                  type="time"
                  size="10"
                  id="timeTo"
                  name="timeTo"
                />
              </th>
              <th>
                Time unit:
                <select
                  name="timeUnit"
                  id="unitType"
                  size="1"
                >
                  <option value="M">Minute</option>
                  <option value="H">Hour</option>
                  <option value="D">Day</option>
                </select>
              </th>
              <th>
                Chart Type:
                <select name="analyzeType" id="type" size="1">
                  <option default value="MP01">
                    TEST-CHART01
                  </option>
                  <option value="MP02">MP02</option>
                </select>
              </th>
            </tr>
            <tr>
              <th className="chartButtons">
                <input
                  type="submit"
                  size="10"
                  value="Add"
                  className="button"
                  name="add"
                  onClick={handleAdd}
                />
                <input
                  type="submit"
                  size="10"
                  value="Delete"
                  className="button"
                  name="delete"
                  onClick={handleDelete}
                />
                <input
                  type="submit"
                  size="30"
                  value="Refresh data"
                  className="button"
                  name="refresh"
                  onClick={reload}
                />
                <input
                  type="submit"
                  size="30"
                  value="back"
                  className="button"
                  name="date_back"
                  onClick={handleBackClick}
                />
                <input
                  type="submit"
                  size="30"
                  value="forward"
                  className="button"
                  name="date_forward"
                  onClick={handleForwardClick}
                />
                <input
                  type="submit"
                  size="30"
                  value="Excel Export"
                  className="button"
                  name="excel"
                  onClick={onExportLocal}
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Toolbar;