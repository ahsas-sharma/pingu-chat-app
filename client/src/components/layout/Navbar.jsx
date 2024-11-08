import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../authContext';

const Navbar = () => {
  const [buttonTitle, setButtonTitle] = useState('Login');
  const { user, logout } = useAuth();
  useEffect(() => {
    if (user) {
      setButtonTitle(user.username);
    } else {
      setButtonTitle('Login');
    }
  }, [user]);

  return (
    <header>
      <div className="container mx-auto">
        <div className="relative mx-4 sm:mx-8 my-4 flex items-center justify-between">
          <h1 className="font-pingu text-3xl sm:text-5xl">🐧 Pingu Chat</h1>
          {user === null ? (
            <Link to="/login">
              <Button title="Login" />
            </Link>
          ) : (
            <Button title={user.username} onClick={() => logout()} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
