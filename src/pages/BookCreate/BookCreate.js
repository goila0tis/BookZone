import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { Link } from "react-router-dom"; 
import { createBook } from "../../actions/bookActions"; 
import "./BookCreate.css";

const BookCreate = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); 
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = bookCreate;

  const [categories, setCategories] = useState([]); 

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (successCreate) {
      navigate("/admin/booklist"); // Sau khi tạo xong, điều hướng đến danh sách sách
    }
  }, [navigate, successCreate]);  

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Kiểm tra xem tất cả các trường đã được điền đầy đủ hay chưa
    if (!name || !price || !author || !genre || !countInStock || !description || !category || !image) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Gửi thông tin tạo sách lên server
    dispatch(
      createBook({
        name,
        price,
        image,
        author,
        genre,
        countInStock,
        description,
        category, 
      })
    );
  };

  return (
    <>
      <Link className="btn back-btn" to="/admin/booklist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Book</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="alert-danger">{errorCreate}</Message>}
        {loadingCreate ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler} className="mb-5">
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                className="form-control p-3"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="image">
                Image
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="image"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                className="form-control"
                type="file"
                id="image-file"
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="author">
                Author
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="author"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="genre">
                Genre
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="genre"
                placeholder="Enter Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="countInStock">
                Count In Stock
              </label>
              <input
                type="number"
                className="form-control p-3"
                id="countInStock"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label mt-3" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="form-control p-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn bookCreate-btn">
              Create
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default BookCreate;
