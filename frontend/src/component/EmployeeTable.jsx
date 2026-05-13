import './EmployeeTable.css'

function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="empty">
        <p>No employees found. Add your first employee!</p>
      </div>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.firstName} {emp.lastName}</td>
            <td>{emp.email}</td>
            <td><span className="badge">{emp.department}</span></td>
            <td>{emp.position}</td>
            <td>₹{emp.salary?.toLocaleString()}</td>
            <td>
              <button className="btn-edit" onClick={() => onEdit(emp)}>Edit</button>
              <button className="btn-delete" onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default EmployeeTable