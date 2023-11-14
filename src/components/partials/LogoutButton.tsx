import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface LogoutButtonProps {}

const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  };

  return (
    <Button variant={'destructive'} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
