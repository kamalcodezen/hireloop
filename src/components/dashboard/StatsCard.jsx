import { ArrowUpRight } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, color = "text-green-500" }) => {
  return (
    <div
      className="
      rounded-lg
      border
      border-border
      bg-card
      p-6
      h-[190px]
      flex
      flex-col
      justify-between
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl cursor-pointer
    "
    >
      <div
        className="
        w-14
        h-14
        rounded-lg
        bg-muted
        flex
        items-center
        justify-center
      "
      >
        <Icon className={`w-7 h-7 ${color}`} />
      </div>

      <div>
        <p className="text-muted-foreground text-sm mb-3">{title}</p>

        <div className="flex items-center justify-between">
          <h3 className="text-4xl font-bold">{value}</h3>

          <ArrowUpRight className={color} size={22} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
