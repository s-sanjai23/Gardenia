import React from 'react';
import './Faqs.css';

const Faqs = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries. Shipping costs will apply, and will be added at checkout.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order has shipped, you will receive an email with a tracking number.'
    }
  ];

  return (
    <div className="faqs-container">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faqs;