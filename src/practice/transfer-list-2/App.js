import React, { useCallback, useState } from 'react';

import './styles.css';

const INITIAL_LIST = [
  {
    id: 1,
    title: 'Item 1',
    isSelected: false
  },
  {
    id: 2,
    title: 'Item 2',
    isSelected: false
  },
  {
    id: 3,
    title: 'Item 3',
    isSelected: false
  },
  {
    id: 4,
    title: 'Item 4',
    isSelected: false
  }
];

const LIST_FLAG = {
  LIST1: 'LIST1',
  LIST2: 'LIST2',
};

const ListItem = (props) => {
  const { title, isSelected, id, onChange } = props;

  return (
    <div key={id}>
      <input 
        type='checkbox'
        checked={isSelected}
        id={`${title}_${id}`}
        onChange={onChange}
      />
      <label htmlFor={`${title}_${id}`}>{title}</label>
    </div>
  )
}

const App = () => {
  const [list1, setList1] = useState(INITIAL_LIST);
  const [list2, setList2] = useState([]);

  const handleMoveItems = useCallback((fromList, toList, listFlag, moveAll) => {
    const selectedItems = moveAll ? fromList : fromList.filter(listItem => listItem.isSelected);
    const remainingItems = moveAll ? [] : fromList.filter(listItem => !listItem.isSelected);

    const [setter1, setter2] = listFlag === LIST_FLAG.LIST1 ? [setList1, setList2] : [setList2, setList1];

    setter1(remainingItems);
    setter2([...toList, ...selectedItems]);
  }, []);

  const handleListOnChange = useCallback((id, listFlag) => {
    const [list, setList] = listFlag === LIST_FLAG.LIST1 ? [list1, setList1] : [list2, setList2];

    const updatedList = list.map(listItem => {
      if(listItem.id === id)
        return {
          ...listItem,
          isSelected: !listItem.isSelected,
        }

      return listItem;
    });

    setList(updatedList);
  }, [list1, list2]);

  const renderList = (list, listFlag) => {

    return (
      list.map(({id, isSelected, title}) => (
          <ListItem
            key={id}
            id={id}
            isSelected={isSelected}
            title={title}
            onChange={() => handleListOnChange(id, listFlag)}
          />
        )
      )
    )
  };

  return (
    <div className='transfer-list'>
      <div className='list-container'>
        <h2>List 2</h2>
        {renderList(list1, LIST_FLAG.LIST1)}
      </div>
      <div className='button-container'>
        <button onClick={() => handleMoveItems(list1, list2, LIST_FLAG.LIST1, true)}> {`>>`} </button>
        <button onClick={() => handleMoveItems(list1, list2, LIST_FLAG.LIST1, false)}> {`>`} </button>
        <button onClick={() => handleMoveItems(list2, list1, LIST_FLAG.LIST2, false)}> {`<`} </button>
        <button onClick={() => handleMoveItems(list2, list1, LIST_FLAG.LIST2, true)}> {`<<`} </button>
      </div>

      <div className='list-container'>
        <h2>List 2</h2>
        {renderList(list2, LIST_FLAG.LIST2)}
      </div>
    </div>
  );
}

export default App;