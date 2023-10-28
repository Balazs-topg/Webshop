import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";
import { useRef } from "react";
import { useDisclosure } from "@nextui-org/react";
import adminIcons from "../../../../adminIcons";

export function AddNewBrand({ updateParent }: { updateParent: Function }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);
  async function handleAddBrand() {
    const response = await fetch("/api/products/brands/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
      body: JSON.stringify({
        name: inputRef.current!.value,
      }),
    });
    updateParent();
  }
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
                <Input ref={inputRef} type="name" label="Brand Name" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={handleAddBrand}
                  onPress={onClose}
                >
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
