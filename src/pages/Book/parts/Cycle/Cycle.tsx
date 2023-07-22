import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../../../../components/Card/Card';

interface ICycleProps {
  id: string;
}

export const Cycle: FC<ICycleProps> = (props) => {
  const [cycleList, setCyclelist] = useState([]);
  const HOST_IP_HOST = '192.168.0.110:4444';

  useEffect(() => {
    if (props.id != 'empty') {
      axios.get(`http://${HOST_IP_HOST}/library/${props.id}/cycle`).then((res) => {
        const newArr: any = [];
        res.data.forEach((item: any) => {
          newArr[item.cycle.number] = item;
        });
        setCyclelist(newArr.filter((n: any) => n));
      });
    }
  }, [props]);

  return (
    <div className="cycle">
      <div className="text-lg mt-4 mb-2 font-bold">Из той же серии:</div>

      <div className="w-full overflow-x-auto flex">
        {cycleList.map((item) => {
          return <Card data={item} key={item.id} setId={props.setId} />;
        })}
      </div>
    </div>
  );
};
