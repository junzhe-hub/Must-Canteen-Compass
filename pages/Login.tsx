
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/auth';
import { LogIn, User, Lock, ArrowRight, Ghost } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, showToast } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      const user = await authService.login(email, password);
      login(user);
      showToast(`欢迎回来，${user.userName}`);
      navigate('/');
    } catch (error: any) {
      showToast(error.message || '登录失败', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    const guest = await authService.guestLogin();
    login(guest);
    showToast('已进入游客模式', 'info');
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">MUST 食堂</h1>
          <p className="text-gray-500">发现校园美味，拒绝踩雷</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center">
            <User className="text-gray-400 mr-3" size={20} />
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="must.edu.mo 邮箱"
              className="bg-transparent flex-1 outline-none text-sm font-medium"
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center">
            <Lock className="text-gray-400 mr-3" size={20} />
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="密码"
              className="bg-transparent flex-1 outline-none text-sm font-medium"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            {isLoading ? <span>登录中...</span> : (
              <>
                <span>登录</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center space-y-4">
          <button 
            onClick={() => navigate('/register')}
            className="text-sm font-bold text-gray-900"
          >
            注册新账号
          </button>

          <div className="w-full flex items-center justify-center space-x-2 my-2">
            <div className="h-px bg-gray-200 w-12"></div>
            <span className="text-xs text-gray-400">或</span>
            <div className="h-px bg-gray-200 w-12"></div>
          </div>

          <button 
            onClick={handleGuestLogin}
            className="text-sm text-gray-500 flex items-center hover:text-gray-700"
          >
            <Ghost size={16} className="mr-1" />
            游客随便逛逛
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
