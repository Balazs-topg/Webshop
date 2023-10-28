import React from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { TagOrCategoryOrBrand } from "../EditOrAddProduct";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";
import adminIcons from "../../../adminIcons";

interface selectBrandInterface {
  fetchedBrandsList: any[];
  brand: string;
  getBrandsList: Function;
  selectedBrand: string;
  setSelectedBrand: Function;
}

function SelectBrandInput({
  fetchedBrandsList,
  brand,
  getBrandsList,
  selectedBrand,
  setSelectedBrand,
}: selectBrandInterface) {
  return (
    <Select
      defaultSelectedKeys={[brand!]}
      label="Select Brand"
      isRequired
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
    >
      {fetchedBrandsList.map((brand: TagOrCategoryOrBrand) => (
        <SelectItem key={brand._id} value={brand._id} textValue={brand.name}>
          <div className="flex justify-between items-center">
            {brand.name}
            <div
              onClick={async () => {
                if (
                  window.confirm(`are you sure you want to delete ${brand._id}`)
                ) {
                  await fetch(`/api/products/brands/${brand._id}/remove`, {
                    method: "delete",
                    headers: {
                      "Content-Type": "application/json",
                      jwt: getCookie("jwt")!,
                    },
                  }).then(() => {
                    getBrandsList();
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

export default SelectBrandInput;
