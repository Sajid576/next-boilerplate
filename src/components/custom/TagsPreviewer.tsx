import { cn } from "@lib/utils";
import CustomChip from "./CustomChip";

export default function TagsPreviewer({ tags, className }) {
  return (
    <>
      {tags?.length > 0 ? (
        <div className={cn(`flex items-center`, className)}>
          <p className="mr-[14px] text-[14px] font-semibold text-[#2C2C2C]">
            Tags:
          </p>
          <div className="flex flex-wrap gap-[12px]">
            {tags?.map((item, index) => (
              <CustomChip key={index} label={`#${item?.name}`} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
