import { Card, Divider, Skeleton, Stack } from '@mui/material';

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
			className="rounded-lg h-[121.59px] w-full"
		/>
	) : (
		<Card className="rounded-lg py-8 gap-12 w-full">
			<Stack className="gap-12">
				<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 text-center">
					{props.title}
				</p>
				<Divider />
				<p className="inline-block align-baseline font-istok text-primary_blue text-h1 text-center">
					{props.value}
				</p>
			</Stack>
		</Card>
	);
}
