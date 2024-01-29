'use client';
// react
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// components
import PageTitle from '@/components/common/PageTitle';
import EmergencyState from '@/components/module/Emergency/EmergencyState';
import Loading from '@/components/common/Loading';
// consts
import { NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { EmergencyColumn } from '@/types/COMMON';
import { IEmergency } from '@/types/models/emergency.model';
// services
import { getEmergencyListAPI, updateEmergencyAPI } from '@/services/api-call';
// tanstack
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// notistack
import { enqueueSnackbar } from 'notistack';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';

export default function Home() {
	const queryClient = useQueryClient();

	// handle responsive layout
	const emergenciesRef = useRef<HTMLDivElement>(null);
	const [emergenciesWidth, setEmergenciesWidth] = useState<number>(
		emergenciesRef.current?.clientWidth as number
	);
	useEffect(() => {
		WidthObserver(emergenciesRef.current, setEmergenciesWidth);
	}, []);
	const useCompact = emergenciesWidth <= 1136;

	// query
	const { isPending: isEmergencyListPending, data: dataGetEmergencyList } =
		useQuery({
			queryKey: ['getEmergencyList'],
			queryFn: async () => await getEmergencyListAPI(),
		});
	const updateEmergency = useMutation({
		mutationFn: updateEmergencyAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getEmergencyList'] });
			enqueueSnackbar('Update Emergency successfully', { variant: 'success' });
		},
		onError: (error) => {
			enqueueSnackbar(`Fail to update Emergency : ${error.message}`, {
				variant: 'error',
			});
		},
	});

	useEffect(() => {
		setColumns(
			['pending', 'inProgress', 'complete'].reduce((acc, key) => {
				acc[key] = {
					id: key,
					list:
						dataGetEmergencyList?.filter(
							(emergency: IEmergency) => emergency.status === key
						) ?? [],
				};
				return acc;
			}, {} as any)
		);
	}, [dataGetEmergencyList]);

	const [columns, setColumns] = useState<{
		pending: { id: string; list: IEmergency[] };
		inProgress: { id: string; list: IEmergency[] };
		complete: { id: string; list: IEmergency[] };
	}>({
		pending: { id: 'pending', list: [] },
		inProgress: { id: 'inProgress', list: [] },
		complete: { id: 'complete', list: [] },
	});

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
			const targetEmergemcyTask = start['list'][source.index];
			updateEmergency.mutate(
				{
					id: targetEmergemcyTask.id,
					request: {
						car_id: targetEmergemcyTask.car_id,
						status: destination.droppableId as EmergencyColumn,
					},
				},
				{
					onSuccess: () => {
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
					},
				}
			);
			return null;
		}
	};

	return (
		<>
			{(isEmergencyListPending || updateEmergency.isPending) && (
				<Loading size={48} isBackdrop />
			)}
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.EMERGENCY} />
				<div
					ref={emergenciesRef}
					className={`flex ${
						useCompact ? 'flex-col' : 'flex-row'
					} gap-32 w-full h-auto min-h-[calc(100vh-192px)]`}
				>
					<DragDropContext onDragEnd={onDragEnd}>
						<EmergencyState
							title="PENDING"
							droppableId="pending"
							emergencies={columns.pending.list}
							isLoading={isEmergencyListPending}
						/>
						<EmergencyState
							title="IN PROGRESS"
							droppableId="inProgress"
							emergencies={columns.inProgress.list}
							isLoading={isEmergencyListPending}
						/>
						<EmergencyState
							title="COMPLETE"
							droppableId="complete"
							emergencies={columns.complete.list}
							isLoading={isEmergencyListPending}
						/>
					</DragDropContext>
				</div>
			</div>
		</>
	);
}
