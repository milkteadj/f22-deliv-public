import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EntryModal from './EntryModal';
import { getCategory } from '../utils/categories';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// Table component that displays entries on home screen

export default function EntryTable({ entries }) {

   // Add query search bar
   const [query, setQuery] = useState("");

   const totalCount = entries.length;
   var filteredCount = entries.length;

   const ifQueried = (entry) => {
      return (
         entry.user.toLowerCase().includes(query.toLowerCase()) ||
         entry.link.toLowerCase().includes(query.toLowerCase()) ||
         getCategory(entry.category).name.toLowerCase().includes(query.toLowerCase()) ||
         entry.date.toLowerCase().includes(query.toLowerCase())
      );
   }

   const searchContent = (entries) => {
      const filteredEntries = entries.filter(ifQueried);
      filteredCount = filteredEntries.length;
      return filteredEntries;
   }

   return (
      <>
      <div style={{margin:"auto", textAlign:"center", marginBottom:"20px"}}>
         <input type="text" placeholder={SearchIcon} className="search" onChange={e => setQuery(e.target.value)}
                style={{width: "40%", height: "30px"}}/>    
      </div>
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Link</TableCell>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">Date/Time Posted</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {
               searchContent(entries)
               .map((entry) => (
                  <TableRow
                     key={entry.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {entry.name}
                     </TableCell>
                     <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                     <TableCell align="right">{entry.user}</TableCell>
                     <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                     <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                        <EntryModal entry={entry} type="edit" />
                     </TableCell>
                     <TableCell align="right">{entry.date}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
      <div style={{textAlign:"center", color:"gray", paddingTop: "20px"}}>
         <i>{filteredCount} out of {totalCount} entries found.</i>
      </div>
   </>
   );
}
