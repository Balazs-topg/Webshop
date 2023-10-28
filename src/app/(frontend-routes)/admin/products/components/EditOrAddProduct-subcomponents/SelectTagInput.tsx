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
  const handleRemove = async (tag: TagOrCategoryOrBrand) => {
    if (window.confirm(`are you sure you want to delete ${tag.name}`)) {
      await fetch(`/api/products/tags/${tag._id}/remove`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          jwt: getCookie("jwt")!,
        },
      }).then(() => {
        getTagList();
      });
    }
  };
  const handleEdit = async (tag: TagOrCategoryOrBrand) => {
    const newName = prompt(`What do you wish to rename ${tag.name} to?`);
    await fetch(`/api/products/tags/${tag._id}/update`, {
      method: "put",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    }).then(() => {
      getTagList();
    });
  };

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
      {fetchedTagList.map((tag: TagOrCategoryOrBrand) => (
        <SelectItem key={tag._id} value={tag.name} textValue={tag.name}>
          <div className="flex items-center gap-4">
            {tag.name}
            <div
              className="ml-auto"
              onClick={() => {
                handleRemove(tag);
              }}
            >
              {adminIcons.trash}
            </div>
            <div
              onClick={() => {
                handleEdit(tag);
              }}
            >
              {adminIcons.edit}
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
}

export default SelectTagInput;
