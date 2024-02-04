import React, { useEffect, useState } from 'react';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  async function getData() {
    try {
      const response = await fetch('http://localhost:5000/api/user');
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        console.error(result.error);
        setError(result.error);
      } else {
        // Refetch the data after successful deletion
        getData();
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Error deleting data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">All data</h2>

      <div className="row">
        {data.map((ele) => (
          <div className="col-3" key={ele._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-subtitle mb-2 text-muted">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="text-muted">{ele.gender}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </button>
                <a href="#" className="card-link">
                  Edit
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
