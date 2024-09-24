import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiCamera, FiSettings } from "react-icons/fi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  signoutSuccess,
} from "../redux/user/userSlice";

import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";

const DashProfile = () => {
  const { currentUser, error, load } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // New state for delete confirmation
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0 && !formData.password) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(data);
        setIsEditing(false);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(false);
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
        // Optional: Sign the user out or redirect to a different page
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-center text-4xl font-bold my-5 text-gray-800 dark:text-gray-200">
        Profile
      </h1>
      <div className="flex items-center justify-center relative">
        <div
          className="relative w-32 h-32 mx-auto cursor-pointer shadow-md overflow-hidden rounded-full border-2 border-gradient-to-r from-purple-400 to-pink-400"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-gray-300 ${
              imageFileUploadProgress && imageFileUploadProgress < 100
                ? "opacity-50"
                : ""
            }`}
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
            <FiCamera className="text-white text-2xl" />
          </div>
        </div>
        <FiSettings
          className="absolute right-0 top-0 w-8 h-8 text-gray-600 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>

      {/* Display User Details */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">{currentUser.username}</h2>
        <p className="text-gray-600">{currentUser.email}</p>
      </div>

      {isEditing && (
        <Modal show={isEditing} onClose={() => setIsEditing(false)}>
          <Modal.Header>Update Profile</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <TextInput
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Update Username"
              />
              <TextInput
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Update Email"
              />
              <TextInput
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Update Password"
              />
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Save Changes
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setIsEditing(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Button
        className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white"
        onClick={() => setIsDeleting(true)}
      >
        Delete Account
      </Button>

      {isDeleting && (
        <Modal show={isDeleting} onClose={() => setIsDeleting(false)}>
          <Modal.Header>Confirm Delete Account</Modal.Header>
          <Modal.Body>
            <Alert color="failure" className="flex items-center">
              <HiOutlineExclamationCircle className="mr-2" />
              Are you sure you want to delete your account? This action is
              irreversible.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button color="red" onClick={handleDeleteAccount}>
              Yes, Delete
            </Button>
            <Button color="gray" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DashProfile;
