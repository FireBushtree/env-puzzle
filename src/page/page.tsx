import React from 'react';

export interface PageProps {}

const Page: React.FC<PageProps> = (props) => {
  const {children} = props;

  return <div>{children}</div>;
};

export default Page;
