'use client';

import { useState } from 'react';

import { Grid } from '@mui/material';

import PageTitle from '@/components/common/PageTitle';
import CarCameraCard from '@/components/module/CarCameraCard';

import { NAVBAR_LABEL, PILL_LABEL } from '@/constants/LABEL';

const MockedCarCamerasContent = [
	{
		name: 'Car01',
		status: 'ACTIVE',
		cameras: [
			{ name: 'Cam01', position: 'Front', status: PILL_LABEL.ACTIVE },
			{ name: 'Cam02', position: 'Back', status: PILL_LABEL.ACTIVE },
		],
	},
	{
		name: 'Car02',
		status: 'ACTIVE',
		cameras: [
			{ name: 'Cam01', position: 'Front', status: PILL_LABEL.ACTIVE },
			{ name: 'Cam02', position: 'Back', status: PILL_LABEL.ACTIVE },
		],
	},
	{
		name: 'Car03',
		status: 'ACTIVE',
		cameras: [
			{ name: 'Cam01', position: 'Front', status: PILL_LABEL.ACTIVE },
			{ name: 'Cam02', position: 'Back', status: PILL_LABEL.ACTIVE },
		],
	},
	{
		name: 'Car04',
		status: 'ACTIVE',
		cameras: [
			{ name: 'Cam01', position: 'Front', status: PILL_LABEL.ACTIVE },
			{ name: 'Cam02', position: 'Back', status: PILL_LABEL.ACTIVE },
		],
	},
];

export default function Home() {
	// gonna fix later
	const [locate, setLocate] = useState(true);
	const onchange = () => {
		setLocate(true);
	};
	return (
		<>
			<PageTitle title={NAVBAR_LABEL.CAMERA} />
			<Grid container spacing={2}>
				{MockedCarCamerasContent.map((data) => (
					<Grid item sm={6} xs={12}>
						<CarCameraCard
							carName={data.name}
							cameraInfos={data.cameras}
							carStatus={PILL_LABEL.ACTIVE}
							handleLocate={onchange} // gonna fix later
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
}
