import { Card, Stack } from '@mui/material';
import NoData from '../common/NoData';
import EmergencyCard from '../common/EmergencyCard';
import { Emergency } from '@/types/COMMON';

interface EmergencyStateProps {
	title: Emergency;
	children?: React.ReactNode;
	isLoading?: boolean;
}

export default function EmergencyState(props: EmergencyStateProps) {
	return (
		<Card className="h-[calc(100vh-192px)] bg-white rounded-lg p-32 w-fit">
			<Stack className="gap-16 items-center h-full">
				<Stack direction="row" className="w-full">
					<p className="inline-block align-baseline font-istok text-dark_text_grey text-h3">
						{props.title}
					</p>
					<div className="grow" />
					<p className="inline-block align-baseline font-istok text-light_text_grey text-h3">
						7
					</p>
				</Stack>
				{props.isLoading ? (
					<Stack className="gap-16 items-center h-full overflow-y-auto">
						{/* <EmergencyCard isLoading={true} />
						<EmergencyCard isLoading={true} />
						<EmergencyCard isLoading={true} />
						<EmergencyCard isLoading={true} />
						<EmergencyCard isLoading={true} /> */}
						<EmergencyCard carName="hihi" driverPhoneNo="ksldfjklsdf" />
						<EmergencyCard carName="hihi" driverPhoneNo="ksldfjklsdf" />
						<EmergencyCard carName="hihi" driverPhoneNo="ksldfjklsdf" />
						<EmergencyCard carName="hihi" driverPhoneNo="ksldfjklsdf" />
						<EmergencyCard carName="hihi" driverPhoneNo="ksldfjklsdf" />
						<EmergencyCard carName="hihi" driverPhoneNo="ksldfjklsdf" />
					</Stack>
				) : props.children ? (
					props.children
				) : (
					<div className="w-300 h-full flex items-center">
						<NoData />
					</div>
				)}
			</Stack>
		</Card>
	);
}
