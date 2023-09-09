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
	isExpanded: boolean;
}

export default function NavbarMenu(props: NavbarMenuProps) {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<>
			<ListItemButton
				onClick={() => setOpen(!open)}
				className="px-24 py-16 gap-x-16 bg-light_background_grey
							hover:text-primary_blue hover:bg-light_background_blue">
				<IconMapper icon={props.option} />
				{props.isExpanded && (
					<>
						<ListItemText
							className="text-p2 truncate m-none"
							primary={props.option}
						/>
						{open ? <ExpandLess /> : <ExpandMore />}
					</>
				)}
			</ListItemButton>
			<Collapse in={props.isExpanded && open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{props.sub_options.map(({ label, route }) => (
						<ListItemButton
							className="px-24 py-16 pl-64 gap-x-16 bg-dark_background_grey 
										hover:text-primary_blue hover:bg-dark_background_blue">
							<IconMapper icon={label} />
							<ListItemText
								className="text-p2 truncate m-none"
								primary={label}
							/>
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
}
