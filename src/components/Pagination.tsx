const Pagination = ({ totalResults }: { totalResults: string }) => {
  const totalPages = Math.floor(Number(totalResults) / 10) + 1;

  return <div>{totalPages}</div>;
};

export default Pagination;
