import { FC, useState, useEffect } from "react";
import "./help.css";

interface rateProps {
  rate: {};
}

export const Rate: FC<rateProps> = ({ rate }) => {
  const [rateData, setRateData] = useState(rate);
  const [isBtnShow, setIsBtnShow] = useState(true);
  const [amount, setAmount] = useState(0);

  function changeRate(name, value) {
    setRateData((prev) => {
      let newState = {
        story: prev.story,
        characters: prev.characters,
        world_details: prev.world_details,
        quality_of_writing: prev.quality_of_writing,
        linearity_of_the_plot: prev.linearity_of_the_plot,
        emotions_from_reading: prev.emotions_from_reading,
      };
      newState[name] = value;
      return newState;
    });
  }

  useEffect(() => {
    setRateData(rate);
  }, [rate]);
  useEffect(() => {
    let amount = 0;
    Object.keys(rateData).forEach((item) => {
      amount = amount + rateData[item];
    });
    setAmount(Math.round((amount / 6) * 10) / 10);
    setIsBtnShow(true);
  }, [rateData]);

  return (
    <div className="">
      <div className="text-lg mt-4 mb-7 font-bold ">Ваша оценка:</div>

      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center">
          {Object.keys(rateData).map((keyName) => {
            return (
              <div className="w-full h-12 mb-4 flex outline outline-purple-400 rounded-sm md:w-5/12 md:mr-5">
                <div className="w-10/12 flex items-center px-2 ">{keyName}</div>

                <div className="w-2/12 border-l-2 border-purple-700 testSelect hover:cursor-pointer">
                  <div className="flex h-12 items-center justify-end ">
                    <div className="w-full text-center text-lg">
                      {rateData[keyName]}
                    </div>
                    <div className="px-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
                      </svg>
                    </div>
                  </div>

                  <div className="testOption h-32 w-14 border border-purple-700 rounded-sm  overflow-hidden overflow-y-auto absolute hidden bg-white">
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 1)}
                    >
                      1
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 2)}
                    >
                      2
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 3)}
                    >
                      3
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 4)}
                    >
                      4
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 5)}
                    >
                      5
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 6)}
                    >
                      6
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 7)}
                    >
                      7
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 8)}
                    >
                      8
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 9)}
                    >
                      9
                    </div>
                    <div
                      className="text-center py-2 border-b-2 border-slate-300 hover:bg-slate-200"
                      onClick={() => changeRate(keyName, 10)}
                    >
                      10
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex item-center justify-between">
          <div className="w-24 py-2 bg-rose-300 flex items-center justify-center rounded-sm font-bold self-center">
            {amount}
          </div>
          {isBtnShow === true && (
            <button
              className="w-1/2 py-2 rounded-sm text-indigo-50 font-bold bg-indigo-600 md:w-1/4"
              onClick={() => {
                setIsBtnShow(false);
              }}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
