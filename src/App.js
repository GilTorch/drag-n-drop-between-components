import { useState, useRef  } from 'react';
/**  */
const App = () => {

  const [peoples, setPeoples] = useState([
    [{id: 1, name: 'John Brown', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 2, name: 'Alex Smith', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 3, name: 'John Carlson', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 4, name: 'Chris Blue', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'}],
    [{id: 1, name: 'James Smith', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 2, name: 'Alex Jones', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 3, name: 'Tucker Carlson', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 4, name: 'Chris Cuomo', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'}],
    [{id: 1, name: 'Jane Doe', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 2, name: 'Alex Jones', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 3, name: 'Marc Carlson', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'},
    {id: 4, name: 'Christopher Paul', content: 'Est irure aute amet voluptate et esse ad do culpa voluptate proident aute.'}],
  ])
 

  const dragPerson = useRef({ listPosition: 0, itemPosition: 0 });
  const draggedOverPerson = useRef({ listPosition: 0, itemPosition: 0 });

  const handleSort = () => {

    const peoplesClone = [ ...peoples];
    const temp = peoplesClone[dragPerson.current.listPosition][dragPerson.current.itemPosition];
    peoplesClone[dragPerson.current.listPosition][dragPerson.current.itemPosition] = peoplesClone[draggedOverPerson.current.listPosition][draggedOverPerson.current.itemPosition]
    peoplesClone[draggedOverPerson.current.listPosition][draggedOverPerson.current.itemPosition] = temp;

    setPeoples(peoplesClone)
    
  }

  return (
    <main> 
      <div>
          <h2>List</h2>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {peoples.map((people, peopleIndex) => (
              <div key={peopleIndex} style={{border: "1px solid black", minHeight: "40vh", minWidth: "10vw"}}>
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

export default App;