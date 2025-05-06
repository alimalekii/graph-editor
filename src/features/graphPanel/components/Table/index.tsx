import './style.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import tableRowDelete from 'src/assets/crossBlackSmallIcon.svg';
import { t } from 'i18next';

interface ICumulativeFilterTableProps {
  className?: string;
  columns: Array<{
    leftField: { title: string; value: string };
    rightField: { title: string; value: string };
    operator: { title: string; value: string };
    id: string;
  }>;
  onSelectRow?: (id: string) => void;
  onDeleteRow?: (id: string) => void;
}

const translatedMetaData = (title: string) => {
  return title;
};

const CumulativeFilterTable = (props: ICumulativeFilterTableProps) => {
  const { columns, onSelectRow, onDeleteRow, className } = props;

  return (
    <TableContainer
      className={`bdm-fitler-table ${className ? className : ''}`.trim()}
    >
      <Table stickyHeader className="bdm-fitler-table__table">
        <TableHead className="bdm-fitler-table__head">
          <TableRow className="bdm-fitler-table__head__row">
            <TableCell className="bdm-fitler-table__head__row__cell delete"></TableCell>
            <TableCell
              align="center"
              className="bdm-fitler-table__head__row__cell"
            >
              {t('filter-box-advanced-source')}
            </TableCell>
            <TableCell
              align="center"
              className="bdm-fitler-table__head__row__cell"
            >
              {t('filter-box-advanced-destination')}
            </TableCell>
            <TableCell
              align="center"
              className="bdm-fitler-table__head__row__cell"
            >
              {t('filter-box-advanced-formula')}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="bdm-fitler-table__body">
          {columns.map((row) => (
            <TableRow
              key={row.id}
              className="bdm-fitler-table__body__row"
              onClick={(e) => {
                e.stopPropagation();
                onSelectRow?.(row.id);
              }}
            >
              {/* delete cell */}
              <TableCell
                align="center"
                className="bdm-fitler-table__body__row__cell delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRow?.(row.id);
                }}
              >
                <img src={tableRowDelete} alt="delete row" />
              </TableCell>

              {/* data cells */}
              <TableCell
                align="center"
                className="bdm-fitler-table__body__row__cell"
              >
                {translatedMetaData(row.leftField.title)}
              </TableCell>
              <TableCell
                align="center"
                className="bdm-fitler-table__body__row__cell"
              >
                {translatedMetaData(row.rightField.title)}
              </TableCell>
              <TableCell
                align="center"
                className="bdm-fitler-table__body__row__cell"
              >
                {translatedMetaData(row.operator.title)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CumulativeFilterTable;
