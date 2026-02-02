import React from "react";
import { PaginationControlsType } from "@/../types";
import { IconChevronLeft } from "@/components/icons/chevron-left";
import { IconChevronRight } from "@/components/icons/chevron-right";

const PaginationControls = (props: PaginationControlsType) => {
  const nextPageHandler = () => {
    if (props.hasNextPage && props.nextPage) {
      props.changePage(props.nextPage);
    }
  };

  const prevPageHandler = () => {
    if (props.hasPrevPage && props.prevPage) {
      props.changePage(props.prevPage);
    }
  };
  return (
    <div className="flex items-center bg-secondary-900 px-5 py-3 w-fit text-white text-sm">
      {`${props.page} out of ${props.totalPages}`}
      <div className="flex items-center gap-3 ml-4">
        {props.hasPrevPage && (
          <IconChevronLeft
            onClick={prevPageHandler}
            className="size-4 cursor-pointer"
          />
        )}
        {props.hasNextPage && (
          <IconChevronRight
            onClick={nextPageHandler}
            className="size-4 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PaginationControls;
