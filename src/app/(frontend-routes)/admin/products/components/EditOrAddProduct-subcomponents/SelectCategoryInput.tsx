import React, { useContext } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { TagOrCategoryOrBrand } from "../EditOrAddProduct";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";
import adminIcons from "../../../adminIcons";

import { AdminProductsPageContext } from "../../page";

interface selectcategoryInterface {
  category: string;
  selectedCategory: string;
  setSelectedCategory: Function;
}

function SelectCategoryInput({
  category,
  selectedCategory,
  setSelectedCategory,
}: selectcategoryInterface) {
  const productsPageContext = useContext(AdminProductsPageContext);
  const contextState = productsPageContext.state;
  const contextSetState = productsPageContext.setState;

  const handleRemove = async (category: TagOrCategoryOrBrand) => {
    if (window.confirm(`are you sure you want to delete ${category.name}`)) {
      await fetch(`/api/products/categories/${category._id}/remove`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          jwt: getCookie("jwt")!,
        },
      }).then(() => {
        contextState.getCategoryList();
      });
    }
  };

  const handleEdit = async (category: TagOrCategoryOrBrand) => {
    const newName = prompt(`What do you wish to rename ${category.name} to?`);
    await fetch(`/api/products/categories/${category._id}/update`, {
      method: "put",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    }).then(() => {
      contextState.getCategoryList();
    });
  };

  return (
    <Select
      defaultSelectedKeys={[category!]}
      label="Select Category"
      isRequired
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {contextState.fetchedCategoryList.map((category: TagOrCategoryOrBrand) => (
        <SelectItem
          key={category._id}
          value={category._id}
          textValue={category.name}
        >
          <div className="flex items-center gap-4">
            {category.name}
            <div
              className="ml-auto"
              onClick={() => {
                handleRemove(category);
              }}
            >
              {adminIcons.trash}
            </div>
            <div
              onClick={() => {
                handleEdit(category);
              }}
            >
              <div>{adminIcons.edit}</div>
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
}

export default SelectCategoryInput;
