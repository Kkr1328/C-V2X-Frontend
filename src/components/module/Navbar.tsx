'use client';
// react
import React from 'react';
// material ui
import { Drawer, List, ListItemButton, Toolbar } from '@mui/material';
// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import NavbarMenu from '../common/NavbarMenu';
// services
import { getEmergencyListAPI } from '@/services/api-call';
// types
import { IEmergency } from '@/types/models/emergency.model';
// consts
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';
// utilities
import IconMapper from '@/utils/IconMapper';

export default function Navbar() {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

	const handleExpand = () => setIsExpanded(true);
	const handleToggleExpand = () => setIsExpanded(!isExpanded);

	const { data: dataGetEmergencyList } = useQuery({
		queryKey: ['getEmergencyList'],
		queryFn: async () => await getEmergencyListAPI(),
	});

	return (
		<Drawer
			variant="permanent"
			className={`z-10 ${
				isExpanded ? 'w-280' : 'w-72'
			} flex shrink-0 bg-white transition-all`}
			sx={{
				[`& .MuiDrawer-paper`]: {
					width: isExpanded ? '280px' : '72px',
					boxSizing: 'border-box',
					transitionProperty: 'all',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
					transitionDuration: '150ms',
				},
			}}
		>
			<Toolbar />
			<List className="w-full h-full p-none bg-white">
				<NavbarMenu
					isExpanded={isExpanded}
					handleExpand={handleExpand}
					option={{
						label: NAVBAR_LABEL.DASHBOARD,
						route: ROUTE.DASHBOARD,
					}}
					subOptions={[
						{
							label: NAVBAR_LABEL.OVERVIEW,
							route: ROUTE.OVERVIEW,
						},
						{
							label: NAVBAR_LABEL.CAMERA,
							route: ROUTE.CAMERA,
						},
						{
							label: NAVBAR_LABEL.PANOPTIC,
							route: ROUTE.PANOPTIC,
						},
						{
							label: NAVBAR_LABEL.EMERGENCY,
							route: ROUTE.EMERGENCY,
						},
						{
							label: NAVBAR_LABEL.HEARTBEAT,
							route: ROUTE.HEARTBEAT,
						},
					]}
					emergencyNotification={
						dataGetEmergencyList?.filter(
							(e: IEmergency) => e.status === 'pending'
						).length || 0
					}
				/>
				<NavbarMenu
					isExpanded={isExpanded}
					handleExpand={handleExpand}
					option={{
						label: NAVBAR_LABEL.ENTITY_MANAGEMENT,
						route: ROUTE.ENTITY_MANAGEMENT,
					}}
					subOptions={[
						{
							label: NAVBAR_LABEL.CARS,
							route: ROUTE.CARS,
						},
						{
							label: NAVBAR_LABEL.CAMERAS,
							route: ROUTE.CAMERAS,
						},
						{
							label: NAVBAR_LABEL.DRIVERS,
							route: ROUTE.DRIVERS,
						},
						{
							label: NAVBAR_LABEL.RSUS,
							route: ROUTE.RSUS,
						},
					]}
				/>
			</List>
			<ListItemButton
				className="w-full px-24 py-16 justify-center self-end
							hover:text-primary_blue hover:bg-light_background_blue"
				onClick={handleToggleExpand}
			>
				<IconMapper
					icon={isExpanded ? NAVBAR_LABEL.COLLAPSE : NAVBAR_LABEL.EXPAND}
				/>
			</ListItemButton>
		</Drawer>
	);
}
