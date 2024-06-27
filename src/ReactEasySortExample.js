import { useState } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move';

const App = () => {
  const [items, setItems] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => {
      console.log(`Array Move Immutable`,arrayMoveImmutable(array, oldIndex, newIndex));
      return arrayMoveImmutable(array, oldIndex, newIndex)
    })
  }

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="item">{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  )
}

export default App;