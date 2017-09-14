import React from 'react';
import DribbbleCard from './DribbbleCardCSS';
import './CardGrid.css';

const CardGrid = ({ shots }) => (
  <div className='card-grid'>
    { shots.map( shot => (
      <DribbbleCard shot={shot} />
    ))}
  </div>
);

export default CardGrid;