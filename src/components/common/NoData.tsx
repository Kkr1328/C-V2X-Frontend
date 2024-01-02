import { BUTTON_LABEL } from '@/constants/LABEL';
import IconMapper from '@/utils/IconMapper';

interface NoDataProps {
	size?: 'small' | 'medium' | 'large';
}

export default function NoData(props: NoDataProps) {
	return (
		<div className="flex flex-col w-full h-full gap-4 text-black items-center justify-center">
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
		</div>
	);
}
