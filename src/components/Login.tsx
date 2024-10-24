import React, { useState } from 'react';

interface LoginProps {
  onLogin: (password: string) => void;
  buttonText: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, buttonText }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Şifre"
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default Login;