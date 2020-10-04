import React from 'react';
import { useHistory } from 'react-router-dom';

export const ReturnBtn = () => {
  const history = useHistory();

  const handleReturn = () => history.goBack();

  return (
    <button className="return-btn" onClick={handleReturn}>
      <div className="return-btn__sign">
        <span className="return-btn__line return-btn__line--first"></span>
        <span className="return-btn__line return-btn__line--second"></span>
        <span className="return-btn__line return-btn__line--third"></span>
        <span className="return-btn__label">Back</span>
      </div>
    </button>
  );
}
