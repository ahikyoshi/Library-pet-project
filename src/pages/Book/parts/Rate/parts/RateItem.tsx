import { FC, useEffect, useState } from 'react';
interface rateItemProps {
  name: string;
  value: number;
}

export const RateItem: FC<rateItemProps> = ({ name, value, changeRate, update }) => {
  const [rateValue, setRateValue] = useState(value);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  return (
    <div className="w-full h-12 mb-4 flex outline outline-indigo-700 rounded-sm md:w-5/12 md:mr-5">
      <div className="w-10/12 flex items-center px-2 ">{name}</div>

      <div className="w-2/12 border-l-2 border-indigo-700">
        <div className="flex h-12 items-center justify-end" onClick={() => setIsOptionOpen(true)}>
          <div className="w-full text-center text-lg">{rateValue}</div>
          <div className="px-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
            </svg>
          </div>
        </div>

        {isOptionOpen === true && (
          <div className="h-32 w-14 mt-1 border border-indigo-700 rounded-sm bg-white overflow-hidden overflow-y-auto absolute">
            <div
              className="text-center py-2 border-b-2 border-slate-300"
              onClick={() => {
                changeRate((prev) => {
                  prev[name] = 1;
                  return prev;
                });
                update((prev) => !prev);
              }}
            >
              1
            </div>
            <div
              className="text-center py-2 border-b-2 border-slate-300"
              onClick={() => {
                changeRate((prev) => {
                  prev[name] = 2;
                  return prev;
                });
                update((prev) => !prev);
              }}
            >
              2
            </div>
            <div
              className="text-center py-2 border-b-2 border-slate-300"
              onClick={() => {
                changeRate((prev) => {
                  prev[name] = 3;
                  return prev;
                });
                update((prev) => !prev);
              }}
            >
              3
            </div>
            <div
              className="text-center py-2 border-b-2 border-slate-300"
              onClick={() => {
                changeRate((prev) => {
                  prev[name] = 4;
                  return prev;
                });
                update((prev) => !prev);
              }}
            >
              4
            </div>
            <div
              className="text-center py-2 border-b-2 border-slate-300"
              onClick={() => {
                changeRate((prev) => {
                  prev[name] = 5;
                  return prev;
                });
                update((prev) => !prev);
              }}
            >
              5
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
