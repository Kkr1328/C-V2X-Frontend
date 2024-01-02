// react
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
// material ui
import { Card } from '@mui/material';
// components
import NoData from '@/components/common/NoData';
import Text from '@/components/common/Text';
import EmergencyCard from './EmergencyCard';
// types
import { Emergency, EmergencyColumn } from '@/types/COMMON';
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
						className={`w-full min-w-[336px] h-full ${
							snapshot.isDraggingOver ? 'bg-light_background_blue' : 'bg-white'
						} rounded-lg p-32`}
					>
						<div className="flex flex-col w-full h-full items-center">
							<div className="flex flex-row w-full">
								<Text
									style="text-dark_text_grey text-h3"
									content={props.title}
								/>
								<div className="grow" />
								<Text
									style="text-dark_text_grey text-h3"
									content={emergenciesCount.toString()}
								/>
							</div>
							{props.isLoading ? (
								<div className="flex flex-col w-full min-w-max h-full pb-8 overflow-y-auto">
									<EmergencyCard isLoading />
									<EmergencyCard isLoading />
									<EmergencyCard isLoading />
									<EmergencyCard isLoading />
								</div>
							) : (
								<div className="flex flex-col w-full min-w-max h-full pb-8 overflow-y-auto">
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
								</div>
							)}
						</div>
						{provided.placeholder}
					</Card>
				);
			}}
		</Droppable>
	);
}
