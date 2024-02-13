"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerWithPresetsProps {
  value: Date|undefined;
  onChange: (day: Date|undefined) => void;
}

export function DatePickerWithPresets({
  value,
  onChange
}: DatePickerWithPresetsProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-[280px] justify-start text-left font-normal font-sora",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex bg-gray-900 text-white font-sora w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value: any) =>
            onChange(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper" className="text-white bg-gray-900">
            <SelectItem value="14">In two weeks</SelectItem>
            <SelectItem value="30">In a month</SelectItem>
            <SelectItem value="90">In 3 months</SelectItem>
            <SelectItem value="182">In half a year</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar 
            mode="single" 
            selected={value} 
            onSelect={onChange} 
            className='text-white font-sora select-none'
            classNames={{
              day_selected: "text-gray-900 hover:bg-white",
              day_disabled: "border-none text-muted-foreground text-sm text-gray-700",
              day_outside: "border-none text-muted-foreground text-sm text-gray-700",
              day_today: "border-none text-muted-foreground text-sm text-gray-700",
            }}
            disabled={(day) => { return day < new Date() }}
            fromDate={new Date()}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
