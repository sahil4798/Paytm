import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center py-2 text-sm mt-2">
      <div>{label}</div>
      <Link className=" underline pointer pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
