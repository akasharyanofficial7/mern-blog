import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiCamera, FiSettings } from "react-icons/fi"; // Import settings icon
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
  const [settingsPopup, setSettingsPopup] = useState(false); // New state for settings popup
  const [formData, setFormData] = useState({});
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
    if (Object.keys(formData).length === 0) {
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
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(error.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
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
          onClick={() => setSettingsPopup(true)}
        />
      </div>

      {settingsPopup && (
        <Modal show={settingsPopup} onClose={() => setSettingsPopup(false)}>
          <Modal.Header>Settings</Modal.Header>
          <Modal.Body>
            <p>What would you like to do?</p>
            <div className="flex flex-col gap-2 mt-4">
              <Button onClick={() => setSettingsPopup(false)}>
                Update Profile
              </Button>
              <Button
                onClick={() => {
                  handleDeleteUser();
                  setSettingsPopup(false);
                }}
              >
                Delete Account
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setSettingsPopup(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition"
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition"
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition"
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          Update
        </Button>
        {updateUserError && (
          <Alert
            color="failure"
            className="my-4"
            onDismiss={() => setUpdateUserError(null)}
          >
            <span className="flex items-center">
              <HiOutlineExclamationCircle className="mr-2" />
              {updateUserError}
            </span>
          </Alert>
        )}
        {updateUserSuccess && (
          <Alert
            color="success"
            className="my-4"
            onDismiss={() => setUpdateUserSuccess(null)}
          >
            <span className="flex items-center">
              <HiOutlineExclamationCircle className="mr-2" />
              Profile updated successfully!
            </span>
          </Alert>
        )}
      </form>

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Confirm Account Deletion</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your account?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button color="failure" onClick={handleDeleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DashProfile;
