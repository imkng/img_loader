import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function ImageUploader() {
    const [selectedFile, setSelectedFile] = useState();
    const [files, setFiles] = useState([]);
    const [messageStatus, setMessageStatus] = useState(false);
    const [uploading, setUploading] = useState(false);


    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        console.log(file);
        if(file.type === 'image/png' || file.type === 'image/jpeg'){
            setSelectedFile(file);
        }else{
            alert("Please Select Image file");
            setSelectedFile(null);
        }
    }
    const formSubmit = (e)=>{
        e.preventDefault();
        if(selectedFile != null){
            uploadImageTOServer();
        }else{
            alert("Select Image First")
        }
    }
    const uploadImageTOServer = () =>{
        const url = `http://localhost:8080/`;
        const data = new FormData();
        data.append("file", selectedFile);
        axios.post(url, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(()=>{
            console.log("Finished");
        })
    }
  return (
    <div className='main flex justify-center'>
        <div className="rounded card w-1/3 border shadow m-4 p-4 bg-gray-50">
            <h1 className='text-2xl'>Image Uploader</h1>
            <div className='form_container mt-2'>
                <form action='#' onSubmit={formSubmit}>
                    <div className='field_conteiner flex flex-col gap-y-2'>
                        <label htmlFor=''>Select Image</label>
                        <input onChange={handleFileChange} type="file" id = "file"/>
                    </div>
                    <div className='field_container text-center mt-2'>
                        <button type="submit" className='px-3 py-1 bg-blue-700 hover:bg-blue-600
                            text-white rounded
                        '>Upload</button>
                        <button type='reset' className=' ml-2 px-3 py-1 bg-orange-700 hover:bg-orange-600
                            text-white rounded
                        '>Clear</button>
                    </div>
                </form>
            </div>

            {/* Uploaded images */}
            <div className='uploaded_view'>
                <img src={uploadedSrc} />
            </div>
        </div>
    </div>
  )
}

export default ImageUploader