import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "Yes",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    const passwordRegex = /[^A-Za-z0-9]/; 

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Only digits are allowed";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    else if (!passwordRegex.test(formData.password)) newErrors.password = "At least 1 special character required";

    if (!formData.company.trim()) newErrors.company = "Company name is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, agency: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F9] font-sans">
      <div className="bg-[#F7F8F9] w-[375px] h-[670px] border border-gray-200 px-5 pt-10 pb-7 font-sans">
        <h1 className="text-2xl font-bold text-[#1D2226] leading-9">
          Create your <br /> PopX account
        </h1>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          {["name", "phone", "email", "password", "company"].map((field) => (
            <div key={field}>
              <Input
                id={field}
                placeholder={
                  field === "phone"
                    ? "Phone number"
                    : field === "company"
                    ? "Company name"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                value={formData[field]}
                onChange={handleChange}
                showError={isSubmitted && errors[field]}
              />
              {isSubmitted && errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <span className="text-[13px] leading-[17px] text-[#1D2226]">
              Are you an Agency?<span className="text-red-500 ml-1">*</span>
            </span>
            <div className="flex gap-6 mt-2">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="agency"
                    value={option}
                    checked={formData.agency === option}
                    onChange={handleRadioChange}
                    className="accent-[#6C25FF] size-4 cursor-pointer"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#6C25FF] rounded-md text-white text-base leading-[17px] font-medium w-full h-[46px] mt-[88px] hover:bg-[#5A1EDB]"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
