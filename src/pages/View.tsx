import { memo } from "react";
import Form from "../components/Form";
import Layouts from "../components/Layouts";
import Pagination from "../components/Pagination";
import SortData from "../components/SortData";
import ViewTransactions from "../container/ViewTransactions";
const View = memo(() => {
  return (
    <Layouts>
      <SortData />
      <Form />
      <ViewTransactions />
      <Pagination />
    </Layouts>
  );
});

export default View;
