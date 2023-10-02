import { Card, Stack } from '@mui/material';
import NoData from '../common/NoData';

interface EmergencyStateProps {
	children?: React.ReactNode;
	isLoading?: boolean;
}

export default function EmergencyState(props: EmergencyStateProps) {
	return (
		<Card className="bg-white rounded-lg p-32 w-fit">
			<Stack className="gap-16 items-center">
				<Stack direction="row" className="w-full">
					<p className="inline-block align-baseline font-istok text-dark_text_grey text-h3">
						PENDING
					</p>
					<div className="grow" />
					<p className="inline-block align-baseline font-istok text-light_text_grey text-h3">
						7
					</p>
				</Stack>
				{props.children ? (
					props.children
				) : (
					<div className="w-300">
						<NoData />
					</div>
				)}
			</Stack>
		</Card>
	);
}
