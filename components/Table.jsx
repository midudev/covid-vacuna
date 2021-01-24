/* eslint-disable react/jsx-key */
import { useCallback, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { toDigit } from './NumberDigits.jsx'
import { toPercentage } from './NumberPercentage.jsx'
import styles from 'styles/Table.module.css'

export default function Table ({ data, filter, setFilter }) {
  const locale = 'es-ES'

  const formatDigit = useCallback((number) => toDigit({ locale, number }), [])
  const formatPercentage = useCallback((number) => toPercentage({ locale, number }), [])
  const evalDigit = useCallback((value) => typeof value === 'number' ? formatDigit(value) : value, [])

  const handleRowClick = useCallback(
    ({ original: { ccaa } }) => () =>
      setFilter(ccaa === filter ? 'Totales' : ccaa),
    [filter, setFilter]
  )

  const { autonomias, totales } = useMemo(() => data.reduce(
    (acc, current) => {
      current = {
        ...current,
        porcentajeEntregadas: formatPercentage(current.porcentajeEntregadas),
        porcentajePoblacionAdministradas: formatPercentage(current.porcentajePoblacionAdministradas),
        porcentajePoblacionCompletas: formatPercentage(current.porcentajePoblacionCompletas)

      }
      return current.ccaa !== 'Totales'
        ? { ...acc, autonomias: [...acc.autonomias, current] }
        : { ...acc, totales: current }
    },
    { autonomias: [], totales: {} }
  )
  , [])

  const columns = useMemo(
    () => [
      {
        Header: 'Comunidad Autónoma',
        accessor: 'ccaa'
      },
      {
        Header: 'Dosis entregadas',
        accessor: 'dosisEntregadas',
      },
      {
        Header: 'Entregadas Moderna',
        accessor: 'dosisEntregadasModerna'
      },
      {
        Header: 'Entregadas Pfizer',
        accessor: 'dosisEntregadasPfizer'
      },
      {
        Header: 'Dosis administradas',
        accessor: 'dosisAdministradas',
      },
      {
        Header: '% sobre entregadas',
        accessor: 'porcentajeEntregadas',
        format: formatPercentage
      },
      {
        Header: '% población vacunada',
        accessor: 'porcentajePoblacionAdministradas',
      },
      {
        Header: 'Pauta completa',
        accessor: 'dosisPautaCompletada'
      },
      {
        Header: '% población totalmente vacunada',
        accessor: 'porcentajePoblacionCompletas'
      }
    ]
    , [])

  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: autonomias }, useSortBy)

  const mapRender = useMemo(
    () => ({
      heads: (headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(mapRender.columns)}
        </tr>
      ),

      columns: (column) => (
        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render('Header')}
          <span>
            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
          </span>
        </th>
      ),

      rows: (row) => {
        prepareRow(row)
        return (
          <tr
            {...row.getRowProps()}
            className={row.original.ccaa === filter ? styles.selected : undefined}
            onClick={handleRowClick(row)}
          >
            {row.cells.map(mapRender.cells)}
          </tr>
        )
      },

      cells: (cell) => (
        <td {...cell.getCellProps()}>
          {evalDigit(cell.value)}
        </td>
      )
    }),
    []
  )

  return (
    <div className={styles.container}>
      <table className={styles.table} {...getTableProps()}>
        <thead>{headerGroups.map(mapRender.heads)}</thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(mapRender.rows)}
          <tr role='row' className={styles.totales}>
            {Object.values(totales).map(total => <td role='cell'>{evalDigit(total)}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
