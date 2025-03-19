"use client";

import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import ActionBtn from "@adminMol/ActionBtn";
import Image from "next/image";
import ImageDialog from "./ImageDialog";
import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const ValueTableRow = ({
  values,
  onUpdateClick,
  onDeleteClick,
  actions = true,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const ignoreKeys = ["_id", "subData", "__v", "password"];
  const cellClass =
    "max-w-20 overflow-hidden text-ellipsis text-wrap line-clamp-3 min-w-48";

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const cells = Object.entries(values).map(([key, val]) => {
    const isCheckbox = ["pinned", "showInSlider"].includes(key);
    const isNumber = typeof val === "number";
    const isPictures = key === "pictures" || key === "childPosts";
    const isTags = key === "tags" && Array.isArray(val);

    if (isCheckbox) {
      return (
        <TableCell key={key} className={cellClass}>
          <div
            className={`
              text-center
              px-2 py-1 rounded-full text-sm font-medium
              ${
                values[key]
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {values[key] ? "True" : "False"}
          </div>
        </TableCell>
      );
    }

    if (
      ignoreKeys.includes(key) ||
      (typeof val === "object" && !Array.isArray(val))
    ) {
      return null;
    }

    if (isPictures) {
      const imagesElements = val.map((imageUrl, index) => (
        <div
          key={index}
          className="relative w-20 h-20 group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200 -ml-[60px] first:ml-0 hover:translate-x-2 hover:z-10"
          style={{ zIndex: val.length - index }}
          onClick={() => handleImageClick(imageUrl)}
        >
          <Image
            src={imageUrl.displayUrl || imageUrl}
            alt={`Image ${index + 1}`}
            fill
            className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-200"
            sizes="80px"
          />
        </div>
      ));
      return (
        <TableCell key={key} component="th" scope="row" className="min-w-24">
          <div className="flex flex-row items-center pl-[60px]">
            {imagesElements}
          </div>
        </TableCell>
      );
    }

    if (isTags) {
      return (
        <TableCell key={key} component="th" scope="row" align="center">
          <div className="flex flex-wrap gap-1 justify-center">
            {val.length > 0 ? (
              val.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No tags</span>
            )}
          </div>
        </TableCell>
      );
    }

    const value = isNumber ? String(val) : val;

    return (
      <TableCell key={key} component="th" scope="row" align="center">
        <SafeHtml className={cellClass} content={value} />
      </TableCell>
    );
  });

  return (
    <>
      {cells}
      {actions && (
        <TableCell key="actions" align="center">
          <ActionBtn
            onDelete={() => onDeleteClick?.(values._id)}
            onUpdate={() => onUpdateClick?.(values)}
          />
        </TableCell>
      )}

      <ImageDialog
        open={!!selectedImage}
        onClose={handleCloseImage}
        imageUrl={selectedImage}
      />
    </>
  );
};

export default ValueTableRow;
