import React, { useEffect, useState, useContext } from "react";
import adminIcons from "../../adminIcons";
import { Input, Select, SelectItem } from "@nextui-org/react";

import ImageUrlInput from "./EditOrAddProduct-subcomponents/ImageUrlInput";

import { Loader2 } from "lucide-react";

import { getCookie } from "../../../utils/manageCookies";

import { AddNewBrand } from "./EditOrAddProduct-subcomponents/addNew/AddNewBrand";
import { AddNewCategory } from "./EditOrAddProduct-subcomponents/addNew/AddNewCategory";
import { AddNewTag } from "./EditOrAddProduct-subcomponents/addNew/AddNewTag";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

import { Ripples } from "react-ripples-continued";

import SelectBrandInput from "./EditOrAddProduct-subcomponents/SelectBrandInput";
import SelectCategoryInput from "./EditOrAddProduct-subcomponents/SelectCategoryInput";
import SelectTagInput from "./EditOrAddProduct-subcomponents/SelectTagInput";

import { AdminProductsPageContext } from "../page";

export type TagOrCategoryOrBrand = {
  name: string;
  _id: string;
};

type AddItemType = {
  brand: string;
  category: string;
  imgs: File[];
  name: string;
  tags: string[];
  price: number;
};

function EditOrAddProduct({
  className,
  updateParent,
  isNew,
  brand,
  name,
  price,
  imageUrl,
  category,
  tags,
  productId,
}: {
  className?: string;
  updateParent?: Function;
  isNew?: boolean;
  brand?: string;
  name?: string;
  price?: number;
  imageUrl?: string[];
  category?: string;
  tags?: string[];
  productId?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [fetchedBrandsList, setFetchedBrandsList] = useState([]);
  const [fetchedCategoryList, setFetchedCategoryList] = useState([]);
  const [fetchedTagsList, setFetcherTagsList] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(brand);
  const [productName, setProductName] = useState(name);
  const [productImgs, setProductImgs] = useState<string[]>(
    imageUrl ? imageUrl : [""]
  );
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedTags, setSelectedTags] = useState<string[]>(tags || []);
  const [productPrice, setProductPrice] = useState(price);

  const productsPageContext = useContext(AdminProductsPageContext);
  const contextState = productsPageContext.state;
  const contextSetState = productsPageContext.setState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    //remove empty url things from data
    const dataProductImgs = productImgs.filter((item) => item && item);

    // Create a new JSON object
    const jsonData = {
      brand: selectedBrand,
      name: productName,
      category: selectedCategory,
      tags: selectedTags,
      price: productPrice,
      imgs: dataProductImgs,
    };

    const response = await fetch(
      isNew ? "/api/products/add" : `/api/products/${productId}/update`,
      {
        method: isNew ? "post" : "put",
        headers: {
          "Content-Type": "application/json",
          jwt: getCookie("jwt")!,
        },
        body: JSON.stringify(jsonData),
      }
    );
    const data = await response.json();
    updateParent && updateParent();
    setIsLoading(false);
    setResponseMessage(data.message);

    if (isNew) {
      setSelectedBrand("");
      setProductName("");
      setProductImgs([""]);
      setSelectedCategory("");
      setSelectedTags([]);
      setProductPrice(0);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={className}>
      {isNew ? (
        <Button
          variant="solid"
          color="primary"
          className="flex items-center"
          onPress={onOpen}
          fullWidth
        >
          Add new product {adminIcons.plus}
        </Button>
      ) : (
        <Button size="sm" isIconOnly color="primary" onPress={onOpen}>
          {adminIcons.edit}
        </Button>
      )}

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
                  {isNew ? "Add new item" : "Edit"} {name && name}
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-2 items-center">
                    <SelectBrandInput
                      brand={brand!}
                      selectedBrand={selectedBrand!}
                      setSelectedBrand={setSelectedBrand}
                    />
                    <AddNewBrand updateParent={contextState.getBrandsList} />
                  </div>
                  <Input
                    value={productName}
                    type="name"
                    label="Product Name"
                    isRequired
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Input
                    value={"" + productPrice}
                    type="number"
                    label="Price (SEK)"
                    isRequired
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                  />
                  <ImageUrlInput
                    state={productImgs}
                    setState={setProductImgs}
                  ></ImageUrlInput>
                  <div className="flex gap-2 items-center">
                    <SelectCategoryInput
                      category={category!}
                      selectedCategory={selectedCategory!}
                      setSelectedCategory={setSelectedCategory}
                    />
                    <AddNewCategory
                      updateParent={contextState.getCategoryList}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <SelectTagInput
                      tags={tags!}
                      selectedTags={selectedTags!}
                      setSelectedTags={setSelectedTags}
                    />
                    <AddNewTag updateParent={contextState.getTagsList} />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    spinner={
                      <Loader2 className="animate-spin" absoluteStrokeWidth />
                    }
                  >
                    {isNew ? "Add new" : "Edit"}
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

export default EditOrAddProduct;
