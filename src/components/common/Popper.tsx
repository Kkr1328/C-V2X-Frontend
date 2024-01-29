// react
import { useRef, useState } from 'react';
// material ui
import MuiPopper from '@mui/material/Popper';
import Divider from '@mui/material/Divider';
// components
import Text from '@/components/common/Text';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

interface PopperProps {
	title: string;
	content: string;
}

export default function Popper(props: PopperProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handlePopoverOpen = () => {
		setOpen(true);
	};

	const handlePopoverClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div
				ref={anchorRef}
				className="text-light_text_grey"
				style={{ display: 'inline-block' }}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				<IconMapper icon={BUTTON_LABEL.HELP} size="16px" />
			</div>
			<MuiPopper
				placement="bottom-end"
				disablePortal={false}
				open={open}
				anchorEl={anchorRef.current}
				modifiers={[
					{
						name: 'flip',
						enabled: true,
						options: {
							altBoundary: true,
							rootBoundary: 'document',
							padding: 8,
						},
					},
					{
						name: 'preventOverflow',
						enabled: true,
						options: {
							altAxis: true,
							altBoundary: true,
							tether: true,
							rootBoundary: 'document',
							padding: 8,
						},
					},
				]}
				className="z-10"
			>
				<div className="flex flex-col max-w-[200px] border-[1px] border-dark_background_grey bg-light_background_grey rounded-sm items-center justify-items-start">
					<Text
						style="text-p2 text-black bg-light_background_grey w-full px-8 rounded-t-sm"
						content={props.title}
					/>
					<Divider />
					<Text
						style="text-p2 text-dark_text_grey bg-white w-full px-8 rounded-b-sm"
						isSentence
						content={props.content}
					/>
				</div>
			</MuiPopper>
		</>
	);
}
