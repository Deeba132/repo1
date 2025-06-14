/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm2";
import useDelete from "../../hooks/useDelete";
import { HiSquare2Stack } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiPencil, HiTrash } from "react-icons/hi";
import useCreate from "../../hooks/useCreate";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// import React from 'react'

// eslint-disable-next-line react/prop-types
export default function CabinRow({ cabin }) {
  const { createMutate, createload } = useCreate();
  // eslint-disable-next-line react/prop-types
  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;
  function handleDuplicate() {
    createMutate({
      name: `copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  }
  const { isdeleting, deleteCabin } = useDelete();
  return (
    <>
      <Table.Row columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Img src={image || "/fallback-image.jpg"} />
        <Cabin>{name}</Cabin>
        <div>fits in {max_capacity}</div>

        <Price>{formatCurrency(regular_price)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={createload}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinEdit={cabin} />
              </Modal.Window>

              {/* wrappercomponent */}
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isdeleting}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
