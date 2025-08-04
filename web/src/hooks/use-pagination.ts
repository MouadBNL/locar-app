interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay: number;
}

interface UsePaginationReturn {
  pages: number[];
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
  leftEllipsisPages: number[];
  rightEllipsisPages: number[];
}

// eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
export function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay,
}: UsePaginationProps): UsePaginationReturn {
  const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2;
  const showRightEllipsis
    = totalPages - currentPage + 1 > paginationItemsToDisplay / 2;

  function calculatePaginationRange(): number[] {
    if (totalPages <= paginationItemsToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);
    const initialRange = {
      start: currentPage - halfDisplay,
      end: currentPage + halfDisplay,
    };

    const adjustedRange = {
      start: Math.max(1, initialRange.start),
      end: Math.min(totalPages, initialRange.end),
    };

    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay;
    }
    if (adjustedRange.end === totalPages) {
      adjustedRange.start = totalPages - paginationItemsToDisplay + 1;
    }

    if (showLeftEllipsis)
      adjustedRange.start++;
    if (showRightEllipsis)
      adjustedRange.end--;

    return Array.from(
      { length: adjustedRange.end - adjustedRange.start + 1 },
      (_, i) => adjustedRange.start + i,
    );
  }

  function calculateLeftEllipsisPages(): number[] {
    if (totalPages <= paginationItemsToDisplay) {
      return [];
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);
    const initialRange = {
      start: currentPage - halfDisplay,
      end: currentPage + halfDisplay,
    };

    const adjustedRange = {
      start: Math.max(1, initialRange.start),
      end: Math.min(totalPages, initialRange.end),
    };

    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay;
    }
    if (adjustedRange.end === totalPages) {
      adjustedRange.start = totalPages - paginationItemsToDisplay + 1;
    }

    if (showLeftEllipsis)
      adjustedRange.start++;
    if (showRightEllipsis)
      adjustedRange.end--;

    return Array.from(
      { length: adjustedRange.start - 1 },
      (_, i) => i + 1,
    );
  }
  function calculateRightEllipsisPages(): number[] {
    if (totalPages <= paginationItemsToDisplay) {
      return [];
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);
    const initialRange = {
      start: currentPage - halfDisplay,
      end: currentPage + halfDisplay,
    };

    const adjustedRange = {
      start: Math.max(1, initialRange.start),
      end: Math.min(totalPages, initialRange.end),
    };

    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay;
    }
    if (adjustedRange.end === totalPages) {
      adjustedRange.start = totalPages - paginationItemsToDisplay + 1;
    }

    if (showLeftEllipsis)
      adjustedRange.start++;
    if (showRightEllipsis)
      adjustedRange.end--;

    return Array.from(
      { length: totalPages - adjustedRange.end },
      (_, i) => adjustedRange.end + i + 1,
    );
  }

  const pages = calculatePaginationRange();
  const leftEllipsisPages = calculateLeftEllipsisPages();
  const rightEllipsisPages = calculateRightEllipsisPages();

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
    leftEllipsisPages,
    rightEllipsisPages,
  };
}
