import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Rating";
import "./CategoryBooksPage.css";

const CategoryBooksPage = () => {
  const { categoryId } = useParams(); 
  const [category, setCategory] = useState(null); 
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCategoryAndBooks = async () => {
      setLoading(true); 
      try {
        const categoryResponse = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
        setCategory(categoryResponse.data); 
        const booksResponse = await axios.get(`http://localhost:5000/api/books/categories/${categoryId}`);
        setBooks(booksResponse.data); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCategoryAndBooks(); 
  }, [categoryId]); 

  if (loading) return <div>Loading...</div>; 

  return (
    <div className="home">
      {category && (
        <div className="title">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      )}

      <div className="books">
        {books.length === 0 ? (
          <p>Không có sách nào trong danh mục này.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="card">
              <Link to={`/book/${book._id}`}>
                <img src={book.image} alt={book.name} className="card-img-top" />
              </Link>
              <div className="card-body book-desc">
                <Link to={`/book/${book._id}`}>
                  <div className="card-title">
                    <strong>{book.name}</strong>
                  </div>
                  <div className="card-text">
                    <Rating
                      value={book.rating}
                      text={` ${book.numReviews} reviews`}
                      color={"#ede1d4"}
                    />
                  </div>
                  <h3 className="card-text">${book.price}</h3>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryBooksPage;
