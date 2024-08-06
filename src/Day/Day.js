import React from "react";
import Section from "../Section/Section";
import styles from "./styles.module.css";

const Day = ({
  day,
  draggable,
  onDragStart,
  onDragEnd,
  onDragEnter,
  draggableSection = true,
  onDragSectionStart,
  onDragSectionEnter,
  onDragSectionEnd,
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      className={styles.container}
    >
      {day.map((section, sectionIndex) => (
        <Section
          key={sectionIndex}
          name={section.name}
          draggable={draggableSection}
          onDragStart={() => onDragSectionStart(sectionIndex)}
          onDragEnter={() => onDragSectionEnter(sectionIndex)}
          onDragEnd={onDragSectionEnd}
          onDragOver={(e) => e.preventDefault()}
        />
      ))}
    </div>
  );
};

export default Day;
