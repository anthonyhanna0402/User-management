import React from 'react';

const Button =(props) => {
  return(
    <button className='text-cyan-400 font-semibold bg-gray-400/15 text-lg py-1 rounded-lg mr-2 w-24'>
      {props.value}
    </button>
  );
}

export default Button