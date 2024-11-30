import React, { useRef, useState } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import {
  quillFormats,
  quillModules,
  tiptapExtensions,
} from "../../const/config";
import "reactjs-tiptap-editor/style.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from "../../cloudDinaryConfig";
import axios from "axios";
import ReactQuillEditor from "../ReactQuillEditor";


function DescriptionDetail({onChange}) {
  const [content, setContent] = useState("");
  const quillRef = useRef();

  function onChangeContent(value) {
      onChange(value);
  }

  // Hàm xử lý upload hình ảnh
  // const imageHandler = () => {
  //   // Tạo input file ẩn
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   // Xử lý khi chọn file
  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     if (file) {
  //       try {
  //         // Tạo FormData để upload
  //         const formData = new FormData();
  //         formData.append("file", file);
  //         formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  //         const response = await axios.post(CLOUDINARY_URL, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });

  //         // Giả lập API upload (thay thế bằng API thật của bạn)

  //         // Upload và lấy URL
  //         const imageUrl = response.data.secure_url;

  //         // Lấy instance của editor
  //         const editor = quillRef.current.getEditor();

  //         // Lấy vị trí con trỏ hiện tại
  //         const range = editor.getSelection(true);

  //         // Chèn hình ảnh vào editor
  //         editor.insertEmbed(range.index, "image", imageUrl);
  //       } catch (error) {
  //         console.error("Error uploading image: ", error);
  //       }
  //     }
  //   };
  // };

  return (
    <ReactQuillEditor onChange={onChangeContent} />
  );
}



export default DescriptionDetail;
