import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const SortableImage = ({ media, index, selected, reordering, onClick }) => {
  const imgUrl = media?.displayUrl || media;
  const selectedMediaUrl = selected?.displayUrl || selected;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: imgUrl,
    disabled: !reordering,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      onClick={onClick ? (e) => onClick(media) : undefined}
      {...(reordering ? { ...attributes, ...listeners } : {})}
      className={`relative snap-start ${
        selectedMediaUrl === imgUrl
          ? "ring-2 ring-main ring-offset-2"
          : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
      } flex-shrink-0 p-4 size-20 rounded-lg overflow-hidden ${
        reordering ? "cursor-move" : "cursor-pointer"
      } ${isDragging ? "shadow-lg" : ""}`}
    >
      <Image
        src={imgUrl}
        alt={media.alt || `Image ${index + 1}`}
        fill
        className="object-cover"
        sizes="80px"
      />
      {reordering && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <DragIndicatorIcon className="text-white" />
        </div>
      )}
    </button>
  );
};

export default SortableImage;
