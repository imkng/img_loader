import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState();
  const [files, setFiles] = useState([]);
  const [messageStatus, setMessageStatus] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedSrc, setUploadedSrc] = useState("");

  const ref = useRef()

  useEffect(()=>{
    getFiles();
  }, [])

  const getFiles = async() =>{
    const url = `http://localhost:8080/`;
    axios.get(url)
    .then(response => {
        console.log(response.data);
        setFiles(response.data);
    }).catch(error=>{
        console.log(error)
    }).finally(()=>{
        console.log("finished")
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.type === "image/png" || file.type === "image/jpeg") {
      setSelectedFile(file);
    } else {
      alert("Please Select Image file");
      setSelectedFile(null);
    }
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (selectedFile != null) {
      uploadImageTOServer();
    } else {
      alert("Select Image First");
    }
  };
  const uploadImageTOServer = () => {
    const url = `http://localhost:8080/`;
    const data = new FormData();
    data.append("file", selectedFile);
    setUploading(true);
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setUploadedSrc(response.data);
        setMessageStatus(true);
        // setFiles([response.data, ...files])
        getFiles();
        console.log(messageStatus)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finished");
        setUploading(false);
      });
  };
  const resetHandler = ()=>{
    ref.current.value = "";
    setSelectedFile(null);
    setMessageStatus(false);
  }
  return (
    <div className="main flex flex-col items-center justify-center">
      <div className="rounded card w-1/3 border shadow m-4 p-4 bg-gray-100">
        <h1 className="text-2xl">Image Uploader</h1>
        <div className="form_container mt-2">
          <form action="#" onSubmit={formSubmit}>
            <div className="field_conteiner flex flex-col gap-y-2">
              <label htmlFor="">Select Image</label>
              <input ref={ref} onChange={handleFileChange} type="file" id="file" />
            </div>
            <div className="field_container text-center mt-2">
              <button
                type="submit"
                className="px-3 py-1 bg-blue-700 hover:bg-blue-600
                            text-white rounded
                        "
              >
                Upload
              </button>
              <button
                type="button"
                onClick={resetHandler}
                className=" ml-2 px-3 py-1 bg-orange-700 hover:bg-orange-600
                            text-white rounded
                        "
              >
                Clear
              </button>
            </div>
          </form>
        </div>
        {/* Success Message */}
        {messageStatus && (
          <div class="mt-2">
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Success!</strong>
              <span class="block sm:inline"> Image Uploaded.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  class="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    fill-rule="evenodd"
                    d="M14.293 5.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}

        {/* Uploading text and loader */}
        {uploading && (
          <div className="p-3 text-center">
            <div class="flex justify-center items-center">
              <div class="loader"></div>
            </div>
            <h1> Uploading...</h1>
          </div>
        )}

        {/* Uploaded images */}

        {messageStatus && <div className="uploaded_view">
          <img
            className="h-[300px] mx-auto mt-4 rounded shadow"
            src={uploadedSrc}
          />
        </div>}
      </div>
      {/* Images section */}
      <div className="flex flex-wrap px-4 justify-center">
            {files.map(img=>(
                <img className="h-[200px] m-2 shadow rounded" src= {img} key = {img}/>
            ))}
      </div>
    </div>
  );
}

export default ImageUploader;
