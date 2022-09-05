import { memo } from "react";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Layouts from "../components/Layouts";
import Transactions from "../container/Transactions";

const Home = memo(() => {
  return (
    <Layouts>
      <Balance />
      <Form />
      <Transactions />
    </Layouts>
  );
});

export default Home;
