import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx'
import { TableHead, Tooltip } from '@mui/material';
import { AiOutlinePlus, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { PersonalAccountsRow } from './PersonalAccountsRow';
import { AddAccountDialog } from '../pattern-library/AddAccountDialog';
import { PasswordAccount } from '../APIrequests';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

export interface RowDataModel {
  title: string;
  username: string;
  password: string;
  url: string;
  iconUrl?: string;
  isDataLoaded: boolean;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <RxDoubleArrowLeft /> : <RxDoubleArrowRight />}
      </IconButton>
    </Box>
  );
}

export function createRowData(title: string, username: string, password: string, url: string, iconUrl?: string, isDataLoaded: boolean=true): RowDataModel {
  iconUrl = iconUrl ?? '/favicon.ico'
  return { title, username, password, url, iconUrl, isDataLoaded }
}

export const PersonalAccounts = () => {
  const [rows, setRows] = useState(Array(5).fill(createRowData('', '', '', '', '', false)))
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRowData = (currTitle: string, newData: RowDataModel) => {
    const index = rows.findIndex(data => data.title === currTitle)
    if (index < 0) {
      return
    }
    const newRows = [...rows]
    newRows[index] = {...newData}
    setRows(newRows)
  }

  const handleAddRowData = (data: RowDataModel) => {
    const newRows = [...rows]
    newRows.push({...data})
    setRows(newRows)
  }

  const handleDeleteRowData = (currTitle: string) => {
    let newRows: Array<RowDataModel> = []
    rows.forEach(row => row.title !== currTitle && newRows.push({...row}))
    setRows(newRows)
  }

  const checkTitleIsUnique = (title: string): boolean => {
    return !rows.some(row => row.title === title);
  }

  useEffect(() => {
      if (!isDataLoaded) {
        PasswordAccount.getAll().then(res => {
          const tempRows: RowDataModel[] = []
          res?.forEach((row: any) => tempRows.push(createRowData(row.title, row.username, row.password, row.url, row.icon_url)))
          setRows(tempRows)
          setIsDataLoaded(true)
        })
      }
  }, [isDataLoaded])

  return (
    <>
      <h1 className='text-2xl mb-6'>Personal Accounts</h1>
      <button className={`flex gap-3 p-1 rounded-md ml-auto mb-2 ${isDataLoaded ? 'cursor-pointer hover:bg-default1 hover:text-white' : 'cursor-default bg-gray-200 text-gray-500'}`} onClick={() => isDataLoaded && setShowAddDialog(true)}>
        <AiOutlinePlus className=' self-center'/>
        <div>Add Account</div>
      </button>
      <TableContainer component={Paper}>
        <Table sx={{ width: '83vw'}} aria-label="custom pagination table">
          <TableHead>
            <TableRow className='bg-gray-100'>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <PersonalAccountsRow data={row} updateData={handleChangeRowData} deleteData={handleDeleteRowData} isDataLoaded={isDataLoaded} checkTitleIsUnique={checkTitleIsUnique}/>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <AddAccountDialog
        isVisible={showAddDialog} cancelAction={() => setShowAddDialog(false)}
        confirmAction={() => setShowAddDialog(false)} updateData={handleAddRowData}
        checkTitleIsUnique={checkTitleIsUnique}/>
    </>
  );
}

export default PersonalAccounts