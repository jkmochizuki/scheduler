import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const dayLists = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={() => onChange(day.name)}
      />
    );
  });

  return <ul>{dayLists}</ul>;
}
