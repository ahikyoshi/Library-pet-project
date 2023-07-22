import { FC, useEffect, useState } from 'react';
import { FeedbackProps } from '../../types';
import { sendFeedback } from '../../utils';

export const Feedback: FC<FeedbackProps> = ({ feedback, id }) => {
  const [feedbackValue, setFeedbackValue] = useState(feedback);
  const [isBtnShow, setIsBtnShow] = useState(false);

  useEffect(() => {
    setFeedbackValue(feedback);
    setIsBtnShow(false);
  }, [feedback]);

  return (
    <div className="flex flex-col">
      <div className="text-lg mt-4 mb-2 font-bold">Ваш отзыв:</div>

      <textarea
        className="p-1 h-20 border border-indigo-600 text-sm resize-none"
        placeholder="Отзыв"
        value={feedbackValue}
        onChange={(e) => {
          setFeedbackValue(e.target.value);
          setIsBtnShow(true);
        }}
      />

      {isBtnShow === true && (
        <button
          className="w-1/2 py-2 rounded-sm text-indigo-50 font-bold mt-2 bg-indigo-600 md:w-1/4"
          onClick={() => {
            setIsBtnShow(false);
            sendFeedback(feedbackValue, id);
          }}
        >
          Сохранить
        </button>
      )}
    </div>
  );
};
