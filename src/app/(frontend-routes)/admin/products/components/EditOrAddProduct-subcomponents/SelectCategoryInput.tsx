import React from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { TagOrCategoryOrBrand } from "../EditOrAddProduct";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";
import adminIcons from "../../../adminIcons";

interface selectcategoryInterface {
  fetchedCategoryList: any[];
  category: string;
  getCategoryList: Function;
  selectedCategory: string;
  setSelectedCategory: Function;
}

function SelectCategoryInput({
  fetchedCategoryList,
  category,
  getCategoryList,
  selectedCategory,
  setSelectedCategory,
}: selectcategoryInterface) {
  return (
    <Select
      defaultSelectedKeys={[category!]}
      label="Select Category"
      isRequired
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {fetchedCategoryList.map((category: TagOrCategoryOrBrand) => (
        <SelectItem
          key={category.name}
          value={category.name}
          textValue={category.name}
        >
          <div className="flex justify-between items-center">
            {category.name}
            <div
              onClick={async () => {
                if (
                  window.confirm(
                    `are you sure you want to delete ${category.name}`
                  )
                ) {
                  await fetch(
                    `/api/products/categories/${category._id}/remove`,
                    {
                      method: "delete",
                      headers: {
                        "Content-Type": "application/json",
                        jwt: getCookie("jwt")!,
                      },
                    }
                  ).then(() => {
                    getCategoryList();
                  });
                }
              }}
            >
              {adminIcons.trash}
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
}

export default SelectCategoryInput;
