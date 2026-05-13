import { useState, useEffect } from 'react'
import { getAllEmployees, deleteEmployee } from './api/employeeApi'
import EmployeeForm from './component/EmployeeForm'
import EmployeeTable from './component/EmployeeTable'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const res = await getAllEmployees()
      setEmployees(res.data)
    } catch (err) {
      console.error('Error fetching employees', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    try {
      await deleteEmployee(id)
      fetchEmployees()
    } catch (err) {
      console.error('Error deleting employee', err)
    }
  }

  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setSelectedEmployee(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setSelectedEmployee(null)
    fetchEmployees()
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Employee Management System</h1>
        <button className="btn-primary" onClick={handleAddNew}>
          + Add Employee
        </button>
      </header>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <EmployeeForm
              employee={selectedEmployee}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}

      <main className="main">
        {loading ? (
          <p className="loading">Loading employees...</p>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}

export default App