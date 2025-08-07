import { SelectContent } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputsByComponentType(getControlItem) {
    let elemet = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componetType) {
      case "input":
        elemet = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event)=> setFormData({
              ...formData,
              [getControlItem.name] : event.target.value,
            })}
          />
        );
        break;
      case "select":
        elemet = (
          <Select onValueChange={(value=> setFormData({
            ...formData,
            [getControlItem.name] : value
          }))} value={value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} id={optionItem.id} >
                      {optionItem.label} 
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        elemet = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event)=> setFormData({
              ...formData,
              [getControlItem.name] : event.target.value,
            })}
          />
        );
        break;

      default:
        elemet = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event)=> setFormData({
              ...formData,
              [getControlItem.name] : event.target.value,
            })}
          />
        );
    }
    return elemet;
  }
  return (
    <form onSubmit={onSubmit} action="">
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb=1" htmlFor="">
              {controlItem.label}
            </Label>{" "}
            {renderInputsByComponentType(controlItem)}{" "}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full bg-purple-500 cursor-pointer ">
        {buttonText || "submit"}
      </Button>
    </form>
  );
}
