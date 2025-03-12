import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const CustomTextarea = ({ keyVal,handleChange, isRequired, fieldErrors, formData }) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div key={keyVal} className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
        {isRequired && " *"}
      </label>
      <ReactQuill
        value={formData[keyVal] || ""}
        onChange={(content) => handleChange(keyVal, content)}
        modules={quillModules}
        formats={quillFormats}
        theme="snow"
        placeholder="Write something here..."
        className={`border rounded-md shadow-sm ${
          fieldErrors[keyVal] ? "border-red-500" : ""
        }`}
      />
      {fieldErrors[keyVal] && (
        <Typography color="error" variant="caption" display="block">
          {fieldErrors[keyVal]}
        </Typography>
      )}
    </div>
  );
};

export default CustomTextarea;
