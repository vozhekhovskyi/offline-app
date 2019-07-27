import React, { useCallback } from 'react';

import { withStore } from '../../components/Store';
import { PAGES } from '../../constants';

const _MapPage = ({ state }) => {
  const handleBackClick = useCallback(() => {
    state.update({ page: PAGES.MAIN });
  }, [state])
  return (
    <div className="MainPage-root">
      <button onClick={handleBackClick}>back</button>
      Map
    </div>
  )
}

export const MapPage = withStore(_MapPage);
