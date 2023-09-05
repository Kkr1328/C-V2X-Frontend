'use client';

import React from 'react';

import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import IconMapper from '@/utils/IconMapper';

interface MenuOptionProps {
	label: string;
	route: string;
}

interface NavbarMenuProps {
	option: string;
	sub_options: MenuOptionProps[];
	focused_option?: string;
}

export default function NavbarMenu(props: NavbarMenuProps) {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<>
			<ListItemButton
				onClick={() => setOpen(!open)}
				className="px-24 py-16 gap-x-16">
				<IconMapper icon={props.option} />
				<ListItemText className="text-p2" primary={props.option} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{props.sub_options.map(({ label, route }) => (
						<ListItemButton className="px-24 py-16 pl-64 gap-x-16">
							<IconMapper icon={label} />
							<ListItemText className="text-p2" primary={label} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
}
