import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  navigationContainer: {
    padding: theme.spacing(0, 8),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  sliders: {
    width: "90%",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(4),
  },
  formElement: {
    marginBottom: theme.spacing(2),
  },
}));

const months = [
  {
    value: [3, 31],
    label: "March",
  },
  {
    value: [4, 30],
    label: "April",
  },
  {
    value: [5, 31],
    label: "May",
  },
  {
    value: [6, 30],
    label: "June",
  },
  {
    value: [7, 31],
    label: "July",
  },
  {
    value: [8, 31],
    label: "August",
  },
  {
    value: [9, 30],
    label: "September",
  },
  {
    value: [10, 31],
    label: "October",
  },
  {
    value: [11, 30],
    label: "November",
  },
  {
    value: [12, 31],
    label: "December",
  },
];

const hourMarks = Array(1440 / 60)
  .fill(0)
  .map((val, id) => ({
    label: `${id}:00`,
    value: id * 4,
  }));

const valueText = (value) => {
  return `${Math.floor((value * 15) / 60)}:${
    (value * 15) % 60 === 0 ? "00" : (value * 15) % 60
  }`;
};

export default function Navigation({
  onDayChange,
  onHourChange,
  onMonthChange,
  onAnimationChange,
  time = 0,
  day = 1,
}) {
  const classes = useStyles();
  const [month, setMonth] = useState(4);
  const [days, setDays] = useState(30);
  const daysMarks = Array(days)
    .fill(0)
    .map((val, id) => ({ value: id + 1, label: id + 1 }));

  const handleMonthChange = (event) => {
    const val = event.target.value;
    const selectedMonth = months.find((curr) => curr.value[0] === val);
    setMonth(val);
    setDays(selectedMonth.value[1]);
    onMonthChange({
      num: val,
      days: selectedMonth.value[1],
    });
  };

  const currentTime = `${Math.floor((time * 15) / 60)}:${
    (time * 15) % 60 === 0 ? "00" : (time * 15) % 60
  }`;

  const handleDayChange = (event, newValue) => {
    onDayChange(newValue);
  };

  const handleHourChange = (event, newValue) => {
    onHourChange(newValue);
  };

  const startAnimation = () => {
    onAnimationChange("play");
  };

  const stopAnimation = () => {
    onAnimationChange("pause");
  };

  return (
    <div className={classes.navigationContainer} id="navigation">
      <div className={classes.buttons}>
        <FormControl className={classes.formElement}
                     id="month-select">
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-label"
            value={month}
            onChange={handleMonthChange}
          >
            {months.map((curr) => (
              <MenuItem key={curr.label} value={curr.value[0]}>
                {curr.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={startAnimation} id="play-button">
            Play
          </Button>
          <Button onClick={stopAnimation} id="pause-button">
            Pause
          </Button>
        </ButtonGroup>
      </div>
      <div className={classes.sliders}>
        <Typography variant="h5" color="inherit" noWrap id="date-info">
          Time: {currentTime}, {day} {months[month - 3].label} 2019
        </Typography>
        <Slider
          id="day-slider"
          value={day}
          onChange={handleDayChange}
          defaultValue={1}
          min={1}
          max={days}
          aria-labelledby="day-slider"
          marks={daysMarks.splice(0, days)}
          step={1}
        />
        <Slider
          id="hour-slider"
          value={time}
          onChange={handleHourChange}
          defaultValue={0}
          min={0}
          max={92 + 3}
          getAriaValueText={valueText}
          valueLabelFormat={valueText}
          aria-labelledby="hour-slider"
          step={1}
          marks={hourMarks}
        />
      </div>
    </div>
  );
}
