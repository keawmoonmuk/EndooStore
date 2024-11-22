import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../stores/ecom-store";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);

  const [formLogin, SetformLogin] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    SetformLogin({
      ...formLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await actionLogin(formLogin);
      const role = res.data.payload.role;

      const fromRegister = localStorage.getItem('fromRegister');
      if (fromRegister) {
        navigate("/");
        localStorage.removeItem('fromRegister');
      } else {
        roleRedirect(role);
      }

      toast.success("เข้าสู่ระบบสำเร็จ!");
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message;
      toast.error(errMsg || "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ยินดีต้อนรับกลับมา!</h1>
            <p className="text-gray-600">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail size={18} />
                อีเมล
              </label>
              <input
                onChange={handleOnChange}
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={18} />
                รหัสผ่าน
              </label>
              <input
                onChange={handleOnChange}
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500" />
                <span className="text-gray-600">จดจำฉัน</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                ลืมรหัสผ่าน?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02]"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <div className="text-center text-gray-600">
            <span>ยังไม่มีบัญชี? </span>
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
