import PageTitle from '@/components/common/PageTitle';
import EmergencyState from '@/components/module/EmergencyState';
import { EMERGENCY_CARD_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { Stack } from '@mui/material';
export default function Home() {
	return (
		<>
			<Stack className="gap-16 ">
				<PageTitle title={NAVBAR_LABEL.EMERGENCY} />
				<Stack direction="row" className="gap-32 justify-center">
					{/* <EmergencyState title="PENDING" />
					<EmergencyState title="IN PROGRESS" />
					<EmergencyState title="COMPLETE" /> */}
				</Stack>
			</Stack>
		</>
	);
}
