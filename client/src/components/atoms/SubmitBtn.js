import { Button } from "@mui/material";
import LoadingIcon from "@icons/LoadingIcon";

const SubmitBtn = ({ isSubmitting, label = "" }) => {
  return (
    <div className="pt-4">
      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting}
        className="relative overflow-hidden bg-gradient-to-r from-main to-secondary hover:from-secondary hover:to-main 
                transition-all duration-500 text-white py-5 rounded-xl shadow-md hover:shadow-xl 
                normal-case text-lg font-medium transform hover:-translate-y-1 active:translate-y-0
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <LoadingIcon />
            <span className="animate-pulse">Processing...</span>
          </span>
        ) : (
          <span>{label}</span>
        )}
      </Button>
    </div>
  );
};

export default SubmitBtn;
