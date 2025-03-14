import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios"; 
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data); 
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []); 

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li className="search-bar">
          <SearchBar />
        </li>

        {/* Mục Contact di chuyển lên trước giỏ hàng và chỉ hiển thị cho người dùng không phải admin */}
        {userInfo && !userInfo.isAdmin && (
          <li className="mt-2 contact-link">
            <Link to="/contact">Contact</Link>
          </li>
        )}

        {userInfo && !userInfo.isAdmin && (
          <>
            <li>
              <Link to="/cart">
                <i className="fa-sharp fa-solid fa-cart-shopping cart-icon mt-2 me-3" />
              </Link>
            </li>

            <li className="dropdown dropdown-nav" id="categories">
              <button
                className="btn btn-secondary dropdown-toggle dropdown-button bg-nav-color"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul className="dropdown-menu bg-nav-color">
                {categories.map((category) => (
                  <li key={category._id} className="bg-nav-color">
                    <Link
                      to={`/books/categories/${category._id}`}
                      className="dropdown-item bg-nav-color"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </>
        )}

        {userInfo ? (
          <div className="dropdown dropdown-nav" id="username">
            <button
              className="btn btn-secondary dropdown-toggle dropdown-button bg-nav-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userInfo.name}
            </button>
            <ul className="dropdown-menu bg-nav-color">
              <li className="bg-nav-color">
                <Link to="/profile" className="dropdown-item bg-nav-color">
                  Profile
                </Link>
              </li>
              <li className="bg-nav-color">
                <div
                  className="dropdown-item bg-nav-color"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <li className="mt-2">
            <Link to="/login">Sign In</Link>
          </li>
        )}

        {/* Chỉ hiển thị mục Admin nếu người dùng là admin */}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown dropdown-nav ms-4 me-4" id="admin-menu">
            <button
              className="btn btn-secondary dropdown-toggle dropdown-button bg-nav-color"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </button>
            <ul className="dropdown-menu bg-nav-color">
              <li className="bg-nav-color">
                <Link
                  to="/admin/userlist"
                  className="dropdown-item bg-nav-color"
                >
                  Users
                </Link>
                <Link
                  to="/admin/booklist"
                  className="dropdown-item bg-nav-color"
                >
                  Books
                </Link>
                <Link
                  to="/admin/orderlist"
                  className="dropdown-item bg-nav-color"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
