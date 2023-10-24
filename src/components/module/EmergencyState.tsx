import { Card, Stack } from '@mui/material';
import NoData from '../common/NoData';
import { Emergency, EmergencyColumn } from '@/types/COMMON';
import { Droppable } from 'react-beautiful-dnd';
import React, { Fragment } from 'react';
import EmergencyCard from '../common/EmergencyCard';
import { IEmergency } from '@/types/models/emergency.model';

interface EmergencyStateProps {
	droppableId: EmergencyColumn;
	title: Emergency;
	emergencies: IEmergency[];
	isLoading?: boolean;
}

export default function EmergencyState(props: EmergencyStateProps) {
	const emergenciesCount = props.emergencies.length;

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
									{emergenciesCount}
								</p>
							</Stack>
							{props.isLoading ? (
								<Stack className="items-center h-full overflow-y-auto">
									<EmergencyCard isLoading={true} />
									<EmergencyCard isLoading={true} />
									<EmergencyCard isLoading={true} />
									<EmergencyCard isLoading={true} />
								</Stack>
							) : (
								<Stack className="w-300 h-full flex items-center pb-8 overflow-y-auto">
									{emergenciesCount === 0 && <NoData />}
									{props.emergencies.map((emergency, index) => {
										return (
											<EmergencyCard
												key={emergency.id}
												id={emergency.id}
												index={index}
												carName={emergency.carName}
												time={emergency.time}
												driverPhoneNo={emergency.driverPhoneNo}
												state={props.title}
											/>
										);
									})}
								</Stack>
							)}
						</Stack>
						{provided.placeholder}
					</Card>
				);
			}}
		</Droppable>
	);
}
