import React, { useEffect, useState } from "react";
import adminIcons from "../../adminIcons";
import { Input, Select, SelectItem } from "@nextui-org/react";

import ImageUrlInput from "./Addproduct-subcomponents/ImageUrlInput";

import { Loader2 } from "lucide-react";

import { getCookie } from "../../../utils/manageCookies";

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

  async function getBrandsList() {
    const response = await fetch("/api/products/brands/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setFetchedBrandsList(data);
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
    setFetchedCategoryList(data);
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
    setFetcherTagsList(data);
  }

  useEffect(() => {
    getBrandsList();
    getCategoryList();
    getTagsList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    //remove empty url things from data
    const dataProductImgs = productImgs.filter((item) => item && item);
    console.log(productImgs);
    console.log(dataProductImgs);

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
    console.log("data", data);
    updateParent && updateParent();
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
        Add Or Edit product {adminIcons.plus}
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
                  {isNew ? "Add new item" : "Edit"} {name && name}
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-2 items-center">
                    <Select
                      defaultSelectedKeys={[brand!]}
                      label="Select Brand"
                      isRequired
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      {fetchedBrandsList.map((brand: TagOrCategoryOrBrand) => (
                        <SelectItem key={brand.name} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <AddNewBrand updateParent={getBrandsList} />
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
                    <Select
                      label="Select Category"
                      fullWidth
                      isRequired
                      defaultSelectedKeys={[category!]}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {fetchedCategoryList.map(
                        (category: TagOrCategoryOrBrand) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        )
                      )}
                    </Select>
                    <AddNewCategory updateParent={getCategoryList} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Select
                      label="Select Tags"
                      fullWidth
                      selectionMode="multiple"
                      isRequired
                      defaultSelectedKeys={tags}
                      value={selectedTags}
                      onChange={(e) => {
                        setSelectedTags(e.target.value.split(","));
                      }}
                    >
                      {fetchedTagsList.map((tag: TagOrCategoryOrBrand) => (
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
                    Edit
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
