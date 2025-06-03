import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
      <div className="bg-[#F7F8F9] w-[375px] h-[660px] border border-gray-200 px-5 pt-10 font-sans">
        <h1 className="text-2xl font-bold text-[#1D2226] leading-9">
          Signin to your <br /> PopX account
        </h1>
        <p className="text-base text-[#1D2226] opacity-60 leading-[22px] mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              showError={isSubmitted && errors.email}
            />
            {isSubmitted && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              showError={isSubmitted && errors.password}
            />
            {isSubmitted && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#6C25FF] rounded-md text-white text-base leading-[17px] font-medium w-full h-[46px] mt-4 hover:bg-[#5A1EDB]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
