import { useState, useRef } from "react";
import { peopleData } from "./data";
/**  */
const VanillaDrag = () => {
  const [peoples, setPeoples] = useState([...peopleData]);
  const [isItemIsDragging, setIsItemDragging] = useState(false);
  const dragPerson = useRef({ listPosition: 0, itemPosition: 0 });
  const draggedOverPerson = useRef({ listPosition: 0, itemPosition: 0 });
  const dragPersonList = useRef(0);
  const draggedOverPersonList = useRef(0);

  const onPersonListDragEnd = () => {
    const peoplesClone = [...peoples];
    const temp = peoplesClone[dragPersonList.current];
    peoplesClone[dragPersonList.current] =
      peoplesClone[draggedOverPersonList.current];
    peoplesClone[draggedOverPersonList.current] = temp;
    setPeoples(peoplesClone);
  };

  const onPersonDragEnd = () => {
    const peoplesClone = [...peoples];
    if (draggedOverPersonList.current === dragPerson.current.listPosition) {
      const temp =
        peoplesClone[dragPerson.current.listPosition][
          dragPerson.current.itemPosition
        ];
      peoplesClone[dragPerson.current.listPosition][
        dragPerson.current.itemPosition
      ] =
        peoplesClone[draggedOverPerson.current.listPosition][
          draggedOverPerson.current.itemPosition
        ];
      peoplesClone[draggedOverPerson.current.listPosition][
        draggedOverPerson.current.itemPosition
      ] = temp;
    } else {
      const temp =
        peoplesClone[dragPerson.current.listPosition][
          dragPerson.current.itemPosition
        ];
      peoplesClone[draggedOverPersonList.current].push(temp);
      peoplesClone[dragPerson.current.listPosition].splice(
        dragPerson.current.itemPosition,
        1
      );
    }
    setPeoples(peoplesClone);
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
        {peoples.map((people, peopleIndex) => (
          <div
            key={peopleIndex}
            draggable={!isItemIsDragging}
            onDragStart={() => {
              dragPersonList.current = peopleIndex;
            }}
            onDragEnd={() => {
              if (!isItemIsDragging) {
                onPersonListDragEnd();
              }
            }}
            onDragEnter={() => {
              draggedOverPersonList.current = peopleIndex;
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: "1px solid black",
              minHeight: "40vh",
              minWidth: "10vw",
            }}
          >
            {people.map((person, personIndex) => (
              <div
                style={{
                  width: "max-content",
                  padding: "10px 5px",
                  marginBottom: "10px",
                  backgroundColor: "#eee",
                }}
                key={personIndex}
                draggable
                onDragStart={() => {
                  setIsItemDragging(true);
                  dragPerson.current = {
                    listPosition: peopleIndex,
                    itemPosition: personIndex,
                  };
                }}
                onDragEnter={() => {
                  draggedOverPerson.current = {
                    listPosition: peopleIndex,
                    itemPosition: personIndex,
                  };
                }}
                onDragEnd={() => {
                  setIsItemDragging(false);
                  onPersonDragEnd();
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <p>{person.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VanillaDrag;
