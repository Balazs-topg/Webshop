import React, { useEffect, useState, useRef } from "react";
import adminIcons from "../adminIcons";
import { Input, Select, SelectItem } from "@nextui-org/react";

import ImageUrlInput from "./ImageUrlInput";

import { Loader2 } from "lucide-react";

import { getCookie } from "../../utils/manageCookies";

import { AddNewBrand } from "./Addproduct-subcomponents/addNew/AddNewBrand";
import { AddNewCategory } from "./Addproduct-subcomponents/addNew/AddNewCategory";
import { AddNewTag } from "./Addproduct-subcomponents/addNew/AddNewTag";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

type TagOrCategoryOrBrand = {
  _id: string;
  name: string;
};

type AddItemType = {
  brand: string;
  category: string;
  imgs: File[];
  name: string;
  tags: string[];
  price: number;
};

function AddProduct({
  className,
  updateParent,
}: {
  className?: string;
  updateParent: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [brandsList, setBrandsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const selectBrandRef = useRef<HTMLSelectElement>(null);
  const productNameRef = useRef<HTMLInputElement>(null);
  const [productImgs, setProductImgs] = useState<string[]>([""]);
  const selectCategory = useRef<HTMLSelectElement>(null);
  const selectTagsRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  async function getBrandsList() {
    const response = await fetch("/api/products/brands/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setBrandsList(data);
  }
  async function getCategoryList() {
    const response = await fetch("/api/products/categories/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setCategoryList(data);
  }
  async function getTagsList() {
    const response = await fetch("/api/products/tags/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setTagsList(data);
  }
  useEffect(() => {
    getBrandsList();
    getCategoryList();
    getTagsList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called");
    setIsLoading(true);

    // Retrieve values from multiple select
    const selectedTagsOptions = selectTagsRef.current?.selectedOptions;
    const tags: string[] = [];
    if (selectedTagsOptions) {
      for (let i = 0; i < selectedTagsOptions.length; i++) {
        tags.push(selectedTagsOptions[i].value);
      }
    }

    // Create a new JSON object
    const jsonData = {
      brand: selectBrandRef.current!.value,
      name: productNameRef.current!.value,
      category: selectCategory.current!.value,
      tags: tags,
      price: priceRef.current!.value,
      imgs: productImgs,
    };
    console.log(jsonData);

    const response = await fetch("/api/products/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
      body: JSON.stringify(jsonData),
    });
    const data = await response.json();
    updateParent();
    setIsLoading(false);
    setResponseMessage(data.message);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={className}>
      <Button
        variant="solid"
        color="primary"
        className="flex items-center"
        onPress={onOpen}
        fullWidth
      >
        Add product {adminIcons.plus}
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={() => {
          if (confirm("Are you sure you want to close the menue?"))
            onOpenChange();
        }}
      >
        <form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add product
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-2 items-center">
                    <Select
                      label="Select Brand"
                      isRequired
                      ref={selectBrandRef}
                    >
                      {brandsList.map((brand: TagOrCategoryOrBrand) => (
                        <SelectItem key={brand.name} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <AddNewBrand updateParent={getBrandsList} />
                  </div>
                  <Input
                    type="name"
                    label="Product Name"
                    isRequired
                    ref={productNameRef}
                  />
                  <Input
                    type="number"
                    label="Price (SEK)"
                    isRequired
                    ref={priceRef}
                  />
                  <ImageUrlInput
                    state={productImgs}
                    setState={setProductImgs}
                  ></ImageUrlInput>
                  <div className="flex gap-2 items-center">
                    <Select
                      label="Select Category"
                      fullWidth
                      isRequired
                      ref={selectCategory}
                    >
                      {categoryList.map((category: TagOrCategoryOrBrand) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <AddNewCategory updateParent={getCategoryList} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Select
                      label="Select Tags"
                      fullWidth
                      selectionMode="multiple"
                      isRequired
                      ref={selectTagsRef}
                    >
                      {tagsList.map((tag: TagOrCategoryOrBrand) => (
                        <SelectItem key={tag.name} value={tag.name}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <AddNewTag updateParent={getTagsList} />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    spinner={
                      <Loader2 className="animate-spin" absoluteStrokeWidth />
                    }
                  >
                    Add
                  </Button>
                  <Modal
                    isOpen={Boolean(responseMessage)}
                    onOpenChange={() => {
                      onOpenChange();
                      setResponseMessage("");
                    }}
                    isDismissable={false}
                    size="sm"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            {responseMessage}{" "}
                          </ModalHeader>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                              Okay
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}

export default AddProduct;
