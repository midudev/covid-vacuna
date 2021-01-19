/* eslint-disable react/jsx-key */

import { useMemo } from 'react'
import { useTable } from 'react-table'
import styles from './styles.module.css'

export default function Table () {
  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World'
      },
      {
        col1: 'react-table',
        col2: 'rocks'
      },
      {
        col1: 'whatever',
        col2: 'you want'
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'CC.AA',
        accessor: 'ccaa'
      },
      {
        Header: 'Dosis entregadas',
        accessor: 'entregadas'
      },
      {
        Header: 'Dosis administradas',
        accessor: 'administradas'
      },
      {
        Header: '% sobre entregadas',
        accessor: 'porcentaje_entregadas'
      },
      {
        Header: 'Fecha de la última vacuna registrada',
        accessor: 'last_date'
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  fontWeight: 'bold'
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      borderBottom: '1px dotted #eee'
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
