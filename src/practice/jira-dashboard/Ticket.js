import React from 'react';
import { useTheme } from '../../ThemeContext';

const Ticket = props => {
  const { ticketItem, currentProgress } = props;
  const theme = useTheme();
  console.log(theme);

  if(ticketItem.progress !== currentProgress)
      return null;

  const handleDragStart = (e) => {
    console.log(e.target.id);
    e.dataTransfer?.setData('text/plain', e.target.id);
  };

  return (
    <div 
      key={ticketItem.id}
      id={ticketItem.id}
      draggable
      onDragStart={handleDragStart}
    >
      <span>{ticketItem.id} {ticketItem.name} {ticketItem.timestamp.toLocaleDateString()}</span>
    </div>
  );
};

Ticket.propTypes = {
  
};

export default Ticket;