import React, { useEffect, useState } from 'react';

import './styles.css';

const n = 3;

const ListComp = (props) => {
  const { items, setListItems } = props;
  const [newItem, setNewItem] = useState('');
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    if(items.length === 0)
      setIsSelectAll(false);
  },[items]);

  // new todo addition
  const handleAddNewItem = (e) => {
    if(e.key === 'Enter'){
      const newItemVal = newItem.trim();

      if(newItemVal){
        setListItems([...items, { title: newItem, isSelected: false }]);
        setNewItem('');
      }
    }
  };

  // select deselect handler
  const handleCheck = (index) => {
    const updatedItems = items.map((item, i) => (
      i === index ? { ...item, isSelected: !item.isSelected} : item
    ));

    const selectedCount = updatedItems.filter(item => item.isSelected).length;
    if(selectedCount === items.length)
      setIsSelectAll(true);
    else
      setIsSelectAll(false);

    setListItems(updatedItems);
  };

  const handleSelectAll = () => {
    const updatedIsSelect = isSelectAll ? false : true;
    let updatedItems = items.map(item => ({...item, isSelected: updatedIsSelect}));

    setListItems(updatedItems);
    setIsSelectAll(updatedIsSelect);

  }

  // list utils handling
  return (
      <div className='list-container'>
        <input 
          type='text'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleAddNewItem}
        />

        <div className='selected-container'>
          {items.length > 0 && <input 
            type='checkbox'
            checked={isSelectAll}
            onChange={() => handleSelectAll()}
          />}
          <span>{`${items.filter(item => item.isSelected).length}/${items.length} items selected`}</span>
        </div>
        <ul>
          {
            items && items.map((item, index) => (
              <li key={index}>
                <input 
                  type='checkbox'
                  checked={item.isSelected}
                  onChange={() => handleCheck(index)}
                />
                {item.title}
              </li>
            ))
          }
        </ul>
      </div>
  )
};

const App = () => {
  const [lists, setLists] = useState(Array(n).fill().map(() => []));

  // callaback for main list updated post transfer
  const handleTransfer = (direction, listIndex) => {
    const [fromIndex, toIndex] = direction === 1 ? [listIndex, listIndex + 1] : [listIndex + 1, listIndex];

    let selectedItems = lists[fromIndex].filter(item => item.isSelected);
    selectedItems = selectedItems.map(item => ({ ...item, isSelected: false }));
    const remainingItems = lists[fromIndex].filter(item => !item.isSelected);

    setLists(prevLists => {
      const updatedLists = [...prevLists];
      updatedLists[toIndex] = [...updatedLists[toIndex], ...selectedItems];
      updatedLists[fromIndex] = [...remainingItems];

      return updatedLists;
    })
  };

  // callabck for new items addition
  const handleSetItems = (newItems, index) => {
    const updatedLists = [...lists];
    updatedLists[index] = newItems;
    setLists(updatedLists);
  }

  return (
    <div className='transfer-list'>
      {lists.map((items, index) => (
        <>
          <ListComp 
            key={index}
            items={items}
            listIndex={index}
            setListItems={(newItems) => handleSetItems(newItems, index)}
          />
          {index !== n-1 &&
            <div className='button-container'>
              <button onClick={() => handleTransfer(-1, index)}> {`<`} </button>
              <button onClick={() => handleTransfer(1, index)}>{`>`}</button>
            </div>
          }
        </>
      )
      )}
    </div>
  );
}

export default App;

/* [{
  id: 1,
  title: 'list1_item1',
  isSelected: false
}]
*/

// handleCheck
// transfer
// css
// remaining items
// selected items