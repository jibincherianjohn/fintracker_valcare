import React from 'react';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { FaArrowRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions, onRefresh,handleEdit }) => {
  const  user =  localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {}

  const deleteTransaction = (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const allTransactions = JSON.parse(localStorage.getItem(`transactions_${user.id}`) || '[]');
      const updatedTransactions = allTransactions.filter(t => t.id !== transactionId);
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
      onRefresh();
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <IoIosTrendingUp className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No transactions yet</p>
          <p className="text-sm text-gray-400">Add your first transaction to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
       <Link to={'/transactions'}>
          <button 
            onClick={onRefresh}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
            <FaArrowRight  className="w-4 h-4 ml-1" />
  
          </button>
       </Link>
      </div>
      
      <div className="space-y-3">
        {transactions?.map((transaction,ind) => (
          <div key={ind} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                {transaction.type === 'income' ? 
                  <IoIosTrendingUp  className="w-4 h-4 text-green-600" /> : 
                  <IoIosTrendingDown  className="w-4 h-4 text-red-600" />
                }
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.category}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  {transaction.description && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{transaction.description}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className={`font-semibold mr-3 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
              <div className="flex space-x-1">
                <button onClick={()=>handleEdit(transaction?.id)} className="p-1 text-gray-400 hover:text-blue-600 rounded">
                  <FaEdit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteTransaction(transaction.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded"
                >
                  <FaTrashAlt  className="w-4 h-4" />


                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;