import { useState, useContext, useEffect, useCallback } from "react";
import AppointmentItem from "../appointmentItem/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {
		appointmentLoadingStatus,
		activeAppointments,
		getActiveAppointments,
	} = useContext(AppointmentContext);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button
					className="schedule__reload"
					onClick={getActiveAppointments}
				>
					Try it again
				</button>
			</>
		);
	}

	const appointmentItems = activeAppointments.map((item) => {
		return (
			<AppointmentItem
				key={item.id}
				{...item}
				openModal={handleOpenModal}
			/>
		);
	});

	return (
		<>
			{appointmentItems}
			<CancelModal
				handleClose={setIsOpen}
				selectedId={selectedId}
				isOpen={isOpen}
			/>
		</>
	);
}

export default AppointmentList;
