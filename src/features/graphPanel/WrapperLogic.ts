import { useEffect } from 'react';
import { useBDMDispatch, useBDMSelector } from '@/lib/store/hooks';
import { selectSelected, myCustomGraphAction } from './slice';

import { activeGraph } from './mock';
const graph = activeGraph();

const useGraphSettingsWrapper = () => {
  const dispatch = useBDMDispatch();
  const selected = useBDMSelector(selectSelected);

  useEffect(() => {
    dispatch(myCustomGraphAction(graph as any));
  }, [dispatch]);

  return { showSidebar: !!selected };
};

export default useGraphSettingsWrapper;
