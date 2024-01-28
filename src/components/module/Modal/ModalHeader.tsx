// material ui
import { IconButton } from '@mui/material';
// components
import Text from '@/components/common/Text';
import Pill from '@/components/common/Pill';
// const
import { BUTTON_LABEL, STATUS } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

export interface ModalHeaderProp {
	title: string;
	isLocate?: boolean;
	handleLocate?: () => void;
	pill?: STATUS;
	handleOnClose?: () => void;
}

export default function ModalHeader(props: ModalHeaderProp) {
	return (
		<div className="flex flex-row p-16 gap-16 items-center">
			<div className="flex flex-row gap-4">
				<Text style="text-black text-h3" content={props.title} />
				{props.isLocate && (
					<IconButton
						disableRipple
						className="p-none text-primary_blue disabled:text-light_text_grey"
						disabled={!props.handleLocate}
						onClick={props.handleLocate}
					>
						<IconMapper icon={BUTTON_LABEL.LOCATION} />
					</IconButton>
				)}
			</div>
			{props.pill && <Pill variant={props.pill} />}
			<div className="grow" />
			{props.handleOnClose && (
				<IconButton
					disableRipple
					className="p-none"
					onClick={props.handleOnClose}
				>
					<IconMapper icon={BUTTON_LABEL.CANCEL} />
				</IconButton>
			)}
		</div>
	);
}
