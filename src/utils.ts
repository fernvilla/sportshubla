export const calcualteTotalPages = (dataLength: number, rowsPerPage: number) =>
  Math.ceil(dataLength / rowsPerPage);
