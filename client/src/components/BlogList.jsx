import React, { useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

 const BlogList = () => {
   const {
     setBlogs,
     search,
     setFilteredBlogs,
     loading,
   } = useContext(AppContext);

   useEffect(() => {
     axios
       .get('/posts', {
         withCredentials: true,
       })
       .then((response) => {
         setBlogs(response.data);
         setFilteredBlogs(response.data);
       })
       .catch((error) => {
         console.log(error);
       });
 
   }, [setBlogs, setFilteredBlogs, search, loading]);

   return (
     <Container>
       <Table>
         <thead>
           <tr>
             <th>Title</th>
             <th>Date Created</th>
             <th>Article</th>
             <th>Author Name</th>
             <th></th>
           </tr>
         </thead>
         <tbody>
         </tbody>
       </Table>
     </Container>
   );
 };

export default BlogList;
