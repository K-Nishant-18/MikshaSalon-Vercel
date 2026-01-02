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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {/* Navbar */}
            <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                MISHKA Admin
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    <span>Back to Website</span>
                                </Button>
                            </Link>
                            <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Manage your salon bookings effectively</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
                            <Calendar className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
                            <p className="text-xs text-gray-500 mt-1">All time bookings</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
                            <p className="text-xs text-gray-500 mt-1">Awaiting confirmation</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Confirmed</CardTitle>
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">{confirmedCount}</div>
                            <p className="text-xs text-gray-500 mt-1">Ready to serve</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
                            <p className="text-xs text-gray-500 mt-1">Successfully done</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Filter Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={filter === 'all' ? 'default' : 'outline'}
                                onClick={() => setFilter('all')}
                                className="flex items-center gap-2"
                            >
                                All ({bookings.length})
                            </Button>
                            <Button
                                variant={filter === 'pending' ? 'default' : 'outline'}
                                onClick={() => setFilter('pending')}
                                className="flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4" />
                                Pending ({pendingCount})
                            </Button>
                            <Button
                                variant={filter === 'confirmed' ? 'default' : 'outline'}
                                onClick={() => setFilter('confirmed')}
                                className="flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Confirmed ({confirmedCount})
                            </Button>
                            <Button
                                variant={filter === 'completed' ? 'default' : 'outline'}
                                onClick={() => setFilter('completed')}
                                className="flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Completed ({completedCount})
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading bookings...</p>
                            </div>
                        ) : filteredBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No bookings found</p>
                                <p className="text-gray-400 text-sm">Bookings will appear here once customers make appointments</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="border-2 rounded-xl p-6 hover:shadow-lg transition-all bg-white"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <User className="h-5 w-5 text-purple-600" />
                                                    <span className="font-bold text-lg text-gray-900">{booking.customerName}</span>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : booking.status === 'confirmed'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-green-100 text-green-800'
                                                            }`}
                                                    >
                                                        {booking.status.toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Phone className="h-4 w-4" />
                                                        <span className="text-sm">{booking.customerPhone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
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

                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <span className="font-semibold text-gray-700">Service:</span>{' '}
                                                    <span className="text-gray-900">{booking.serviceName}</span>
                                                    <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                        {booking.serviceCategory}
                                                    </span>
                                                </div>

                                                {booking.notes && (
                                                    <div className="bg-blue-50 rounded-lg p-3">
                                                        <span className="font-semibold text-gray-700">Notes:</span>{' '}
                                                        <span className="text-gray-600 italic">{booking.notes}</span>
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
