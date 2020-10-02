import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

import { FullScreen } from '../FullScreen/FullScreen';

export const SetDetailed = ({ sets }) => {
  const [setData, setSetData] = useState({});
  const [fullScreenMode, setFullScreenMode] = useState(false);

  const match = useRouteMatch();
  const thisSetId = match.params.id

  useEffect(() => {
    sets.map(set => (
      set.set_num === thisSetId && (
        setSetData(set)
      )
    ))
  }, [thisSetId]);

  const {
    set_num,
    name,
    year,
    num_parts,
    set_img_url
  } = setData;

  const handleFullScreen = () => {
    setFullScreenMode(!fullScreenMode)
  }
  
  return (
    <>
      <div className="set-detailed">
        <div className="set-detailed__img">
          <div className="set-detailed__img__wrapper">
            <img className="set-detailed__img__wrapper--img" 
              src={set_img_url} 
              alt={name} />
            <div className="overlay">
              <button 
                className="overlay__button" 
                onClick={handleFullScreen}>
                <FontAwesomeIcon icon={faSearchPlus} />
              </button>
            </div>
          </div>
        </div>
        <hr className="set-detailed__hr" />
        <div className="set-detailed__info">
          <h3 className="set-detailed__info__name">#{set_num}</h3>
          <div className="set-detailed__info__data">
            <div className="set-detailed__info__data--key">Name</div> 
            <div className="set-detailed__info__data--value">{name}</div>
          </div>
          <div className="set-detailed__info__data">
            <div className="set-detailed__info__data--key">Consists of</div> 
            <div className="set-detailed__info__data--value">
              {num_parts} parts
            </div>
          </div>
          <div className="set-detailed__info__data">
            <div className="set-detailed__info__data--key">Released</div> 
            <div className="set-detailed__info__data--value">{year}</div>
          </div>
        </div>
      </div>
      {fullScreenMode && (
        <FullScreen 
          img={set_img_url}
          name={name} 
          onFullScreen={handleFullScreen} />
      )}
    </>
  );
};
