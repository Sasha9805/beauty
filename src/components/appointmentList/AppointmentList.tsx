import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const { activeAppointments, getActiveAppointments } =
		useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	const appointmentItems = activeAppointments.map((item) => {
		return <AppointmentItem key={item.id} {...item} />;
	});

	return <>{appointmentItems}</>;
}

export default AppointmentList;
