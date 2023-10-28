import React from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { TagOrCategoryOrBrand } from "../EditOrAddProduct";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";
import adminIcons from "../../../adminIcons";

interface selecTagInterface {
  fetchedTagList: any[];
  tags: string[];
  getTagList: Function;
  selectedTags: string[];
  setSelectedTags: Function;
}

function SelectTagInput({
  fetchedTagList,
  tags,
  getTagList,
  selectedTags,
  setSelectedTags,
}: selecTagInterface) {
  return (
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
      {fetchedTagList.map((category: TagOrCategoryOrBrand) => (
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
                  await fetch(`/api/products/tags/${category._id}/remove`, {
                    method: "delete",
                    headers: {
                      "Content-Type": "application/json",
                      jwt: getCookie("jwt")!,
                    },
                  }).then(() => {
                    getTagList();
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

export default SelectTagInput;
