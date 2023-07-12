import { useEffect, useState } from "react";
import AlertComponent from "../../components/ui/AlertComponent";
import { Spinner } from "flowbite-react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import userAvatarImg from "../../assets/images/userAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setUser } from "../../redux/authSlice";
import {
  useGetUserMutation,
  useUpdateUserMutation,
} from "../../redux/usersApiSlice";
const Profile = () => {
  const userCurrent = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(userCurrent);
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const [updateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateUserMutation();
  const [getUser, { isLoading: isLoadingGetUser }] = useGetUserMutation();
  useEffect(() => {
    if (userData) {
      setUserName(userData.userName);
      setLastName(userData.lastName);
      setFirstName(userData.firstName);
      setEmail(userData.email);
      setUserAvatar(userData.avatar);
      setPhoneNumber(userData.phoneNumber);
    }
  }, [userData]);
  useEffect(() => {
    if (
      userName !== "" &&
      lastName !== "" &&
      firstName !== "" &&
      email !== "" &&
      phoneNumber !== ""
    ) {
      setFormValid(true);
    }
  }, [userName, lastName, firstName, email, phoneNumber]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      const response = await updateUser({
        id: userData.id,
        lastName: lastName,
        firstName: firstName,
        email: email,
        phoneNumber: phoneNumber,
        avatar: userAvatar,
      }).unwrap();
      if (response.isSuccessful) {
        const user = await getUser(userData.id).unwrap();
        dispatch(setUser(user));
        setUserData(user);
        setUserName("");
        setLastName("");
        setFirstName("");
        setEmail("");
        setUserAvatar(null);
        setPhoneNumber("");
        setErrMessage(null);
        setFormValid(false);
        setAlertIsShowing(true);
        setToggle(false);
      } else {
        setErrMessage(response.errorMessages);
      }
    } catch (err) {
      console.error(err);
      if (!err?.originalStatus) {
        setErrMessage("Server not response");
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      }
    }
  };
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setUserAvatar(base64String);
    };
  };
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <Breadcrumbs></Breadcrumbs>
        {isLoadingGetUser || isLoadingUpdateUser ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : toggle ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Update Your Information
            </h2>
            <button className="invisible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            {errMessage !== null ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errMessage}</p>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <img
                className="mx-auto h-20 w-20 rounded-full border-none"
                src={
                  userAvatar === null
                    ? userAvatarImg
                    : "data:image/jpeg;base64," + userAvatar
                }
                alt=""
              />
              <h2 className="mt-6 text-center text-md font-semibold tracking-tight text-gray-900">
                Your avatar
              </h2>

              <div class="flex w-full mb-8 items-center">
                <label
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Upload avatar
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={(e) => {
                    convertToBase64(e.target.files[0]);
                  }}
                />
              </div>
              <p
                class="ml-40 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PNG, or JPG.
              </p>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name <span className="text-red-600  text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your last name"
                  required
                  autoComplete="off"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name <span className="text-red-600  text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your first name"
                  required
                  autoComplete="off"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User name (read only){" "}
                  <span className="text-red-600  text-xl">*</span>
                </label>
                <input
                  disabled
                  readOnly
                  type="text"
                  name="userName"
                  id="userName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your user name"
                  required
                  autoComplete="off"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your phone number (0123456789)"
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address <span className="text-red-600  text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:none  block w-full p-2.5 "
                  placeholder="Type your email address"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-full mt-4">
                <button
                  type="submit"
                  className="group relative bg-white border-2 border-indigo-400 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600 flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-8 group relative disabled:bg-indigo-500 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={!formValid}
                >
                  {!formValid ? (
                    <span
                      className="absolute inset-y-0 left-0 flex items-center pl-3"
                      disabled={!formValid}
                    >
                      <svg
                        className="h-5 w-5 text-indigo-300 "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  ) : null}
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Your Information
            </h2>
            <button
              onClick={() => {
                setToggle(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            {alertIsShowing ? (
              <AlertComponent
                content={"Update your information success"}
                visible={setAlertIsShowing}
              />
            ) : null}
            <form className="mt-8 space-y-6">
              <img
                className="mx-auto h-20 w-20 rounded-full border-none"
                src={
                  userAvatar === null
                    ? userAvatarImg
                    : "data:image/jpeg;base64," + userAvatar
                }
                alt=""
              />
              <h2 className="mt-6 text-center text-md font-semibold tracking-tight text-gray-900">
                Your avatar
              </h2>

              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name <span className="text-red-600  text-xl">*</span>
                </label>
                <span>{lastName}</span>
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name <span className="text-red-600  text-xl">*</span>
                </label>
                <span>{firstName}</span>
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User name <span className="text-red-600  text-xl">*</span>
                </label>
                <span>{userName}</span>
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <span>{phoneNumber}</span>
              </div>
              <div class="flex w-full mb-8 items-center">
                <label
                  for="name"
                  class="block w-52 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address <span className="text-red-600  text-xl">*</span>
                </label>
                <span>{email}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
