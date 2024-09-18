import React from 'react';
import { Transaction } from '../App';

interface SummaryProps {
  transactions: Transaction[];
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className='px-10 mb-10'>
      <div className="mt-8 ">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="grid grid-cols-3 gap-4 bg-gray-100 rounded-lg">
        <div>
          <p className="font-bold">Total Income</p>
          <p className="text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div>
          <p className="font-bold">Total Expenses</p>
          <p className="text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        <div>
          <p className="font-bold">Balance</p>
          <p className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Summary;