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
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_50%)]" />

            <Card className="w-full max-w-md relative z-10 bg-black/80 backdrop-blur-sm border-gold/20">
                <CardHeader className="text-center space-y-4 pb-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-2">
                        <img src="/logo2.png" alt="MISHKA Logo" className="w-32 h-16 object-cover" />
                        <div className="flex flex-col items-center">
                            <span className="text-white text-3xl font-serif tracking-wider">MISHKA</span>
                            <span className="text-gold/70 text-sm tracking-widest">ADMIN PORTAL</span>
                        </div>
                    </div>

                    <div className="mx-auto w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-gold" />
                    </div>

                    <div>
                        <CardTitle className="text-2xl font-serif text-white mb-2">
                            Staff Login
                        </CardTitle>
                        <p className="text-white/60 text-sm">Enter your credentials to continue</p>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                                Access Code
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
                                className="w-full bg-white/5 border-gold/20 text-white placeholder:text-white/30 focus:border-gold/50"
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                    <span className="text-red-500">✕</span> {error}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold/90 text-black font-semibold transition-all"
                        >
                            Enter Portal
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-gold/5 border border-gold/10 rounded-lg">
                        <p className="text-xs text-white/50 text-center">
                            Default password: <code className="bg-black/50 text-gold px-2 py-1 rounded">admin123</code>
                        </p>
                        <p className="text-xs text-white/40 text-center mt-1">
                            (Change this in production)
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
