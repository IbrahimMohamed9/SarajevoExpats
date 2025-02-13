import Link from "next/link";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const UnauthorizedTemplates = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="animate-bounce mb-8">
        <WarningAmberOutlinedIcon className="h-16 w-16 text-red-500" />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          401 - Unauthorized
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          You do not have permission to access this page.
        </p>
        <Link href="/" passHref>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg 
                       shadow-md transition-all duration-200 ease-in-out 
                       hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
          >
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedTemplates;
