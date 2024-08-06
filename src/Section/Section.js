import React from "react";
import styles from "./styles.module.css";

const Section = ({
  name,
  sectionIndex,
  draggable,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  return (
    <div
      className={styles.container}
      key={sectionIndex}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <p>{name}</p>
    </div>
  );
};

export default Section;
