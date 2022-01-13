import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { Addresses } from './Addresses';
import { Address } from './Addresses.types';
import { useQueryParam } from 'use-query-params';

export const AddressesContainer = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orderBy = 'id', setOrderBy] = useQueryParam('orderBy');
  const [sortDirection = 'asc', setSortDirection] = useQueryParam('sortDirection');
  const [page = '0', setPage] = useQueryParam('page');
  const [pageSize = '5', setPageSize] = useQueryParam('size');
  const [keyword = '', setKeyword] = useQueryParam('keyword');
  const [loading, setLoading] = useState(false);

  const parsedPage = parseInt(page, 10);
  const parsedPageSize = parseInt(pageSize, 10);

  const getAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/address?orderBy=${orderBy}&direction=${sortDirection}`);
      if (response.status === 200) {
        setAddresses(response.data);
      } else {
        setAddresses([])
      }
      setLoading(false);
    } catch (error) {
      setAddresses([]);
      setLoading(false);      
    }
  }, [orderBy, sortDirection]);

  useMemo(() => {
    getAddresses();
  }, [getAddresses]);

  const onDeleteAddress = async (addressId: number) => {
    setLoading(true);
    await axios.delete(`/address/${addressId}`);
    
    getAddresses();
  }

  const onChangeOrderBy = (column: string) => {
    if (column === orderBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setSortDirection('asc');
    }
  };

  const filteredAddresses = addresses.filter(address => {
    return address.id.toString()?.includes(keyword)
      || address.name?.includes(keyword)
      || address.address1?.includes(keyword)
      || address.address2?.includes(keyword)
      || address.city?.includes(keyword)
      || address.state?.includes(keyword)
      || address.zip.toString()?.includes(keyword);
  });

  const onChangeKeyword = (keyword: string) => {
    setPage(0);
    setKeyword(keyword);
  };

  return (
    <Addresses
      addresses={filteredAddresses.slice(parsedPage * parsedPageSize, (parsedPage + 1) * parsedPageSize)}
      orderBy={orderBy}
      sortDirection={sortDirection}
      pageSize={parsedPageSize}
      page={parsedPage}
      totalPages={Math.ceil(addresses.length / parsedPageSize)}
      totalCount={addresses.length}
      keyword={keyword}
      loading={loading}
      onSetOrderBy={onChangeOrderBy}
      onChangePageSize={setPageSize}
      onChangePage={setPage}
      onChangeKeyword={onChangeKeyword}
      onDeleteAddress={onDeleteAddress}
    />
  );
};
