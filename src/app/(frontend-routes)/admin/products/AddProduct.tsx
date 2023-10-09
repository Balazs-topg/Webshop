import React from "react";

import adminIcons from "../adminIcons";

import { Input } from "@nextui-org/react";

import { Select, SelectSection, SelectItem } from "@nextui-org/react";

import { animals } from "./data";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

function AddNewBrand() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly size="lg" color="primary" onPress={onOpen}>
        {adminIcons.plus}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new brand
              </ModalHeader>
              <ModalBody>
                <Input type="name" label="Brand Name" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function AddNewCategory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly size="lg" color="primary" onPress={onOpen}>
        {adminIcons.plus}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new category
              </ModalHeader>
              <ModalBody>
                <Input type="name" label="Category Name" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function AddNewTag() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly size="lg" color="primary" onPress={onOpen}>
        {adminIcons.plus}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new tag
              </ModalHeader>
              <ModalBody>
                <Input type="name" label="Tag" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function AddProduct({ className }: { className?: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={className}>
      <Button
        variant="solid"
        color="primary"
        className=" flex items-center "
        onPress={onOpen}
      >
        Add product {adminIcons.plus}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          if (confirm("Are you sure you want to close the menue?"))
            onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add product
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2 items-center">
                  <Select label="Select Brand">
                    {animals.map((animal) => (
                      <SelectItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <AddNewBrand />
                </div>
                <Input type="name" label="Product Name" />
                <Button color="primary">Choose image</Button>

                <div className="flex gap-2 items-center">
                  <Select label="Select Category" fullWidth>
                    {animals.map((animal) => (
                      <SelectItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <AddNewCategory />
                </div>
                <div className="flex gap-2 items-center">
                  <Select
                    label="Select Tags"
                    fullWidth
                    selectionMode="multiple"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <AddNewTag />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddProduct;
