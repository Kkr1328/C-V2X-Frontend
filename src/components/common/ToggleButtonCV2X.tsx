// material ui
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface ToggleButtonCV2XProps {
	options: string[];
	value: string;
	onChange: (event: React.MouseEvent<HTMLElement>, value: any) => void;
}

export default function ToggleButtonCV2X(props: ToggleButtonCV2XProps) {
	return (
		<ToggleButtonGroup
			exclusive
			value={props.value}
			onChange={props.onChange}
			className="rounded-sm w-full h-24"
		>
			{props.options.map((option, index) => (
				<ToggleButton
					key={index}
					value={option}
					className="p-4 w-full border-1 border-dark_text_grey hover:bg-light_background_blue focus:bg-light_background_blue focus:hover:bg-dark_background_blue"
					sx={{ margin: '0px !important' }}
				>
					<p
						className={`inline-block align-baseline font-istok ${
							props.value === option
								? 'text-primary_blue'
								: 'text-dark_text_grey'
						} text-p3`}
					>
						{option}
					</p>
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
