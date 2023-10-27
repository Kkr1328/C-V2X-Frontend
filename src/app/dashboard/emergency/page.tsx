'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import EmergencyState from '@/components/module/EmergencyState';
import { EmergencyColumn } from '@/types/COMMON';
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetEmergencies } from '@/redux/get-emergencies/get-emergencies-selector';
import { FETCH_GET_EMERGENCIES } from '@/redux/get-emergencies/get-emergencies-action';
import { IEmergency } from '@/types/models/emergency.model';
import { FETCH_UPDATE_EMERGENCY } from '@/redux/update-emergency/update-emergency-action';

export default function Home() {
	const dispatch = useDispatch();

	const { data: emergencies, loading: emergenciesLoading } =
		useSelector(selectGetEmergencies);

	useEffect(() => {
		dispatch(FETCH_GET_EMERGENCIES());
	}, []);

	useEffect(() => {
		setColumns({
			pending: {
				id: 'pending',
				list:
					emergencies?.filter((emergency) => emergency.status === 'pending') ||
					[],
			},
			inProgress: {
				id: 'inProgress',
				list:
					emergencies?.filter(
						(emergency) => emergency.status === 'inProgress'
					) || [],
			},
			complete: {
				id: 'complete',
				list:
					emergencies?.filter((emergency) => emergency.status === 'complete') ||
					[],
			},
		});
	}, [emergencies]);

	const initialColumns = {
		pending: {
			id: 'pending',
			list: [] as IEmergency[],
		},
		inProgress: {
			id: 'inProgress',
			list: [] as IEmergency[],
		},
		complete: {
			id: 'complete',
			list: [] as IEmergency[],
		},
	};

	const [columns, setColumns] = useState(initialColumns);

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (destination === undefined || destination === null) return null;

		if (
			source.droppableId === destination.droppableId &&
			destination.index === source.index
		)
			return null;

		const start = columns[source.droppableId as EmergencyColumn];
		const end = columns[destination.droppableId as EmergencyColumn];

		if (start === end) {
			const newList = start.list.filter(
				(_: any, idx: number) => idx !== source.index
			);

			newList.splice(destination.index, 0, start.list[source.index]);

			const newCol = {
				id: start.id,
				list: newList,
			};

			setColumns((state) => ({ ...state, [newCol.id]: newCol }));
			return null;
		} else {
			const newStartList = start.list.filter(
				(_: any, idx: number) => idx !== source.index
			);

			const newStartCol = {
				id: start.id,
				list: newStartList,
			};

			const newEndList = end.list;

			newEndList.splice(destination.index, 0, start.list[source.index]);

			const newEndCol = {
				id: end.id,
				list: newEndList,
			};

			setColumns((state) => ({
				...state,
				[newStartCol.id]: newStartCol,
				[newEndCol.id]: newEndCol,
			}));
			dispatch(
				FETCH_UPDATE_EMERGENCY({
					query: {
						id: start.list.filter(
							(emergency) => end.list.indexOf(emergency) !== -1
						)[0].id,
					},
					request: {
						status: destination.droppableId as EmergencyColumn,
					},
				})
			);
			return null;
		}
	};

	return (
		<>
			<Stack className="gap-16 ">
				<PageTitle title={NAVBAR_LABEL.EMERGENCY} />
				<Stack direction="row" className="gap-32 justify-center">
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
				</Stack>
			</Stack>
		</>
	);
}
