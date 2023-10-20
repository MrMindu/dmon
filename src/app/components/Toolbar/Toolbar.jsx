import exportFromJSON from "export-from-json";
import moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import { useRef } from "react";
import { DateTimeContext } from "@/app/charts/page";

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
  const {
    dateFromState,
    setDateFrom,
    dateToState,
    setDateTo,
    timeFromState,
    setTimeFrom,
    timeToState,
    setTimeTo,
  } = useContext(DateTimeContext);

  useEffect(() => {
    setDateFrom(moment(new Date(`2023/07/18 15:10:00`)).format(`YYYY-MM-DD`));
    setDateTo(moment(new Date(`2023/07/18 15:10:00`)).format(`YYYY-MM-DD`));
    setTimeFrom(moment(new Date(`2023/07/18 14:10:00`)).format(`HH:mm`));
    setTimeTo(moment(new Date(`2023/07/18 15:10:00`)).format(`HH:mm`));

    setValues([[dateFromState, dateToState, timeFromState, timeToState]]);
  }, []);

  useEffect(() => {
    handleCallback(values);
    reloadCharts(values);
  }, [values]);

  function updateDateTime(sign, miliseconds) {
    const timestampFrom = new Date(
      dateFromState + ` ` + timeFromState
    ).getTime();
    const newTimeFrom = calculateTime(sign, timestampFrom, miliseconds);

    const timestampTo = new Date(dateToState + ` ` + timeToState).getTime();
    const newTimeTo = calculateTime(sign, timestampTo, miliseconds);

    setDateFrom(moment(new Date(newTimeFrom)).format(`YYYY-MM-DD`));
    setDateTo(moment(new Date(newTimeTo)).format(`YYYY-MM-DD`));

    setTimeFrom(getNewTime(newTimeFrom));
    setTimeTo(getNewTime(newTimeTo));
  }

  function getNewTime(time) {
    let hours = new Date(time).toLocaleTimeString([], {
      hour: `2-digit`,
      hour12: false,
    });

    let mins = new Date(time).toLocaleTimeString([], {
      minute: `2-digit`,
      hour12: false,
    });
    hours = hours === `24` ? `00` : hours;
    mins = mins < 10 ? `0` + mins : mins;

    return hours + `:` + mins;
  }

  function changeDateTime(sign) {
    switch (document.getElementById(`unitType`).value) {
      case `D`:
        eval(`dateTo.setDate(dateTo.getDate()` + sign + `1);`);
        setDate(`dateTo`, dateTo);
        eval(`dateFrom.setDate(dateFrom.getDate()` + sign + `1);`);
        setDate(`dateFrom`, dateFrom);
        break;
      case `H`:
        updateDateTime(sign, TIMESTAMP_HOUR);
        break;
      case `M`:
        updateDateTime(sign, TIMESTAMP_MINUTE);
        break;
      default:
        break;
    }
  }

  const reload = () => {
    const newState = values.map((obj, i) => {
      // update if index matches
      if (i === toolbarIndex) {
        return [dateFromState, dateToState, timeFromState, timeToState];
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
      [dateFromState, dateToState, timeFromState, timeToState],
    ]);
    prepareChartData(dateFromState, dateToState, timeFromState, timeToState);
  };

  const handleDelete = () => {
    const deletVal = [...values];
    values.length > 1 && deletVal.splice(values.length - 1, 1);
    setValues(deletVal);
  };

  function handleDateFromChange(e) {
    setDateFrom(e.target.value);
  }
  function handleDateToChange(e) {
    setDateTo(e.target.value);
  }
  function handleTimeFromChange(e) {
    setTimeFrom(e.target.value);
  }
  function handleTimeToChange(e) {
    setTimeTo(e.target.value);
  }

  const dateTimeItems = [
    {
      text: "Date from:",
      type: "date",
      id: "dateFrom",
      value: dateFromState,
      onChange: handleDateFromChange,
    },
    {
      text: "Time from:",
      type: "time",
      id: "timeFrom",
      value: timeFromState,
      onChange: handleTimeFromChange,
    },
    {
      text: "Date to:",
      type: "date",
      id: "dateTo",
      value: dateToState,
      onChange: handleDateToChange,
    },
    {
      text: "Time to:",
      type: "time",
      id: "timeTo",
      value: timeToState,
      onChange: handleTimeToChange,
    },
  ];

  const buttonItems = [
    {
      value: "Add",
      name: "add",
      onClick: handleAdd,
    },
    {
      value: "Delete",
      name: "delete",
      onClick: handleDelete,
    },
    {
      value: "Refresh data",
      name: "refresh",
      onClick: reload,
    },
    {
      value: "Back",
      name: "date_back",
      onClick: handleBackClick,
    },
    {
      value: "Forward",
      name: "date_forward",
      onClick: handleForwardClick,
    },
    {
      value: "Excel Export",
      name: "excel",
      onClick: onExportLocal,
    },
  ];

  return (
    <div className="toolbar" onChange={reload}>
      <div className="toolbar__inputs-wrapper">
        {dateTimeItems.map(({ text, ref, type, value, id, onChange }) => {
          return (
            <label key={id}>
              {text}
              <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="toolbar__date-time"
              ></input>
            </label>
          );
        })}
        <label>
          Time unit:
          <select
            className="toolbar__select"
            name="timeUnit"
            id="unitType"
            size="1"
          >
            <option value="M">Minute</option>
            <option value="H">Hour</option>
            <option value="D">Day</option>
          </select>
        </label>
        <div>
          Chart Type:
          <select
            className="toolbar__select"
            name="analyzeType"
            id="type"
            size="1"
          >
            <option default value="MP01">
              TEST-CHART01
            </option>
            <option value="MP02">MP02</option>
          </select>
        </div>
      </div>
      <label
        key="toolbar__buttons-wrapper"
        className="toolbar__buttons-wrapper"
      >
        {buttonItems.map(({ value, name, onClick }) => {
          return (
            <label key={name}>
              <input
                type="submit"
                value={value}
                name={name}
                className="toolbar__button"
                onClick={onClick}
              ></input>
            </label>
          );
        })}
      </label>
    </div>
  );
};

export default Toolbar;
