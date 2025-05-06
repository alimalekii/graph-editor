import './style.scss';
// import { Trans } from 'react-i18next'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import tableRowDelete from '@/assets/crossBlackSmallIcon.svg';

interface ICumulativeFilterTableProps {
  className?: string;
  // columns: Array<{
  //   fieldName: string
  //   fieldType: string
  // }>
  columns: Record<string, string>;
  onSelectRow?: (id: string) => void;
  onDeleteRow?: (id: string) => void;
}

const translatedMetaData = (title: string) => {
  return window?.meta_data_dictionary?.[title] || title;
};

const CumulativeFilterTable = (props: ICumulativeFilterTableProps) => {
  const { columns, onSelectRow, onDeleteRow, className } = props;

  return (
    <TableContainer
      className={`bdm-graph-setting-sidebar-table ${
        className ? className : ''
      }`.trim()}
    >
      <Table stickyHeader className="bdm-graph-setting-sidebar-table__table">
        <TableHead className="bdm-graph-setting-sidebar-table__head">
          <TableRow className="bdm-graph-setting-sidebar-table__head__row">
            <TableCell
              align="center"
              className="bdm-graph-setting-sidebar-table__head__row__cell"
            >
              {/* <Trans i18nKey='filter-box-advanced-source' /> */}
              Field
            </TableCell>
            <TableCell
              align="center"
              className="bdm-graph-setting-sidebar-table__head__row__cell"
            >
              {/* <Trans i18nKey='filter-box-advanced-destination' /> */}
              Type
            </TableCell>
            <TableCell className="bdm-graph-setting-sidebar-table__head__row__cell delete"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="bdm-graph-setting-sidebar-table__body">
          {Object.entries(columns).map(
            ([fieldName, fieldType]: Array<string>) => (
              <TableRow
                key={fieldName}
                className="bdm-graph-setting-sidebar-table__body__row"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRow?.(fieldName);
                }}
              >
                {/* data cells */}
                <TableCell
                  align="center"
                  className="bdm-graph-setting-sidebar-table__body__row__cell"
                >
                  {translatedMetaData(fieldName)}
                </TableCell>
                <TableCell
                  align="center"
                  className="bdm-graph-setting-sidebar-table__body__row__cell"
                >
                  {translatedMetaData(fieldType)}
                </TableCell>
                {/* delete cell */}
                <TableCell
                  align="center"
                  className="bdm-graph-setting-sidebar-table__body__row__cell delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRow?.(fieldName);
                  }}
                >
                  <img src={tableRowDelete} alt="delete row" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CumulativeFilterTable;
