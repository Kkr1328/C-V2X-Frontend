// material ui
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';

interface TabProps {
	children?: React.ReactElement;
	value: number;
	options: string[];
	onChange: (newValue: number) => void;
	size?: 'small' | 'large';
}

export default function Tab(props: TabProps) {
	return (
		<MuiTabs
			value={props.value}
			onChange={(_: React.SyntheticEvent, newValue: number) =>
				props.onChange(newValue)
			}
			variant="fullWidth"
			className="rounded-t-sm px-8 bg-light_background_grey"
			sx={{
				minHeight: props.size === 'large' ? '28px' : '24px',
				'& .MuiTab-root': {
					minHeight: props.size === 'large' ? '28px' : '24px',
				},
				'& .MuiTabs-indicator': {
					backgroundColor: '#17A5D3',
				},
			}}
		>
			{props.options.map((option) => (
				<MuiTab
					key={option}
					className="p-none m-none"
					sx={{
						minWidth: 0,
						fontFamily: ['var(--font-istok-web)'],
						fontWeight: '400px',
						fontSize: props.size === 'large' ? '14px' : '10px',
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
		</MuiTabs>
	);
}
