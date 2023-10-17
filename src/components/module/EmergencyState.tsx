import { Card, Stack } from '@mui/material';
import NoData from '../common/NoData';
import { Emergency, EmergencyColumn } from '@/types/COMMON';
import { Droppable } from 'react-beautiful-dnd';
import React from 'react';
import EmergencyCard from '../common/EmergencyCard';

interface EmergencyStateProps {
	droppableId: EmergencyColumn;
	title: Emergency;
	children?: React.ReactNode;
	isLoading?: boolean;
}

export default function EmergencyState(props: EmergencyStateProps) {
	const childrenCount = React.Children.toArray(props.children).length;

	return (
		<Droppable key={props.title} droppableId={props.droppableId}>
			{(provided, snapshot) => {
				return (
					<Card
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`h-[calc(100vh-192px)] ${
							snapshot.isDraggingOver ? 'bg-light_background_blue' : 'bg-white'
						} rounded-lg p-32 w-fit`}
					>
						<Stack className="items-center h-full">
							<Stack direction="row" className="w-full">
								<p className="inline-block align-baseline font-istok text-dark_text_grey text-h3">
									{props.title}
								</p>
								<div className="grow" />
								<p className="inline-block align-baseline font-istok text-light_text_grey text-h3">
									{childrenCount}
								</p>
							</Stack>
							{props.isLoading ? (
								<Stack className="items-center h-full overflow-y-auto">
									<EmergencyCard isLoading={true} />
									<EmergencyCard isLoading={true} />
									<EmergencyCard isLoading={true} />
									<EmergencyCard isLoading={true} />
								</Stack>
							) : childrenCount === 0 ? (
								<div className="w-300 h-full flex items-center">
									<NoData />
								</div>
							) : (
								props.children
							)}
						</Stack>
						{provided.placeholder}
					</Card>
				);
			}}
		</Droppable>
	);
}
