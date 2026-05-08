interface Props {
  page: number;

  totalPages: number;

  setPage: (value: number) => void;
}

const TodoPagination = ({ page, totalPages, setPage }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10">
      <div className="join">
        <button
          className="join-item btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        {pages.map((item) => (
          <button
            key={item}
            className={`join-item btn ${page === item ? "btn-active" : ""}`}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}

        <button
          className="join-item btn"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoPagination;
