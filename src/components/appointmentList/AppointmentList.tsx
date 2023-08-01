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
				<Error
					// version="1.1"
					// viewBox="0 0 499.973 391.157"
					// xmlns="http://www.w3.org/2000/svg"
					// style={{
					// 	width: "100px",
					// 	height: "100px",
					// 	display: "block",
					// 	margin: "0 auto",
					// }}
					// msg={appointmentLoadingStatus}
				/>
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
				getActiveAppointments={getActiveAppointments}
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
