import React from 'react';
import { useParams } from 'react-router-dom';

const Results = () => {
  const { id, sessionId } = useParams();

  return (
    <div>
      <h1>
        id:
        {' '}
        {id}
      </h1>
      <h1>
        sessionId:
        {' '}
        {sessionId}
      </h1>
    </div>
  );
};

export default Results;
