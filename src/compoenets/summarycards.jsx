import React from 'react';
import { BsBarChart } from 'react-icons/bs';
import { LuDollarSign } from 'react-icons/lu';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';

const SummaryCards = ({ summary }) => {
  const cards = [
    {
      title: 'Total Income',
      value: `$${summary.totalIncome.toFixed(2)}`,
      icon: <IoIosTrendingUp  className="w-6 h-6 text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Expenses',
      value: `$${summary.totalExpenses.toFixed(2)}`,
      icon: <IoIosTrendingDown  className="w-6 h-6 text-red-500" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Current Balance',
      value: `$${summary.currentBalance.toFixed(2)}`,
      icon: <LuDollarSign  className={`w-6 h-6 ${summary.currentBalance >= 0 ? "text-green-500" : "text-red-500"}`} />,
      bgColor: summary.currentBalance >= 0 ? 'bg-green-50' : 'bg-red-50',
      textColor: summary.currentBalance >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: 'Avg Monthly Expense',
      value: `$${summary.avgExpensePerMonth.toFixed(2)}`,
      icon: <BsBarChart className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-200`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <div className="p-2 bg-white rounded-lg">
              {card.icon}
            </div>
          </div>
          <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;