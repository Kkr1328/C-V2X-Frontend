import { NAVBAR_LABEL } from '@/constants/PAGE';

import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

interface IconMapperProps {
	icon: string;
}

export default function IconMapper(props: IconMapperProps) {
	switch (props.icon) {
		case NAVBAR_LABEL.DASHBOARD:
			return <InsertChartRoundedIcon />;
		case NAVBAR_LABEL.OVERVIEW:
			return <PieChartRoundedIcon />;
		case NAVBAR_LABEL.CAMERA:
			return <CameraAltRoundedIcon />;
		case NAVBAR_LABEL.EMERGENCY:
			return <NotificationsRoundedIcon />;
		case NAVBAR_LABEL.ENTITY_MANAGEMENT:
			return <DescriptionRoundedIcon />;
		case NAVBAR_LABEL.CARS:
			return <DirectionsCarRoundedIcon />;
		case NAVBAR_LABEL.DRIVERS:
			return <PersonRoundedIcon />;
	}
}
