import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

const ProgressCalendar = () => {
  return (
    <div className="col-span-2 row-span-5 col-start-5 row-start-1 bg-glass-subtle text-white w-full rounded-lg flex flex-col ">
      <div className="flex p-6 gap-4 items-center justify-center">
        <CalendarIcon />
        <h2>Progress Calendar</h2>
      </div>
      <Calendar
        mode="single"
        className="rounded-b-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)] bg-glass-subtle text-white w-full flex-1"
        buttonVariant="ghost"
      />
    </div>
  );
};

export default ProgressCalendar;
