import React, { useState } from 'react';

interface ContactFormProps {
    onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Investor',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Contact Form Submitted:", formData);
        // In a real app, send this to a service like Firebase or Formspree
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-lg w-full text-left relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">&times;</button>
                
                {!submitted ? (
                    <>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Investor Pack</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">We'll send the full investment memorandum to your email.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Name</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">I am a(n)...</label>
                                <select name="role" id="role" value={formData.role} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition">
                                    <option>Investor</option>
                                    <option>Engineer</option>
                                    <option>Partner</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Message (Optional)</label>
                                <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition" />
                            </div>
                            <button type="submit" className="w-full bg-[#F72585] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105">
                                Send Request
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h3>
                        <p className="text-slate-600 dark:text-slate-300">Thank you for your interest. We will be in touch shortly at {formData.email}.</p>
                        <button onClick={onClose} className="mt-6 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold py-2 px-6 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactForm;