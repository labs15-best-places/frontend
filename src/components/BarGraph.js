import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
const BarGraph = ({ data, city1, city2, history }) => {
  //We want the keys for the bar graph to be worst, best, average, <city1.name>, <city2.name>
  //This changes takes the information from data, city1, and city2 and transforms it into a new object
  /* Data sent to bar graph is different from data that is used to retrieve ids */
  const dataForBarGraph = data.map(item => {
    let obj = {
      [city1.name]: item.scores.city1,
      [city2.name]: item.scores.city2,
      ...item.scores
    };
    obj["factor"] = item.factor;
    return obj;
  });

  const handleClick = node => {
    //node.indexValue is the factor
    const dataFiltered = data
      .filter(item => item.factor === node.indexValue)
      .pop();

    //node.id is best, worst, average, <city1Name>, <city2Name>
    const cityID = dataFiltered.ids[node.id];

    //There is not city associated with average
    if (node.id !== "average") {
      history.push(`/city/${cityID}`);
    }
  };

  return (
    <ResponsiveBar
      data={dataForBarGraph}
      keys={["worst", "average", "best", `${city1.name}`, `${city2.name}`]}
      indexBy="factor"
      margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
      padding={0.5}
      //   groupMode="grouped"
      layout="horizontal"
      colors={{ scheme: "spectral" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: `${city1.name}`
          }
        },
        {
          match: {
            id: `${city2.name}`
          },
          id: "circles"
        }
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      onClick={node => handleClick(node)}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={node => {
        //node.indexValue is the factor
        const dataFiltered = data
          .filter(item => item.factor === node.indexValue)
          .pop();

        //node.id is best, worst, average, <city1Name>, <city2Name>
        const cityName = dataFiltered.names[node.id];
        const cityScore = dataFiltered.scores[node.id];

        return (
          <strong>
            {cityName && `${cityName}:`}
            {cityScore}{" "}
          </strong>
        );
      }}
      theme={{
        tooltip: {
          container: {
            background: "white"
          }
        }
      }}
    />
  );
};

export default BarGraph;
