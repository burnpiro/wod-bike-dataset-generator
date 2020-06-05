import React from "react";

import station from "./station-sample.png";
import path from "./path-sample.png";
import trendUp from './trend-up.png'
import trendDown from './trend-down.png'
import scale from './scale.png'

export const steps = [
  {
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Hi, welcome to the quick guide on how to use this website. Please follow my lead to find out where are the most important parts of the website.
        `}
        ,
        <br />
        <br />
        {`
        This website contains a temporal network of WRM bicycle connections and its transactions.
        `}
      </div>
    ),
  },
  {
    selector: "#bikes-in-rent",
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Here we can see how many bikes are active in the selected time period. Bikes are marked as "Active" when their renting period covers the selected time period. E.g.
        `}
        ,
        <br />
        <br />
        {`
        Someone rents a bike at 7:12AM, you've selected time period between 7:00AM and 7:15AM. That bike will be shown as "Active" because the renting period covers a selected period. If that person finishes using a bike at 8:14AM, the last time period which covers this renting is 8:00AM-8:15AM.
        `}
      </div>
    ),
  },
  {
    selector: "#navigation",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Before we start to use the network let me show you the navigation.
        `}
      </div>
    ),
  },
  {
    selector: "#month-select",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        First, we have the month selector. It allows you to chose which month the data should come from. The default one is April and each change requires downloading that month's data from the server.
        `}
      </div>
    ),
  },
  {
    selector: "#day-slider",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        After selecting the month it's time to select a day of this month. Default day selected is always the 1st of the month but you can choose whatever you wish.
        `}
      </div>
    ),
  },
  {
    selector: "#hour-slider",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Probably the most important this is to select time period. You're only selecting the start of the period because each period is a 15min time slot, so if you select 7:15AM then you're looking on data between 7:15AM and 7:30AM.
        `}
      </div>
    ),
  },
  {
    selector: "#date-info",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Here you can check what is exactly the time period you're looking at.
        `}
      </div>
    ),
  },
  {
    selector: "#play-button",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Instead of just selecting the period, you can run animation by clicking "PLAY" button. It will change periods using a 2s interval until the "PAUSE" button is clicked.
        `}
      </div>
    ),
  },
  {
    selector: "#pause-button",
    menuOpen: false,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        If you already started an animation then you can stop it any time you want. Just click this button to do it.
        `}
      </div>
    ),
  },
  {
    selector: ".plot-container",
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        This is the main working place, a place where the magic happens.`}
        <br />
        <br />
        {`
        Each dot represents a different station of WRM. Size of that dot matters because it represents one of the metrics (we're going to get to those soon). `}<b>Default metric is a Degree</b> {`which is basically a number of rents coming in and going out of the station. You can check current metrics by hovering over the station.
        `}
        <br />
        <img src={station} />
        <br />
        <br />
        {`
        Each path represents a connection between two stations. Path's width is represented by the number of bikes in rent on that path. That means if currently there are 3 bikes going from station A to station B, that path will have a width of 3 (`}<b>weight</b>{`). You can check the path destination and the current number of bicycles by hovering over the path.
        `}
        <br />
        <img src={path} />
      </div>
    ),
    style: {
      maxWidth: 450
    }
  },
  {
    selector: "#menu-toggle",
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Now let's check what are the different option you can use. Please click on the ">" arrow and then proceed to the next step.
        `}
      </div>
    ),
  },
  {
    selector: "#left-menu",
    menuOpen: true,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        Here we have all settings for the network.
        `}
      </div>
    ),
  },
  {
    selector: "#display-options",
    menuOpen: true,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        You're able to choose which type of data to show. That might be helpful when dealing with a lot of data at the same time. Showing both paths and nodes if there are more than 300 rents at a selected time period is quite confusing. The best option is to look at one visualization tool at this time.
        `}
      </div>
    ),
  },
  {
    selector: "#nodeMetric",
    menuOpen: true,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        There are different types of metrics. We're using 2 major ones:
        `}
        <br />
        <br />
        <b>Degree:</b>
        {`
          Weight of all in and out connections. You can select a specific type of Degree ("In Degree" or "Out Degree").
        `}
        <a href="https://en.wikipedia.org/wiki/Degree_(graph_theory)">Degree Wiki</a>
        <br />
        <br />
        <b>PageRank:</b>
        {`
          Metric created by Google used to rank the importance of web pages. You can read more on 
        `}
        <a href="https://en.wikipedia.org/wiki/PageRank">PageRank Wiki</a>
        <br />
        <br />
        <img src={scale} style={{float: 'right'}}/>
        {`
          Each metric has a scale, the scale has two indicators: "size" and "color". The more reddish color is, the higher the value of that node is. The same goes for size. The larger the node is, the higher the value.
        `}
      </div>
    ),
    style: {
      maxWidth: 500,
    }
  },
  {
    selector: "#numOfNodes",
    menuOpen: true,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        The maximum number of paths displayed at once. By default, we don't display more than 50 paths at the same time, for performance reasons. If you have a powerful enough computer you might change that setting to something higher, even 300!!!.
        `}
      </div>
    ),
  },
  {
    selector: "#useTrends",
    menuOpen: true,
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        If you don't want to just look on straight values of nodes you can switch to "Trend Mode". Trends allow you to see outliers within the data. Trends are shown as different colors base on which trend it is. You can have 3 different trends in the data:
        `}
        <br />
        <br />
        <b>Up trend:</b>
        {`
          When the current node is above the trend line. How "red" the node is indicates how high above the trend line you are .
        `}
        <img src={trendUp} style={{maxHeight: 200}}/>
        <br />
        <br />
        <b>Down trend:</b>
        {`
          When current nodes is below the trend line. How "blue" the node is how low below the trend line you are.
        `}
        <img src={trendDown} style={{maxHeight: 200}} />
        <br />
        <br />
        <b>Side trend:</b>
        {`
          When the current node is near the line.
        `}
        <br />
        <br />
        {`
          Trends are calculated as a simple moving average with history from the last hour. 
        `}
      </div>
    ),
    style: {
      maxWidth: 500,
      transform: 'translate(275px,10px)'
    }
  },
  {
    selector: "#guide-icon",
    content: ({ goTo, inDOM }) => (
      <div key={"tes"}>
        {`
        That's it :) You can always access the guide by clicking on this icon. Enjoy using the network.
        `}
      </div>
    ),
  },
];
