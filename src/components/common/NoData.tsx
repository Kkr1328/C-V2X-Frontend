import { BUTTON_LABEL } from '@/constants/LABEL';
import IconMapper from '@/utils/IconMapper';
import { Stack } from '@mui/material';

interface NoDataProps {
	size?: 'small' | 'medium' | 'large';
}

export default function NoData(props: NoDataProps) {
	return (
		<div className="flex w-full h-full items-center justify-center">
			<Stack className="gap-4 text-black">
				<div className="self-center">
					<IconMapper
						icon={BUTTON_LABEL.NO_DATA}
						size={
							props.size === 'medium'
								? '36px'
								: props.size === 'large'
								? '48px'
								: '24px'
						}
					/>
				</div>
				<p
					className={`self-center inline-block align-baseline font-istok text-black ${
						props.size === 'medium'
							? 'text-h4'
							: props.size === 'large'
							? 'text-h3'
							: 'text-h5'
					}`}
				>
					{BUTTON_LABEL.NO_DATA}
				</p>
			</Stack>
		</div>
	);
}
