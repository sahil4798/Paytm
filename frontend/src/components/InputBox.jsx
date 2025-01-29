const InputBox = ({ label, placeholder, onChange, value }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        className=" w-full px-2 py-1 border  rounded shadow-sm border-slate-200"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputBox;
