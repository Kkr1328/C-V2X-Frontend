'use client';

import { Drawer, List, Toolbar } from '@mui/material';
import NavbarMenu from '../common/NavbarMenu';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';

export default function Navbar() {
	return (
		<Drawer
			variant="permanent"
			className="z-10 bg-white"
			sx={{
				[`& .MuiDrawer-paper`]: { width: '240', boxSizing: 'border-box' },
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
					]}
				/>
			</List>
		</Drawer>
	);
}
