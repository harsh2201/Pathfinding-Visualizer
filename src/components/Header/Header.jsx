// @flow

import React, { useState, useContext } from 'react';
import { 
  DIJKSTRA, BELLMAN_FORD, A_STAR, DFS,
  DELAY_SLOWEST, DELAY_SLOW, DELAY_NORMAL, DELAY_FAST, DELAY_FASTEST
} from 'constants.js';
import { Context, type ContextType } from 'Provider';
import PathFinder from 'algorithms/index.js';
import './Header.scss';

const Header = () => {

  const [type, setType] = useState<string>(DIJKSTRA);
  const context = useContext<ContextType>(Context);
  const { 
    begin, end, updateItem, delay,
    pathFinder, clear, board, isVisualized,
    setIsPathExist, setIsVisualized
  } = context;

  const onAlgoChange = (e : ElementEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const onDelayChange = (e : ElementEvent<HTMLSelectElement>) => {
    delay.current = parseInt(e.target.value);
  };

  const onVisualize = () => {
    if (isVisualized) return;
    setIsVisualized(true);

    pathFinder.current  = new PathFinder[type]({
      begin: begin.current,
      end: end.current,
      updateItem,
      board: board.current
    });
    const isPossiblePath = pathFinder.current.execute();
    setIsPathExist(isPossiblePath);
  };

  const onClear = () => { 
    if (isVisualized) return;
    setIsVisualized(false);

    clear();
  };

  return (
    <div className="content-header">
      <select className="content-header__select" onChange={onAlgoChange} id="algorithm">
        <option value={DIJKSTRA} defaultChecked={true}>Dijkstra</option>
        <option value={BELLMAN_FORD}>Bellman-Ford</option>
        <option value={DFS}>DFS</option>
        <option value={A_STAR}>A*</option>
      </select>
      <select className="content-header__select" onChange={onDelayChange} defaultValue={300}>
        <option value={DELAY_SLOW}>slowest</option>
        <option value={DELAY_SLOWEST}>slow</option>
        <option value={DELAY_NORMAL}>normal</option>
        <option value={DELAY_FAST}>fast</option>
        <option value={DELAY_FASTEST}>fastest</option>
      </select>
      <button className="content-header__button" onClick={onVisualize} disabled={isVisualized}>
        Visualize!
      </button>
      <button className="content-header__button" onClick={onClear} disabled={isVisualized}>
        Clear
      </button>
    </div>
  );
};

export default Header;