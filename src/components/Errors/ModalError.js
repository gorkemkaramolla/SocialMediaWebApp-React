import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export default function ModalError() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Post atmak istediğinize emin misiniz?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Devam etmek istiyor musunuz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
