import { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"

export const Book: FC = () => {
  const {id} = useParams()

  return (
    <div className="">
      Книга: id_{id}
    </div>
  );
};
