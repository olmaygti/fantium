import React from 'react';

import styled from '@emotion/styled';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';


import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
	black: {
		backgroundColor: 'black',
		color: 'white',
		opacity: 0.7,
	},
});

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const Overlay = styled.div`
	z-index: 10;
	opacity: 0.8;
	color: white;
	background-color: black;
	position: absolute;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function DG({
	open, close, children, title, width, fullWidth, modalOverlay, closable = true, black,
}) {
	const classes = useStyles();
	return (
		<div>
			<Dialog
				classes={{
					paper: classNames({
						[classes.modal]: true,
						[classes.black]: black,
					}),
					root: classes.center,
				}}
				maxWidth={width || 'md'}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				fullWidth={fullWidth}
				onClose={close}>
				{ modalOverlay && <Overlay>
					{ modalOverlay }
				</Overlay> }
				<DialogTitle
					id="classic-modal-slide-title"
					disableTypography
					className={classes.modalHeader}>
					<IconButton
						className={classes.modalCloseButton}
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={close}>
					</IconButton>
					<h4 className={classes.modalTitle}>{title}</h4>
				</DialogTitle>
				<DialogContent
					id="modal-slide-description"
					className={classes.modalBody}>
					{children}
				</DialogContent>
			</Dialog>
		</div>
	);
}
