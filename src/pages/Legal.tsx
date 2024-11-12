import React from 'react';

export function Legal() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal Information</h1>
        <p className="text-gray-600 dark:text-gray-400">
            <a href="https://www.ycombinator.com/legal/" target="_blank" className="text-blue-500 hover:underline">
                Legal information and terms of service will be displayed here.
            </a>

        </p>
    </div>
  );
}