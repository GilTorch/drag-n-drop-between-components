import { useState, useRef } from "react";
/**  */
const VanillaDrag = ({ list }) => {
  const [week, setWeek] = useState([...list]);
  const [isItemIsDragging, setIsItemDragging] = useState(false);
  const draggedSection = useRef({ dayIndex: 0, sectionIndex: 0 });
  const draggedOverSection = useRef({ dayIndex: 0, sectionIndex: 0 });
  const draggedDay = useRef(0);
  const draggedOverDay = useRef(0);

  const onDayDragEnd = () => {
    const weekClone = [...week];
    const temp = weekClone[draggedDay.current];
    weekClone[draggedDay.current] = weekClone[draggedOverDay.current];
    weekClone[draggedOverDay.current] = temp;
    setWeek(weekClone);
  };

  const onSectionDragEnd = () => {
    const weekClone = [...week];
    if (draggedOverDay.current === draggedSection.current.dayIndex) {
      const temp =
        weekClone[draggedSection.current.dayIndex][
          draggedSection.current.sectionIndex
        ];
      weekClone[draggedSection.current.dayIndex][
        draggedSection.current.sectionIndex
      ] =
        weekClone[draggedOverSection.current.dayIndex][
          draggedOverSection.current.sectionIndex
        ];
      weekClone[draggedOverSection.current.dayIndex][
        draggedOverSection.current.sectionIndex
      ] = temp;
    } else {
      const temp =
        weekClone[draggedSection.current.dayIndex][
          draggedSection.current.sectionIndex
        ];
      weekClone[draggedOverDay.current].push(temp);
      weekClone[draggedSection.current.dayIndex].splice(
        draggedSection.current.sectionIndex,
        1
      );
    }
    setWeek(weekClone);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {week.map((day, dayIndex) => (
          <div
            key={dayIndex}
            draggable={!isItemIsDragging}
            onDragStart={() => {
              draggedDay.current = dayIndex;
            }}
            onDragEnd={() => {
              if (!isItemIsDragging) {
                onDayDragEnd();
              }
            }}
            onDragEnter={() => {
              draggedOverDay.current = dayIndex;
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: "1px solid black",
              height: "40vh",
              minWidth: "10vw",
              overflowY: "auto",
            }}
          >
            {day.map((section, sectionIndex) => (
              <div
                style={{
                  width: "max-content",
                  padding: "10px 5px",
                  marginBottom: "10px",
                  backgroundColor: "#eee",
                }}
                key={sectionIndex}
                draggable
                onDragStart={() => {
                  setIsItemDragging(true);
                  draggedSection.current = {
                    dayIndex,
                    sectionIndex,
                  };
                }}
                onDragEnter={() => {
                  draggedOverSection.current = {
                    dayIndex,
                    sectionIndex,
                  };
                }}
                onDragEnd={() => {
                  setIsItemDragging(false);
                  onSectionDragEnd();
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <p>{section.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VanillaDrag;
