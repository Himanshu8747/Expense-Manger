import React, { useState } from 'react';
import { Transaction } from '../App'

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount && date) {
      onAddTransaction({
        description,
        amount: parseFloat(amount),
        date,
        type,
      });
      setDescription('');
      setAmount('');
      setDate('');
      setType('expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 flex flex-col">
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="expense"
            value="expense"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
            className="mr-2"
          />
          <label htmlFor="expense" className="mr-4">Expense</label>
          <input
            type="radio"
            id="income"
            value="income"
            checked={type === 'income'}
            onChange={() => setType('income')}
            className="mr-2"
          />
          <label htmlFor="income">Income</label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;