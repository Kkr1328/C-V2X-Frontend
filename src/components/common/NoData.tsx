// components
import Text from './Text';
// consts
import { BUTTON_LABEL } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

interface NoDataProps {
	size?: 'small' | 'medium' | 'large';
}

export default function NoData(props: NoDataProps) {
	const iconSize =
		props.size === 'large' ? '48px' : props.size === 'medium' ? '36px' : '24px';

	const textStyle =
		props.size === 'large'
			? 'text-black text-h3'
			: props.size === 'medium'
			? 'text-black text-h4'
			: 'text-black text-h5';

	return (
		<div className="flex flex-col w-full h-full gap-4 text-black items-center justify-center">
			<div className="self-center">
				<IconMapper icon={BUTTON_LABEL.NO_DATA} size={iconSize} />
			</div>
			<Text style={textStyle} content={BUTTON_LABEL.NO_DATA} />
		</div>
	);
}
