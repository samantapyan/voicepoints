import {useEffect, useState} from "react";
import {Modal, Button} from 'react-bootstrap'

function CustomModal(props) {

    useEffect(()=>{

    },[])




    return (
        <div className={''}>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.heading}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.title}</h4>
                    <p>
                        {props.message}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomModal;
