import React, { useState } from 'react';
import { Transaction } from '../App';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null);

  const startEditing = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditedTransaction(transaction);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedTransaction(null);
  };

  const saveEdit = () => {
    if (editedTransaction) {
      onEditTransaction(editedTransaction);
      setEditingId(null);
      setEditedTransaction(null);
    }
  };

  return (
    <div className="mt-8 px-10">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-lg leading-normal">
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black text-base font-medium">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                  {editingId === transaction.id ? (
                    <>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          value={editedTransaction?.description}
                          onChange={(e) =>
                            setEditedTransaction({ ...editedTransaction!, description: e.target.value })
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="number"
                          value={editedTransaction?.amount}
                          onChange={(e) =>
                            setEditedTransaction({
                              ...editedTransaction!,
                              amount: parseFloat(e.target.value),
                            })
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="date"
                          value={editedTransaction?.date}
                          onChange={(e) =>
                            setEditedTransaction({ ...editedTransaction!, date: e.target.value })
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <select
                          value={editedTransaction?.type}
                          onChange={(e) =>
                            setEditedTransaction({ ...editedTransaction!, type: e.target.value as 'income' | 'expense' })
                          }
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={saveEdit}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-6">{transaction.description}</td>
                      <td className="py-3 px-6">₹ {transaction.amount.toFixed(2)}</td>
                      <td className="py-3 px-6">{format(new Date(transaction.date), 'MM/dd/yyyy')}</td>
                      <td className="py-3 px-6">
                        <span className={`py-1 px-3 rounded-full text-xs ${
                          transaction.type === 'income' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'
                        }`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={() => startEditing(transaction)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
