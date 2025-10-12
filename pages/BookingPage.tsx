
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { GIGS, USERS } from '../constants';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useTranslation } from '../hooks/useTranslation';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const [messages, setMessages] = useState([
    { id: '1', sender: 'worker', text: 'Hello! I see you are interested in my service. How can I help you today?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const gig = GIGS.find(g => g.id === id);
  if (!user) return <Navigate to="/login" />;
  if (!gig) return <p>{t('gig_detail_not_found')}</p>;

  const worker = USERS.find(u => u.id === gig.workerId);
  if (!worker) return <p>{t('gig_detail_worker_not_found')}</p>;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now().toString(), sender: 'user', text: newMessage }]);
      setNewMessage('');
      // Simulate worker reply
      setTimeout(() => {
        setMessages(prev => [...prev, {id: Date.now().toString(), sender: 'worker', text: 'Thank you for your message. I will be with you shortly.'}]);
      }, 1500);
    }
  };
  
  const handlePayment = () => {
    setIsModalOpen(true);
    setPaymentStatus('pending');
    // Simulate MonCash API call
    setTimeout(() => {
      // Simulate success/failure randomly
      const success = Math.random() > 0.2;
      setPaymentStatus(success ? 'success' : 'failed');
    }, 3000);
  };
  
  const renderPaymentStatus = () => {
    switch(paymentStatus) {
      case 'pending':
        return <div className="text-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mx-auto"></div><p className="mt-4 text-lg">{t('booking_payment_pending')}</p></div>;
      case 'success':
        return <div className="text-center"><svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p className="mt-4 text-lg text-green-700">{t('booking_payment_success_title')}</p><p className="text-sm">{t('booking_payment_success_subtitle')}</p></div>;
      case 'failed':
        return <div className="text-center"><svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p className="mt-4 text-lg text-red-700">{t('booking_payment_failed_title')}</p><p className="text-sm">{t('booking_payment_failed_subtitle')}</p></div>;
      default:
        return null;
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Order Summary */}
      <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
        <h2 className="text-2xl font-bold border-b pb-3 mb-4">{t('booking_order_summary')}</h2>
        <img src={gig.image} alt={gig.title} className="w-full h-40 object-cover rounded-lg mb-4"/>
        <h3 className="font-bold text-lg">{gig.title}</h3>
        <p className="text-sm text-gray-600">{t('by')} {worker.name}</p>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <span className="font-semibold">{t('total')}</span>
          <span className="text-2xl font-bold text-brand-primary">${gig.price.toFixed(2)}</span>
        </div>
        <Button onClick={handlePayment} variant="secondary" className="w-full mt-6" disabled={paymentStatus === 'pending' || paymentStatus === 'success'}>
          {paymentStatus === 'success' ? t('booking_paid') : t('booking_pay_with_moncash')}
        </Button>
      </div>

      {/* Chat Window */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg flex flex-col" style={{height: '600px'}}>
        <h2 className="text-2xl font-bold border-b pb-3 mb-4">{t('booking_chat_with')} {worker.name}</h2>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-xl p-3 max-w-xs ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-200 text-brand-dark'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('booking_chat_placeholder')}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
          <Button type="submit">{t('booking_chat_send')}</Button>
        </form>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('booking_payment_modal_title')}>
        {renderPaymentStatus()}
      </Modal>
    </div>
  );
};

export default BookingPage;
