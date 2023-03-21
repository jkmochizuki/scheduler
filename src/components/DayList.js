import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) { // props -> array of objects (days)
  const { day, setDay } = props;

  const dayLists = props.days.map((item) => {
    return (
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === day}
        setDay={setDay} // updates the currently selected day in the parent component's state when this day is clicked
      />
    );
  })

  return (
    <ul>
      {dayLists}
    </ul>
  );
}