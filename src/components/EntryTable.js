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

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Table component that displays entries on home screen

export default function EntryTable({ entries }) {

   // Add query search bar
   const [query, setQuery] = useState("");
   const [sorter, setSorter] = useState(0);

   const totalCount = entries.length;
   var filteredCount = entries.length;

   const ifQueried = (entry) => {
      return (
         entry.name.toLowerCase().includes(query.toLowerCase()) ||
         entry.user.toLowerCase().includes(query.toLowerCase()) ||
         entry.link.toLowerCase().includes(query.toLowerCase()) ||
         getCategory(entry.category).name.toLowerCase().includes(query.toLowerCase()) ||
         entry.date.toLowerCase().includes(query.toLowerCase())
      );
   }
   const searchContent = (entries) => {
      const filteredEntries = entries.filter(ifQueried).sort(compareFunction);
      filteredCount = filteredEntries.length;
      return filteredEntries;
   }

   // Adding sorting
   const sortType = [
      { id: 0, name: "Date/Time" },
      { id: 1, name: "Name" },
      { id: 2, name: "Link" },
      { id: 3, name: "User" },
      { id: 4, name: "Category" }
   ];

   // check for the field currently sorting by
   const compareFunction = (a, b) => {
      if (sorter === 0) {
         return a.date < b.date ? 1 : -1;
      } else if (sorter === 1) {
         return a.name > b.name ? 1 : -1;
      } else if (sorter === 2) {
         return a.link > b.link ? 1 : -1;
      } else if (sorter === 3) {
         return a.user > b.user ? 1 : -1;
      } else {
         return getCategory(a.category).name >= getCategory(b.category).name ? 1 : -1;
      }
   }

   return (
      <>
      <div style={{margin:"auto", textAlign:"center", marginBottom:"20px"}}>
         <FormControl minWidth sx={{}}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={sorter}
               label="Sorter"
               onChange={(event) => setSorter(event.target.value)}
            >
               {sortType.map((sortType) => (<MenuItem value={sortType.id}>{sortType.name}</MenuItem>))}
            </Select>
         </FormControl>&ensp;

         <input type="text" placeholder="Search..." className="search" onChange={e => setQuery(e.target.value)}
                style={{width: "40%", height: "55px"}}/>    
      </div>
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Link</TableCell>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Date/Time Posted</TableCell>
                  <TableCell align="right">Open</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {
               searchContent(entries)
               .sort((a,b) => compareFunction(a, b))
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
                     <TableCell align="right">{entry.date}</TableCell>
                     <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                        <EntryModal entry={entry} type="edit" />
                     </TableCell>
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
