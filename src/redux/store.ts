import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
	TypedUseSelectorHook,
} from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './rootReducer';

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
	});
}
const store = setupStore();

// enable listener behavior for the store
setupListeners(store.dispatch);
export type AppStore = ReturnType<typeof setupStore>;

type AppDispatch = AppStore['dispatch'];
const useDispatch: () => AppDispatch = useReduxDispatch;
type RootState = ReturnType<typeof rootReducer>;
const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export { store, useSelector, useDispatch };
