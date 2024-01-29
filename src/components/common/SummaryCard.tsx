// material ui
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
// components
import Text from './Text';

interface SummaryCardProps {
	title: string;
	value: string;
	isLoading?: boolean;
}

export default function SummaryCard(props: SummaryCardProps) {
	if (props.isLoading)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				className="rounded-lg h-120 w-full"
			/>
		);

	return (
		<Card className="flex flex-col rounded-lg py-8 gap-12 w-full">
			<Text
				style="text-dark_text_grey text-h5 text-center"
				content={props.title}
			/>
			<Divider />
			<Text
				style="text-primary_blue text-h1 text-center"
				content={props.value}
			/>
		</Card>
	);
}
