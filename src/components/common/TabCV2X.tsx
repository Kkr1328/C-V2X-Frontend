// material ui
import { Tab, Tabs } from '@mui/material';

interface TabCV2XProps {
	value: number;
	options: string[];
	onChange: (newValue: number) => void;
	size?: 'small' | 'large';
}

export default function TabCV2X(props: TabCV2XProps) {
	return (
		<Tabs
			value={props.value}
			onChange={(_: React.SyntheticEvent, newValue: number) =>
				props.onChange(newValue)
			}
			variant="fullWidth"
			className="rounded-t-sm px-8 bg-white"
			sx={{
				minHeight: props.size === 'large' ? '32px' : '24px',
				'& .MuiTab-root': {
					minHeight: props.size === 'large' ? '32px' : '24px',
				},
				'& .MuiTabs-indicator': {
					backgroundColor: '#17A5D3',
				},
			}}
		>
			{props.options.map((option) => (
				<Tab
					key={option}
					className="p-none m-none"
					sx={{
						minWidth: 0,
						fontFamily: ['var(--font-istok-web)'],
						fontWeight: '400px',
						fontSize: props.size === 'large' ? '16px' : '10px',
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
