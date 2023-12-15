"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const MainPage = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleRegisterClick = () => {
        router.push('/register');
    };

    return (
        <div>
            <nav>
                <Button onClick={handleLoginClick}>Login</Button>
                <Button onClick={handleRegisterClick}>Register</Button>
            </nav>
            <h1>Main Page</h1>
            {/* Add your main page content here */}
        </div>
    );
};

export default MainPage;
