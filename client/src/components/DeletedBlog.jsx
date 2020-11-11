import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const DeletedBlog = ({ id }) => {
    const { setLoading } = useContext(AppContext);
    
    const handleDelete = async () => {
        setLoading(true);
        const Delete = await swal({
          title: 'Are you sure?',
          text: 'Once deleted, you will not be able to recover this post',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        });

        if (Delete) {
          axios
            .delete(`/posts/delete/${id}`, { withCredentials: true })
            .then(() => {
              setLoading(false);
              swal('Poof', 'your blog has been deleted', 'success');
            })
            .catch((error) => console.log(error));
        };
  
        return (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        );
    };
};

export default DeletedBlog;
