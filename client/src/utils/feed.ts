export const calculateTotalPages = (dataLength: number, rowsPerPage: number) =>
  Math.ceil(dataLength / rowsPerPage);
