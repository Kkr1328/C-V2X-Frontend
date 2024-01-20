// material ui
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
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
// const
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';

interface IconMapperProps {
	icon: string;
	size?: '16px' | '24px' | '36px' | '48px';
}

export default function IconMapper(props: IconMapperProps) {
	const iconStyle = { fontSize: props.size || '24px' };

	switch (props.icon) {
		case NAVBAR_LABEL.DASHBOARD:
			return <InsertChartRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.OVERVIEW:
			return <PieChartRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.CAMERA:
			return <CameraAltRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.EMERGENCY:
			return <NotificationsRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.HEARTBEAT:
			return <FavoriteRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.ENTITY_MANAGEMENT:
			return <DescriptionRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.CARS:
			return <DirectionsCarRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.DRIVERS:
			return <PersonRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.CAMERAS:
			return <CameraAltRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.RSUS:
			return <WifiTetheringRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.EXPAND:
			return <KeyboardDoubleArrowRightRoundedIcon sx={iconStyle} />;
		case NAVBAR_LABEL.COLLAPSE:
			return <KeyboardDoubleArrowLeftRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.CANCEL:
			return <CloseRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.CLEAR:
			return <RefreshRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.UPDATE:
			return <EditRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.REFRESH:
			return <CachedRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.SEARCH:
			return <SearchRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.DELETE:
			return <DeleteOutlineRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.REGISTER:
			return <AddRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.ZOOM:
			return <ZoomOutMapRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.MISSING:
			return <RemoveRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.LOCATION:
			return <LocationOnRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.STATUS:
			return <CircleRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.NO_DATA:
			return <HighlightOffRoundedIcon sx={iconStyle} />;
		case BUTTON_LABEL.VISIBLE:
			return <Visibility sx={iconStyle} />;
		case BUTTON_LABEL.INVISIBLE:
			return <VisibilityOff sx={iconStyle} />;
		case BUTTON_LABEL.HELP:
			return <HelpOutlineRoundedIcon sx={iconStyle} />;
	}
}
