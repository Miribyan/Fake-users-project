import React from "react";

function Item(props) {
  const { index, user } = props;

  return (
    <tr key={index} className="divide-x divide-y divide-gray-400 ">
      <td className="  whitespace-nowrap py-4 pl-4 pr-4 text-center text-sm font-medium text-gray-900 sm:pl-0">
        {index + 1}
      </td>
      <td className=" whitespace-nowrap p-4 text-sm text-left text-gray-500">
        {user.key}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-left text-gray-500">
        {user.name}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-left text-gray-500">
        {user.address}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-left text-gray-500 sm:pr-0">
        {user.phone}
      </td>
    </tr>
  );
}

export default Item;
