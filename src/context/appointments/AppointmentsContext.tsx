import { createContext, useReducer } from "react";
import useAppointmentService from "../../services/AppointmentService";

import reducer, { IInitialState } from "./reducer";
import { ActionsTypes } from "./actions";

interface ProviderProps {
	children: React.ReactNode;
}

interface IAppointmentContextValue extends IInitialState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
}

const initialState: IInitialState = {
	allAppointments: [],
	activeAppointments: [],
};

export const AppointmentContext = createContext<IAppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
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
