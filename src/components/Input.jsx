const Input = ({ id, type = "text", placeholder, value, onChange, showError }) => (
  <div className="relative w-full">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      className={`peer w-full px-3.5 pt-3 pb-2 text-sm text-[#1D2226] border rounded-md appearance-none focus:outline-none focus:ring-[0.5px] ${
        showError
          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
          : "border-[#CBCBCB] focus:ring-[#6C25FF] focus:border-[#6C25FF]"
      }`}
    />
    <label
      htmlFor={id}
      className={`absolute text-[13px] left-2 -top-2 pl-1.5 pr-2 leading-[17px] bg-[#F7F8F9] ${
        showError ? "text-red-500" : "text-[#6C25FF]"
      }`}
    >
      {placeholder}
      <span className="ml-0.5 text-red-500">*</span>
    </label>
  </div>
);

export default Input;
