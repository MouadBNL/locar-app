import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import { Input } from "../ui/input";
import { VehicleSchema, type VehicleData } from "@/features/vehicles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { NumberInput } from "../ui/number-input";

export type VehicleFormProps = {
  initialValues?: Partial<VehicleData>;
  loading?: boolean;
  submit?: (data: VehicleData) => void;
};
export default function VehicleForm({
  initialValues,
  loading,
  submit,
}: VehicleFormProps) {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      make: "",
      model: "",
      color: "",
      photo_url: "",
      license_plate: "",
      mileage: 0,
      number_of_seats: 1,
      number_of_doors: 1,
      year: 2025,
      transmission: "AT",
      fuel_type: "gasoline",
      ...initialValues,
    },
  });

  const onSubmit = (data: VehicleData) => {
    console.log("Data: ", { data });
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AppFormField
            control={form.control}
            name="make"
            label="Make"
            render={({ field }) => (
              <Input type="text" placeholder="Vehicle make" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="model"
            label="Model"
            render={({ field }) => (
              <Input type="text" placeholder="Vehicle model" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="year"
            label="Year"
            render={({ field }) => (
              <NumberInput placeholder="Vehicle year" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="transmission"
            label="Transmission"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vehicle transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AT">Automatic</SelectItem>
                  <SelectItem value="MT">Manual</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <AppFormField
            control={form.control}
            name="fuel_type"
            label="Fuel Type"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vehicle fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <AppFormField
            control={form.control}
            name="number_of_seats"
            label="Number of Seats"
            render={({ field }) => (
              <NumberInput placeholder="Number of seats" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="number_of_doors"
            label="Number of Doors"
            render={({ field }) => (
              <NumberInput placeholder="Number of doors" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="license_plate"
            label="License Plate"
            render={({ field }) => (
              <Input
                type="text"
                placeholder="License plate number"
                {...field}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="mileage"
            label="Mileage"
            render={({ field }) => (
              <NumberInput placeholder="Vehicle mileage" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="color"
            label="Color"
            render={({ field }) => (
              <Input
                placeholder="Vehicle color"
                className="w-full"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="photo_url"
            label="Photo URL"
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Vehicle photo URL"
                {...field}
                value={field.value ?? ""}
                className="w-full"
              />
            )}
          />
        </div>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
