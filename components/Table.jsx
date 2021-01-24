/* eslint-disable react/jsx-key */
import { useCallback, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits.jsx'
import { toPercentage } from './NumberPercentage.jsx'
import styles from 'styles/Table.module.css'
import { Term } from './Term.jsx'
import { dialogInfo } from 'helpers/data/DialogInfo.jsx'

export default function Table ({ data, filter, setFilter }) {
  const locale = 'es'

  const handleRowClick = useCallback(
    ({ original: { ccaa } }) => () => {
      setFilter(ccaa === filter ? 'Totales' : ccaa)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [filter, setFilter]
  )

  const tableData = useMemo(
    () => data.map(row => {
      const {
        dosisAdministradas,
        dosisEntregadas,
        dosisEntregadasModerna,
        dosisEntregadasPfizer,
        dosisPautaCompletada,
        porcentajeEntregadas,
        porcentajePoblacionAdministradas,
        porcentajePoblacionCompletas,
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
        porcentajeEntregadas: formatPercentage(porcentajeEntregadas),
        porcentajePoblacionAdministradas: formatPercentage(porcentajePoblacionAdministradas),
        porcentajePoblacionCompletas: formatPercentage(porcentajePoblacionCompletas)
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
        hasHelper: true
      },
      {
        Header: 'Dosis administradas',
        accessor: 'dosisAdministradas',
        hasHelper: true
      },
      {
        Header: '% sobre entregadas',
        accessor: 'porcentajeEntregadas'
      },
      {
        Header: '% población vacunada',
        accessor: 'porcentajePoblacionAdministradas'
      },
      {
        Header: 'Pauta completa',
        accessor: 'dosisPautaCompletada',
        format: 'digit'
      },
      {
        Header: '% población totalmente vacunada',
        accessor: 'porcentajePoblacionCompletas',
        format: 'percentatge'
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
    <div className={styles.container}>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th>
                  <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                      : ''}
                  </span>
                  {column.hasHelper && <Term title={dialogInfo[column.id]?.title}>{dialogInfo[column.id]?.description}</Term>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            const className = row.id === '19' ? styles.totales : row.original.ccaa === filter ? styles.selected : ''
            return (
              <tr {...row.getRowProps()} className={className} onClick={handleRowClick(row)}>
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
    </div>
  )
}
