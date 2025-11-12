import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CustomTableProps } from '../../../types';




function CustomTable<T> (props: CustomTableProps<T>) {
  // fetch table values

  // need to know the kind of columsn to use
  const { data } = useQuery({
    queryKey: [
      "table",
      ...(Array.isArray(props.queryKey) ? props.queryKey : [props.queryKey]),
    ],
    queryFn: props.fetchData,
  });

  return <div>Custom Table</div>;
};

export default CustomTable