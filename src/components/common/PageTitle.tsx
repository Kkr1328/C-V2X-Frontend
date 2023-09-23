import { Stack } from '@mui/material';

import IconMapper from '@/utils/IconMapper';

interface PageTitleProp {
	title: string;
}

export default function PageTitle(props: PageTitleProp) {
	return (
		<Stack direction="row" className="gap-16 items-center text-black">
			<IconMapper icon={props.title} size="48px" />
			<p className="font-istok text-h2 text-black">{props.title}</p>
		</Stack>
	);
}
