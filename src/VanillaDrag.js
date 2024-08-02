import { useState, useRef  } from 'react';
import { peopleData} from './data'
/**  */
const VanillaDrag = () => {

  const [peoples, setPeoples] = useState([...peopleData]);
 

  const dragPerson = useRef({ listPosition: 0, itemPosition: 0 });
  const draggedOverPerson = useRef({ listPosition: 0, itemPosition: 0 });

  const draggedOverPersonList = useRef(0);

  const handleSort = () => {

    const peoplesClone = [ ...peoples];
    if(draggedOverPersonList.current === dragPerson.current.listPosition ){
    
      const temp = peoplesClone[dragPerson.current.listPosition][dragPerson.current.itemPosition];
      peoplesClone[dragPerson.current.listPosition][dragPerson.current.itemPosition] = peoplesClone[draggedOverPerson.current.listPosition][draggedOverPerson.current.itemPosition]
      peoplesClone[draggedOverPerson.current.listPosition][draggedOverPerson.current.itemPosition] = temp;
  
    } else {

      const peoplesClone = [ ...peoples];
      const temp = peoplesClone[dragPerson.current.listPosition][dragPerson.current.itemPosition];
      peoplesClone[draggedOverPersonList.current].push(temp);
      peoplesClone[dragPerson.current.listPosition].splice(dragPerson.current.itemPosition, 1);
       
    }
    setPeoples(peoplesClone)
    
  }

  return (
    <main> 
      <div>
          <h2>Vanilla Drag n Drop</h2>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {peoples.map((people, peopleIndex) => (
              <div 
                onDragEnter={() => {
                  draggedOverPersonList.current = peopleIndex;
                }}
                onDragOver={e => e.preventDefault()}
                key={peopleIndex} style={{border: "1px solid black", minHeight: "40vh", minWidth: "10vw"}}>
                 {people.map((person, personIndex) => (
                    <div 
                      style={{width: 'max-content',padding: '10px 5px', marginBottom: '10px', backgroundColor:"#eee"}} key={personIndex} 
                      draggable              
                      onDragStart={() => (dragPerson.current = { listPosition: peopleIndex, itemPosition: personIndex })} 
                      onDragEnter={() => (draggedOverPerson.current = { listPosition: peopleIndex, itemPosition: personIndex })}
                      onDragEnd={handleSort}
                      onDragOver={(e) => e.preventDefault()}
                    >
                    <p>{person.name}</p>
                  </div>
                 ))}
              </div>
            ))}
          </div>
      </div>
    </main>
  )
}

export default VanillaDrag;