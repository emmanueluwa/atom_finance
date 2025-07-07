import React from "react";
import { v4 as uuidv4 } from "uuid";

type ConfigItem<T> = {
  label: string;
  render: (company: T) => string | number;
};

interface Props<T> {
  config: ConfigItem<T>[];
  data: T[];
}

const Table = <T,>({ config, data }: Props<T>) => {
  const renderedRows = data.map((company) => {
    return (
      <tr key={uuidv4()}>
        {config.map((val: ConfigItem<T>) => {
          return (
            <td className="p-3" key={uuidv4()}>
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  const renderedHeaders = config.map((config: ConfigItem<T>) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide-gray-200 m-5">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
