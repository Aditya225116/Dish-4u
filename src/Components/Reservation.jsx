import React, { useState } from 'react';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('https://my-project-932b.onrender.com/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to make reservation');

      setStatus({ loading: false, error: null, success: true });
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', specialRequests: '' });
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Failed to make reservation', success: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Make a Reservation</h1>
          <p className="mt-2 text-lg text-gray-600">Book your table at our restaurant</p>
        </div>

        {status.error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{status.error}</div>}
        {status.success && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">Reservation submitted successfully!</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <select name="time" value={formData.time} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option value="">Select Time</option>
              {['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'].map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <select name="guests" value={formData.guests} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
          <textarea name="specialRequests" placeholder="Special Requests" value={formData.specialRequests} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
          <button type="submit" disabled={status.loading} className={`px-8 py-3 bg-indigo-600 text-white font-medium rounded-md ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{status.loading ? 'Submitting...' : 'Book Table'}</button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
