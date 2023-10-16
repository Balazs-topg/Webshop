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
import adminIcons from "../../../adminIcons";

export function AddNewTag({ updateParent }: { updateParent: Function }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);
  async function handleAddAddTag() {
    const response = await fetch("/api/products/tags/add", {
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
                Add new tag
              </ModalHeader>
              <ModalBody>
                <Input ref={inputRef} type="name" label="Tag" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={handleAddAddTag}
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
