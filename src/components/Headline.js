import React from 'react';

export default function(props) {
  /*
  * Expected props
  *   - black: String
  *       the text in black
  *   - red: String
  *       the text in red
  */

  return(
    <h2 style={{padding: '20px'}}>
      {props.black}<span style={{color: '#DA3821'}}>{props.red}</span>
    </h2>
  )
}