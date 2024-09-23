import React from "react";
import { Modal } from "flowbite-react";
import CreatePost from "../pages/CreatePost";

const CreatePostModal = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onClose={handleClose}>
      <Modal.Header>Create a Post</Modal.Header>
      <Modal.Body>
        <CreatePost />
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;
