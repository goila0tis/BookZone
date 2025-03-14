import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../components/Book/Book";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import Paginate from "../../components/Paginate/Paginate";
import { listBooks } from "../../actions/bookActions";
import "./HomePage.css";

const HomePage = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books, page, pages } = bookList;

  const [showIntro, setShowIntro] = useState(true); // State kiểm tra khi tìm kiếm

  useEffect(() => {
    // Khi có từ khóa tìm kiếm, ẩn phần giới thiệu
    if (keyword) {
      setShowIntro(false);
    } else {
      setShowIntro(true);
    }

    dispatch(listBooks(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="home">
      {/* Phần giới thiệu */}
      {showIntro && (
        <div className="intro-section">
          <div className="intro-text">
            <h1>Discover Your Next Great Read</h1>
            <p>
              Uncover captivating stories, enriching knowledge, and endless
              inspiration in our curated collection of books.
            </p>
          </div>
          <div className="intro-image">
            <img
              src="/images/hero4.png"
              alt="Bookshelf illustration"
            />
          </div>
        </div>
      )}

      {/* Phần danh sách sách */}
      <div className="book-section">
        <div className="title">
          <h2>All Books</h2>
          <p>Mua sách truyện tiếng Anh, sách ngoại văn.</p>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="books">
              {books.map((book) => (
                <Book key={book._id} book={book} />
              ))}
            </div>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
