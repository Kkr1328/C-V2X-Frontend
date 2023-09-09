'use client';

import { Drawer, List, Toolbar } from '@mui/material';

import NavbarMenu from '../common/NavbarMenu';

import { NAVBAR_LABEL } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';

export default function Navbar() {
	return (
		<Drawer
			variant="permanent"
			className="z-10 w-280 shrink-0 bg-white"
			sx={{
				[`& .MuiDrawer-paper`]: { width: '280px', boxSizing: 'border-box' },
			}}>
			<Toolbar />
			<List className="w-full bg-white">
				<NavbarMenu
					option={NAVBAR_LABEL.DASHBOARD}
					sub_options={[
						{
							label: NAVBAR_LABEL.OVERVIEW,
							route: ROUTE.OVERVIEW,
						},
						{
							label: NAVBAR_LABEL.CAMERA,
							route: ROUTE.CAMERA,
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
				/>
				<NavbarMenu
					option={NAVBAR_LABEL.ENTITY_MANAGEMENT}
					sub_options={[
						{
							label: NAVBAR_LABEL.CARS,
							route: ROUTE.CARS,
						},
						{
							label: NAVBAR_LABEL.DRIVERS,
							route: ROUTE.DRIVERS,
						},
						{
							label: NAVBAR_LABEL.CAMERAS,
							route: ROUTE.CAMERAS,
						},
						{
							label: NAVBAR_LABEL.RSUS,
							route: ROUTE.RSUS,
						},
					]}
				/>
			</List>
		</Drawer>
	);
}
