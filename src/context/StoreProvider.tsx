'use client';

import React, { ReactNode } from 'react';
//redux
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';

interface StoreProviderProps {
	children: ReactNode;
}

function StoreProvider({ children }: StoreProviderProps) {
	return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

export default StoreProvider;
