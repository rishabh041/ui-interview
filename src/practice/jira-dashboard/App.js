import React, { useState } from 'react';

import Ticket from './Ticket';

import './App.css';

const App = props => {
  const TICKET_STATES = ['Todo', 'Inprogress', 'Done', 'Backlog'];
  const [tickets, setTickets] = useState([]);
  const [ticketCounter, setTicketCounter] = useState(1);

  const handleCreateTicket = () => {
    const name = window.prompt('Enter Ticket Title');
    const progressState = window.prompt('Enter Ticket State');
    if(!name)
        return;

    const timestamp = new Date();

    const inputTicket = {
      id: ticketCounter,
      ticketNumber: ticketCounter,
      name,
      timestamp,
      progress: progressState,
    };
    setTicketCounter(prevState => prevState + 1);

    const updatedTickets = [...tickets, inputTicket];
    setTickets(updatedTickets);

  }

  const handleTicketDrop = (e, progress) => {
    e.preventDefault();
    console.log(e.target);
    const draggedTicketId = e.dataTransfer?.getData('text/plain');
    console.log('draggedDataId======', draggedTicketId);

    const updatedTickets = tickets.map(item => {
      
      if(item.id === draggedTicketId)
        return({ ...item, progress});

      return item;
  });
    
    setTickets(updatedTickets);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const ticketRenderer = (progressState) => {

    return (
    <div 
      onDrop={(e) => handleTicketDrop(e, progressState)}
      onDragOver={handleDragOver}
      key={progressState}
    >
      <h4>{progressState}</h4>
      {tickets.map(ticketItem => <Ticket ticketItem={ticketItem} currentProgress={progressState} />)}
    </div>
    );
  }

  return (
    <div className='jiraWrapper'>
      <div className='createTicket' onClick={handleCreateTicket}>
        + Create
      </div>
      {
        TICKET_STATES.map(progressState => {
          return ticketRenderer(progressState);
        })
      }
    </div>
  );
};

export default App;