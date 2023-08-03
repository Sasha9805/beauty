import { createContext, useReducer } from "react";
import useAppointmentService from "../../services/AppointmentService";

import reducer, { IAppointmentState } from "./reducer";
import { ActionsTypes } from "./actions";

import { Value } from "react-calendar/dist/cjs/shared/types";

interface ProviderProps {
	children: React.ReactNode;
}

interface IAppointmentContextValue extends IAppointmentState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
	setCalendar: (newDate: Value) => void;
}

const initialState: IAppointmentState = {
	allAppointments: [],
	activeAppointments: [],
	appointmentLoadingStatus: "idle",
	calendarDate: null,
};

export const AppointmentContext = createContext<IAppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	appointmentLoadingStatus: initialState.appointmentLoadingStatus,
	calendarDate: initialState.calendarDate,
	getAppointments: () => {},
	getActiveAppointments: () => {},
	setCalendar: (newDate: Value) => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
		useAppointmentService();

	const value: IAppointmentContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		appointmentLoadingStatus: loadingStatus,
		calendarDate: state.calendarDate,
		getAppointments: () => {
			getAllAppointments()
				.then((data) => {
					const filteredData = data.filter((item) => {
						if (
							Array.isArray(state.calendarDate) &&
							state.calendarDate[0] &&
							state.calendarDate[1]
						) {
							if (
								new Date(item.date).getTime() >=
									new Date(state.calendarDate[0]).getTime() &&
								new Date(item.date).getTime() <=
									new Date(state.calendarDate[1]).getTime()
							) {
								return item;
							}
							return undefined;
						} else {
							return item;
						}
					});
					dispatch({
						type: ActionsTypes.SET_ALL_APPOINTMENTS,
						payload: filteredData,
					});
				})
				.catch((e) => {
					dispatch({
						type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS,
					});
				});
		},
		getActiveAppointments: () => {
			getAllActiveAppointments()
				.then((data) => {
					const filteredData = data.filter((item) => {
						if (
							Array.isArray(state.calendarDate) &&
							state.calendarDate[0] &&
							state.calendarDate[1]
						) {
							if (
								new Date(item.date).getTime() >=
									new Date(state.calendarDate[0]).getTime() &&
								new Date(item.date).getTime() <=
									new Date(state.calendarDate[1]).getTime()
							) {
								return item;
							}
							return undefined;
						} else {
							return item;
						}
					});
					dispatch({
						type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
						payload: filteredData,
					});
				})
				.catch((e) => {
					dispatch({
						type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS,
					});
				});
		},
		setCalendar: (newDate: Value) => {
			dispatch({
				type: ActionsTypes.SET_CALENDAR_DATE,
				payload: newDate,
			});
		},
	};

	return (
		<AppointmentContext.Provider value={value}>
			{children}
		</AppointmentContext.Provider>
	);
};

export default AppointmentContextProvider;
