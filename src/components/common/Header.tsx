// next
import Image from 'next/image';
// meterial ui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Header() {
	return (
		<AppBar className="z-20 fixed bg-black">
			<Toolbar>
				<Image src="/logo.svg" alt="C-V2X logo" width={140} height={40} />
			</Toolbar>
		</AppBar>
	);
}
