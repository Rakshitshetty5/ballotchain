import React from 'react'

const VotingResult = ({ party, voterId }) => {
  return (
    <table className="table p-4 bg-white shadow rounded-lg">
        <thead>
            <tr>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Voter Id
                </th>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Voted For
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="text-gray-700">
                <td className="p-4">
                    {voterId}
                </td>
                <td className="p-4">
                    {party}
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default VotingResult