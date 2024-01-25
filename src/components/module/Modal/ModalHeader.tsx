// material ui
import { IconButton } from '@mui/material';
// components
import Text from '@/components/common/Text';
// const
import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';
import Pill from '@/components/common/Pill';

export interface ModalHeaderProp {
	title: string;
	handleLocate?: () => void;
	pill?: PILL_LABEL;
	handleOnClose?: () => void;
	isLoading?: boolean;
}

export default function ModalHeader(props: ModalHeaderProp) {
	return (
		<div className="flex flex-row p-16 gap-16 items-center">
			<div className="flex flex-row gap-4">
				<Text style="text-black text-h3" content={props.title} />
				{props.handleLocate && (
					<IconButton
						disableRipple
						className="p-none text-primary_blue"
						disabled={props.isLoading}
						onClick={props.handleLocate}
					>
						<IconMapper icon={BUTTON_LABEL.LOCATION} />
					</IconButton>
				)}
			</div>
			{!props.isLoading && props.pill && <Pill variant={props.pill} />}
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
