import logo from './logo.svg';
import './App.css';
import EmployeeData from './EmployeeData';
import { useEffect, useState } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';

function App() {

  const [data, setData] = useState([]);
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setData(EmployeeData)
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstname);
      setLastName(dt[0].lastname);
      setAge(dt[0].age);
    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);

      }
    }
  }
  const handleSave = (e) => {
    let error = '';

    if (firstname === '')
      error += 'First Name is required, ';

    if (lastname === '')
      error += 'Last Name is required, ';

    if (age <= 0)
      error += 'Age is required, ';

    if (error === '') {
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id: EmployeeData.length + 1,
        firstname: firstname,
        lastname: lastname,
        age: age
      }
      dt.push(newObject);
      setData(dt);
    }
    else {
      alert(error)
    }


  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstname = firstname;
    dt[index].lastname = lastname;
    dt[index].age = age;


    setData(dt);
    handleClear();
  }


  const handleClear = () => {

    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);

  }

  return (

    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px", marginBottom: "10px" }}>
        <div>
          <label>First Name :
            <input type='text' placeholder='Enter first name' onChange={(e) => setFirstName(e.target.value)} value={firstname} />
          </label>
        </div>
        <div>
          <label>Last Name :
            <input type='text' placeholder='Enter last name' onChange={(e) => setLastName(e.target.value)} value={lastname} />
          </label>
        </div>
        <div>
          <label>Age :
            <input type='number' placeholder='Enter age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          {
            !isUpdate ?
              <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
              :
              <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
          }
          <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>

        </div>

      </div>



      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>


    </div>
  );
}

export default App;
