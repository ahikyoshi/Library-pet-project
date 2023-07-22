import { FC } from "react";

interface cardProps {
  data: {
    author: string;
    cycle: {
      title: string;
      number: string;
    };
    id: string;
    image: string;
    title: string;
  };
}

export const Card: FC<cardProps> = ({
  data: { title, image, cycle, author, id },
  setId,
}) => {
  return (
    <div
      className="w-40 h-64 bg-cover mr-1"
      style={{ backgroundImage: `url(${image})` }}
      onClick={() => setId(id)}
    >
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
