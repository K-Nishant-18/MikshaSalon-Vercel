import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, User, Clock, Home, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface Booking {
    id: number;
    customerName: string;
    customerPhone: string;
    customerEmail?: string | null;
    serviceName: string;
    serviceCategory: string;
    bookingDate: string;
    status: string;
    notes: string | null;
    createdAt: string;
}

export default function AdminPage() {
    const [, setLocation] = useLocation();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
    const { toast } = useToast();

    // Check authentication
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            setLocation('/login');
        }
    }, [setLocation]);

    // Fetch bookings from API
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bookings');
            if (!response.ok) throw new Error('Failed to fetch bookings');
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to load bookings'
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
    const completedCount = bookings.filter(b => b.status === 'completed').length;

    const updateBookingStatus = async (id: number, newStatus: string) => {
        try {
            const response = await fetch(`/api/bookings?id=${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update booking');

            // Update local state
            setBookings(prev =>
                prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
            );

            toast({
                title: 'Success',
                description: `Booking ${newStatus}`
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update booking'
            });
        }
    };

    const deleteBooking = async (id: number) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            const response = await fetch(`/api/bookings?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete booking');

            setBookings(prev => prev.filter(b => b.id !== id));

            toast({
                title: 'Success',
                description: 'Booking deleted'
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to delete booking'
            });
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        setLocation('/login');
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_50%)]" />
            {/* Navbar */}
            <nav className="bg-black/40 backdrop-blur-sm border-b border-gold/10 sticky top-0 z-10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center gap-3">
                                <img src="/logo2.png" alt="MISHKA Logo" className="w-20 h-10 object-cover" />
                                {/* <div className="flex flex-col leading-tight">
                                    <span className="text-white text-lg font-serif">MISHKA</span>
                                    <span className="text-gold/70 text-xs -mt-1">Admin Portal</span>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/">
                                <Button variant="outline" className="flex items-center gap-2 border-gold/30 text-white hover:bg-gold/10">
                                    <Home className="w-4 h-4" />
                                    <span>Back to Website</span>
                                </Button>
                            </Link>
                            <Button onClick={handleLogout} className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-semibold">
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-white/60">Manage your salon bookings effectively</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-l-4 border-l-gold hover:shadow-xl transition-shadow bg-white/5 backdrop-blur-sm border-gold/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/80">Total Bookings</CardTitle>
                            <Calendar className="h-5 w-5 text-gold" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">{bookings.length}</div>
                            <p className="text-xs text-white/50 mt-1">All time bookings</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-400 hover:shadow-xl transition-shadow bg-white/5 backdrop-blur-sm border-gold/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/80">Pending</CardTitle>
                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-yellow-400">{pendingCount}</div>
                            <p className="text-xs text-white/50 mt-1">Awaiting confirmation</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-400 hover:shadow-xl transition-shadow bg-white/5 backdrop-blur-sm border-gold/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/80">Confirmed</CardTitle>
                            <CheckCircle className="h-5 w-5 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-400">{confirmedCount}</div>
                            <p className="text-xs text-white/50 mt-1">Ready to serve</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-400 hover:shadow-xl transition-shadow bg-white/5 backdrop-blur-sm border-gold/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/80">Completed</CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-400">{completedCount}</div>
                            <p className="text-xs text-white/50 mt-1">Successfully done</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6 bg-white/5 backdrop-blur-sm border-gold/20">
                    <CardHeader>
                        <CardTitle className="text-white">Filter Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={filter === 'all' ? 'default' : 'outline'}
                                onClick={() => setFilter('all')}
                                className={filter === 'all' ? 'flex items-center gap-2 bg-gold hover:bg-gold/90 text-black' : 'flex items-center gap-2 border-gold/30 text-white hover:bg-gold/10'}
                            >
                                All ({bookings.length})
                            </Button>
                            <Button
                                variant={filter === 'pending' ? 'default' : 'outline'}
                                onClick={() => setFilter('pending')}
                                className={filter === 'pending' ? 'flex items-center gap-2 bg-gold hover:bg-gold/90 text-black' : 'flex items-center gap-2 border-gold/30 text-white hover:bg-gold/10'}
                            >
                                <AlertCircle className="w-4 h-4" />
                                Pending ({pendingCount})
                            </Button>
                            <Button
                                variant={filter === 'confirmed' ? 'default' : 'outline'}
                                onClick={() => setFilter('confirmed')}
                                className={filter === 'confirmed' ? 'flex items-center gap-2 bg-gold hover:bg-gold/90 text-black' : 'flex items-center gap-2 border-gold/30 text-white hover:bg-gold/10'}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Confirmed ({confirmedCount})
                            </Button>
                            <Button
                                variant={filter === 'completed' ? 'default' : 'outline'}
                                onClick={() => setFilter('completed')}
                                className={filter === 'completed' ? 'flex items-center gap-2 bg-gold hover:bg-gold/90 text-black' : 'flex items-center gap-2 border-gold/30 text-white hover:bg-gold/10'}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Completed ({completedCount})
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings List */}
                <Card className="bg-white/5 backdrop-blur-sm border-gold/20">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
                                <p className="text-white/60 mt-4">Loading bookings...</p>
                            </div>
                        ) : filteredBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="w-16 h-16 text-gold/30 mx-auto mb-4" />
                                <p className="text-white/70 text-lg">No bookings found</p>
                                <p className="text-white/40 text-sm">Bookings will appear here once customers make appointments</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="border-2 border-gold/20 rounded-xl p-6 hover:shadow-xl hover:border-gold/40 transition-all bg-white/5 backdrop-blur-sm"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <User className="h-5 w-5 text-gold" />
                                                    <span className="font-bold text-lg text-white">{booking.customerName}</span>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending'
                                                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                            : booking.status === 'confirmed'
                                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                                : 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                            }`}
                                                    >
                                                        {booking.status.toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <div className="flex items-center gap-2 text-white/60">
                                                        <Phone className="h-4 w-4" />
                                                        <span className="text-sm">{booking.customerPhone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/60">
                                                        <Calendar className="h-4 w-4" />
                                                        <span className="text-sm">
                                                            {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="bg-gold/5 border border-gold/20 rounded-lg p-3">
                                                    <span className="font-semibold text-white/80">Service:</span>{' '}
                                                    <span className="text-white">{booking.serviceName}</span>
                                                    <span className="ml-2 text-xs bg-gold/20 text-gold border border-gold/30 px-2 py-1 rounded">
                                                        {booking.serviceCategory}
                                                    </span>
                                                </div>

                                                {booking.notes && (
                                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                                        <span className="font-semibold text-white/80">Notes:</span>{' '}
                                                        <span className="text-white/60 italic">{booking.notes}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex lg:flex-col gap-2">
                                                {booking.status === 'pending' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-blue-600 hover:bg-blue-700"
                                                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Confirm
                                                    </Button>
                                                )}
                                                {booking.status === 'confirmed' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Complete
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => deleteBooking(booking.id)}
                                                >
                                                    <XCircle className="w-4 h-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
