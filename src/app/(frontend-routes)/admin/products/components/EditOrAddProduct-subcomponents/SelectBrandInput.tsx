import React, { useContext } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { TagOrCategoryOrBrand } from "../EditOrAddProduct";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";
import adminIcons from "../../../adminIcons";

import { AdminProductsPageContext } from "../../AdminProductsPageContext";

interface selectBrandInterface {
  brand: string;
  selectedBrand: string;
  setSelectedBrand: Function;
}

function SelectBrandInput({
  brand,
  selectedBrand,
  setSelectedBrand,
}: selectBrandInterface) {
  const productsPageContext = useContext(AdminProductsPageContext);
  const contextState = productsPageContext.state;
  const contextSetState = productsPageContext.setState;

  const handleRemove = async (brand: TagOrCategoryOrBrand) => {
    if (window.confirm(`are you sure you want to delete ${brand.name}`)) {
      await fetch(`/api/products/brands/${brand._id}/remove`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          jwt: getCookie("jwt")!,
        },
      }).then(() => {
        contextState.getBrandsList();
      });
    }
  };

  const handleEdit = async (brand: TagOrCategoryOrBrand) => {
    const newName = prompt(`What do you wish to rename ${brand.name} to?`);
    await fetch(`/api/products/brands/${brand._id}/update`, {
      method: "put",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    }).then(() => {
      contextState.getBrandsList();
    });
  };

  return (
    <Select
      defaultSelectedKeys={[brand!]}
      label="Select Brand"
      isRequired
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
    >
      {contextState.fetchedBrandsList.map((brand: TagOrCategoryOrBrand) => (
        <SelectItem key={brand._id} value={brand._id} textValue={brand.name}>
          <div className="flex items-center gap-4">
            {brand.name}
            <div
              className="ml-auto"
              onClick={() => {
                handleRemove(brand);
              }}
            >
              {adminIcons.trash}
            </div>{" "}
            <div
              onClick={() => {
                handleEdit(brand);
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

export default SelectBrandInput;
