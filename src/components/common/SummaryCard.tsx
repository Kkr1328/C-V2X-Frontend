// material ui
import { Card, Divider, Skeleton } from '@mui/material';
// components
import Text from './Text';

interface SummaryCardProps {
	title: string;
	value: string;
	isLoading?: boolean;
}

export default function SummaryCard(props: SummaryCardProps) {
	return props.isLoading ? (
		<Skeleton
			animation="wave"
			variant="rectangular"
			className="rounded-lg h-120 w-full min-w-[232px]"
		/>
	) : (
		<Card className="rounded-lg py-8 gap-12 w-full min-w-[232px]">
			<div className="flex flex-col gap-12">
				<Text
					style="text-dark_text_grey text-h5 text-center"
					content={props.title}
				/>
				<Divider />
				<Text
					style="text-primary_blue text-h1 text-center"
					content={props.value}
				/>
			</div>
		</Card>
	);
}
