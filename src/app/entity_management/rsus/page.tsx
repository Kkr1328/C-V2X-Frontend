import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { RSUFilterTemplate } from '@/constants/TEMPLATE';
import { Card, Divider, Stack } from '@mui/material';

export default function Home() {
	return (
		<Stack className="gap-16">
			<PageTitle title={NAVBAR_LABEL.RSUS} />
			<Card className="w-full h-full rounded-lg px-32 py-24">
				<Stack className="gap-16">
					<Filter template={RSUFilterTemplate} />
					<Divider />
					<Stack direction="row" className="gap-8">
						<p className="text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
						<div className="grow" />
						<ButtonCV2X
							icon={BUTTON_LABEL.REGISTER}
							label={BUTTON_LABEL.REGISTER_RSU}
							variant="contained"
						/>
						<ButtonCV2X
							icon={BUTTON_LABEL.REFRESH}
							label={BUTTON_LABEL.REFRESH}
							variant="outlined"
						/>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}
