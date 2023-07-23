import "./modal.scss";

interface IModalProps {
	selectedId: number;
	handleClose: (state: boolean) => void;
}

function CancelModal({ selectedId, handleClose }: IModalProps) {
	return (
		<div className="modal">
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
	);
}

export default CancelModal;
