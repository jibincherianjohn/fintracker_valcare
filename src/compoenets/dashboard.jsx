import React, { useState, useEffect, useCallback } from 'react';
import SummaryCards from './summarycards';
import QuickAddTransaction from './addtrancstion';
import Charts from './chart';
import RecentTransactions from './rtranscation';
// import SummaryCards from './SummaryCards';
// import Charts from './Charts';
// import RecentTransactions from './RecentTransactions';
// import QuickAddTransaction from './QuickAddTransaction';

const Dashboard = () => {
  const  user  =  localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {}
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    currentBalance: 0,
    avgIncomePerMonth: 0,
    avgExpensePerMonth: 0
  });

  useEffect(() => {
    loadTransactions();
  }, []);

const loadTransactions = useCallback(() => {
  const userTransactions = JSON.parse(localStorage.getItem(`transactions_${user.id}`) || '[]');
  setTransactions(userTransactions);
  calculateSummary(userTransactions);
}, [user.id]);

  const calculateSummary = (transactions) => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const currentBalance = totalIncome - totalExpenses;

    // Simple monthly averages (divide by 12 for yearly average)
    const avgIncomePerMonth = totalIncome / 12;
    const avgExpensePerMonth = totalExpenses / 12;

    setSummary({
      totalIncome,
      totalExpenses,
      currentBalance,
      avgIncomePerMonth,
      avgExpensePerMonth
    });
  };

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
    calculateSummary(updatedTransactions);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>
        
        {/* Summary Cards */}
        <SummaryCards summary={summary} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Add Transaction */}
          <QuickAddTransaction  onAdd={addTransaction} />
          
          {/* Charts */}
          <Charts transactions={transactions} />
        </div>
        
        {/* Recent Transactions */}
        <RecentTransactions 
          transactions={transactions.slice(-5)} 
          onRefresh={loadTransactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;