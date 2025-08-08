import React, { useState, useEffect, useCallback } from 'react';
import SummaryCards from './summarycards';
import QuickAddTransaction from './addtrancstion';
import Charts from './chart';
import RecentTransactions from './rtranscation';
import { FaPlus } from 'react-icons/fa';
// import SummaryCards from './SummaryCards';
// import Charts from './Charts';
// import RecentTransactions from './RecentTransactions';
// import QuickAddTransaction from './QuickAddTransaction';

const Dashboard = () => {
  const user = localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {}
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("")

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

  const handleShow = () => {
    setShow(!show)
  }
  const handleEdit = (id) => {
    setId(id)
    handleShow()
  }
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
  const editTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === updatedTransaction.id 
        ? updatedTransaction 
        : transaction
    );
        setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
    setId("")

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
        <div className=''>
          <button onClick={handleShow} className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaPlus className="w-4 h-4 mr-2" />
            Add Transaction
          </button>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Quick Add Transaction */}

          <QuickAddTransaction onAdd={addTransaction} handleClose={handleShow} show={show} id={id} update={editTransaction} />

          {/* Charts */}
          <Charts transactions={transactions} />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions
          transactions={transactions.slice(-5)}
          onRefresh={loadTransactions}
          handleEdit={handleEdit}
        />
      </div>
    </div>

  );
};

export default Dashboard;