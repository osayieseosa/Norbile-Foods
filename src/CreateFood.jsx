import { useState, useRef } from "react";
import EcommerceHeader from "./EcommerceHeader";
import axios from "./api/axios";
import Footer from "./Footer";
import Loader from "./Loader";
import picture from "./images/empty-box.png";

const ITEM_URL = "/food";
const IMAGE_URL = "/upload-image";

const CreateFood = () => {
  const fileRef = useRef();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const text = name.split(" ");
    const capitalizedArrays = text.map((array) => {
      array = array.charAt(0).toUpperCase() + array.slice(1);
      return array;
    });
    const capitalizedName = capitalizedArrays.join(" ");

    axios
      .post(IMAGE_URL, { image: image })
      .then((response) => {
        axios.post(
          ITEM_URL,
          {
            image: {
              name: response.data.url,
              object_id: response.data.id,
            },
            name: capitalizedName,
            price,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      })
      .then(() => {
        setName("");
        setPrice("");
        setImage("");
        setSuccess(true);
        fileRef.current.value = null;
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (!err?.response) {
          setErrMsg("Please Check Your Internet Connection");
        } else if (err.response?.status === 400) {
          setErrMsg("All Fields Are Required");
        } else if (err.response?.status === 409) {
          setErrMsg("Item Already Exists");
        } else if (err.response?.status === 413) {
          setErrMsg("Image Size Is Too Large");
        } else {
          setErrMsg("Submission Failed");
        }
      });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-[#000000b8] grid place-content-center text-lg z-50">
          <Loader size={"w-10"} />
        </div>
      )}

      <EcommerceHeader />
      <div className="py-10 px-5 grid place-content-center gap-10">
        <h1 className="text-3xl font-medium">Create A New Product</h1>
        <div className="w-[18rem] bg-gray-100 rounded-lg pb-7 sm:w-[25rem]">
          <h1
            className={`font-bold text-lg px-5 py-2 rounded-t-lg bg-gray-200 ${
              success
                ? "text-green-500"
                : errMsg
                ? "text-red-800"
                : "text-neutral-700"
            }`}
          >
            {success === true
              ? "Item Successfully Added "
              : errMsg
              ? errMsg
              : "Product Image"}
          </h1>
          <div className="w-[17rem] h-[17rem] p-5 sm:w-[24rem] sm:h-[24rem]">
            <img
              src={image.length ? image : picture}
              alt="upload Image"
              className="w-full h-full object-cover"
            />
          </div>
          <form onSubmit={handleSubmit} className="grid w-full px-5 gap-5">
            <label htmlFor="productImage" className="sr-only">
              Choose Product Image
            </label>
            <input
              accepts="image/*"
              required
              ref={fileRef}
              onChange={(e) => uploadImage(e)}
              type="file"
              id="productImage"
              className="block text-sm w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#864c15] file:text-pink-100 hover:file:scale-95 file:cursor-pointer file:transition-transform"
            />
            <label htmlFor="name" className="sr-only">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              // required
              placeholder="Enter Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-5 focus:outline-none placeholder:text-neutral-500 text-neutral-600 font-medium"
            />
            <label htmlFor="price" className="sr-only">
              Item Price
            </label>
            <input
              type="text"
              // required
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              id="price"
              placeholder="Enter Item price"
              className="py-2 px-5 focus:outline-none placeholder:text-neutral-500 text-neutral-600 font-medium"
            />
            <button
              type="submit"
              className="text-white bg-black w-min px-8 py-2 cursor-pointer rounded-md hover:scale-95"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateFood;
