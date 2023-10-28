export interface TableHeaderProps<T> {
	id: keyof T | 'action' | 'heartbeat_action';
	label: string;
	align: 'right' | 'center' | 'left';
	isSorted?: boolean;
}

export interface TableRowProps {
	id: string;
	name: string;
}
