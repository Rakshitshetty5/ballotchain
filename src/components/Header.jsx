import React from "react";
import useToggle from "../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/auth/reducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import customAxios from "../utils/CustomAxios";
import { setVoterDetails, setPhase, startFetching, fetchingSuccess } from "../redux/auth/reducer";

const Header = () => {
  const [showDropDown, setShowDropDown] = useToggle(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      //call only if access token available
      dispatch(startFetching())
      const response = await customAxios.get("/voter/details");
      dispatch(
        setVoterDetails({
          voter_details: {...response.data.data.user.voter_details,hasAppliedForVerification: response.data.data.user.hasAppliedForVerification},
          isVerified: response.data.data.user.isVerified,
        })
      );
      const response2 = await customAxios.get("/voter/getGeneralSettings")
      dispatch(setPhase(response2.data.data.phase))
      dispatch(fetchingSuccess())
    })();
  }, []);

  return (
    <header>
      <nav className="bg-white dark:bg-gray-800  shadow ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className="text-[#c45252] text-2xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              BallotChain
            </h1>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        onClick={setShowDropDown}
                        className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="options-menu"
                      >
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-gray-800"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                      </button>
                    </div>
                    {showDropDown && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <ul
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <li
                            onClick={() => navigate("/myAccount")}
                            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <span className="flex flex-col">
                              <span>My Account</span>
                            </span>
                          </li>
                          <li
                            onClick={logout}
                            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <span className="flex flex-col">
                              <span>Logout</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
