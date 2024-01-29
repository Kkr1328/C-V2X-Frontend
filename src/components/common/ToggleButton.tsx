// material ui
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// components
import Text from './Text';
import Popper from './Popper';
// const
import { STATUS } from '@/constants/LABEL';
import { STATUS_DEFINITION } from '@/constants/DEFINITION';

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
						className="p-8 px-24 w-full border-1 border-dark_text_grey hover:bg-light_background_blue focus:bg-light_background_blue focus:hover:bg-dark_background_blue flex items-center"
						sx={{ margin: '0px !important' }}
					>
						<div className="flex-1 text-center">
							<Text style={textStyle} content={option} />
						</div>
						{option !== STATUS.ALL && (
							<div className="absolute right-8 -top-2">
								<Popper
									title={option}
									content={STATUS_DEFINITION[option as STATUS]}
								/>
							</div>
						)}
					</MuiToggleButton>
				);
			})}
		</MuiToggleButtonGroup>
	);
}
