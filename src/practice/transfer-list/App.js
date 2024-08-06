import React, { useState } from 'react';

const INITIAL_LIST = [
  {
    id: 1,
    name: 'Item 1',
    isSelected: false
  },
  {
    id: 2,
    name: 'Item 2',
    isSelected: false
  },
  {
    id: 3,
    name: 'Item 3',
    isSelected: false
  },
  {
    id: 4,
    name: 'Item 4',
    isSelected: false
  }
];

const LIST_FLAG = {
  LIST1: 'list1',
  LIST2: 'list2',
}

const App = () => {
  const [list1, setList1] = useState(INITIAL_LIST);
  const [list2, setList2] = useState([]);

  const moveAllItems = (fromList, toList, listFlag) => {
    const updatedFromList = [];
    const updatedToList = [...fromList, ...toList];

    const [setter1, setter2] = LIST_FLAG.LIST1 === listFlag ? [setList1, setList2]: [setList2, setList1];

    setter1(updatedFromList);
    setter2(updatedToList);
  };

  const moveSelectedItems = (fromList, toList, listFlag) => {
    const selectedItems = fromList.filter(({ isSelected }) => isSelected);
    const remainingItems = fromList.filter(({ isSelected }) => !isSelected);

    const [setter1, setter2] = LIST_FLAG.LIST1 === listFlag ? [setList1, setList2]: [setList2, setList1];

    setter1(remainingItems);
    setter2([...toList, ...selectedItems]);
  }
  
  const renderList = (listItem, listFlag) => {
    const { id, name, isSelected } = listItem;

    const handleListSelect = (event) => {
      const currListState = listFlag === LIST_FLAG.LIST1 ? list1 : list2;
      const currSetter = listFlag === LIST_FLAG.LIST1 ? setList1 : setList2;

      const updatedList = currListState.map(listMap => {
        if(listMap.id === id){
          return {
            ...listMap,
            isSelected: !listMap.isSelected
          }
        }

        return listMap;
      });


      currSetter(updatedList);
    };

    return (
      <React.Fragment key={id}>
        <input 
          type='checkbox' 
          value={name}
          onChange={handleListSelect}
          checked={isSelected}
        />
        <span> {name} </span>
      </React.Fragment>
    )
  }
  
  return (
    <div className='parent'>
      <div className='list-container'>
      <h2>List1</h2>
        {list1.map((item) => renderList(item, LIST_FLAG.LIST1))}
      </div>

      <button onClick={() => moveAllItems(list1, list2, LIST_FLAG.LIST1)}> {'>>'} </button>
      <button onClick={() => moveSelectedItems(list1, list2, LIST_FLAG.LIST1)}> {'>'} </button>
      <button onClick={() => moveSelectedItems(list2, list1, LIST_FLAG.LIST2)}>{'<'}</button>
      <button onClick={() => moveAllItems(list2, list1, LIST_FLAG.LIST2)}>{'<<'}</button>

      <div className='list-container'>
        <h2>List2</h2>
        {list2.map((item) => renderList(item, LIST_FLAG.LIST2))}
      </div>
    </div>
  );
};

export default App;