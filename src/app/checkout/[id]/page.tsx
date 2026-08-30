'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Source_Serif_4, Inter } from 'next/font/google';

const serif = Source_Serif_4({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad' | 'ssl'>('bkash');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (!courseId) return;
        async function fetchCourseDetails() {
            try {
                setLoading(true);
                const res = await fetch(`https://ai-learning-hub-server-side.onrender.com/api/v1/courses/${courseId}`);
                const result = await res.json();
                if (result.success) setCourse(result.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourseDetails();
    }, [courseId]);

    const handleCurrencySwitch = (newCurrency: 'BDT' | 'USD') => {
        setCurrency(newCurrency);
        setPaymentMethod(newCurrency === 'USD' ? 'card' : 'bkash');
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!formData.name || !formData.email || !formData.phone) {
            setErrorMsg('Please fill in all required fields.');
            return;
        }

        try {
            setSubmitting(true);
            // Simulate or execute payment/enrollment API request here
            const payload = {
                courseId,
                currency,
                paymentMethod,
                amount: currency === 'USD' ? priceUSD : priceBDT,
                customer: formData,
            };

            // Example API call placeholder:
            // const res = await fetch('https://ai-learning-hub-server-side.onrender.com/api/v1/payments/initiate', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload),
            // });
            // const data = await res.json();
            // if (data.url) router.push(data.url);

            // Simulated delay for interactive feedback
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert(`Successfully initiated checkout for ${course.title} using ${paymentMethod.toUpperCase()}!`);
        } catch (err) {
            console.error(err);
            setErrorMsg('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const rootFonts = `${serif.variable} ${inter.variable} font-[family-name:var(--font-body)]`;

    if (loading) {
        return (
            <div className={`w-full min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-[#1F2A22]/60 font-medium space-y-4 ${rootFonts}`}>
                <div className="w-8 h-8 border-[3px] border-[#0F4C36] border-t-transparent rounded-full animate-spin" />
                <p>Loading checkout securely…</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className={`w-full min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-[#1F2A22]/60 font-medium space-y-4 ${rootFonts}`}>
                <p className="text-xl">Course not found.</p>
                <button onClick={() => router.back()} className="px-6 py-2 bg-[#1F2A22]/10 text-[#1F2A22] rounded-lg hover:bg-[#1F2A22]/15 transition-colors">
                    Go Back
                </button>
            </div>
        );
    }

    const isFree = !course.price || course.price.toString().toLowerCase() === 'free' || course.price == 0;

    if (isFree) {
        return (
            <div className={`w-full min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center ${rootFonts}`}>
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-[#E4E9E1]">
                    <div className="w-16 h-16 bg-[#0F4C36]/10 text-[#0F4C36] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1F2A22] mb-2 font-[family-name:var(--font-display)]">No Payment Required</h2>
                    <p className="text-[#1F2A22]/60 mb-8 leading-relaxed">This is a free course. You can enroll directly without going through checkout.</p>
                    <div className="flex flex-col space-y-3">
                        <button className="w-full py-4 bg-[#0F4C36] text-white rounded-xl font-bold hover:bg-[#0F4C36]/90 transition-all shadow-md">
                            Enroll for Free
                        </button>
                        <button onClick={() => router.back()} className="w-full py-4 bg-[#1F2A22]/5 text-[#1F2A22] rounded-xl font-bold hover:bg-[#1F2A22]/10 transition-all">
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const basePriceNumeric = parseFloat(course.price.toString().replace(/[^0-9.]/g, '')) || 129;
    const priceUSD = basePriceNumeric;
    const priceBDT = basePriceNumeric * 115;
    const displayPrice = currency === 'USD' ? `$${priceUSD}` : `৳${priceBDT.toLocaleString()}`;

    const paymentOptions = [
        { id: 'bkash', label: 'bKash', sub: 'Mobile financial service', letter: 'b', color: '#E2136E' },
        { id: 'nagad', label: 'Nagad', sub: 'Digital wallet', letter: 'N', color: '#F7931E' },
        { id: 'ssl', label: 'SSLCommerz', sub: 'Cards & local banks', letter: 'S', color: '#2F5FDB' },
    ] as const;

    return (
        <div className={`w-full min-h-screen bg-[#FAF8F5] text-[#1F2A22] grid grid-cols-1 lg:grid-cols-2 ${rootFonts}`}>

            {/* LEFT COLUMN (Sticky branding & back button) */}
            <div className="relative p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E4E9E1] bg-[#E9EEE4] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center space-x-2 text-[#1F2A22]/60 hover:text-[#1F2A22] transition-all bg-white/70 hover:bg-white px-4 py-2 rounded-full border border-[#1F2A22]/10 shadow-sm mb-12 group"
                    >
                        <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-bold text-sm tracking-wide">Back</span>
                    </button>

                    <div className="max-w-md">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-[#4A6B52] uppercase mb-4">
                            Your Next Chapter
                        </p>
                        <h1 className="text-5xl lg:text-6xl font-bold text-[#161D18] tracking-tight mb-5 leading-[1.08] font-[family-name:var(--font-display)]">
                            Save your seat.
                        </h1>
                        <p className="text-base text-[#4A554C] leading-relaxed mb-6">
                            Join a small,{' '}
                            <span className="text-[#3457C4] font-semibold">curious cohort</span>{' '}
                            and leave with work you're{' '}
                            <span className="text-[#9C7A1E] font-semibold">proud</span> to put your{' '}
                            <span className="text-[#9C7A1E] font-semibold">name</span> on.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#0F4C36] font-semibold mt-12">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout · No hidden fees</span>
                </div>
            </div>

            {/* RIGHT COLUMN (Interactive Form & Order Summary) */}
            <div className="p-8 lg:p-16 flex flex-col justify-center bg-[#FAF8F5]">
                <div className="max-w-md w-full mx-auto">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-[11px] font-bold text-[#1F2A22]/40 uppercase tracking-widest mb-2">
                                Enrollment
                            </p>
                            <h2 className="text-xl font-bold text-[#161D18] leading-snug pr-4 font-[family-name:var(--font-display)]">
                                {course.title}
                            </h2>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-2xl font-bold text-[#9C7A1E]">{displayPrice}</p>
                            <p className="text-[10px] text-[#1F2A22]/35 font-bold uppercase tracking-wider mt-0.5">one time</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#3457C4]/80 font-medium mb-6">{course.duration || '8-week live masterclass'}</p>

                    <hr className="border-[#E4E9E1] mb-6" />

                    <div className="inline-flex bg-[#EFECE6] p-1 rounded-lg mb-8 border border-[#E4E9E1]">
                        <button
                            type="button"
                            onClick={() => handleCurrencySwitch('BDT')}
                            className={`px-5 py-2 text-sm font-bold rounded-md transition-all ${currency === 'BDT' ? 'bg-white shadow-sm text-[#161D18] ring-1 ring-[#E4E9E1]' : 'text-[#1F2A22]/45 hover:text-[#1F2A22]/70'}`}
                        >
                            ৳ BDT
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCurrencySwitch('USD')}
                            className={`px-5 py-2 text-sm font-bold rounded-md transition-all ${currency === 'USD' ? 'bg-white shadow-sm text-[#161D18] ring-1 ring-[#E4E9E1]' : 'text-[#1F2A22]/45 hover:text-[#1F2A22]/70'}`}
                        >
                            $ USD
                        </button>
                    </div>

                    {errorMsg && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleCheckout}>
                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-[#161D18] mb-2">Full name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white border border-[#E4E9E1] px-4 py-3 rounded-lg focus:outline-none focus:border-[#0F4C36] focus:ring-2 focus:ring-[#0F4C36]/10 transition-all font-medium text-[#161D18] placeholder:text-[#1F2A22]/30 shadow-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#161D18] mb-2">Email address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white border border-[#E4E9E1] px-4 py-3 rounded-lg focus:outline-none focus:border-[#0F4C36] focus:ring-2 focus:ring-[#0F4C36]/10 transition-all font-medium text-[#161D18] placeholder:text-[#1F2A22]/30 shadow-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#161D18] mb-2">Phone number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-white border border-[#E4E9E1] px-4 py-3 rounded-lg focus:outline-none focus:border-[#0F4C36] focus:ring-2 focus:ring-[#0F4C36]/10 transition-all font-medium text-[#161D18] placeholder:text-[#1F2A22]/30 shadow-sm"
                                    placeholder="+880 1700 000000"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-[11px] font-bold text-[#1F2A22]/40 uppercase tracking-widest mb-3">
                                Choose how to pay
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {currency === 'USD' ? (
                                    <div
                                        onClick={() => setPaymentMethod('card')}
                                        className={`col-span-1 sm:col-span-2 relative flex items-center gap-3 p-3.5 bg-white rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-2 border-[#5C3BFF] shadow-sm' : 'border border-[#E4E9E1] hover:border-[#1F2A22]/20'}`}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#5C3BFF] text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-[#161D18] leading-tight">International card</p>
                                            <p className="text-xs text-[#1F2A22]/45">Visa, Mastercard & more</p>
                                        </div>
                                        {paymentMethod === 'card' && (
                                            <svg className="w-4 h-4 text-[#5C3BFF] absolute top-3 right-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        )}
                                    </div>
                                ) : (
                                    paymentOptions.map((opt, i) => (
                                        <div
                                            key={opt.id}
                                            onClick={() => setPaymentMethod(opt.id)}
                                            className={`relative flex items-center gap-3 p-3.5 bg-white rounded-xl cursor-pointer transition-all ${i === 2 ? 'col-span-1 sm:col-span-2' : ''} ${paymentMethod === opt.id ? 'border-2 shadow-sm' : 'border border-[#E4E9E1] hover:border-[#1F2A22]/20'}`}
                                            style={paymentMethod === opt.id ? { borderColor: opt.color } : undefined}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0"
                                                style={{ backgroundColor: opt.color }}
                                            >
                                                {opt.letter}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-[#161D18] leading-tight">{opt.label}</p>
                                                <p className="text-xs text-[#1F2A22]/45">{opt.sub}</p>
                                            </div>
                                            {paymentMethod === opt.id && (
                                                <svg className="w-4 h-4 absolute top-3 right-3" style={{ color: opt.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#0F4C36] hover:bg-[#0F4C36]/90 hover:-translate-y-0.5 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {submitting ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Pay {displayPrice} securely</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-[#1F2A22]/40 font-medium mt-6">
                        By continuing, you agree to our <a href="#" className="underline hover:text-[#1F2A22]/70">Terms of Service</a> and <a href="#" className="underline hover:text-[#1F2A22]/70">Refund Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}