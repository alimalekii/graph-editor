import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '.';

export const useBDMDispatch = useDispatch.withTypes<AppDispatch>();
export const useBDMSelector = useSelector.withTypes<RootState>();
