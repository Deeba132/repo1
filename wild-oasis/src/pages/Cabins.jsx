import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { apiCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Addcabin from "../features/cabins/Addcabin";

function Cabins() {
  useEffect(function () {
    apiCabins().then((data) => console.log(data));
  }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
        <img
          src="https://cgdjsxbbgrajybjktrkd.supabase.co/storage/v1/object/public/cabin-buckets//cabin-001.jpg
      // "
        />
      </Row>
      <Row>
        <CabinTable />
        <Addcabin />
      </Row>
    </>
  );
}

export default Cabins;
