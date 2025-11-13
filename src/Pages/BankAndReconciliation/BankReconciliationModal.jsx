import React, { useState } from 'react';

export default function BankReconciliationModal() {
  const [isOpen, setIsOpen] = useState(true);

  const statementBalance = 5245.00;
  const bookBalance = 5300.00;
  const difference = -55.00;

  const bankStatementLines = [
    { date: '31/01/2025', description: 'Vendor Payment', account: 250.00 },
    { date: '31/01/2025', description: 'Check Payment', account: 100.00 },
    { date: '31/01/2025', description: 'Utility Bill', account: -100.00 },
  ];

  const systemTransactions = [
    { date: '31/01/2025', description: 'Vendor Payment', account: 250.00 },
    { date: '31/01/2025', description: 'Check Payment', account: 100.00 },
    { date: '31/01/2025', description: 'Utility Bill', account: 1200.00 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Bank Reconciliation</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import Bank Statement
            </button>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="px-6 py-4 border-b border-gray-200 flex gap-8">
          <div>
            <div className="text-xs text-gray-500 mb-1">Statement Balance</div>
            <div className="text-sm font-medium text-gray-900">₹ {statementBalance.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Book Balance</div>
            <div className="text-sm font-medium text-gray-900">₹ {bookBalance.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Difference</div>
            <div className="text-sm font-medium text-gray-900">{difference.toFixed(2)}</div>
          </div>
        </div>

        {/* Tables */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Bank Statement Lines */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Bank Statement Lines</h3>
              <div className="border border-gray-200 rounded">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Account</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bankStatementLines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-600">{line.date}</td>
                        <td className="px-3 py-2 text-gray-900">{line.description}</td>
                        <td className="px-3 py-2 text-right text-gray-900">{line.account.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Transactions */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">System Transactions</h3>
              <div className="border border-gray-200 rounded">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Account</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {systemTransactions.map((txn, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-600">{txn.date}</td>
                        <td className="px-3 py-2 text-gray-900">{txn.description}</td>
                        <td className="px-3 py-2 text-right text-gray-900">{txn.account.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
            Reconcile
          </button>
        </div>
      </div>
    </div>
  );
}