import { useEffect, useRef, useContext, useState } from "react";
import AppContext from "./context/AppProvider";
import { Link, Navigate } from "react-router-dom";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import Menu from "./Menu";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

const EcommerceHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef();
  const [content, setContent] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const {
    fixed,
    setFixed,
    menu,
    setMenu,
    scrollPosition,
    cart,
    setHeaderHeight,
    items,
  } = useContext(AppContext);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (scrollPosition < headerRef.current.scrollHeight) {
      setFixed(false);
    } else {
      setFixed(true);
    }
  }, [scrollPosition]);

  useEffect(() => {
    const filteredResults =
      search === ""
        ? []
        : items.filter((food) =>
            food.name.toString().toLowerCase().includes(search.toLowerCase())
          );
    setSearchResults(filteredResults);
  }, [items, search]);
  const onFocus = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="block w-full min-h-[210px] top-50 bg-neutral-950">
        <div
          ref={headerRef}
          className={`${
            fixed && !menu ? "fixed" : ""
          } bg-neutral-950 w-full duration-150 z-30`}
        >
          <div className="lg:max-w-4xl lg:m-[0_auto] px-4 h-min py-7 space-y-8">
            <div className="flex justify-between items-center">
              <div className=" w-24" onClick={() => navigate("/")}>
                <img
                  src="media/Logo.png"
                  alt="Company logo"
                  className="w-full brightness-200 object-cover"
                />
              </div>
              <Menu menu={menu} setMenu={setMenu} />
              <div className="flex gap-5">
                <div
                  className="text-slate-200 text-4xl font-thin cursor-pointer hover:scale-105 md:hidden"
                  onClick={() => setMenu(true)}
                >
                  <FaBars />
                </div>
                <div className="flex gap-4 items-center">
                  <div
                    className="text-slate-200 text-4xl font-thin cursor-pointer relative"
                    onClick={() => {
                      if (auth?.roles?.find((role) => role === "2006")) {
                        if (content) {
                          setContent(false);
                        } else {
                          setContent(true);
                        }
                      } else {
                        navigate("/login", { from: location, replace: true });
                      }
                    }}
                  >
                    <FaUserCircle />
                    {content && (
                      <div className="absolute bg-neutral-500 right-0 py-7 px-4 mt-2 rounded-lg space-y-4 text-xs">
                        <p className="whitespace-nowrap">
                          <span className="font-bold">Email: </span>
                          {auth?.email}
                        </p>
                        <p
                          className="flex gap-2 items-center cursor-pointer"
                          onClick={() => {
                            setAuth("");
                            localStorage.setItem("auth", JSON.stringify({}));
                            return (
                              <Navigate
                                to="/login"
                                state={{ from: location }}
                                replace
                              />
                            );
                          }}
                        >
                          Sign Out <FaSignOutAlt />
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className="text-slate-200 text-4xl font-thin cursor-pointer hover:scale-105 relative"
                    onClick={() => navigate("/question")}
                  >
                    <div className="absolute text-green-500 font-bold text-xl right-2">
                      {!cart.length
                        ? ""
                        : cart.length === 1
                        ? cart.map((item) => item.quantity)
                        : cart
                            .map((item) => item.quantity)
                            .reduce((partialSum, a) => partialSum + a, 0)}
                    </div>
                    <FaShoppingCart />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${
                fixed ? "hidden" : "visible"
              } flex rounded-xl overflow-hidden bg-slate-100 w-full sm:max-w-2xl sm:m-[0_auto] duration-200`}
            >
              <input
                type="text"
                className="w-full py-2 px-4 bg-inherit placeholder:text-neutral-500 text-neutral-500 focus:outline-none"
                placeholder="Search..."
                onFocus={onFocus}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <div className="text-2xl p-2 rounded-md cursor-pointer bg-[#0b4e61] text-slate-200">
                {searchResults.length <= 0 ? (
                  <FaSearch />
                ) : (
                  <FaTimes onClick={() => setSearch("")} />
                )}
              </div>
            </div>
            <div className="w-full relative flex flex-grow">
              {!(searchResults.length <= 0) && (
                <ul className="absolute top-0 w-full px-12 py-7 z-30  text-slate-300 font-semibold text-xs bg-gradient-to-r border-neutral-400 border-b-2 divide-y h-[50vh] overflow-auto rounded-tr-3xl bg-neutral-800">
                  <div className="text-center py-4">Results</div>
                  {searchResults.map((searchResult) => (
                    <Link
                      to={`/foodPage/${searchResult.name}`}
                      onClick={() => setSearch("")}
                    >
                      <li
                        key={searchResult._id.slice(0, 9)}
                        className="hover:text-primary-color hover:scale-95 cursor-pointer flex justify-between py-4"
                      >
                        {searchResult.name}
                        <div className="grid place-content-center">
                          <FaArrowRight />
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceHeader;
