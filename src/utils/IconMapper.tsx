import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';

import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';

interface IconMapperProps {
	icon: string;
	size?: '24px' | '48px';
}

export default function IconMapper(props: IconMapperProps) {
	switch (props.icon) {
		case NAVBAR_LABEL.DASHBOARD:
			return <InsertChartRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.OVERVIEW:
			return <PieChartRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.CAMERA:
			return <CameraAltRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.EMERGENCY:
			return (
				<NotificationsRoundedIcon sx={{ fontSize: props.size || '24px' }} />
			);
		case NAVBAR_LABEL.HEARTBEAT:
			return <FavoriteRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.ENTITY_MANAGEMENT:
			return <DescriptionRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.CARS:
			return (
				<DirectionsCarRoundedIcon sx={{ fontSize: props.size || '24px' }} />
			);
		case NAVBAR_LABEL.DRIVERS:
			return <PersonRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.CAMERAS:
			return <CameraAltRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case NAVBAR_LABEL.RSUS:
			return (
				<WifiTetheringRoundedIcon sx={{ fontSize: props.size || '24px' }} />
			);
		case NAVBAR_LABEL.EXPAND:
			return (
				<KeyboardDoubleArrowRightRoundedIcon
					sx={{ fontSize: props.size || '24px' }}
				/>
			);
		case NAVBAR_LABEL.COLLAPSE:
			return (
				<KeyboardDoubleArrowLeftRoundedIcon
					sx={{ fontSize: props.size || '24px' }}
				/>
			);
		case BUTTON_LABEL.CANCLE:
			return <CloseRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case BUTTON_LABEL.CLEAR:
			return <RefreshRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case BUTTON_LABEL.EDIT:
			return <EditRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case BUTTON_LABEL.REFRESH:
			return <CachedRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case BUTTON_LABEL.SEARCH:
			return <SearchRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case BUTTON_LABEL.DELETE:
			return (
				<DeleteOutlineRoundedIcon sx={{ fontSize: props.size || '24px' }} />
			);
		case BUTTON_LABEL.REGISTER:
			return <AddRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
		case BUTTON_LABEL.ZOOM:
			return <ZoomOutMapRoundedIcon sx={{ fontSize: props.size || '24px' }} />;
	}
}
