import { FC } from 'react';

interface ICardProps {
  data: {
    author: string;
    cycle: {
      title: string;
      number: string;
    };
    image: string;
    title: string;
  };
}

export const Card: FC<ICardProps> = ({ data: { title, image, cycle, author } }) => {
  return (
    <div className="w-40 h-64 bg-cover mr-1" style={{ backgroundImage: `url(${image})` }}>
      <div className="w-40 h-64 p-2 text-white bg-black bg-opacity-80 flex flex-col justify-end opacity-0">
        <div className="text-2xl">{title}</div>
        <div className="text-sm mt-2">
          {cycle.title} ({cycle.number})
        </div>
        <div className="text-sm">{author}</div>
      </div>
    </div>
  );
};
