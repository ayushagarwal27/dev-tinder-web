import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../utils/config.js";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(
        config.urls.baseUrl + config.urls.auth.logout,
        {},
        { withCredentials: true },
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-300 ">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={"/"}>
          👨🏼‍💻 DevTinder
        </Link>
      </div>
      {user ? (
        <div className="flex-none gap-2">
          <p>Welcome: {user?.firstName}</p>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.avatar_url ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Received Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={""}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Sign Up / Sign In
        </button>
      )}
    </div>
  );
};
export default Navbar;
