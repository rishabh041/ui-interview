import React, { useEffect, useRef, useState } from 'react';

function StickyStack(props) {
  const { item } = props;
  const itemRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {

    const handleScrollSticky = () => {
      const eleRef = itemRef.current.getBoundingClient();

      if(eleRef.top <= 0){
        setIsSticky(true);
      } else{
        setIsSticky(false);
      }
    }


    window.addEventListener('scroll', handleScrollSticky);

    // deregister the event
  })

  return (
    <div ref={itemRef} className={`stack-item ${isSticky ? 'stickyItem': ''}`}>
      {item}
    </div>
  );
}

export default StickyStack;