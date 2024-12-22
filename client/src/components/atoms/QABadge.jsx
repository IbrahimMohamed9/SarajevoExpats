const QABadge = ({ type, number }) => {
  const bgColor = type === "Q" ? "bg-main/10" : "bg-green-100";
  const textColor = type === "Q" ? "text-main" : "text-green-600";

  return (
    <div className={`flex-shrink-0 w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
      <span className={`${textColor} font-semibold text-sm`}>
        {type === "Q" ? `Q${number}` : "A"}
      </span>
    </div>
  );
};

export default QABadge;
