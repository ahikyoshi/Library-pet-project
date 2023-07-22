export interface infoProps {
  data: {
    author: string;
    cycle: {
      number: number;
      title: string;
    };
    discribe: string;
    files: any;
    image: string;
    meta: {
      writtingData: string;
    };
    title: string;
    user: {
      feedback: string;
      rate: any;
    };
  };
}

export interface FeedbackProps {
  feedback: string;
  id: string;
}
