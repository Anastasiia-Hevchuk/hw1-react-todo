import React, { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('rendered');
  }, [])

  const addCount = (counter, seter) => {
    seter(counter + 1);
  }

  const removeCount = (counter, seter) => {
    seter(counter - 1);
  }

  return (
    <div>
      {count}
      <button onClick={addCount(count, setCount)}>+</button>
      <button onClick={removeCount(count, setCount)}>-</button>
    </div>
  );
}

export default Counter;