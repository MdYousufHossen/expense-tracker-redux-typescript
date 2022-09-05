import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { setPageCount } from "../features/transaction/transactionSlice";

const Pagination = () => {
  const { pagination } = useAppSelector(
    (state: RootState) => state.transactions
  );
  const { page: currentPage } = pagination;
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(
    parseInt(pagination.totalItem) / pagination.limit
  );
  const handlePrevPage = () => {
    dispatch(setPageCount(pagination.page - 1));
  };

  const handleNextPage = () => {
    dispatch(setPageCount(pagination.page + 1));
  };
  return (
    <div className="pagination-button-wrapper">
      <button
        className="pagination-button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        &larr;
      </button>

      <span className="pagination-page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next page
      </button>
    </div>
  );
};
// interface Props {
//   currentPage: number;
//   totalPages: number;
//   handleNextPage: (page: number) => void;
//   handlePrevPage: (page: number) => void;
// }

// {
//     currentPage,
//     totalPages,
//     handlePrevPage,
//     handleNextPage,
//   }
// React.FC<Props>
// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   handlePrevPage: PropTypes.func.isRequired,
//   handleNextPage: PropTypes.func.isRequired,
// };

export default Pagination;
