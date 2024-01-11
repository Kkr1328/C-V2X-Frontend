// components
import Text from './Text';
// utilities
import IconMapper from '@/utils/IconMapper';

interface PageTitleProp {
	title: string;
}

export default function PageTitle(props: PageTitleProp) {
	return (
		<div className="flex flex-row gap-16 items-center text-black">
			<IconMapper icon={props.title} size="48px" />
			<Text style="text-h2 text-black" content={props.title} />
		</div>
	);
}
