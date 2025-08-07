import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Misc'],
  expense: ['Food', 'Transport', 'Bills', 'Rent', 'Entertainment', 'Healthcare', 'Shopping', 'Misc']
};

const QuickAddTransaction = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const newTransaction = {
      ...formData,
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString()
    };

    onAdd(newTransaction);
    
    // Reset form
    setFormData({
      amount: '',
      type: 'expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => {
    const isTypeChange = name === 'type';
    const newCategory = isTypeChange
      ? value === 'income'
        ? CATEGORIES.income[0]
        : CATEGORIES.expense[0]
      : prev.category;

    if (prev[name] === value && (!isTypeChange || prev.category === newCategory)) {
      return prev; // No actual change
    }

    return {
      ...prev,
      [name]: value,
      ...(isTypeChange && { category: newCategory }),
    };
  });
};


  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          <FaPlus  className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Quick Add Transaction</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CATEGORIES[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
          <input
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default QuickAddTransaction;