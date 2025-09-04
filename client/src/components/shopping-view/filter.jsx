import { filterOption } from "@/config";
import { Label } from "@radix-ui/react-label";
import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold ">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOption).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
            </div>
            <div className="grid gap-2 mt-2">
              {filterOption[keyItem].map((option) => (
                <Label className="flex items-center gap-2 text-normal">
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                  />{" "}
                  {option.label}{" "}
                </Label>
              ))}
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
