"use client"
import { UploadButton } from "@/utils/uploadthing";
import React from "react";

const ImageUpload = () =>{
    return <div>
        <UploadButton endpoint='imageUploader'/>
    </div>
};

export default ImageUpload;