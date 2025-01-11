import React from 'react';
import { useQuery } from '@apollo/client';
import { useTable, usePagination } from 'react-table';
import { Table, Button, Dropdown } from 'semantic-ui-react';
import { GET_ALL_COUNTRIES, GET_COUNTRIES_AND_LANGUAGES } from '../../graphql/queries';
import client from '../../libs/apollo-client';
import Link from 'next/link';

const CountriesLanguagesTable = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES_AND_LANGUAGES, { client });

  const formattedData = React.useMemo(() => {
    if (!data) return [];
    return data.countries.map((country) => ({
      country: country.name,
      code: country.code,
      languages: country.languages.map((lang) => lang.name).join(', '),
    }));
  }, [data]);

  const columns = React.useMemo(
    () => [
      { Header: 'Country', accessor: 'country',
        Cell: ({ value, row }) => (
          <Link href={`/country/${row.original.code}`}>
            <p>{value}</p>
          </Link>
        ),
       },
      { Header: 'Country Code', accessor: 'code' },
      { Header: 'Languages', accessor: 'languages' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Changed from rows to page for pagination
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: formattedData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-center text-violet-500 text-5xl mt-12">Countries and Languages</h1>

      <Table {...getTableProps()} celled striped>
        <Table.Header>
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Table.HeaderCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Table.Row {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Table.Cell {...cell.getCellProps()}>{cell.render('Cell')}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

     <div className='grid grid-cols-2 gap-4'>
     <div className="pagination-controls mt-4">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
      </div>

      <div className="mt-4 flex justify-end">
        <Dropdown
          value={pageSize}
          onChange={(e, { value }) => setPageSize(Number(value))}
          options={[
            { key: '5', value: 5, text: 'Show 5 rows' },
            { key: '10', value: 10, text: 'Show 10 rows' },
            { key: '20', value: 20, text: 'Show 20 rows' },
            { key: '50', value: 50, text: 'Show 50 rows' },
          ]}
        />
      </div>
     </div>
    </div>
  );
};

export default CountriesLanguagesTable;
