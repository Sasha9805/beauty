import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../portal/Portal";
import "./modal.scss";

interface IModalProps {
	selectedId: number;
	isOpen: boolean;
	handleClose: (state: boolean) => void;
}

function CancelModal({ selectedId, handleClose, isOpen }: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null);

	const closeOnEscapeKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			handleClose(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener("keydown", closeOnEscapeKey);

		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, []);

	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={500}
				unmountOnExit
				classNames="modal"
				nodeRef={nodeRef}
			>
				<div ref={nodeRef} className="modal">
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment #
							{selectedId}?
						</span>
						<div className="modal__btns">
							<button className="modal__ok">Ok</button>
							<button
								className="modal__close"
								onClick={() => handleClose(false)}
							>
								Close
							</button>
						</div>
						<div className="modal__status">Success</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
