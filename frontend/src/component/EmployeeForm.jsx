import { useState, useEffect } from 'react'
import { createEmployee, updateEmployee } from '../api/employeeApi'
import './EmployeeForm.css'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  position: '',
  salary: ''
}

function EmployeeForm({ employee, onClose }) {
  const [formData, setFormData] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (employee) {
      setFormData(employee)
    } else {
      setFormData(initialState)
    }
  }, [employee])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (employee) {
        await updateEmployee(employee.id, formData)
      } else {
        await createEmployee(formData)
      }
      onClose()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <button className="btn-close" onClick={onClose}>✕</button>
      </div>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Engineering"
              required
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Developer"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Salary (₹)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="80000"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm