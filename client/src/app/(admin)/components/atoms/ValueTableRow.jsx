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

    if (ignoreKeys.includes(key) || typeof val === "object") return null;

    if (key === "picture" && val) {
      return (
        <TableCell key={key} component="th" scope="row">
          <div
            className="relative w-20 h-20 group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => handleImageClick(val)}
          >
            <Image
              src={val}
              alt="Item picture"
              fill
              className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-200"
              sizes="80px"
            />
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
