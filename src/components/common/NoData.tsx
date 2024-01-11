// consts
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

interface NoDataProps {
	size?: 'small' | 'medium' | 'large';
}

export default function NoData(props: NoDataProps) {
	const getSize = () => {
		switch (props.size) {
			case 'medium':
				return '36px';
			case 'large':
				return '48px';
			default:
				return '24px';
		}
	};

	const textSizeClass = () => {
		switch (props.size) {
			case 'medium':
				return 'text-h4';
			case 'large':
				return 'text-h3';
			default:
				return 'text-h5';
		}
	};

	return (
		<div className="flex flex-col w-full h-full gap-4 text-black items-center justify-center">
			<div className="self-center">
				<IconMapper icon={BUTTON_LABEL.NO_DATA} size={getSize()} />
			</div>
			<p
				className={`self-center inline-block align-baseline font-istok text-black ${textSizeClass()}`}
			>
				{BUTTON_LABEL.NO_DATA}
			</p>
		</div>
	);
}
