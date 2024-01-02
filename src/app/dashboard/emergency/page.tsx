'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Stack } from '@mui/material';
import { useState } from 'react';
import EmergencyState from '@/components/module/Emergency/EmergencyState';
import {
	MockedCompleteEmergency,
	MockedInProgressEmergency,
	MockedPendingEmergency,
} from '@/mock/EMERGENCY';
import { EmergencyColumn } from '@/types/COMMON';
import EmergencyCard from '@/components/module/Emergency/EmergencyCard';

export default function Home() {
	const initialColumns = {
		pending: {
			id: 'pending',
			list: MockedPendingEmergency,
		},
		inProgress: {
			id: 'inProgress',
			list: MockedInProgressEmergency,
		},
		complete: {
			id: 'complete',
			list: MockedCompleteEmergency,
		},
	};

	const [columns, setColumns] = useState(initialColumns);

	const onDragEnd = ({ source, destination }: DropResult) => {
		// Make sure we have a valid destination
		if (destination === undefined || destination === null) return null;

		// Make sure we're actually moving the item
		if (
			source.droppableId === destination.droppableId &&
			destination.index === source.index
		)
			return null;

		// Set start and end variables
		const start = columns[source.droppableId as EmergencyColumn];
		const end = columns[destination.droppableId as EmergencyColumn];

		// If start is the same as end, we're in the same column
		if (start === end) {
			// Move the item within the list
			// Start by making a new list without the dragged item
			const newList = start.list.filter(
				(_: any, idx: number) => idx !== source.index
			);

			// Then insert the item at the right location
			newList.splice(destination.index, 0, start.list[source.index]);

			// Then create a new copy of the column object
			const newCol = {
				id: start.id,
				list: newList,
			};

			// Update the state
			setColumns((state) => ({ ...state, [newCol.id]: newCol }));
			return null;
		} else {
			// If start is different from end, we need to update multiple columns
			// Filter the start list like before
			const newStartList = start.list.filter(
				(_: any, idx: number) => idx !== source.index
			);

			// Create a new start column
			const newStartCol = {
				id: start.id,
				list: newStartList,
			};

			// Make a new end list array
			const newEndList = end.list;

			// Insert the item into the end list
			newEndList.splice(destination.index, 0, start.list[source.index]);

			// Create a new end column
			const newEndCol = {
				id: end.id,
				list: newEndList,
			};

			// Update the state
			setColumns((state) => ({
				...state,
				[newStartCol.id]: newStartCol,
				[newEndCol.id]: newEndCol,
			}));
			return null;
		}
	};

	return (
		<>
			<div className="flex flex-col w-full h-full gap-16">
				<PageTitle title={NAVBAR_LABEL.EMERGENCY} />
				<div className="grid lg:grid-cols-3 grid-cols-1 gap-32 w-full h-full">
					<DragDropContext onDragEnd={onDragEnd}>
						<EmergencyState
							title="PENDING"
							droppableId="pending"
							emergencies={columns.pending.list}
						/>
						<EmergencyState
							title="IN PROGRESS"
							droppableId="inProgress"
							emergencies={columns.inProgress.list}
						/>
						<EmergencyState
							title="COMPLETE"
							droppableId="complete"
							emergencies={columns.complete.list}
						/>
					</DragDropContext>
				</div>
			</div>
		</>
	);
}
