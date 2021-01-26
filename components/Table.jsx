/* eslint-disable react/jsx-key */
import { useCallback, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits.jsx'
import { toPercentage } from './NumberPercentage.jsx'
import styles from 'styles/Table.module.css'
import { useLocale } from 'hooks/useMainContexts.js'

export default function Table ({ data, filter, setFilter, reportFound }) {
  const { locale } = useLocale

  const handleRowClick = useCallback(
    ({ original: { ccaa } }) => () => {
      setFilter(ccaa === filter ? 'Totales' : ccaa)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [filter, setFilter]
  )

  const formatDigit = number => toDigit({ locale, number })
  const formatPercentage = number => toPercentage({ locale, number })

  const tableData = useMemo(
    () => reportFound !== undefined
      ? reportFound.map(row => {
          const {
            dosisPautaCompletada,
            porcentajeEntregadas,
            porcentajePoblacionAdministradas,
            porcentajePoblacionCompletas,
            ...rest
          } = row

          return {
            dosisPautaCompletada: !isNaN(dosisPautaCompletada) ? dosisPautaCompletada.toFixed(4) : 0,
            porcentajeEntregadas: porcentajeEntregadas !== null ? porcentajeEntregadas.toFixed(4) : 0,
            porcentajePoblacionAdministradas: porcentajePoblacionAdministradas !== null ? porcentajePoblacionAdministradas.toFixed(4) : 0,
            porcentajePoblacionCompletas: porcentajePoblacionCompletas !== null ? porcentajePoblacionCompletas.toFixed(4) : 0,
            ...rest
          }
        })
      : data.map(row => {
        const {
          dosisPautaCompletada,
          porcentajeEntregadas,
          porcentajePoblacionAdministradas,
          porcentajePoblacionCompletas,
          ...rest
        } = row

        return {
          dosisPautaCompletada: !isNaN(dosisPautaCompletada) ? dosisPautaCompletada.toFixed(4) : 0,
          porcentajeEntregadas: porcentajeEntregadas !== null ? porcentajeEntregadas.toFixed(4) : 0,
          porcentajePoblacionAdministradas: porcentajePoblacionAdministradas !== null ? porcentajePoblacionAdministradas.toFixed(4) : 0,
          porcentajePoblacionCompletas: porcentajePoblacionCompletas !== null ? porcentajePoblacionCompletas.toFixed(4) : 0,
          ...rest
        }
      }), [reportFound]
  )

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'ccaa',
        format: (ccaa) => ccaa
      },
      {
        Header: 'Dosis entregadas',
        accessor: 'dosisEntregadas',
        format: formatDigit
      },
      {
        Header: 'Dosis administradas',
        accessor: 'dosisAdministradas',
        format: formatDigit
      },
      {
        Header: '% sobre entregadas',
        accessor: 'porcentajeEntregadas',
        format: formatPercentage
      },
      {
        Header: '% población vacunada',
        accessor: 'porcentajePoblacionAdministradas',
        format: formatPercentage
      },
      {
        Header: 'Pauta completa',
        accessor: 'dosisPautaCompletada',
        format: formatDigit
      },
      {
        Header: '% población totalmente vacunada',
        accessor: 'porcentajePoblacionCompletas',
        format: formatPercentage
      }
    ],
    []
  )

  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: tableData }, useSortBy)

  // totales siempre en la ultima fila
  rows = [...rows.filter(row => row.id !== '19'), rows.find(row => row.id === '19')]

  return (
    <div className={styles.container}>
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
          {rows.map((row, index) => {
            prepareRow(row)
            const className = row.id === '19' ? styles.totales : row.original.ccaa === filter ? styles.selected : ''
            return (
              <tr {...row.getRowProps()} className={className} onClick={handleRowClick(row)}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.format(cell.value)}
                    </td>
                  )
                })}
                <td className={styles.mobileData}>
                  {row.cells.map((cell, index) => {
                    return (
                      <span>
                        {index === 0 ? '' : `${headerGroups[0].headers[index].Header} - ${cell.column.format(cell.value)}`}
                      </span>
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
