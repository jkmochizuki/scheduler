import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  /*
   * props
   *
   * days: array of objects - representing days of the week. each object contains:
   *   id: number
   *   name: string
   *   spots: number
   * value: string - value of the currently selected day
   * onChange: function - will be called when the selected day changes
   */

  const dayLists = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
    );
  });

  return <ul>{dayLists}</ul>;
}
