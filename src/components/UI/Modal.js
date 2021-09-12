import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const PortalId = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onHide={props.onHide} />, PortalId)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        PortalId
      )}
    </Fragment>
  );
};
export default Modal;
