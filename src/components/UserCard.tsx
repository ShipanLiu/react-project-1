import React, { useState } from 'react'
import './UserCard.css'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface UserProfileProps {
  user: User | null
  onEdit: () => void
}

// Child component that receives props
function UserProfile({ user, onEdit }: UserProfileProps): React.ReactElement {
  if (!user) {
    return <div className="no-user">No user selected</div>
  }

  return (
    <div className="user-profile">
      <div className="avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <h3>{user.name}</h3>
      <p className="email">{user.email}</p>
      <p className="role">{user.role}</p>
      <button onClick={onEdit} className="btn btn-primary">
        Edit Profile
      </button>
    </div>
  )
}

// Main component
function UserCard(): React.ReactElement {
  const [users] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Manager' }
  ])
  
  const [selectedUser, setSelectedUser] = useState<User>(users[0])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<Partial<User>>({})

  const handleEdit = (): void => {
    setEditForm({ ...selectedUser })
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSelectedUser(editForm as User)
    setIsEditing(false)
  }

  const handleCancel = (): void => {
    setIsEditing(false)
    setEditForm({})
  }

  return (
    <div className="user-card-container">
      <h2>User Profile Example</h2>
      <p>This demonstrates props, conditional rendering, and component communication.</p>
      
      <div className="user-selector">
        <h3>Select a user:</h3>
        <div className="user-buttons">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`btn ${selectedUser?.id === user.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      <div className="user-display">
        {isEditing ? (
          <form onSubmit={handleSave} className="edit-form">
            <h3>Edit Profile</h3>
            <input
              type="text"
              value={editForm.name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={editForm.email || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              value={editForm.role || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, role: e.target.value })}
              placeholder="Role"
            />
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">Save</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <UserProfile user={selectedUser} onEdit={handleEdit} />
        )}
      </div>

      <div className="explanation">
        <h3>Concepts demonstrated:</h3>
        <ul>
          <li><strong>Props:</strong> UserProfile receives user data and onEdit function</li>
          <li><strong>Conditional rendering:</strong> Show edit form or profile based on state</li>
          <li><strong>Component communication:</strong> Child component calls parent function</li>
          <li><strong>Object state:</strong> Managing complex form data</li>
        </ul>
      </div>
    </div>
  )
}

export default UserCard 