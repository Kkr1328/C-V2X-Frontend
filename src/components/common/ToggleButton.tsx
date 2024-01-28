// material ui
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// components
import Text from './Text';

interface ToggleButtonProps {
	options: string[];
	value: string;
	onChange: (event: React.MouseEvent<HTMLElement>, value: string) => void;
}

export default function ToggleButton(props: ToggleButtonProps) {
	return (
		<MuiToggleButtonGroup
			exclusive
			value={props.value}
			onChange={props.onChange}
			className="rounded-sm w-full h-24"
		>
			{props.options.map((option, index) => {
				const textStyle =
					props.value === option
						? 'text-primary_blue text-p3'
						: 'text-dark_text_grey text-p3';
				return (
					<MuiToggleButton
						key={index}
						value={option}
						className="p-4 w-full border-1 border-dark_text_grey hover:bg-light_background_blue focus:bg-light_background_blue focus:hover:bg-dark_background_blue"
						sx={{ margin: '0px !important' }}
					>
						<Text style={textStyle} content={option} />
					</MuiToggleButton>
				);
			})}
		</MuiToggleButtonGroup>
	);
}
