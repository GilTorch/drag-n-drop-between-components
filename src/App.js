import React, { useState, useRef } from "react";
import { weeks as weeksData } from "./data";
import Day from "./Day/Day";

const App = () => {
  const [weeks, setWeeks] = useState([...weeksData]);
  const [isItemIsDragging, setIsItemDragging] = useState(false);
  // const draggedWeek = useRef(0);
  const draggedOverWeek = useRef(0);
  const draggedDay = useRef({ weekIndex: 0, dayIndex: 0 });
  const draggedOverDay = useRef({ weekIndex: 0, dayIndex: 0 });
  const draggedSection = useRef({ weekIndex: 0, dayIndex: 0, sectionIndex: 0 });
  const draggedOverSection = useRef({
    weekIndex: 0,
    dayIndex: 0,
    sectionIndex: 0,
  });

  const onDayDragEnd = () => {
    const weeksClone = [...weeks];
    const temp =
      weeksClone[draggedDay.current.weekIndex][draggedDay.current.dayIndex];
    weeksClone[draggedDay.current.weekIndex][draggedDay.current.dayIndex] =
      weeksClone[draggedOverDay.current.weekIndex][
        draggedOverDay.current.dayIndex
      ];
    weeksClone[draggedOverDay.current.weekIndex][
      draggedOverDay.current.dayIndex
    ] = temp;
    setWeeks(weeksClone);
  };

  const onSectionDragEnd = () => {
    const weeksClone = [...weeks];
    if (
      draggedOverDay.current.dayIndex === draggedSection.current.dayIndex &&
      draggedOverWeek.current === draggedSection.current.weekIndex
    ) {
      const temp =
        weeksClone[draggedSection.current.weekIndex][
          draggedSection.current.dayIndex
        ][draggedSection.current.sectionIndex];
      weeksClone[draggedSection.current.weekIndex][
        draggedSection.current.dayIndex
      ][draggedSection.current.sectionIndex] =
        weeksClone[draggedOverSection.current.weekIndex][
          draggedOverSection.current.dayIndex
        ][draggedOverSection.current.sectionIndex];
      weeksClone[draggedOverSection.current.weekIndex][
        draggedOverSection.current.dayIndex
      ][draggedOverSection.current.sectionIndex] = temp;
    } else {
      const temp =
        weeksClone[draggedSection.current.weekIndex][
          draggedSection.current.dayIndex
        ][draggedSection.current.sectionIndex];

      weeksClone[draggedDay.current.weekIndex][
        draggedOverDay.current.dayIndex
      ].push(temp);
      weeksClone[draggedDay.current.weekIndex][
        draggedDay.current.dayIndex
      ].splice(draggedSection.current.sectionIndex, 1);
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
            draggedOverWeek.current = weekIndex;
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
                    draggedDay.current = { weekIndex, dayIndex };
                  }}
                  onDragEnd={() => {
                    if (!isItemIsDragging) {
                      onDayDragEnd();
                    }
                  }}
                  onDragEnter={() => {
                    draggedOverDay.current = { weekIndex, dayIndex };
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  sectionDraggable={true}
                  onDragSectionStart={(sectionIndex) => {
                    setIsItemDragging(true);
                    draggedSection.current = {
                      weekIndex,
                      dayIndex,
                      sectionIndex,
                    };
                  }}
                  onDragSectionEnter={(sectionIndex) => {
                    draggedOverSection.current = {
                      weekIndex,
                      dayIndex,
                      sectionIndex,
                    };
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
