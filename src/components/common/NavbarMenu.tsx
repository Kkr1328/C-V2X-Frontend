// react
import { useEffect, useState } from 'react';
// next
import { useRouter, usePathname } from 'next/navigation';
// material ui
import {
	Badge,
	Collapse,
	List,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// const
import { NAVBAR_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

interface MenuOptionProps {
	label: string;
	route: string;
}

interface NavbarMenuProps {
	isExpanded: boolean;
	handleExpand: () => void;
	option: MenuOptionProps;
	subOptions: MenuOptionProps[];
	emergencyNotification?: Number;
}

export default function NavbarMenu(props: NavbarMenuProps) {
	const router = useRouter();
	const pathname = usePathname();

	const [openSubOptions, setOpenSubOptions] = useState<boolean>(false);
	const handleOpenSubOptions = () => setOpenSubOptions(true);
	const handleToggleSubOptions = () => setOpenSubOptions(!openSubOptions);

	useEffect(() => {
		if (!props.isExpanded) setOpenSubOptions(false);
	}, [props.isExpanded]);

	return (
		<>
			{/* option */}
			<ListItemButton
				onClick={() => {
					if (props.isExpanded) {
						handleToggleSubOptions();
					} else {
						props.handleExpand();
						handleOpenSubOptions();
					}
				}}
				className={`px-24 py-16 gap-x-16 border-b border-solid
				${
					pathname.includes(props.option.route)
						? 'border-primary_blue text-primary_blue bg-light_background_blue'
						: 'bg-white'
				}
				hover:border-blue hover:text-primary_blue hover:bg-light_background_blue `}
			>
				<Badge
					badgeContent={props.emergencyNotification as React.ReactNode}
					color="error"
				>
					<IconMapper icon={props.option.label} />
				</Badge>
				{props.isExpanded && (
					<>
						<ListItemText
							className="text-p2 truncate m-none"
							primary={props.option.label}
						/>
						{openSubOptions ? <ExpandLess /> : <ExpandMore />}
					</>
				)}
			</ListItemButton>

			{/* sub_options */}
			<Collapse
				in={props.isExpanded && openSubOptions}
				timeout="auto"
				unmountOnExit
			>
				<List component="div" disablePadding>
					{props.subOptions.map(({ label, route }) => (
						<ListItemButton
							key={label}
							className={`px-24 py-16 pl-64 gap-x-16 border-b border-black
								${
									pathname === route
										? 'text-primary_blue bg-dark_background_blue'
										: 'bg-dark_background_grey'
								}
								hover:text-primary_blue hover:bg-dark_background_blue`}
							onClick={() => router.push(route)}
						>
							{label === NAVBAR_LABEL.EMERGENCY ? (
								<Badge
									badgeContent={props.emergencyNotification as React.ReactNode}
									color="error"
								>
									<IconMapper icon={label} />
								</Badge>
							) : (
								<IconMapper icon={label} />
							)}
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
