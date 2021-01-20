/* eslint-disable react/jsx-key */

import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits.jsx'
import { toPercentage } from './NumberPercentage.jsx'
import styles from 'styles/Table.module.css'

export default function Table ({ data }) {
  const locale = 'es'

  const tableData = useMemo(
    () => data.map(row => {
      const {
        dosisAdministradas,
        dosisEntregadas,
        dosisEntregadasModerna,
        dosisEntregadasPfizer,
        dosisPautaCompletada,
        porcentajeEntregadas,
        ...rest
      } = row

      const formatDigit = number => toDigit({ locale, number })
      const formatPercentage = number => toPercentage({ locale, number })

      return {
        ...rest,
        dosisAdministradas: formatDigit(dosisAdministradas),
        dosisEntregadas: formatDigit(dosisEntregadas),
        dosisEntregadasModerna: formatDigit(dosisEntregadasModerna),
        dosisEntregadasPfizer: formatDigit(dosisEntregadasPfizer),
        dosisPautaCompletada: formatDigit(dosisPautaCompletada),
        porcentajeEntregadas: formatPercentage(porcentajeEntregadas)
      }
    }), []
  )

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'ccaa'
      },
      {
        Header: 'Dosis entregadas',
        accessor: 'dosisEntregadas',
        format: 'digit'
      },
      {
        Header: 'Dosis administradas',
        accessor: 'dosisAdministradas',
        format: 'digit'
      },
      {
        Header: '% sobre entregadas',
        accessor: 'porcentajeEntregadas',
        format: 'percentatge'
      },
      {
        Header: 'Pauta completa',
        accessor: 'dosisPautaCompletada',
        format: 'digit'
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
  } = useTable({ columns, data: tableData }, useSortBy)

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                    : ''}
                </span>
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
                  <td {...cell.getCellProps()}>
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
