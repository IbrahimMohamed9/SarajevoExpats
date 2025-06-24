"use client";

import { useState, useMemo } from "react";
import TableCell from "@mui/material/TableCell";
import ActionBtn from "@adminMol/ActionBtn";
import Image from "next/image";
import ImageDialog from "./ImageDialog";
import dynamic from "next/dynamic";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axiosInstance from "@/config/axios";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { tablesAtom } from "@/store/atoms/tablesAtom";
import {
  PREFERRED_FIELD_ORDER,
  IGNORED_FIELDS,
} from "@/constants/tableConstants";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const ValueTableRow = ({
  values,
  onUpdateClick,
  onDeleteClick,
  tableKey,
  actions = true,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const setSnackbar = useSetRecoilState(snackbarState);
  const setTables = useSetRecoilState(tablesAtom);
  const cellClass =
    "max-w-20 overflow-hidden text-ellipsis text-wrap line-clamp-3 min-w-48";

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const cellEntries = useMemo(() => {
    const filteredEntries = Object.entries(values).filter(
      ([key, val]) =>
        !IGNORED_FIELDS.includes(key) &&
        !(typeof val === "object" && !Array.isArray(val))
    );

    return filteredEntries.sort((a, b) => {
      const indexA = PREFERRED_FIELD_ORDER.indexOf(a[0]);
      const indexB = PREFERRED_FIELD_ORDER.indexOf(b[0]);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a[0].localeCompare(b[0]);
    });
  }, [values]);

  const cells = cellEntries.map(([key, val]) => {
    const isCheckbox = [
      "pinned",
      "showInSlider",
      "approved",
      "isLastDayOfRegistration",
      "isActive",
    ].includes(key);
    const isNumber = typeof val === "number";
    const isPictures = key === "pictures" || key === "childPosts";
    const isPhoto = key === "photo" || key === "picture";
    const isTags = key === "tags" && Array.isArray(val);
    const isDate =
      key.toLowerCase().includes("date") ||
      key === "createdAt" ||
      key === "updatedAt";
    const isEmail = key === "email";
    const isPhone = key === "phone";
    const isLink = key === "link" || key === "website";
    const isContent = key === "content";

    if (isCheckbox) {
      // Special handling for the 'approved' field
      if (key === "approved") {
        const handleApproveToggle = async () => {
          try {
            const path = `/${tableKey.split("/")[0]}/${values._id}`;
            const updatedData = { approved: !values[key] };

            const res = await axiosInstance.put(path, updatedData);

            setTables((prev) => ({
              ...prev,
              [tableKey]: prev[tableKey].map((item) =>
                item._id === values._id ? { ...item, ...updatedData } : item
              ),
            }));

            setSnackbar({
              open: true,
              message: `Place ${
                !values[key] ? "approved" : "unapproved"
              } successfully`,
              severity: "success",
            });
          } catch (error) {
            setSnackbar({
              open: true,
              message: error.response?.data?.message || "Something went wrong!",
              severity: "error",
            });
          }
        };

        return (
          <TableCell key={key} className="h-full" data-content={key}>
            <div className="flex items-center justify-center gap-2">
              <Checkbox
                checked={values[key]}
                onChange={handleApproveToggle}
                color="success"
              />
              <Tooltip title={values[key] ? "Unapprove" : "Approve"}>
                <IconButton
                  onClick={handleApproveToggle}
                  color={values[key] ? "success" : "error"}
                  size="small"
                >
                  {values[key] ? <CheckCircleIcon /> : <CancelIcon />}
                </IconButton>
              </Tooltip>
            </div>
          </TableCell>
        );
      }

      // For other boolean fields (pinned, showInSlider)
      return (
        <TableCell key={key} className="h-full" data-content={key}>
          <div
            className={`
              flex items-center justify-center h-full w-full ${
                values[key]
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } text-center px-2 py-2 text-sm font-medium rounded-md
            `}
          >
            {values[key] ? "True" : "False"}
          </div>
        </TableCell>
      );
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
        <TableCell
          key={key}
          component="th"
          scope="row"
          className="min-w-24"
          data-content={key}
        >
          <div className="flex flex-row items-center pl-[60px]">
            {imagesElements}
          </div>
        </TableCell>
      );
    }

    if (isPhoto) {
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          className="min-w-24"
          data-content={key}
        >
          <div
            className="relative w-20 h-20 group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200 -ml-[60px] first:ml-0 hover:translate-x-2 hover:z-10"
            onClick={() => handleImageClick(val)}
          >
            <Image
              src={val.displayUrl || val}
              alt={`Image`}
              fill
              className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-200"
              sizes="80px"
            />
          </div>
        </TableCell>
      );
    }
    if (isTags) {
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
        >
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

    // Handle date fields
    if (isDate) {
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
        >
          {val ? (
            <div className="text-gray-700 font-medium">{val}</div>
          ) : (
            <span className="text-gray-400 italic">—</span>
          )}
        </TableCell>
      );
    }

    // Handle email fields
    if (isEmail && val) {
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
        >
          <a
            href={`mailto:${val}`}
            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            {val}
          </a>
        </TableCell>
      );
    }

    // Handle phone fields
    if (isPhone && val) {
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
        >
          <a
            href={`tel:${val}`}
            className="text-green-600 hover:text-green-800 hover:underline flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            {val}
          </a>
        </TableCell>
      );
    }

    // Handle link/website fields
    if (isLink && val) {
      const displayUrl = val.replace(/^https?:\/\//i, "").replace(/\/$/, "");
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
        >
          <a
            href={val.startsWith("http") ? val : `https://${val}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 hover:underline flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
            {displayUrl}
          </a>
        </TableCell>
      );
    }

    // Handle content fields with truncation
    if (isContent && val) {
      const truncatedContent =
        val.length > 100 ? `${val.substring(0, 100)}...` : val;
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
          title={val}
        >
          <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {truncatedContent}
          </div>
        </TableCell>
      );
    }

    // Handle arrays (not tags or pictures)
    if (Array.isArray(val) && !isPictures && !isTags) {
      return (
        <TableCell
          key={key}
          component="th"
          scope="row"
          align="center"
          data-content={key}
        >
          <div className="flex flex-wrap gap-1 justify-center">
            {val.length > 0 ? (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                {val.length} items
              </span>
            ) : (
              <span className="text-gray-400 text-sm">Empty</span>
            )}
          </div>
        </TableCell>
      );
    }

    // Handle all other values
    const value = isNumber ? String(val) : val;

    return (
      <TableCell
        key={key}
        component="th"
        scope="row"
        align="center"
        data-content={key}
      >
        {value === "" || value === null || value === undefined ? (
          <span className="text-gray-400 italic">—</span>
        ) : (
          <SafeHtml className={cellClass} content={value} />
        )}
      </TableCell>
    );
  });

  // Create a consistent table row by ensuring each cell has the proper data-content attribute
  return (
    <>
      {cells}
      {actions && (
        <TableCell key="actions" align="center" data-content="actions">
          <ActionBtn
            onDelete={() => onDeleteClick?.(values._id)}
            onUpdate={() => onUpdateClick?.(values)}
            itemData={values}
            tableKey={tableKey}
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
