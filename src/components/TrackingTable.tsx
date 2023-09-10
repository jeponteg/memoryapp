import React, { FC } from "react";

interface TrackingTableProps {
  userName: string;
  errors: number;
  successes: number;
}

const TrackingTable: FC<TrackingTableProps> = ({ userName, errors, successes }) => {
  return (
    <div className="scoreboard">
      <table className="table-auto bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Errors</th>
            <th className="px-4 py-2 text-center">Successes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="px-4 py-2">{userName}</td>
            <td className="px-4 py-2">{errors}</td>
            <td className="px-4 py-2">{successes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrackingTable;
