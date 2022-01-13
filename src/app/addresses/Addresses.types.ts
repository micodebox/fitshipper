export type Address = {
  id: number;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: number;
};

export type AddressesProps = {
  addresses: Address[];
  orderBy?: string;
  sortDirection?: string;
  pageSize?: number;
  page?: number;
  totalPages?: number;
  totalCount?: number;
  keyword?: string;
  loading?: boolean;
  onSetOrderBy?: (orderBy: string) => void;
  onChangePage?: (page: number) => void;
  onChangePageSize?: (pageSize: number) => void;
  onChangeKeyword?: (keyword: string) => void;
  onDeleteAddress?: (addressId: number) => void;
};
