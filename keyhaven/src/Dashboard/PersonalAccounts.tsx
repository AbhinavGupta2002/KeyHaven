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
import { TableHead } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai'
import { PersonalAccountsRow } from './PersonalAccountsRow';
import { AddAccountDialog } from '../pattern-library/AddAccountDialog';
import { Account, PasswordAccount } from '../APIrequests';

import emptyBoards from '../img/empty.svg'
import { BoxTypeA } from '../pattern-library/BoxTypeA';
import { checkBearerTokenExpiry } from '../common-library';

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

interface PersonalAccountsProps {
  navigate: Function
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

export const PersonalAccounts = (props: PersonalAccountsProps) => {
  const [rows, setRows] = useState(Array(window.innerHeight >= 810 ? 6 : window.innerHeight < 720 ? 3 : 5).fill(createRowData('', '', '', '', '', false)))
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

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

  /*const checkTitleIsUnique = (title: string, isEditing?: boolean): boolean => {
    return !rows.some(row => row.title === title);
  }*/

  const checkTitleIsUnique = (title: string, isEditing?: boolean, oldTitle?: string): boolean => {
    for (let i = 0; i < rows.length; ++i) {
      if (rows[i].title === title) {
        if (isEditing && oldTitle === title) {
          continue
        }
        return false
      }
    }
    return true
  }

  useEffect(() => {
      if (!isDataLoaded) {
        Account.getIsVerified().then(res => {
          checkBearerTokenExpiry(res) ? props.navigate('/') : res && setIsVerified(true)
        })
        PasswordAccount.getAll().then(res => {
          if (checkBearerTokenExpiry(res)) {
            props.navigate('/')
          } else {
            const tempRows: RowDataModel[] = []
            res?.forEach((row: any) => tempRows.push(createRowData(row.title, row.username, row.password, row.url, row.icon_url)))
            setRows(tempRows)
            setIsDataLoaded(true)
          }
        })
      }
  }, [isDataLoaded])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 720) {
        setRowsPerPage(3);
      } else if (window.innerHeight < 810) {
        setRowsPerPage(5);
      } else {
        setRowsPerPage(6);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <h1 className='text-2xl mb-6 text-center sm:text-left'>Personal Accounts</h1>
      {!isDataLoaded || (isVerified && rows.length) ?
        <>
          <button className={`flex gap-3 p-1 rounded-md ml-auto mr-auto sm:mr-0 mb-2 ${isDataLoaded ? 'cursor-pointer hover:bg-default1 hover:text-white' : 'cursor-default bg-gray-200 text-gray-500'}`} onClick={() => isDataLoaded && setShowAddDialog(true)}>
            <AiOutlinePlus className='self-center'/>
            <div>Add Account</div>
          </button>
          <TableContainer component={Paper} className='-z-10'>
            <Table aria-label="custom pagination table">
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
                ).map((row, index) => (
                  <PersonalAccountsRow
                  key={index} data={row} updateData={handleChangeRowData}
                  deleteData={handleDeleteRowData} isDataLoaded={isDataLoaded}
                  checkTitleIsUnique={checkTitleIsUnique} navigate={props.navigate}/>
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
        </> :
        <div className='flex flex-col gap-10 mt-20'>
          <div className='flex justify-center'>
            <img src={emptyBoards} className=' w-1/5'/>
          </div>
          {!isVerified &&
            <div className='flex justify-center'>
              <BoxTypeA>
                    To add accounts, please go to settings and verify your email.
              </BoxTypeA>
            </div>
          }
          <div className='flex justify-center'>
            <button className={`flex gap-3 p-1 rounded-md ${isVerified ? 'cursor-pointer hover:bg-default1 hover:text-white' : 'cursor-default bg-gray-200 text-gray-500'}`} onClick={() => isVerified && setShowAddDialog(true)}>
              <AiOutlinePlus className='self-center'/>
              <div>Add Account</div>
            </button>
          </div>
        </div>
      }
      <AddAccountDialog
        isVisible={showAddDialog} cancelAction={() => setShowAddDialog(false)}
        confirmAction={() => setShowAddDialog(false)} updateData={handleAddRowData}
        checkTitleIsUnique={checkTitleIsUnique} navigate={props.navigate}/>
    </>
  );
}

export default PersonalAccounts