import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { registerUser } from "../../api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(form.password !== form.confirmPassword) {
      toast.error('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    try {
      const res = await registerUser(form);

      toast.success(res.data?.message);
      localStorage.setItem('fromRegister', 'true');
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <UserPlus size={40} className="mx-auto text-blue-600 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">สร้างบัญชีใหม่</h1>
            <p className="text-gray-600">กรุณากรอกข้อมูลเพื่อสมัครสมาชิก</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={18} />
                ยืนยันรหัสผ่าน
              </label>
              <input
                onChange={handleOnChange}
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02]"
            >
              สมัครสมาชิก
            </button>
          </form>

          <div className="text-center text-gray-600">
            <span>มีบัญชีอยู่แล้ว? </span>
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
