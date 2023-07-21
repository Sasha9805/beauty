import { createContext, useReducer } from "react";
import useAppointmentService from "../../services/AppointmentService";

import reducer, { IAppointmentState } from "./reducer";
import { ActionsTypes } from "./actions";

interface ProviderProps {
	children: React.ReactNode;
}

interface IAppointmentContextValue extends IAppointmentState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
}

const initialState: IAppointmentState = {
	allAppointments: [],
	activeAppointments: [],
	appointmentLoadingStatus: "idle",
};

export const AppointmentContext = createContext<IAppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	appointmentLoadingStatus: initialState.appointmentLoadingStatus,
	getAppointments: () => {},
	getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
		useAppointmentService();

	const value: IAppointmentContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		appointmentLoadingStatus: loadingStatus,
		getAppointments: () => {
			getAllAppointments().then((data) => {
				dispatch({
					type: ActionsTypes.SET_ALL_APPOINTMENTS,
					payload: data,
				});
			});
		},
		getActiveAppointments: () => {
			getAllActiveAppointments().then((data) => {
				dispatch({
					type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
					payload: data,
				});
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
