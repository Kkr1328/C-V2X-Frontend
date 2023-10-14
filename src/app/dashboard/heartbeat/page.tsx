import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import StatusDot from '@/components/common/StatusDot';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { StatusDotType } from '@/types/COMMON';
import { Card, Divider, Stack } from '@mui/material';

export default function Home() {
	return (
		<>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.HEARTBEAT} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Stack direction="row" className="gap-16 items-center">
							{StatusDotType.map((status, index) => (
								<Stack direction="row" key={index}>
									<StatusDot variant={status} />
									<p>&nbsp;-&nbsp;{status}</p>
								</Stack>
							))}
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
							/>
						</Stack>
						<Divider />
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
