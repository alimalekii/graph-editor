import './style.scss'
import { Trans } from 'react-i18next'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import tableRowDelete from 'src/assets/crossBlackSmallIcon.svg'

const translatedMetaData = (title: string) => {
  return window?.meta_data_dictionary?.[title] || title
}

export interface IBDMTableProps {
  className?: string
  rows: Array<{ [key: string]: string } & { id: string } & { error?: boolean }>
  onSelectRow?: (id: string) => void
  onDeleteRow?: (id: string) => void
}

const CumulativeFilterTable = (props: IBDMTableProps) => {
  const { rows, onSelectRow, onDeleteRow, className } = props

  const columns = Object.keys(rows[0]).filter(item => item !== 'id' && item !== 'error')

  return (
    <TableContainer className={`bdm-table ${className ? className : ''}`.trim()}>
      <Table stickyHeader className='bdm-table__table'>
        <TableHead className='bdm-table__head'>
          <TableRow className='bdm-table__head__row'>
            {onDeleteRow && <TableCell className='bdm-table__head__row__cell delete'></TableCell>}

            {columns.map(column => (
              <TableCell align='center' className='bdm-table__head__row__cell'>
                <Trans i18nKey={column} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className='bdm-table__body'>
          {rows.map(row => (
            <TableRow
              key={row.id}
              className={`bdm-table__body__row ${
                row.error ? (row.error ? 'error' : '') : ''
              }`.trim()}
              onClick={e => {
                e.stopPropagation()
                onSelectRow?.(row.id)
              }}
            >
              {columns.map(col => {
                return (
                  <>
                    {onDeleteRow && (
                      <TableCell
                        align='center'
                        className='bdm-table__body__row__cell delete'
                        onClick={e => {
                          e.stopPropagation()
                          onDeleteRow?.(row.id)
                        }}
                      >
                        <img src={tableRowDelete} alt='delete row' />
                      </TableCell>
                    )}

                    <TableCell align='center' className='bdm-table__body__row__cell'>
                      {translatedMetaData(row[col])}
                    </TableCell>
                  </>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CumulativeFilterTable
