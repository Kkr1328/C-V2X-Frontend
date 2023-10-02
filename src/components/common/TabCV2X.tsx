import { Tab, Tabs } from '@mui/material';

interface TabCV2XProps {
	value: number;
	onChange: (newValue: number) => void;
	options: string[];
}

export default function TabCV2X(props: TabCV2XProps) {
	return (
		<Tabs
			value={props.value}
			onChange={(_: React.SyntheticEvent, newValue: number) =>
				props.onChange(newValue)
			}
			variant="fullWidth"
			className="rounded-t-sm px-8 bg-white min-h-24"
			sx={{
				minHeight: '24px !important',
				'& .MuiTab-root': {
					minHeight: '24px !important',
				},
				'& .MuiTabs-indicator': {
					backgroundColor: '#17A5D3 !important',
				},
			}}
		>
			{props.options.map((option) => (
				<Tab
					key={option}
					className="p-none m-none"
					sx={{
						fontFamily: ['var(--font-istok-web)'],
						fontWeight: '400px',
						fontSize: '10px',
						'&:hover': {
							color: '#17A5D3',
							opacity: 1,
						},
						'&.Mui-selected': {
							color: '#17A5D3',
						},
					}}
					label={option}
				/>
			))}
		</Tabs>
	);
}
