import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { useLocation } from 'wouter';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, setLocation] = useLocation();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple password check - you can change this password
        const ADMIN_PASSWORD = 'admin123'; // TODO: Move to environment variable

        if (password === ADMIN_PASSWORD) {
            // Set session
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            setLocation('/admin');
        } else {
            setError('Incorrect password');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        MISHKA Admin Login
                    </CardTitle>
                    <p className="text-gray-600">Enter password to access admin panel</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter admin password"
                                className="w-full"
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-600 text-sm mt-2">{error}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Login
                        </Button>
                    </form>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 text-center">
                            Default password: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
                        </p>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            (Change this in production)
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
