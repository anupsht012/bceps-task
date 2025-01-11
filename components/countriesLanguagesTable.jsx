import React from 'react';
import { useQuery } from '@apollo/client';
import { useTable, usePagination } from 'react-table';
import { Table, Button, Dropdown } from 'semantic-ui-react';
import Link from 'next/link';
import { GET_COUNTRIES_AND_LANGUAGES } from '@/graphql/queries';
import client from '../src/libs/apollo-client';


export const CountriesLanguagesTable = () => {
  const { data } = useQuery(GET_COUNTRIES_AND_LANGUAGES, { client });

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
    page, 
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

  return (
  <section className="py-10 mt-10">
      <div className="container mx-auto mt-8 px-4">
      <h1 className="text-center text-violet-300 text-5xl mt-12">Displaying Countries and Languages using react-table</h1>
      <p className='text-center'>(*Click in the country for detailed information*)</p>

      <Table {...getTableProps()} celled striped>
        <Table.Header>
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Table.HeaderCell {...column.getHeaderProps()} key={column.id}>
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
              <Table.Row {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell,key) => (
                  <Table.Cell {...cell.getCellProps()} key={key} >{cell.render('Cell')}</Table.Cell>
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
  </section>
  );
};
