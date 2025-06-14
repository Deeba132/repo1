// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm2";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

export default function Addcabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      <Modal.Open opens="table">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}
//   const [IsOpenModal, setIsOpenModal] = useState(true);
//   return (
//     <div>
//       <Button
//         sizes="medium"
//         variation="primary"
//         onClick={() => setIsOpenModal(!IsOpenModal)}
//       >
//         Add new cabin
//       </Button>
//       {IsOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm
//             onClose={() => setIsOpenModal(false)}
//             onCloseModal={IsOpenModal}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }
