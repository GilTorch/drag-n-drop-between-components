import React, { useState } from "react";
import { weeks as weeksData } from "./data";
import Day from "./Day/Day";

const App = () => {
  const [weeks, setWeeks] = useState([...weeksData]);
  const [isItemIsDragging, setIsItemDragging] = useState(false);
  const [draggedOverWeek, setDraggedOverWeek] = useState(0);
  const [draggedDay, setDraggedDay] = useState({ weekIndex: 0, dayIndex: 0 });
  const [draggedOverDay, setDraggedOverDay] = useState({
    weekIndex: 0,
    dayIndex: 0,
  });
  const [draggedSection, setDraggedSection] = useState({
    weekIndex: 0,
    dayIndex: 0,
    sectionIndex: 0,
  });
  const [draggedOverSection, setDraggedOverSection] = useState({
    weekIndex: 0,
    dayIndex: 0,
    sectionIndex: 0,
  });

  const onDayDragEnd = () => {
    const weeksClone = [...weeks];
    const temp = weeksClone[draggedDay.weekIndex][draggedDay.dayIndex];
    weeksClone[draggedDay.weekIndex][draggedDay.dayIndex] =
      weeksClone[draggedOverDay.weekIndex][draggedOverDay.dayIndex];
    weeksClone[draggedOverDay.weekIndex][draggedOverDay.dayIndex] = temp;
    setWeeks(weeksClone);
  };

  const onSectionDragEnd = () => {
    const weeksClone = [...weeks];
    if (
      draggedOverWeek === draggedSection.weekIndex &&
      draggedOverDay.dayIndex === draggedSection.dayIndex
    ) {
      const temp =
        weeksClone[draggedSection.weekIndex][draggedSection.dayIndex][
          draggedSection.sectionIndex
        ];
      weeksClone[draggedSection.weekIndex][draggedSection.dayIndex][
        draggedSection.sectionIndex
      ] =
        weeksClone[draggedOverSection.weekIndex][draggedOverSection.dayIndex][
          draggedOverSection.sectionIndex
        ];
      weeksClone[draggedOverSection.weekIndex][draggedOverSection.dayIndex][
        draggedOverSection.sectionIndex
      ] = temp;
    } else {
      // same week different days
      const temp =
        weeksClone[draggedSection.weekIndex][draggedSection.dayIndex][
          draggedSection.sectionIndex
        ];

      weeksClone[draggedOverDay.weekIndex][draggedOverDay.dayIndex].push(temp);
      weeksClone[draggedSection.weekIndex][draggedDay.dayIndex].splice(
        draggedSection.sectionIndex,
        1
      );
    }
    setWeeks(weeksClone);
  };

  return (
    <div style={{ padding: "24px", border: "1px solid green" }}>
      {weeks.map((week, weekIndex) => (
        <div
          key={weekIndex}
          draggable={false}
          onDragEnter={() => {
            setDraggedOverWeek(weekIndex);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="all-lists"
        >
          <h2>List {weekIndex}</h2>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {week.map((day, dayIndex) => (
                <Day
                  key={dayIndex}
                  day={day}
                  draggable={!isItemIsDragging}
                  onDragStart={() => {
                    setDraggedDay({ weekIndex, dayIndex });
                  }}
                  onDragEnd={() => {
                    if (!isItemIsDragging) {
                      onDayDragEnd();
                    }
                  }}
                  onDragEnter={() => {
                    setDraggedOverDay({ weekIndex, dayIndex });
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  sectionDraggable={true}
                  onDragSectionStart={(sectionIndex) => {
                    setIsItemDragging(true);
                    setDraggedSection({
                      weekIndex,
                      dayIndex,
                      sectionIndex,
                    });
                  }}
                  onDragSectionEnter={(sectionIndex) => {
                    setDraggedOverSection({
                      weekIndex,
                      dayIndex,
                      sectionIndex,
                    });
                  }}
                  onDragSectionEnd={() => {
                    setIsItemDragging(false);
                    onSectionDragEnd();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
