import { AppointmentAction, ActionsTypes } from "./actions";
import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
import { LoadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
	allAppointments: IAppointment[] | [];
	activeAppointments: ActiveAppointment[] | [];
	appointmentLoadingStatus: LoadingStatusOptions;
}

export default function reducer(
	state: IAppointmentState,
	action: AppointmentAction
): IAppointmentState {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return {
				...state,
				allAppointments: action.payload,
				appointmentLoadingStatus: "loading",
			};
		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return {
				...state,
				activeAppointments: action.payload,
				appointmentLoadingStatus: "loading",
			};
		case ActionsTypes.FETCHING_APPOINTMENTS:
			return { ...state, appointmentLoadingStatus: "idle" };
		case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
			return { ...state, appointmentLoadingStatus: "error" };
		default:
			return state;
	}
}
