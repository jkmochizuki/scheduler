import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  /*
  props
  days: [
    { id: number },
    { name: string },
    { spots: number }
  ]
  value: string
  onChange: function
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
  })

  return (
    <ul>
      {dayLists}
    </ul>
  );
}