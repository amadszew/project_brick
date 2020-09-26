import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const FullSetView = ({ sets }) => {
  const [setData, setSetData] = useState({});

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
    name,
    set_img_url,
    num_parts,
    year
  } = setData;
  return (
    <div>
      <img src={set_img_url} alt={name} />
      <p>Name: {name}</p>
      <p>Number of part:{num_parts}</p>
      <p>Year: {year}</p>
    </div>
  );
};
